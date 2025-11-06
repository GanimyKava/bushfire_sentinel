import express from 'express'
import mongoose from 'mongoose'
import Alert from '../models/Alert.js'
import { authenticate, AuthRequest } from '../middleware/auth.js'
import { getDemoAlerts } from '../utils/demoData.js'

const router = express.Router()

router.get('/', authenticate, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 100
    const timeFilter = req.query.timeFilter as string || '6hours'

    // Always use demo alerts for now (MongoDB might not be connected)
    console.log('Fetching alerts with timeFilter:', timeFilter)
    
    let demoAlerts: any[] = []
    try {
      demoAlerts = getDemoAlerts()
      console.log(`Generated ${demoAlerts.length} demo alerts`)
    } catch (error: any) {
      console.error('Error generating demo alerts:', error)
      // Return empty array if getDemoAlerts fails
      return res.json([])
    }
    
    // Apply time filter if provided
    if (timeFilter) {
      const now = Date.now()
      let timeCutoff = now
      switch (timeFilter) {
        case '15min':
          timeCutoff = now - 15 * 60 * 1000
          break
        case '1hour':
          timeCutoff = now - 60 * 60 * 1000
          break
        case '6hours':
          timeCutoff = now - 6 * 60 * 60 * 1000
          break
        case '24hours':
          timeCutoff = now - 24 * 60 * 60 * 1000
          break
        case '7days':
          timeCutoff = now - 7 * 24 * 60 * 60 * 1000
          break
        case '30days':
          timeCutoff = now - 30 * 24 * 60 * 60 * 1000
          break
        case '3months':
          timeCutoff = now - 90 * 24 * 60 * 60 * 1000
          break
        case '6months':
          timeCutoff = now - 180 * 24 * 60 * 60 * 1000
          break
        case '12months':
          timeCutoff = now - 365 * 24 * 60 * 60 * 1000
          break
      }
      const beforeFilter = demoAlerts.length
      demoAlerts = demoAlerts.filter((a) => {
        const alertTime = a.timestamp instanceof Date ? a.timestamp.getTime() : new Date(a.timestamp).getTime()
        return alertTime >= timeCutoff
      })
      console.log(`Filtered alerts: ${beforeFilter} -> ${demoAlerts.length} (timeFilter: ${timeFilter})`)
    }
    
    console.log(`Returning ${demoAlerts.length} alerts`)
    return res.json(demoAlerts.slice(0, limit))
  } catch (error: any) {
    console.warn('Database query failed, using demo data:', error.message)
    const demoAlerts = getDemoAlerts()
    console.log(`Returning ${demoAlerts.length} demo alerts (fallback)`)
    res.json(demoAlerts.slice(0, parseInt(req.query.limit as string) || 100))
  }
})

router.patch('/:id', authenticate, async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.json(alert)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

export default router

