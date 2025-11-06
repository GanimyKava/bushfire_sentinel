import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  email: string
  password: string
  name: string
  role: 'fire_ranger' | 'incident_commander' | 'rural_homeowner' | 'utility_engineer' | 'wildlife_biologist'
  avatar?: string
  bio?: string
  region?: string
  phone?: string
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ['fire_ranger', 'incident_commander', 'rural_homeowner', 'utility_engineer', 'wildlife_biologist'],
      required: true,
    },
    avatar: String,
    bio: String,
    region: String,
    phone: String,
  },
  { timestamps: true }
)

export default mongoose.model<IUser>('User', UserSchema)

