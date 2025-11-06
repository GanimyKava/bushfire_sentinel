import mongoose, { Schema, Document } from 'mongoose'

export interface IDetection extends Document {
  timestamp: Date
  location: {
    lat: number
    lng: number
    name?: string
  }
  temperature: number
  type: 'ember' | 'spot_fire' | 'wildfire' | 'false_positive' | 'hotspot_in_smoke' | 'wildlife_survey' | 'power_fault' | 'perimeter_breach'
  confidence: number
  droneId: string
  droneName?: string
  status: 'active' | 'controlled' | 'resolved' | 'false_alarm'
  imageUrl?: string
  videoUrl?: string
  alertSent?: boolean
  actionsTaken?: string[]
  impact?: string
  zone?: string
}

const DetectionSchema = new Schema<IDetection>(
  {
    timestamp: { type: Date, default: Date.now },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    temperature: { type: Number, required: true },
    type: {
      type: String,
      enum: ['ember', 'spot_fire', 'wildfire', 'false_positive', 'hotspot_in_smoke', 'wildlife_survey', 'power_fault', 'perimeter_breach'],
      required: true,
    },
    confidence: { type: Number, required: true, min: 0, max: 1 },
    droneId: { type: String, required: true },
    droneName: String,
    status: {
      type: String,
      enum: ['active', 'controlled', 'resolved', 'false_alarm'],
      default: 'active',
    },
    imageUrl: String,
    videoUrl: String,
    alertSent: { type: Boolean, default: false },
    actionsTaken: [String],
    impact: String,
    zone: String,
  },
  { timestamps: true }
)

DetectionSchema.index({ location: '2dsphere' })
DetectionSchema.index({ timestamp: -1 })

export default mongoose.model<IDetection>('Detection', DetectionSchema)

