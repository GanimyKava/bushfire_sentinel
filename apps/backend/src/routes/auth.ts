import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import User from '../models/User.js'
import { authenticate, AuthRequest } from '../middleware/auth.js'

const router = express.Router()

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Check if MongoDB is connected, if not use demo mode
    const isMongoConnected = mongoose.connection.readyState === 1
    
    if (!isMongoConnected) {
      // MongoDB not connected - create demo user in memory
      const demoUser = {
        _id: 'demo-user-id-' + Date.now(),
        email: email || 'demo@example.com',
        name: email ? email.split('@')[0] : 'Demo User',
        role: 'fire_ranger',
      }

      const token = jwt.sign(
        { userId: demoUser._id },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '7d' }
      )

      return res.json({ token, user: demoUser })
    }

    // MongoDB is connected - use database
    try {
      // Auto-create user if doesn't exist (for demo)
      let user = await User.findOne({ email })
      if (!user) {
        const hashedPassword = await bcrypt.hash(password || 'demo123', 10)
        user = await User.create({
          email,
          password: hashedPassword,
          name: email.split('@')[0],
          role: 'fire_ranger',
        })
      } else {
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
          return res.status(401).json({ message: 'Invalid credentials' })
        }
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '7d' }
      )

      const userObj = user.toObject()
      const { password: _, ...userWithoutPassword } = userObj

      res.json({ token, user: userWithoutPassword })
    } catch (dbError: any) {
      // If database query fails, fall back to demo mode
      console.warn('Database query failed, using demo mode:', dbError.message)
      const demoUser = {
        _id: 'demo-user-id-' + Date.now(),
        email: email || 'demo@example.com',
        name: email ? email.split('@')[0] : 'Demo User',
        role: 'fire_ranger',
      }

      const token = jwt.sign(
        { userId: demoUser._id },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '7d' }
      )

      return res.json({ token, user: demoUser })
    }
  } catch (error: any) {
    console.error('Login error:', error)
    res.status(500).json({ message: error.message || 'Login failed' })
  }
})

router.get('/me', authenticate, async (req: AuthRequest, res) => {
  try {
    // Handle demo user (when MongoDB not connected)
    if (mongoose.connection.readyState !== 1) {
      return res.json(req.user)
    }
    
    const userObj = req.user.toObject()
    const { password: _, ...userWithoutPassword } = userObj
    res.json(userWithoutPassword)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

export default router

