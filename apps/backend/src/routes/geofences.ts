import express from 'express'
import mongoose from 'mongoose'
import Geofence from '../models/Geofence.js'
import { authenticate, AuthRequest } from '../middleware/auth.js'
import { getDemoGeofences } from '../utils/demoData.js'

const router = express.Router()

router.get('/', authenticate, async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('MongoDB not connected, returning demo geofences')
      return res.json(getDemoGeofences())
    }

    const geofences = await Geofence.find()
    if (geofences.length === 0) {
      console.log('No geofences in DB, returning demo data')
      return res.json(getDemoGeofences())
    }
    res.json(geofences)
  } catch (error: any) {
    console.warn('Database query failed, using demo data:', error.message)
    res.json(getDemoGeofences())
  }
})

router.post('/', authenticate, async (req, res) => {
  try {
    const geofence = await Geofence.create(req.body)
    res.status(201).json(geofence)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

export default router

