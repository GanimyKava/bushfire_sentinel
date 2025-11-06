import express from 'express'
import Drone from '../models/Drone.js'
import Geofence from '../models/Geofence.js'
import Alert from '../models/Alert.js'
import { authenticate, AuthRequest } from '../middleware/auth.js'

const router = express.Router()

router.get('/metrics', authenticate, async (req, res) => {
  try {
    const activeDrones = await Drone.countDocuments({ status: { $in: ['active', 'patrolling'] } })
    const geofences = await Geofence.find()
    const totalArea = geofences.reduce((sum, g) => sum + g.area, 0)
    const alertsToday = await Alert.countDocuments({
      timestamp: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    })

    res.json({
      activeDrones,
      monitoredZones: Math.round(totalArea),
      alertsToday,
      wildlifeRescues: 23, // Mock data
    })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
})

export default router

