import express from 'express'
import mongoose from 'mongoose'
import Detection from '../models/Detection.js'
import Alert from '../models/Alert.js'
import { authenticate, AuthRequest } from '../middleware/auth.js'
import { getDemoDetections } from '../utils/demoData.js'

const router = express.Router()

router.get('/', authenticate, async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('MongoDB not connected, returning demo detections')
      return res.json(getDemoDetections())
    }

    const detections = await Detection.find().sort({ timestamp: -1 }).limit(100)
    if (detections.length === 0) {
      console.log('No detections in DB, returning demo data')
      return res.json(getDemoDetections())
    }
    res.json(detections)
  } catch (error: any) {
    console.warn('Database query failed, using demo data:', error.message)
    res.json(getDemoDetections())
  }
})

router.post('/simulate', authenticate, async (req: AuthRequest, res) => {
  try {
    // Simulate detection
    const australianLocations = [
      { lat: -33.8688, lng: 151.2093 }, // Sydney
      { lat: -37.8136, lng: 144.9631 }, // Melbourne
      { lat: -27.4698, lng: 153.0251 }, // Brisbane
      { lat: -31.9505, lng: 115.8605 }, // Perth
      { lat: -34.9285, lng: 138.6007 }, // Adelaide
    ]

    const location = australianLocations[Math.floor(Math.random() * australianLocations.length)]
    const detection = await Detection.create({
      timestamp: new Date(),
      location: {
        lat: location.lat + (Math.random() - 0.5) * 0.1,
        lng: location.lng + (Math.random() - 0.5) * 0.1,
      },
      temperature: 25 + Math.random() * 10,
      type: ['ember', 'spot_fire', 'wildfire'][Math.floor(Math.random() * 3)] as any,
      confidence: 0.7 + Math.random() * 0.3,
      droneId: 'sim-drone-1',
      status: 'new',
    })

    // Create alert
    const alert = await Alert.create({
      type: 'detection',
      severity: detection.type === 'wildfire' ? 'critical' : 'warning',
      title: `Thermal ${detection.type.replace('_', ' ')} detected`,
      message: `Temperature spike detected at ${detection.location.lat.toFixed(4)}, ${detection.location.lng.toFixed(4)}`,
      timestamp: new Date(),
      location: detection.location,
    })

    // Emit real-time alert
    const io = req.app.get('io')
    if (io) {
      io.emit('alert', alert)
    }

    res.json({ detection, alert })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

export default router

