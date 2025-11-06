import express from 'express'
import mongoose from 'mongoose'
import Drone from '../models/Drone.js'
import { authenticate, AuthRequest } from '../middleware/auth.js'
import { getDemoDrones } from '../utils/demoData.js'

const router = express.Router()

router.get('/', authenticate, async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      // Return demo drones
      console.log('MongoDB not connected, returning demo drones')
      const demoDrones = getDemoDrones()
      console.log(`Returning ${demoDrones.length} demo drones`)
      return res.json(demoDrones)
    }

    const drones = await Drone.find().sort({ lastUpdate: -1 })
    if (drones.length === 0) {
      // If no drones in DB, return demo data
      console.log('No drones in DB, returning demo drones')
      return res.json(getDemoDrones())
    }
    res.json(drones)
  } catch (error: any) {
    console.error('Error in drones route:', error)
    console.warn('Database query failed, using demo data:', error.message)
    try {
      const demoDrones = getDemoDrones()
      res.json(demoDrones)
    } catch (demoError: any) {
      console.error('Error getting demo drones:', demoError)
      res.status(500).json({ message: 'Failed to get drones data', error: error.message })
    }
  }
})

router.post('/', authenticate, async (req, res) => {
  try {
    const drone = await Drone.create(req.body)
    res.status(201).json(drone)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

router.patch('/:id', authenticate, async (req, res) => {
  try {
    // If MongoDB not connected, update demo data in memory
    if (mongoose.connection.readyState !== 1) {
      const demoDrones = getDemoDrones()
      const drone = demoDrones.find((d: any) => d._id === req.params.id)
      if (drone) {
        Object.assign(drone, req.body)
        return res.json(drone)
      }
      return res.status(404).json({ message: 'Drone not found' })
    }

    const drone = await Drone.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!drone) {
      return res.status(404).json({ message: 'Drone not found' })
    }
    res.json(drone)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

export default router

