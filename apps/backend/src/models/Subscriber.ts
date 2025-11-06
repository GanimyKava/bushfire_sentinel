import mongoose, { Schema, Document } from 'mongoose'

export interface ISubscriber extends Document {
  userId?: string
  persona?: 'fire_ranger' | 'incident_commander' | 'rural_homeowner' | 'utility_engineer' | 'wildlife_biologist'
  name: string
  email: string
  phone: string
  location: {
    lat: number
    lng: number
    address?: string
  }
  alertsEnabled: boolean
  subscribedZones: string[] // Zone names for backward compatibility
  subscribedGeofences?: string[] // Geofence IDs
  alertPrefs?: {
    sms: boolean
    push: boolean
    otpVerified?: boolean
  }
  lastReceived?: Date
  camaraVerified?: boolean
}

const SubscriberSchema = new Schema<ISubscriber>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      address: String,
    },
    alertsEnabled: { type: Boolean, default: true },
    subscribedZones: [String],
    subscribedGeofences: [String], // Geofence IDs
    userId: String,
    persona: {
      type: String,
      enum: ['fire_ranger', 'incident_commander', 'rural_homeowner', 'utility_engineer', 'wildlife_biologist'],
    },
    alertPrefs: {
      sms: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      otpVerified: { type: Boolean, default: false },
    },
    lastReceived: Date,
    camaraVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
)

SubscriberSchema.index({ location: '2dsphere' })

export default mongoose.model<ISubscriber>('Subscriber', SubscriberSchema)

