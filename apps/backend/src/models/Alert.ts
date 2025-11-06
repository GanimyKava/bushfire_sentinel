import mongoose, { Schema, Document } from 'mongoose'

export interface IAlert extends Document {
  type: 'detection' | 'weather' | 'wildlife' | 'utility' | 'system' | 'ember_cloud' | 'hotspot' | 'wildlife_rescue' | 'evacuation'
  severity: 'info' | 'warning' | 'critical' | 'high' | 'medium' | 'low'
  title: string
  message: string
  timestamp: Date
  location?: {
    lat: number
    lng: number
    name?: string
  }
  status?: 'active' | 'controlled' | 'resolved' | 'patrolled'
  actions?: string[]
  impact?: string
  videoUrl?: string
  imageUrl?: string
  acknowledged: boolean
  userId?: string
  geofenceId?: string
  droneId?: string
  subscriberIds?: string[]
}

const AlertSchema = new Schema<IAlert>(
  {
    type: {
      type: String,
      enum: ['detection', 'weather', 'wildlife', 'utility', 'system', 'ember_cloud', 'hotspot', 'wildlife_rescue', 'evacuation'],
      required: true,
    },
    severity: {
      type: String,
      enum: ['info', 'warning', 'critical', 'high', 'medium', 'low'],
      default: 'info',
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    location: {
      lat: Number,
      lng: Number,
      name: String,
    },
    status: {
      type: String,
      enum: ['active', 'controlled', 'resolved', 'patrolled'],
    },
    actions: [String],
    impact: String,
    videoUrl: String,
    imageUrl: String,
    acknowledged: { type: Boolean, default: false },
    userId: String,
    geofenceId: String,
    droneId: String,
    subscriberIds: [String],
  },
  { timestamps: true }
)

AlertSchema.index({ timestamp: -1 })
AlertSchema.index({ acknowledged: 1 })

export default mongoose.model<IAlert>('Alert', AlertSchema)

