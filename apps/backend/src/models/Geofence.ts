import mongoose, { Schema, Document } from 'mongoose'

export interface IGeofence extends Document {
  name: string
  description?: string
  coordinates: number[][]
  type: 'proactive' | 'reactive' | 'wildlife' | 'utility'
  priority: 'low' | 'medium' | 'high' | 'critical'
  area: number // in hectares or km²
  region: string
  riskLevel?: 'low' | 'medium' | 'high' | 'critical'
  subscribers?: number
  lastScan?: Date
  fuelLoad?: number // tons per hectare
  triggers?: string[]
  center?: { lat: number; lng: number }
  populationDensity?: number // people per km²
}

const GeofenceSchema = new Schema<IGeofence>(
  {
    name: { type: String, required: true },
    description: String,
    coordinates: [[Number]],
    type: {
      type: String,
      enum: ['proactive', 'reactive', 'wildlife', 'utility'],
      required: true,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    area: { type: Number, required: true },
    region: { type: String, required: true },
    riskLevel: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
    },
    subscribers: { type: Number, default: 0 },
    lastScan: Date,
    fuelLoad: Number,
    triggers: [String],
    center: {
      lat: Number,
      lng: Number,
    },
    populationDensity: Number, // people per km²
  },
  { timestamps: true }
)

GeofenceSchema.index({ coordinates: '2dsphere' })

export default mongoose.model<IGeofence>('Geofence', GeofenceSchema)

