import mongoose, { Schema, Document } from 'mongoose'

export interface IDrone extends Document {
  name: string
  droneModel: string
  status: 'idle' | 'patrolling' | 'charging' | 'maintenance' | 'offline'
  location: {
    lat: number
    lng: number
    altitude?: number
  }
  battery: number
  lastUpdate: Date
  zone?: string
  patrollingType?: 'proactive' | 'reactive'
  lastAlert?: Date
  networkSlice?: 'URLLC' | 'Standard'
  specs?: {
    camera?: string
    flightTime?: number
    latency?: string
  }
}

const DroneSchema = new Schema<IDrone>(
  {
    name: { type: String, required: true },
    droneModel: { type: String, required: true },
    status: {
      type: String,
      enum: ['idle', 'patrolling', 'charging', 'maintenance', 'offline'],
      default: 'offline',
    },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      altitude: Number,
    },
    battery: { type: Number, default: 100, min: 0, max: 100 },
    lastUpdate: { type: Date, default: Date.now },
    zone: String,
    patrollingType: {
      type: String,
      enum: ['proactive', 'reactive'],
    },
    lastAlert: Date,
    networkSlice: {
      type: String,
      enum: ['URLLC', 'Standard'],
      default: 'Standard',
    },
    specs: {
      camera: String,
      flightTime: Number,
      latency: String,
    },
  },
  { timestamps: true }
)

DroneSchema.index({ location: '2dsphere' })

export default mongoose.model<IDrone>('Drone', DroneSchema)

