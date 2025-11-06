import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { createServer } from 'http'
import { Server } from 'socket.io'
import authRoutes from './routes/auth.js'
import droneRoutes from './routes/drones.js'
import geofenceRoutes from './routes/geofences.js'
import detectionRoutes from './routes/detections.js'
import alertRoutes from './routes/alerts.js'
import subscriberRoutes from './routes/subscribers.js'
import dashboardRoutes from './routes/dashboard.js'
import { seedDatabase } from './utils/seed.js'

dotenv.config()

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bushfire-sentinel'

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/drones', droneRoutes)
app.use('/api/geofences', geofenceRoutes)
app.use('/api/detections', detectionRoutes)
app.use('/api/alerts', alertRoutes)
app.use('/api/subscribers', subscriberRoutes)
app.use('/api/dashboard', dashboardRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Socket.io for real-time alerts
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
})

// Make io available to routes
app.set('io', io)

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB')
    // Seed database with sample data
    await seedDatabase()
    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
      console.log(`API available at http://localhost:${PORT}/api`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message)
    console.warn('⚠️  Starting server without MongoDB (limited functionality)')
    console.warn('💡 To enable full functionality, start MongoDB or set MONGODB_URI to MongoDB Atlas')
    // Start server anyway for demo purposes
    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (MongoDB not connected)`)
      console.log(`API available at http://localhost:${PORT}/api`)
    })
  })

export { io }

