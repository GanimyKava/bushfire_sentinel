import express from 'express'
import mongoose from 'mongoose'
import Subscriber from '../models/Subscriber.js'
import { authenticate, AuthRequest } from '../middleware/auth.js'
import { getDemoSubscribers } from '../utils/demoData.js'

const router = express.Router()

router.get('/', authenticate, async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('MongoDB not connected, returning demo subscribers')
      const demoSubs = getDemoSubscribers()
      console.log(`Returning ${demoSubs.length} demo subscribers`)
      return res.json(demoSubs)
    }

    const subscribers = await Subscriber.find()
    if (subscribers.length === 0) {
      console.log('No subscribers in DB, returning demo data')
      return res.json(getDemoSubscribers())
    }
    res.json(subscribers)
  } catch (error: any) {
    console.error('Error in subscribers route:', error)
    console.warn('Database query failed, using demo data:', error.message)
    try {
      const demoSubs = getDemoSubscribers()
      res.json(demoSubs)
    } catch (demoError: any) {
      console.error('Error getting demo subscribers:', demoError)
      res.status(500).json({ message: 'Failed to get subscribers data', error: error.message })
    }
  }
})

router.post('/bulk', authenticate, async (req, res) => {
  try {
    const { subscribers } = req.body
    if (mongoose.connection.readyState !== 1) {
      // In demo mode, just return success
      return res.json({ message: `Imported ${subscribers.length} subscribers (demo mode)` })
    }

    const inserted = await Subscriber.insertMany(subscribers)
    res.json({ message: `Imported ${inserted.length} subscribers`, subscribers: inserted })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/:id/verify', authenticate, async (req, res) => {
  try {
    // Mock CAMARA verification
    if (mongoose.connection.readyState !== 1) {
      const demoSubs = getDemoSubscribers()
      const sub = demoSubs.find((s: any) => s._id === req.params.id)
      if (sub) {
        sub.camaraVerified = true
        sub.alertPrefs = { ...sub.alertPrefs, otpVerified: true }
        return res.json(sub)
      }
    }

    const subscriber = await Subscriber.findByIdAndUpdate(
      req.params.id,
      {
        camaraVerified: true,
        'alertPrefs.otpVerified': true,
      },
      { new: true }
    )
    if (!subscriber) {
      return res.status(404).json({ message: 'Subscriber not found' })
    }
    res.json(subscriber)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

router.patch('/:id', authenticate, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const demoSubs = getDemoSubscribers()
      const sub = demoSubs.find((s: any) => s._id === req.params.id)
      if (sub) {
        Object.assign(sub, req.body)
        return res.json(sub)
      }
      return res.status(404).json({ message: 'Subscriber not found' })
    }

    const subscriber = await Subscriber.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!subscriber) {
      return res.status(404).json({ message: 'Subscriber not found' })
    }
    res.json(subscriber)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

export default router

