export type UserRole =
  | 'fire_ranger'
  | 'incident_commander'
  | 'rural_homeowner'
  | 'utility_engineer'
  | 'wildlife_biologist'

export interface User {
  _id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  bio?: string
  region?: string
  phone?: string
}

export interface Drone {
  _id: string
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

export interface Geofence {
  _id: string
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

export interface Detection {
  _id: string
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

export interface Alert {
  _id: string
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

export interface Subscriber {
  _id: string
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

