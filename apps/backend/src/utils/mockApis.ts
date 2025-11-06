// Mock API integrations for CAMARA, Nokia NaaC, and Twilio

export const mockCAMARA = {
  // Fraud-proof API for subscriber verification
  verifySubscriber: async (phone: string) => {
    // Mock CAMARA SIM Swap Detection
    return {
      verified: true,
      riskScore: Math.random() * 0.3, // Low risk for demo
      lastSwap: null,
    }
  },

  // Quality on Demand API
  getNetworkQuality: async (lat: number, lng: number) => {
    // Mock 5G URLLC slice quality
    return {
      latency: 5 + Math.random() * 5, // <10ms target
      bandwidth: 800 + Math.random() * 200, // ~1Gbps
      reliability: 0.99,
      slice: 'URLLC',
    }
  },
}

export const mockNokia = {
  // Network as a Code - Geofence orchestration
  createGeofence: async (geofence: any) => {
    return {
      geofenceId: `gf-${Date.now()}`,
      status: 'active',
      networkSlice: 'URLLC',
      priority: geofence.priority,
    }
  },

  // Drone swarm orchestration
  orchestrateSwarms: async (drones: any[]) => {
    return {
      swarmId: `swarm-${Date.now()}`,
      assignedDrones: drones.map((d) => d._id),
      networkSlice: 'URLLC',
      latency: '<10ms',
    }
  },
}

export const mockTwilio = {
  // SMS alerts for subscribers
  sendSMS: async (phone: string, message: string) => {
    // Mock SMS sending
    console.log(`[Twilio Mock] Sending SMS to ${phone}: ${message}`)
    return {
      sid: `SM${Date.now()}`,
      status: 'sent',
    }
  },

  // Voice alerts for critical situations
  sendVoice: async (phone: string, message: string) => {
    console.log(`[Twilio Mock] Calling ${phone}: ${message}`)
    return {
      callSid: `CA${Date.now()}`,
      status: 'completed',
    }
  },
}

export const mockBOM = {
  // Bureau of Meteorology weather data
  getFireDanger: async (region: string) => {
    const dangers = ['Low', 'Moderate', 'High', 'Very High', 'Extreme']
    return {
      region,
      fireDanger: dangers[Math.floor(Math.random() * dangers.length)],
      temperature: 20 + Math.random() * 15,
      windSpeed: 10 + Math.random() * 30,
      humidity: 30 + Math.random() * 40,
      forecast: 'Dry conditions with increasing wind',
    }
  },
}

