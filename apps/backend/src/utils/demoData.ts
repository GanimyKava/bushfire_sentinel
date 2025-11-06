// Demo data for when MongoDB is not connected

export function getDemoDrones() {
  return [
    {
      _id: 'demo-drone-1',
      name: 'EmberHunter-01',
      droneModel: 'DJI Matrice 300 RTK',
      status: 'patrolling',
      location: { lat: -33.8688, lng: 151.2093, altitude: 120 },
      battery: 85,
      zone: 'Blue Mountains West',
      patrollingType: 'proactive',
      lastAlert: new Date(Date.now() - 3600000),
      networkSlice: 'URLLC',
      specs: { camera: 'FLIR TZ20-R', flightTime: 55, latency: '<5ms' },
      lastUpdate: new Date(),
    },
    {
      _id: 'demo-drone-2',
      name: 'KoalaGuard-02',
      droneModel: 'DJI Matrice 300 RTK',
      status: 'patrolling',
      location: { lat: -37.8136, lng: 144.9631, altitude: 100 },
      battery: 92,
      zone: 'Great Ocean Road',
      patrollingType: 'reactive',
      networkSlice: 'URLLC',
      specs: { camera: 'FLIR TZ20-R', flightTime: 55, latency: '<5ms' },
      lastUpdate: new Date(),
    },
    {
      _id: 'demo-drone-3',
      name: 'BushfireBlaze-03',
      droneModel: 'DJI Matrice 300 RTK',
      status: 'patrolling',
      location: { lat: -27.4698, lng: 153.0251, altitude: 150 },
      battery: 78,
      zone: 'QLD Wet Tropics',
      patrollingType: 'proactive',
      lastAlert: new Date(Date.now() - 7200000),
      networkSlice: 'Standard',
      specs: { camera: 'FLIR TZ20-R', flightTime: 55, latency: '<10ms' },
      lastUpdate: new Date(),
    },
    {
      _id: 'demo-drone-4',
      name: 'FlameFinder-04',
      droneModel: 'DJI Matrice 300 RTK',
      status: 'charging',
      location: { lat: -34.9285, lng: 138.6007, altitude: 80 },
      battery: 45,
      zone: 'Adelaide Foothills',
      patrollingType: 'reactive',
      lastAlert: new Date(Date.now() - 10800000),
      networkSlice: 'URLLC',
      specs: { camera: 'FLIR TZ20-R', flightTime: 55, latency: '<5ms' },
      lastUpdate: new Date(),
    },
    {
      _id: 'demo-drone-5',
      name: 'SparkSpotter-05',
      droneModel: 'DJI Matrice 300 RTK',
      status: 'maintenance',
      location: { lat: -31.9505, lng: 115.8605, altitude: 0 },
      battery: 88,
      zone: 'Perth Metro',
      patrollingType: 'proactive',
      lastAlert: new Date(Date.now() - 14400000),
      networkSlice: 'Standard',
      specs: { camera: 'FLIR TZ20-R', flightTime: 55, latency: '<10ms' },
      lastUpdate: new Date(),
    },
    {
      _id: 'demo-drone-6',
      name: 'WildernessWatch-06',
      droneModel: 'DJI Matrice 300 RTK',
      status: 'patrolling',
      location: { lat: -42.88, lng: 147.33, altitude: 200 },
      battery: 65,
      zone: 'TAS Southwest',
      patrollingType: 'proactive',
      lastAlert: new Date(Date.now() - 18000000),
      networkSlice: 'URLLC',
      specs: { camera: 'FLIR TZ20-R', flightTime: 55, latency: '<5ms' },
      lastUpdate: new Date(),
    },
    {
      _id: 'demo-drone-7',
      name: 'InfernoIntel-07',
      droneModel: 'DJI Matrice 300 RTK',
      status: 'patrolling',
      location: { lat: -31.95, lng: 116.0, altitude: 110 },
      battery: 72,
      zone: 'WA Karri Forests',
      patrollingType: 'reactive',
      lastAlert: new Date(Date.now() - 21600000),
      networkSlice: 'URLLC',
      specs: { camera: 'FLIR TZ20-R', flightTime: 55, latency: '<5ms' },
      lastUpdate: new Date(),
    },
    {
      _id: 'demo-drone-8',
      name: 'EmberEye-08',
      droneModel: 'DJI Matrice 300 RTK',
      status: 'idle',
      location: { lat: -27.3, lng: 152.8, altitude: 0 },
      battery: 95,
      zone: 'Brisbane Hinterland',
      patrollingType: 'proactive',
      lastAlert: new Date(Date.now() - 25200000),
      networkSlice: 'Standard',
      specs: { camera: 'FLIR TZ20-R', flightTime: 55, latency: '<10ms' },
      lastUpdate: new Date(),
    },
    {
      _id: 'demo-drone-9',
      name: 'NatureGuard-09',
      droneModel: 'DJI Matrice 300 RTK',
      status: 'patrolling',
      location: { lat: -37.2, lng: 142.5, altitude: 90 },
      battery: 83,
      zone: 'Grampians NP',
      patrollingType: 'proactive',
      lastAlert: new Date(Date.now() - 28800000),
      networkSlice: 'Standard',
      specs: { camera: 'FLIR TZ20-R', flightTime: 55, latency: '<10ms' },
      lastUpdate: new Date(),
    },
    {
      _id: 'demo-drone-10',
      name: 'CapitalWatch-10',
      droneModel: 'DJI Matrice 300 RTK',
      status: 'patrolling',
      location: { lat: -35.3, lng: 149.1, altitude: 130 },
      battery: 69,
      zone: 'Canberra Bush',
      patrollingType: 'reactive',
      lastAlert: new Date(Date.now() - 32400000),
      networkSlice: 'URLLC',
      specs: { camera: 'FLIR TZ20-R', flightTime: 55, latency: '<5ms' },
      lastUpdate: new Date(),
    },
    {
      _id: 'demo-drone-11',
      name: 'CoastGuard-11',
      droneModel: 'DJI Matrice 300 RTK',
      status: 'charging',
      location: { lat: -28.0, lng: 153.3, altitude: 0 },
      battery: 32,
      zone: 'Gold Coast Hinterland',
      patrollingType: 'reactive',
      lastAlert: new Date(Date.now() - 36000000),
      networkSlice: 'URLLC',
      specs: { camera: 'FLIR TZ20-R', flightTime: 55, latency: '<5ms' },
      lastUpdate: new Date(),
    },
    {
      _id: 'demo-drone-12',
      name: 'DarkSkyWatch-12',
      droneModel: 'DJI Matrice 300 RTK',
      status: 'idle',
      location: { lat: -31.3, lng: 149.0, altitude: 0 },
      battery: 100,
      zone: 'Warrumbungle NP',
      patrollingType: 'proactive',
      lastAlert: new Date(Date.now() - 39600000),
      networkSlice: 'Standard',
      specs: { camera: 'FLIR TZ20-R', flightTime: 55, latency: '<10ms' },
      lastUpdate: new Date(),
    },
    {
      _id: 'demo-drone-13',
      name: 'CoastlineGuard-13',
      droneModel: 'DJI Matrice 300 RTK',
      status: 'patrolling',
      location: { lat: -33.3, lng: 151.4, altitude: 95 },
      battery: 56,
      zone: 'Central Coast',
      patrollingType: 'reactive',
      lastAlert: new Date(Date.now() - 43200000),
      networkSlice: 'URLLC',
      specs: { camera: 'FLIR TZ20-R', flightTime: 55, latency: '<5ms' },
      lastUpdate: new Date(),
    },
    {
      _id: 'demo-drone-14',
      name: 'RainforestGuard-14',
      droneModel: 'DJI Matrice 300 RTK',
      status: 'patrolling',
      location: { lat: -16.2, lng: 145.4, altitude: 180 },
      battery: 74,
      zone: 'Daintree Rainforest',
      patrollingType: 'proactive',
      lastAlert: new Date(Date.now() - 46800000),
      networkSlice: 'Standard',
      specs: { camera: 'FLIR TZ20-R', flightTime: 55, latency: '<10ms' },
      lastUpdate: new Date(),
    },
    {
      _id: 'demo-drone-15',
      name: 'VineyardGuard-15',
      droneModel: 'DJI Matrice 300 RTK',
      status: 'idle',
      location: { lat: -37.7, lng: 145.4, altitude: 0 },
      battery: 91,
      zone: 'Yarra Valley',
      patrollingType: 'proactive',
      lastAlert: new Date(Date.now() - 50400000),
      networkSlice: 'Standard',
      specs: { camera: 'FLIR TZ20-R', flightTime: 55, latency: '<10ms' },
      lastUpdate: new Date(),
    },
    {
      _id: 'demo-drone-16',
      name: 'MiningGuard-16',
      droneModel: 'DJI Matrice 300 RTK',
      status: 'maintenance',
      location: { lat: -32.8, lng: 151.3, altitude: 0 },
      battery: 67,
      zone: 'Hunter Valley',
      patrollingType: 'reactive',
      lastAlert: new Date(Date.now() - 54000000),
      networkSlice: 'URLLC',
      specs: { camera: 'FLIR TZ20-R', flightTime: 55, latency: '<5ms' },
      lastUpdate: new Date(),
    },
    {
      _id: 'demo-drone-17',
      name: 'IslandGuard-17',
      droneModel: 'DJI Matrice 300 RTK',
      status: 'patrolling',
      location: { lat: -35.7, lng: 137.1, altitude: 140 },
      battery: 81,
      zone: 'Kangaroo Island',
      patrollingType: 'proactive',
      lastAlert: new Date(Date.now() - 57600000),
      networkSlice: 'Standard',
      specs: { camera: 'FLIR TZ20-R', flightTime: 55, latency: '<10ms' },
      lastUpdate: new Date(),
    },
    {
      _id: 'demo-drone-18',
      name: 'WineGuard-18',
      droneModel: 'DJI Matrice 300 RTK',
      status: 'charging',
      location: { lat: -33.9, lng: 115.1, altitude: 0 },
      battery: 28,
      zone: 'Margaret River',
      patrollingType: 'proactive',
      lastAlert: new Date(Date.now() - 61200000),
      networkSlice: 'Standard',
      specs: { camera: 'FLIR TZ20-R', flightTime: 55, latency: '<10ms' },
      lastUpdate: new Date(),
    },
    {
      _id: 'demo-drone-19',
      name: 'OutbackGuard-19',
      droneModel: 'DJI Matrice 300 RTK',
      status: 'offline',
      location: { lat: -31.4, lng: 138.7, altitude: 0 },
      battery: 15,
      zone: 'Flinders Ranges',
      patrollingType: 'proactive',
      lastAlert: new Date(Date.now() - 64800000),
      networkSlice: 'Standard',
      specs: { camera: 'FLIR TZ20-R', flightTime: 55, latency: '<10ms' },
      lastUpdate: new Date(),
    },
    {
      _id: 'demo-drone-20',
      name: 'AlpineGuard-20',
      droneModel: 'DJI Matrice 300 RTK',
      status: 'patrolling',
      location: { lat: -34.5, lng: 138.6, altitude: 109 },
      battery: 75,
      zone: 'Adelaide Foothills',
      patrollingType: 'reactive',
      lastAlert: new Date(Date.now() - 900000),
      networkSlice: 'URLLC',
      specs: { camera: 'FLIR TZ20-R', flightTime: 55, latency: '<5ms' },
      lastUpdate: new Date(),
    },
  ]
}

export function getDemoSubscribers() {
  // Get all geofences for mapping
  const geofences = getDemoGeofences()
  const geofenceMap = new Map(geofences.map((g) => [g._id, g]))

  // Helper to find geofence IDs by zone name
  const findGeofenceIdsByZone = (zoneNames: string[]): string[] => {
    return geofences
      .filter((g) => zoneNames.some((zn) => g.zone?.includes(zn) || g.name.includes(zn)))
      .map((g) => g._id)
  }

  // Helper to find geofence IDs by region/description keywords
  const findGeofenceIdsByKeywords = (keywords: string[]): string[] => {
    return geofences
      .filter((g) =>
        keywords.some((kw) =>
          g.description?.toLowerCase().includes(kw.toLowerCase()) ||
          g.region?.toLowerCase().includes(kw.toLowerCase()) ||
          g.name.toLowerCase().includes(kw.toLowerCase())
        )
      )
      .map((g) => g._id)
  }

  return [
    // Fire Rangers (5)
    {
      _id: 'sub-fire-1',
      userId: 'fire-ranger-1',
      persona: 'fire_ranger',
      name: 'Sarah Thompson',
      email: 'sarah.thompson@nsw.gov.au',
      phone: '+61 400 123 456',
      location: { lat: -33.5, lng: 150.3, address: 'Blue Mountains, NSW' },
      alertsEnabled: true,
      subscribedZones: ['Blue Mountains High Risk', 'Ausgrid Power Line Corridor'],
      subscribedGeofences: ['geo-001', 'geo-004'], // Blue Mountains Ridge, Adelaide Hills Corridor
      alertPrefs: { sms: true, push: true, otpVerified: true },
      lastReceived: new Date(Date.now() - 3600000),
      camaraVerified: true,
    },
    {
      _id: 'sub-fire-2',
      userId: 'fire-ranger-2',
      persona: 'fire_ranger',
      name: 'Tom Reilly',
      email: 'tom.reilly@cfa.vic.gov.au',
      phone: '+61 400 123 457',
      location: { lat: -38.2, lng: 144.5, address: 'Great Ocean Road, VIC' },
      alertsEnabled: true,
      subscribedZones: ['Great Ocean Road Fringe'],
      subscribedGeofences: ['geo-002'], // Great Ocean Road Fringes
      alertPrefs: { sms: true, push: true, otpVerified: true },
      lastReceived: new Date(Date.now() - 7200000),
      camaraVerified: true,
    },
    {
      _id: 'sub-fire-3',
      userId: 'fire-ranger-3',
      persona: 'fire_ranger',
      name: 'Aisha Patel',
      email: 'aisha.patel@qfes.qld.gov.au',
      phone: '+61 400 123 458',
      location: { lat: -27.3, lng: 153.1, address: 'Wet Tropics, QLD' },
      alertsEnabled: true,
      subscribedZones: ['Koala Habitat Zone'],
      subscribedGeofences: ['geo-003'], // Daintree Rainforest Edge
      alertPrefs: { sms: true, push: true, otpVerified: false },
      lastReceived: new Date(Date.now() - 10800000),
      camaraVerified: false,
    },
    {
      _id: 'sub-fire-4',
      userId: 'fire-ranger-4',
      persona: 'fire_ranger',
      name: 'David Murphy',
      email: 'david.murphy@rfs.nsw.gov.au',
      phone: '+61 400 123 459',
      location: { lat: -34.5, lng: 150.5, address: 'Southern Highlands, NSW' },
      alertsEnabled: true,
      subscribedZones: ['Blue Mountains High Risk'],
      subscribedGeofences: ['geo-001'], // Blue Mountains Ridge
      alertPrefs: { sms: true, push: false, otpVerified: true },
      lastReceived: new Date(Date.now() - 14400000),
      camaraVerified: true,
    },
    {
      _id: 'sub-fire-5',
      userId: 'fire-ranger-5',
      persona: 'fire_ranger',
      name: 'Sophie Taylor',
      email: 'sophie.taylor@dfes.wa.gov.au',
      phone: '+61 400 123 460',
      location: { lat: -31.95, lng: 115.86, address: 'Karri Forests, WA' },
      alertsEnabled: true,
      subscribedZones: [],
      subscribedGeofences: [],
      alertPrefs: { sms: false, push: true, otpVerified: true },
      lastReceived: new Date(Date.now() - 18000000),
      camaraVerified: true,
    },
    // Incident Commanders (5)
    {
      _id: 'sub-commander-1',
      userId: 'commander-1',
      persona: 'incident_commander',
      name: 'Mike Hargreaves',
      email: 'mike.hargreaves@cfa.vic.gov.au',
      phone: '+61 400 234 561',
      location: { lat: -37.8136, lng: 144.9631, address: 'Melbourne, VIC' },
      alertsEnabled: true,
      subscribedZones: ['Great Ocean Road Fringe', 'Blue Mountains High Risk'],
      subscribedGeofences: ['geo-002', 'geo-001'], // Great Ocean Road Fringes, Blue Mountains Ridge
      alertPrefs: { sms: true, push: true, otpVerified: true },
      lastReceived: new Date(Date.now() - 1800000),
      camaraVerified: true,
    },
    {
      _id: 'sub-commander-2',
      userId: 'commander-2',
      persona: 'incident_commander',
      name: 'Elena Vasquez',
      email: 'elena.vasquez@rfs.nsw.gov.au',
      phone: '+61 400 234 562',
      location: { lat: -33.8688, lng: 151.2093, address: 'Sydney, NSW' },
      alertsEnabled: true,
      subscribedZones: ['Blue Mountains High Risk', 'Ausgrid Power Line Corridor'],
      subscribedGeofences: ['geo-001', 'geo-004'], // Blue Mountains Ridge, Adelaide Hills Corridor
      alertPrefs: { sms: true, push: true, otpVerified: true },
      lastReceived: new Date(Date.now() - 3600000),
      camaraVerified: true,
    },
    {
      _id: 'sub-commander-3',
      userId: 'commander-3',
      persona: 'incident_commander',
      name: 'James Mitchell',
      email: 'james.mitchell@qfes.qld.gov.au',
      phone: '+61 400 234 563',
      location: { lat: -27.4698, lng: 153.0251, address: 'Brisbane, QLD' },
      alertsEnabled: true,
      subscribedZones: ['Koala Habitat Zone'],
      subscribedGeofences: ['geo-003', 'geo-009'], // Daintree Rainforest Edge, Brisbane Hinterland
      alertPrefs: { sms: true, push: true, otpVerified: true },
      lastReceived: new Date(Date.now() - 5400000),
      camaraVerified: true,
    },
    {
      _id: 'sub-commander-4',
      userId: 'commander-4',
      persona: 'incident_commander',
      name: 'Karen White',
      email: 'karen.white@dfes.wa.gov.au',
      phone: '+61 400 234 564',
      location: { lat: -31.9505, lng: 115.8605, address: 'Perth, WA' },
      alertsEnabled: true,
      subscribedZones: [],
      subscribedGeofences: [],
      alertPrefs: { sms: true, push: true, otpVerified: false },
      lastReceived: new Date(Date.now() - 7200000),
      camaraVerified: false,
    },
    {
      _id: 'sub-commander-5',
      userId: 'commander-5',
      persona: 'incident_commander',
      name: 'Robert Brown',
      email: 'robert.brown@tasfires.tas.gov.au',
      phone: '+61 400 234 565',
      location: { lat: -42.88, lng: 147.33, address: 'Hobart, TAS' },
      alertsEnabled: true,
      subscribedZones: ['TAS Southwest Wilderness'],
      subscribedGeofences: ['geo-005'], // TAS Southwest Wilderness
      alertPrefs: { sms: true, push: true, otpVerified: true },
      lastReceived: new Date(Date.now() - 9000000),
      camaraVerified: true,
    },
    // Rural Homeowners (10)
    {
      _id: 'sub-homeowner-1',
      userId: 'homeowner-1',
      persona: 'rural_homeowner',
      name: 'Priya Singh',
      email: 'priya.singh@example.com',
      phone: '+61 400 345 671',
      location: { lat: -31.0833, lng: 150.9167, address: 'Tamworth, NSW' },
      alertsEnabled: true,
      subscribedZones: ['Blue Mountains High Risk'],
      subscribedGeofences: ['geo-001'], // Blue Mountains Ridge
      alertPrefs: { sms: true, push: true, otpVerified: true },
      lastReceived: new Date(Date.now() - 3600000),
      camaraVerified: true,
    },
    {
      _id: 'sub-homeowner-2',
      userId: 'homeowner-2',
      persona: 'rural_homeowner',
      name: 'Jacko Wilson',
      email: 'jacko.wilson@example.com',
      phone: '+61 400 345 672',
      location: { lat: -31.95, lng: 115.86, address: 'Perth Outback, WA' },
      alertsEnabled: true,
      subscribedZones: ['Great Ocean Road Fringe'],
      subscribedGeofences: ['geo-002'], // Great Ocean Road Fringes
      alertPrefs: { sms: true, push: false, otpVerified: true },
      lastReceived: new Date(Date.now() - 7200000),
      camaraVerified: true,
    },
    {
      _id: 'sub-homeowner-3',
      userId: 'homeowner-3',
      persona: 'rural_homeowner',
      name: 'Margaret Chen',
      email: 'margaret.chen@example.com',
      phone: '+61 400 345 673',
      location: { lat: -42.88, lng: 147.33, address: 'Hobart, TAS' },
      alertsEnabled: true,
      subscribedZones: ['TAS Southwest Wilderness'],
      subscribedGeofences: ['geo-005'], // TAS Southwest Wilderness
      alertPrefs: { sms: true, push: true, otpVerified: false },
      lastReceived: new Date(Date.now() - 10800000),
      camaraVerified: false,
    },
    {
      _id: 'sub-homeowner-4',
      userId: 'homeowner-4',
      persona: 'rural_homeowner',
      name: 'Peter Anderson',
      email: 'peter.anderson@example.com',
      phone: '+61 400 345 674',
      location: { lat: -33.5, lng: 150.3, address: 'Blue Mountains, NSW' },
      alertsEnabled: true,
      subscribedZones: ['Blue Mountains High Risk', 'Ausgrid Power Line Corridor'],
      subscribedGeofences: ['geo-001', 'geo-004'], // Blue Mountains Ridge, Adelaide Hills Corridor
      alertPrefs: { sms: true, push: true, otpVerified: true },
      lastReceived: new Date(Date.now() - 14400000),
      camaraVerified: true,
    },
    {
      _id: 'sub-homeowner-5',
      userId: 'homeowner-5',
      persona: 'rural_homeowner',
      name: 'Lisa Martin',
      email: 'lisa.martin@example.com',
      phone: '+61 400 345 675',
      location: { lat: -38.2, lng: 144.5, address: 'Great Ocean Road, VIC' },
      alertsEnabled: true,
      subscribedZones: ['Great Ocean Road Fringe'],
      subscribedGeofences: ['geo-002'], // Great Ocean Road Fringes
      alertPrefs: { sms: true, push: true, otpVerified: true },
      lastReceived: new Date(Date.now() - 18000000),
      camaraVerified: true,
    },
    {
      _id: 'sub-homeowner-6',
      userId: 'homeowner-6',
      persona: 'rural_homeowner',
      name: 'Mark Davis',
      email: 'mark.davis@example.com',
      phone: '+61 400 345 676',
      location: { lat: -27.3, lng: 153.1, address: 'Brisbane Hinterland, QLD' },
      alertsEnabled: true,
      subscribedZones: ['Koala Habitat Zone'],
      subscribedGeofences: ['geo-003', 'geo-013'], // Daintree Rainforest Edge, Fraser Island Perimeter
      alertPrefs: { sms: false, push: true, otpVerified: true },
      lastReceived: new Date(Date.now() - 21600000),
      camaraVerified: true,
    },
    {
      _id: 'sub-homeowner-7',
      userId: 'homeowner-7',
      persona: 'rural_homeowner',
      name: 'Jennifer Thompson',
      email: 'jennifer.thompson@example.com',
      phone: '+61 400 345 677',
      location: { lat: -33.3, lng: 151.4, address: 'Central Coast, NSW' },
      alertsEnabled: true,
      subscribedZones: ['Blue Mountains High Risk'],
      subscribedGeofences: ['geo-001', 'geo-012'], // Blue Mountains Ridge, Central Coast Fringe
      alertPrefs: { sms: true, push: true, otpVerified: false },
      lastReceived: new Date(Date.now() - 25200000),
      camaraVerified: false,
    },
    {
      _id: 'sub-homeowner-8',
      userId: 'homeowner-8',
      persona: 'rural_homeowner',
      name: 'Michael Williams',
      email: 'michael.williams@example.com',
      phone: '+61 400 345 678',
      location: { lat: -37.7, lng: 145.4, address: 'Yarra Valley, VIC' },
      alertsEnabled: true,
      subscribedZones: ['Great Ocean Road Fringe'],
      subscribedGeofences: ['geo-002', 'geo-010'], // Great Ocean Road Fringes, Yarra Valley Vineyards
      alertPrefs: { sms: true, push: false, otpVerified: true },
      lastReceived: new Date(Date.now() - 28800000),
      camaraVerified: true,
    },
    {
      _id: 'sub-homeowner-9',
      userId: 'homeowner-9',
      persona: 'rural_homeowner',
      name: 'Susan Jones',
      email: 'susan.jones@example.com',
      phone: '+61 400 345 679',
      location: { lat: -34.9285, lng: 138.6007, address: 'Adelaide Hills, SA' },
      alertsEnabled: true,
      subscribedZones: [],
      subscribedGeofences: [],
      alertPrefs: { sms: true, push: true, otpVerified: true },
      lastReceived: new Date(Date.now() - 32400000),
      camaraVerified: true,
    },
    {
      _id: 'sub-homeowner-10',
      userId: 'homeowner-10',
      persona: 'rural_homeowner',
      name: 'Chris Taylor',
      email: 'chris.taylor@example.com',
      phone: '+61 400 345 680',
      location: { lat: -35.1, lng: 149.1, address: 'Southern Tablelands, NSW' },
      alertsEnabled: false,
      subscribedZones: ['Blue Mountains High Risk'],
      subscribedGeofences: ['geo-001'], // Blue Mountains Ridge
      alertPrefs: { sms: true, push: true, otpVerified: true },
      lastReceived: new Date(Date.now() - 36000000),
      camaraVerified: true,
    },
    // Utility Engineers (5)
    {
      _id: 'sub-utility-1',
      userId: 'utility-1',
      persona: 'utility_engineer',
      name: 'Raj Kaur',
      email: 'raj.kaur@ausgrid.com.au',
      phone: '+61 400 456 781',
      location: { lat: -33.8688, lng: 151.2093, address: 'Sydney, NSW' },
      alertsEnabled: true,
      subscribedZones: ['Ausgrid Power Line Corridor'],
      subscribedGeofences: ['geo-004'], // Adelaide Hills Corridor (power line)
      alertPrefs: { sms: true, push: true, otpVerified: true },
      lastReceived: new Date(Date.now() - 1800000),
      camaraVerified: true,
    },
    {
      _id: 'sub-utility-2',
      userId: 'utility-2',
      persona: 'utility_engineer',
      name: 'Liam O\'Sullivan',
      email: 'liam.osullivan@tasnetworks.com.au',
      phone: '+61 400 456 782',
      location: { lat: -42.88, lng: 147.33, address: 'Hobart, TAS' },
      alertsEnabled: true,
      subscribedZones: ['TAS Southwest Wilderness'],
      subscribedGeofences: ['geo-005'], // TAS Southwest Wilderness
      alertPrefs: { sms: true, push: true, otpVerified: true },
      lastReceived: new Date(Date.now() - 3600000),
      camaraVerified: true,
    },
    {
      _id: 'sub-utility-3',
      userId: 'utility-3',
      persona: 'utility_engineer',
      name: 'Amy Zhang',
      email: 'amy.zhang@energex.com.au',
      phone: '+61 400 456 783',
      location: { lat: -27.4698, lng: 153.0251, address: 'Brisbane, QLD' },
      alertsEnabled: true,
      subscribedZones: ['Koala Habitat Zone'],
      subscribedGeofences: ['geo-003', 'geo-009'], // Daintree Rainforest Edge, Brisbane Hinterland
      alertPrefs: { sms: true, push: true, otpVerified: false },
      lastReceived: new Date(Date.now() - 5400000),
      camaraVerified: false,
    },
    {
      _id: 'sub-utility-4',
      userId: 'utility-4',
      persona: 'utility_engineer',
      name: 'Daniel Kim',
      email: 'daniel.kim@powercor.com.au',
      phone: '+61 400 456 784',
      location: { lat: -37.8136, lng: 144.9631, address: 'Melbourne, VIC' },
      alertsEnabled: true,
      subscribedZones: ['Great Ocean Road Fringe'],
      subscribedGeofences: ['geo-002', 'geo-010'], // Great Ocean Road Fringes, Yarra Valley Vineyards
      alertPrefs: { sms: false, push: true, otpVerified: true },
      lastReceived: new Date(Date.now() - 7200000),
      camaraVerified: true,
    },
    {
      _id: 'sub-utility-5',
      userId: 'utility-5',
      persona: 'utility_engineer',
      name: 'Emma Walsh',
      email: 'emma.walsh@westernpower.wa.gov.au',
      phone: '+61 400 456 785',
      location: { lat: -31.9505, lng: 115.8605, address: 'Perth, WA' },
      alertsEnabled: true,
      subscribedZones: [],
      subscribedGeofences: [],
      alertPrefs: { sms: true, push: true, otpVerified: true },
      lastReceived: new Date(Date.now() - 9000000),
      camaraVerified: true,
    },
    // Wildlife Biologists (5)
    {
      _id: 'sub-wildlife-1',
      userId: 'wildlife-1',
      persona: 'wildlife_biologist',
      name: 'Lena Kowalski',
      email: 'lena.kowalski@parks.gov.au',
      phone: '+61 400 567 891',
      location: { lat: -33.8688, lng: 151.2093, address: 'Sydney, NSW' },
      alertsEnabled: true,
      subscribedZones: ['Koala Habitat Zone', 'Blue Mountains High Risk'],
      subscribedGeofences: ['geo-003', 'geo-001'], // Daintree Rainforest Edge, Blue Mountains Ridge
      alertPrefs: { sms: true, push: true, otpVerified: true },
      lastReceived: new Date(Date.now() - 1800000),
      camaraVerified: true,
    },
    {
      _id: 'sub-wildlife-2',
      userId: 'wildlife-2',
      persona: 'wildlife_biologist',
      name: 'Dylan Ng',
      email: 'dylan.ng@wwf.org.au',
      phone: '+61 400 567 892',
      location: { lat: -27.4698, lng: 153.0251, address: 'Brisbane, QLD' },
      alertsEnabled: true,
      subscribedZones: ['Koala Habitat Zone'],
      subscribedGeofences: ['geo-003', 'geo-013', 'geo-014'], // Daintree, Fraser Island, Darwin
      alertPrefs: { sms: true, push: true, otpVerified: true },
      lastReceived: new Date(Date.now() - 3600000),
      camaraVerified: true,
    },
    {
      _id: 'sub-wildlife-3',
      userId: 'wildlife-3',
      persona: 'wildlife_biologist',
      name: 'Sarah Connor',
      email: 'sarah.connor@australianwildlife.org',
      phone: '+61 400 567 893',
      location: { lat: -37.8136, lng: 144.9631, address: 'Melbourne, VIC' },
      alertsEnabled: true,
      subscribedZones: ['Great Ocean Road Fringe'],
      subscribedGeofences: ['geo-002', 'geo-008'], // Great Ocean Road Fringes, Grampians National Park
      alertPrefs: { sms: true, push: false, otpVerified: true },
      lastReceived: new Date(Date.now() - 5400000),
      camaraVerified: true,
    },
    {
      _id: 'sub-wildlife-4',
      userId: 'wildlife-4',
      persona: 'wildlife_biologist',
      name: 'Michael Fitzgerald',
      email: 'michael.fitzgerald@parks.wa.gov.au',
      phone: '+61 400 567 894',
      location: { lat: -31.9505, lng: 115.8605, address: 'Perth, WA' },
      alertsEnabled: true,
      subscribedZones: [],
      subscribedGeofences: [],
      alertPrefs: { sms: false, push: true, otpVerified: false },
      lastReceived: new Date(Date.now() - 7200000),
      camaraVerified: false,
    },
    {
      _id: 'sub-wildlife-5',
      userId: 'wildlife-5',
      persona: 'wildlife_biologist',
      name: 'Nicole Brown',
      email: 'nicole.brown@tasparks.tas.gov.au',
      phone: '+61 400 567 895',
      location: { lat: -42.88, lng: 147.33, address: 'Hobart, TAS' },
      alertsEnabled: true,
      subscribedZones: ['TAS Southwest Wilderness'],
      subscribedGeofences: ['geo-005', 'geo-020'], // TAS Southwest Wilderness, Cradle Mountain
      alertPrefs: { sms: true, push: true, otpVerified: true },
      lastReceived: new Date(Date.now() - 9000000),
      camaraVerified: true,
    },
  ]
}

export function getDemoGeofences() {
  // Helper to create polygon around a center point
  const createPolygon = (centerLat: number, centerLng: number, radiusKm: number) => {
    const points: number[][] = []
    const numPoints = 8
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * 2 * Math.PI
      const lat = centerLat + (radiusKm / 111) * Math.cos(angle)
      const lng = centerLng + (radiusKm / (111 * Math.cos((centerLat * Math.PI) / 180))) * Math.sin(angle)
      points.push([lng, lat])
    }
    return points
  }

  return [
    {
      _id: 'geo-001',
      name: 'Blue Mountains Ridge',
      description: 'Lightning-prone, 200ha eucalypt overload—post-Red Dawn fuel map',
      coordinates: createPolygon(-33.5, 150.3, 15),
      type: 'proactive' as const,
      priority: 'critical' as const,
      area: 200,
      region: 'NSW Blue Mountains',
      riskLevel: 'critical' as const,
      subscribers: 125,
      lastScan: new Date(Date.now() - 3600000),
      fuelLoad: 40,
      triggers: ['CAMARA Geofencing Subs', 'Auto-drone launch', 'Lightning detection'],
      center: { lat: -33.5, lng: 150.3 },
      zone: 'Blue Mountains High Risk',
      populationDensity: 85, // people per km²
    },
    {
      _id: 'geo-002',
      name: 'Great Ocean Road Fringes',
      description: 'Ember drift risk, near Apollo Bay—home to 500 residents',
      coordinates: createPolygon(-38.2, 144.5, 12),
      type: 'reactive' as const,
      priority: 'high' as const,
      area: 150,
      region: 'VIC Great Ocean Road',
      riskLevel: 'high' as const,
      subscribers: 500,
      lastScan: new Date(Date.now() - 7200000),
      fuelLoad: 35,
      triggers: ['Ember detection', 'Wind speed > 40km/h', 'Resident evacuation'],
      center: { lat: -38.2, lng: 144.5 },
      zone: 'Great Ocean Road Fringe',
      populationDensity: 120, // people per km²
    },
    {
      _id: 'geo-003',
      name: 'Daintree Rainforest Edge',
      description: 'QLD, wildlife corridor for cassowaries—monsoon dry spells',
      coordinates: createPolygon(-16.2, 145.4, 18),
      type: 'wildlife' as const,
      priority: 'high' as const,
      area: 180,
      region: 'QLD Daintree',
      riskLevel: 'high' as const,
      subscribers: 45,
      lastScan: new Date(Date.now() - 10800000),
      fuelLoad: 30,
      triggers: ['Wildlife migration', 'Monsoon dry spell', 'Cassowary habitat'],
      center: { lat: -16.2, lng: 145.4 },
      zone: 'Koala Habitat Zone',
      populationDensity: 15, // people per km²
    },
    {
      _id: 'geo-004',
      name: 'Adelaide Hills Corridor',
      description: 'High population density, proximity to Adelaide CBD',
      coordinates: createPolygon(-34.9, 138.7, 10),
      type: 'proactive' as const,
      priority: 'critical' as const,
      area: 95,
      region: 'SA Adelaide Hills',
      riskLevel: 'critical' as const,
      subscribers: 850,
      lastScan: new Date(Date.now() - 1800000),
      fuelLoad: 45,
      triggers: ['Population density alert', 'CBD proximity', 'Urban interface'],
      center: { lat: -34.9, lng: 138.7 },
      zone: 'Ausgrid Power Line Corridor',
      populationDensity: 850, // people per km²
    },
    {
      _id: 'geo-005',
      name: 'TAS Southwest Wilderness',
      description: 'Remote area, high fuel load, difficult access',
      coordinates: createPolygon(-43.2, 146.0, 20),
      type: 'proactive' as const,
      priority: 'high' as const,
      area: 250,
      region: 'TAS Southwest',
      riskLevel: 'high' as const,
      subscribers: 12,
      lastScan: new Date(Date.now() - 14400000),
      fuelLoad: 50,
      triggers: ['Remote detection', 'High fuel load', 'Wilderness protection'],
      center: { lat: -43.2, lng: 146.0 },
      zone: 'TAS Southwest Wilderness',
      populationDensity: 2, // people per km²
    },
    {
      _id: 'geo-006',
      name: 'Perth Hills Fringe',
      description: 'WA, interface between urban and bushland',
      coordinates: createPolygon(-31.95, 116.0, 14),
      type: 'reactive' as const,
      priority: 'high' as const,
      area: 120,
      region: 'WA Perth Hills',
      riskLevel: 'high' as const,
      subscribers: 320,
      lastScan: new Date(Date.now() - 5400000),
      fuelLoad: 38,
      triggers: ['Urban interface', 'Ember attack', 'Property protection'],
      center: { lat: -31.95, lng: 116.0 },
      populationDensity: 180, // people per km²
    },
    {
      _id: 'geo-007',
      name: 'Kangaroo Island North',
      description: 'SA, wildlife sanctuary, tourism hotspot',
      coordinates: createPolygon(-35.7, 137.1, 16),
      type: 'wildlife' as const,
      priority: 'medium' as const,
      area: 140,
      region: 'SA Kangaroo Island',
      riskLevel: 'medium' as const,
      subscribers: 180,
      lastScan: new Date(Date.now() - 9000000),
      fuelLoad: 28,
      triggers: ['Wildlife protection', 'Tourism alert', 'Island evacuation'],
      center: { lat: -35.7, lng: 137.1 },
      populationDensity: 45, // people per km²
    },
    {
      _id: 'geo-008',
      name: 'Grampians National Park',
      description: 'VIC, rugged terrain, biodiversity hotspot',
      coordinates: createPolygon(-37.2, 142.5, 22),
      type: 'wildlife' as const,
      priority: 'medium' as const,
      area: 220,
      region: 'VIC Grampians',
      riskLevel: 'medium' as const,
      subscribers: 95,
      lastScan: new Date(Date.now() - 12600000),
      fuelLoad: 32,
      triggers: ['Biodiversity protection', 'National park', 'Tourism'],
      center: { lat: -37.2, lng: 142.5 },
      populationDensity: 25, // people per km²
    },
    {
      _id: 'geo-009',
      name: 'Brisbane Hinterland',
      description: 'QLD, high population, rapid development',
      coordinates: createPolygon(-27.3, 152.8, 13),
      type: 'reactive' as const,
      priority: 'high' as const,
      area: 110,
      region: 'QLD Brisbane Hinterland',
      riskLevel: 'high' as const,
      subscribers: 680,
      lastScan: new Date(Date.now() - 3600000),
      fuelLoad: 42,
      triggers: ['Population growth', 'Development pressure', 'Urban expansion'],
      center: { lat: -27.3, lng: 152.8 },
      populationDensity: 420, // people per km²
    },
    {
      _id: 'geo-010',
      name: 'Yarra Valley Vineyards',
      description: 'VIC, wine region, heritage properties',
      coordinates: createPolygon(-37.7, 145.4, 11),
      type: 'utility' as const,
      priority: 'medium' as const,
      area: 85,
      region: 'VIC Yarra Valley',
      riskLevel: 'medium' as const,
      subscribers: 240,
      lastScan: new Date(Date.now() - 7200000),
      fuelLoad: 25,
      triggers: ['Vineyard protection', 'Heritage alert', 'Agriculture'],
      center: { lat: -37.7, lng: 145.4 },
      populationDensity: 95, // people per km²
    },
    {
      _id: 'geo-011',
      name: 'Snowy Mountains Alpine',
      description: 'NSW, alpine region, snow gum forests',
      coordinates: createPolygon(-36.5, 148.3, 19),
      type: 'proactive' as const,
      priority: 'low' as const,
      area: 190,
      region: 'NSW Snowy Mountains',
      riskLevel: 'low' as const,
      subscribers: 65,
      lastScan: new Date(Date.now() - 18000000),
      fuelLoad: 20,
      triggers: ['Alpine protection', 'Snow gum forests', 'Tourism'],
      center: { lat: -36.5, lng: 148.3 },
      populationDensity: 12, // people per km²
    },
    {
      _id: 'geo-012',
      name: 'Central Coast Fringe',
      description: 'NSW, coastal development, high density',
      coordinates: createPolygon(-33.3, 151.4, 9),
      type: 'reactive' as const,
      priority: 'high' as const,
      area: 75,
      region: 'NSW Central Coast',
      riskLevel: 'high' as const,
      subscribers: 520,
      lastScan: new Date(Date.now() - 5400000),
      fuelLoad: 36,
      triggers: ['Coastal development', 'High density', 'Property protection'],
      center: { lat: -33.3, lng: 151.4 },
      populationDensity: 680, // people per km²
    },
    {
      _id: 'geo-013',
      name: 'Fraser Island Perimeter',
      description: 'QLD, world heritage, dune systems',
      coordinates: createPolygon(-25.2, 153.1, 17),
      type: 'wildlife' as const,
      priority: 'medium' as const,
      area: 160,
      region: 'QLD Fraser Island',
      riskLevel: 'medium' as const,
      subscribers: 120,
      lastScan: new Date(Date.now() - 10800000),
      fuelLoad: 22,
      triggers: ['World heritage', 'Dune protection', 'Tourism'],
      center: { lat: -25.2, lng: 153.1 },
      populationDensity: 8, // people per km²
    },
    {
      _id: 'geo-014',
      name: 'Darwin Rural Fringe',
      description: 'NT, monsoonal climate, dry season risk',
      coordinates: createPolygon(-12.5, 130.8, 14),
      type: 'proactive' as const,
      priority: 'medium' as const,
      area: 130,
      region: 'NT Darwin',
      riskLevel: 'medium' as const,
      subscribers: 85,
      lastScan: new Date(Date.now() - 14400000),
      fuelLoad: 28,
      triggers: ['Dry season', 'Monsoonal climate', 'Rural properties'],
      center: { lat: -12.5, lng: 130.8 },
      populationDensity: 35, // people per km²
    },
    {
      _id: 'geo-015',
      name: 'Canberra Bush Capital',
      description: 'ACT, urban interface, high risk',
      coordinates: createPolygon(-35.3, 149.1, 10),
      type: 'reactive' as const,
      priority: 'critical' as const,
      area: 90,
      region: 'ACT Canberra',
      riskLevel: 'critical' as const,
      subscribers: 450,
      lastScan: new Date(Date.now() - 1800000),
      fuelLoad: 48,
      triggers: ['Capital city', 'Urban interface', 'High population'],
      center: { lat: -35.3, lng: 149.1 },
      populationDensity: 720, // people per km²
    },
    {
      _id: 'geo-016',
      name: 'Gold Coast Hinterland',
      description: 'QLD, rapid urbanization, infrastructure',
      coordinates: createPolygon(-28.0, 153.3, 12),
      type: 'reactive' as const,
      priority: 'high' as const,
      area: 100,
      region: 'QLD Gold Coast',
      riskLevel: 'high' as const,
      subscribers: 750,
      lastScan: new Date(Date.now() - 3600000),
      fuelLoad: 40,
      triggers: ['Urbanization', 'Infrastructure', 'Tourism'],
      center: { lat: -28.0, lng: 153.3 },
      populationDensity: 580, // people per km²
    },
    {
      _id: 'geo-017',
      name: 'Tasman Peninsula',
      description: 'TAS, historic site, coastal interface',
      coordinates: createPolygon(-43.1, 147.8, 11),
      type: 'utility' as const,
      priority: 'medium' as const,
      area: 80,
      region: 'TAS Tasman Peninsula',
      riskLevel: 'medium' as const,
      subscribers: 145,
      lastScan: new Date(Date.now() - 9000000),
      fuelLoad: 30,
      triggers: ['Historic protection', 'Coastal interface', 'Tourism'],
      center: { lat: -43.1, lng: 147.8 },
      populationDensity: 55, // people per km²
    },
    {
      _id: 'geo-018',
      name: 'Warrumbungle National Park',
      description: 'NSW, dark sky reserve, observatory',
      coordinates: createPolygon(-31.3, 149.0, 15),
      type: 'wildlife' as const,
      priority: 'medium' as const,
      area: 170,
      region: 'NSW Warrumbungle',
      riskLevel: 'medium' as const,
      subscribers: 55,
      lastScan: new Date(Date.now() - 16200000),
      fuelLoad: 35,
      triggers: ['Dark sky reserve', 'Observatory', 'Wildlife'],
      center: { lat: -31.3, lng: 149.0 },
      populationDensity: 18, // people per km²
    },
    {
      _id: 'geo-019',
      name: 'Margaret River Wine Region',
      description: 'WA, wine tourism, heritage',
      coordinates: createPolygon(-33.9, 115.1, 13),
      type: 'utility' as const,
      priority: 'medium' as const,
      area: 105,
      region: 'WA Margaret River',
      riskLevel: 'medium' as const,
      subscribers: 280,
      lastScan: new Date(Date.now() - 7200000),
      fuelLoad: 27,
      triggers: ['Wine region', 'Tourism', 'Heritage'],
      center: { lat: -33.9, lng: 115.1 },
      populationDensity: 62, // people per km²
    },
    {
      _id: 'geo-020',
      name: 'Cradle Mountain Lake St Clair',
      description: 'TAS, world heritage, alpine wilderness',
      coordinates: createPolygon(-41.7, 145.9, 21),
      type: 'wildlife' as const,
      priority: 'low' as const,
      area: 230,
      region: 'TAS Cradle Mountain',
      riskLevel: 'low' as const,
      subscribers: 38,
      lastScan: new Date(Date.now() - 21600000),
      fuelLoad: 18,
      triggers: ['World heritage', 'Alpine protection', 'Wilderness'],
      center: { lat: -41.7, lng: 145.9 },
      populationDensity: 3, // people per km²
    },
    {
      _id: 'geo-021',
      name: 'Hunter Valley Vineyards',
      description: 'NSW, wine region, coal mining interface',
      coordinates: createPolygon(-32.8, 151.3, 14),
      type: 'utility' as const,
      priority: 'high' as const,
      area: 115,
      region: 'NSW Hunter Valley',
      riskLevel: 'high' as const,
      subscribers: 390,
      lastScan: new Date(Date.now() - 5400000),
      fuelLoad: 38,
      triggers: ['Mining interface', 'Vineyard protection', 'Agriculture'],
      center: { lat: -32.8, lng: 151.3 },
      populationDensity: 110, // people per km²
    },
    {
      _id: 'geo-022',
      name: 'Flinders Ranges',
      description: 'SA, outback, fossil sites, tourism',
      coordinates: createPolygon(-31.4, 138.7, 25),
      type: 'wildlife' as const,
      priority: 'low' as const,
      area: 280,
      region: 'SA Flinders Ranges',
      riskLevel: 'low' as const,
      subscribers: 42,
      lastScan: new Date(Date.now() - 25200000),
      fuelLoad: 15,
      triggers: ['Fossil sites', 'Outback tourism', 'Wildlife'],
      center: { lat: -31.4, lng: 138.7 },
      populationDensity: 1, // people per km²
    },
  ]
}

export function getDemoDetections() {
  const now = Date.now()
  return [
    {
      _id: 'det-001',
      timestamp: new Date(now - 3600000),
      location: { lat: -33.5, lng: 150.3, name: 'Blue Mountains Ridge' },
      temperature: 45,
      type: 'hotspot_in_smoke' as const,
      confidence: 0.93,
      droneId: 'demo-drone-1',
      droneName: 'EmberHunter-01',
      status: 'active' as const,
      alertSent: true,
      actionsTaken: ['Backburn dispatched to Mike', 'Drone swarm deployed'],
      impact: '2 homes saved, 5 wallabies rescued',
      zone: 'Blue Mountains High Risk',
      imageUrl: 'https://via.placeholder.com/300x200?text=Thermal+Plume',
    },
    {
      _id: 'det-002',
      timestamp: new Date(now - 7200000),
      location: { lat: -33.8, lng: 151.2, name: 'Sydney Fringes' },
      temperature: 38,
      type: 'wildlife_survey' as const,
      confidence: 0.87,
      droneId: 'demo-drone-2',
      droneName: 'KoalaGuard-02',
      status: 'controlled' as const,
      alertSent: true,
      actionsTaken: ['Wildlife rescue team dispatched', 'Koala habitat protected'],
      impact: '3 koalas located and protected',
      zone: 'Koala Habitat Zone',
      imageUrl: 'https://via.placeholder.com/300x200?text=Koala+Thermal',
    },
    {
      _id: 'det-003',
      timestamp: new Date(now - 10800000),
      location: { lat: -38.2, lng: 144.5, name: 'Great Ocean Road' },
      temperature: 42,
      type: 'ember' as const,
      confidence: 0.91,
      droneId: 'demo-drone-3',
      droneName: 'BushfireBlaze-03',
      status: 'active' as const,
      alertSent: true,
      actionsTaken: ['Ember detection alert', 'Resident evacuation initiated'],
      impact: '500 residents alerted',
      zone: 'Great Ocean Road Fringe',
      imageUrl: 'https://via.placeholder.com/300x200?text=Ember+Detection',
    },
    {
      _id: 'det-004',
      timestamp: new Date(now - 14400000),
      location: { lat: -34.9, lng: 138.7, name: 'Adelaide Hills' },
      temperature: 48,
      type: 'spot_fire' as const,
      confidence: 0.95,
      droneId: 'demo-drone-4',
      droneName: 'FlameFinder-04',
      status: 'controlled' as const,
      alertSent: true,
      actionsTaken: ['Fire crew dispatched', 'Water bombing initiated'],
      impact: 'Fire contained, no structures lost',
      zone: 'Adelaide Hills Corridor',
      imageUrl: 'https://via.placeholder.com/300x200?text=Spot+Fire',
    },
    {
      _id: 'det-005',
      timestamp: new Date(now - 18000000),
      location: { lat: -33.8688, lng: 151.2093, name: 'Sydney CBD Proximity' },
      temperature: 35,
      type: 'power_fault' as const,
      confidence: 0.88,
      droneId: 'demo-drone-5',
      droneName: 'SparkSpotter-05',
      status: 'resolved' as const,
      alertSent: true,
      actionsTaken: ['Utility crew dispatched', 'Power line repaired'],
      impact: 'Potential ignition source eliminated',
      zone: 'Ausgrid Power Line Corridor',
      imageUrl: 'https://via.placeholder.com/300x200?text=Power+Fault',
    },
    {
      _id: 'det-006',
      timestamp: new Date(now - 21600000),
      location: { lat: -43.2, lng: 146.0, name: 'TAS Southwest' },
      temperature: 40,
      type: 'perimeter_breach' as const,
      confidence: 0.92,
      droneId: 'demo-drone-6',
      droneName: 'WildernessWatch-06',
      status: 'active' as const,
      alertSent: true,
      actionsTaken: ['Perimeter breach alert', 'Remote area response team'],
      impact: 'Remote area monitored',
      zone: 'TAS Southwest Wilderness',
      imageUrl: 'https://via.placeholder.com/300x200?text=Perimeter+Breach',
    },
    {
      _id: 'det-007',
      timestamp: new Date(now - 25200000),
      location: { lat: -31.95, lng: 116.0, name: 'Perth Hills' },
      temperature: 44,
      type: 'wildfire' as const,
      confidence: 0.96,
      droneId: 'demo-drone-7',
      droneName: 'InfernoIntel-07',
      status: 'controlled' as const,
      alertSent: true,
      actionsTaken: ['Major fire response', 'Multiple agencies coordinated'],
      impact: 'Large fire controlled, 10 homes protected',
      zone: 'Perth Hills Fringe',
      imageUrl: 'https://via.placeholder.com/300x200?text=Wildfire',
    },
    {
      _id: 'det-008',
      timestamp: new Date(now - 28800000),
      location: { lat: -27.3, lng: 152.8, name: 'Brisbane Hinterland' },
      temperature: 39,
      type: 'ember' as const,
      confidence: 0.89,
      droneId: 'demo-drone-8',
      droneName: 'EmberEye-08',
      status: 'resolved' as const,
      alertSent: true,
      actionsTaken: ['Ember suppression', 'Preventive measures'],
      impact: 'Fire prevented from spreading',
      zone: 'Brisbane Hinterland',
      imageUrl: 'https://via.placeholder.com/300x200?text=Ember+Detection',
    },
    {
      _id: 'det-009',
      timestamp: new Date(now - 32400000),
      location: { lat: -37.2, lng: 142.5, name: 'Grampians NP' },
      temperature: 36,
      type: 'wildlife_survey' as const,
      confidence: 0.85,
      droneId: 'demo-drone-9',
      droneName: 'NatureGuard-09',
      status: 'resolved' as const,
      alertSent: false,
      actionsTaken: ['Wildlife survey completed'],
      impact: 'Wildlife habitat documented',
      zone: 'Grampians National Park',
      imageUrl: 'https://via.placeholder.com/300x200?text=Wildlife+Survey',
    },
    {
      _id: 'det-010',
      timestamp: new Date(now - 36000000),
      location: { lat: -35.3, lng: 149.1, name: 'Canberra Bush' },
      temperature: 43,
      type: 'hotspot_in_smoke' as const,
      confidence: 0.94,
      droneId: 'demo-drone-10',
      droneName: 'CapitalWatch-10',
      status: 'controlled' as const,
      alertSent: true,
      actionsTaken: ['Urban interface protection', 'Backburn operations'],
      impact: 'Capital city protected, 450 homes safe',
      zone: 'Canberra Bush Capital',
      imageUrl: 'https://via.placeholder.com/300x200?text=Hotspot+Smoke',
    },
    {
      _id: 'det-011',
      timestamp: new Date(now - 39600000),
      location: { lat: -28.0, lng: 153.3, name: 'Gold Coast Hinterland' },
      temperature: 41,
      type: 'spot_fire' as const,
      confidence: 0.90,
      droneId: 'demo-drone-11',
      droneName: 'CoastGuard-11',
      status: 'active' as const,
      alertSent: true,
      actionsTaken: ['Rapid response team', 'Evacuation alert'],
      impact: '750 residents alerted, infrastructure protected',
      zone: 'Gold Coast Hinterland',
      imageUrl: 'https://via.placeholder.com/300x200?text=Spot+Fire',
    },
    {
      _id: 'det-012',
      timestamp: new Date(now - 43200000),
      location: { lat: -31.3, lng: 149.0, name: 'Warrumbungle NP' },
      temperature: 37,
      type: 'wildlife_survey' as const,
      confidence: 0.86,
      droneId: 'demo-drone-12',
      droneName: 'DarkSkyWatch-12',
      status: 'resolved' as const,
      alertSent: false,
      actionsTaken: ['Wildlife monitoring', 'Observatory protection'],
      impact: 'Dark sky reserve protected',
      zone: 'Warrumbungle National Park',
      imageUrl: 'https://via.placeholder.com/300x200?text=Wildlife+Survey',
    },
    {
      _id: 'det-013',
      timestamp: new Date(now - 46800000),
      location: { lat: -33.3, lng: 151.4, name: 'Central Coast' },
      temperature: 46,
      type: 'perimeter_breach' as const,
      confidence: 0.93,
      droneId: 'demo-drone-13',
      droneName: 'CoastlineGuard-13',
      status: 'controlled' as const,
      alertSent: true,
      actionsTaken: ['Perimeter reinforcement', 'Coastal protection'],
      impact: '520 homes protected, coastal area secure',
      zone: 'Central Coast Fringe',
      imageUrl: 'https://via.placeholder.com/300x200?text=Perimeter+Breach',
    },
    {
      _id: 'det-014',
      timestamp: new Date(now - 50400000),
      location: { lat: -16.2, lng: 145.4, name: 'Daintree Rainforest' },
      temperature: 34,
      type: 'wildlife_survey' as const,
      confidence: 0.84,
      droneId: 'demo-drone-14',
      droneName: 'RainforestGuard-14',
      status: 'resolved' as const,
      alertSent: false,
      actionsTaken: ['Cassowary habitat monitoring', 'Rainforest protection'],
      impact: 'Wildlife corridor documented',
      zone: 'Daintree Rainforest Edge',
      imageUrl: 'https://via.placeholder.com/300x200?text=Wildlife+Survey',
    },
    {
      _id: 'det-015',
      timestamp: new Date(now - 54000000),
      location: { lat: -37.7, lng: 145.4, name: 'Yarra Valley' },
      temperature: 39,
      type: 'ember' as const,
      confidence: 0.88,
      droneId: 'demo-drone-15',
      droneName: 'VineyardGuard-15',
      status: 'resolved' as const,
      alertSent: true,
      actionsTaken: ['Vineyard protection', 'Heritage property alert'],
      impact: '240 vineyards protected, heritage sites safe',
      zone: 'Yarra Valley Vineyards',
      imageUrl: 'https://via.placeholder.com/300x200?text=Ember+Detection',
    },
    {
      _id: 'det-016',
      timestamp: new Date(now - 57600000),
      location: { lat: -32.8, lng: 151.3, name: 'Hunter Valley' },
      temperature: 42,
      type: 'power_fault' as const,
      confidence: 0.87,
      droneId: 'demo-drone-16',
      droneName: 'MiningGuard-16',
      status: 'resolved' as const,
      alertSent: true,
      actionsTaken: ['Mining interface protection', 'Power infrastructure secured'],
      impact: '390 properties protected, mining operations secure',
      zone: 'Hunter Valley Vineyards',
      imageUrl: 'https://via.placeholder.com/300x200?text=Power+Fault',
    },
    {
      _id: 'det-017',
      timestamp: new Date(now - 61200000),
      location: { lat: -35.7, lng: 137.1, name: 'Kangaroo Island' },
      temperature: 38,
      type: 'wildlife_survey' as const,
      confidence: 0.83,
      droneId: 'demo-drone-17',
      droneName: 'IslandGuard-17',
      status: 'resolved' as const,
      alertSent: false,
      actionsTaken: ['Wildlife sanctuary monitoring', 'Tourism area protection'],
      impact: 'Wildlife sanctuary protected',
      zone: 'Kangaroo Island North',
      imageUrl: 'https://via.placeholder.com/300x200?text=Wildlife+Survey',
    },
    {
      _id: 'det-018',
      timestamp: new Date(now - 64800000),
      location: { lat: -33.9, lng: 115.1, name: 'Margaret River' },
      temperature: 40,
      type: 'spot_fire' as const,
      confidence: 0.91,
      droneId: 'demo-drone-18',
      droneName: 'WineGuard-18',
      status: 'controlled' as const,
      alertSent: true,
      actionsTaken: ['Wine region protection', 'Tourism alert'],
      impact: '280 wineries protected, tourism area secure',
      zone: 'Margaret River Wine Region',
      imageUrl: 'https://via.placeholder.com/300x200?text=Spot+Fire',
    },
    {
      _id: 'det-019',
      timestamp: new Date(now - 68400000),
      location: { lat: -31.4, lng: 138.7, name: 'Flinders Ranges' },
      temperature: 35,
      type: 'wildlife_survey' as const,
      confidence: 0.82,
      droneId: 'demo-drone-19',
      droneName: 'OutbackGuard-19',
      status: 'resolved' as const,
      alertSent: false,
      actionsTaken: ['Fossil site protection', 'Outback tourism monitoring'],
      impact: 'Fossil sites protected, wildlife documented',
      zone: 'Flinders Ranges',
      imageUrl: 'https://via.placeholder.com/300x200?text=Wildlife+Survey',
    },
    {
      _id: 'det-020',
      timestamp: new Date(now - 72000000),
      location: { lat: -41.7, lng: 145.9, name: 'Cradle Mountain' },
      temperature: 33,
      type: 'wildlife_survey' as const,
      confidence: 0.81,
      droneId: 'demo-drone-20',
      droneName: 'AlpineGuard-20',
      status: 'resolved' as const,
      alertSent: false,
      actionsTaken: ['World heritage protection', 'Alpine wilderness monitoring'],
      impact: '38 endangered species protected, wilderness preserved',
      zone: 'Cradle Mountain Lake St Clair',
      imageUrl: 'https://via.placeholder.com/300x200?text=Wildlife+Survey',
    },
  ]
}

// Helper function to get subscriber IDs based on alert type and index
function getSubscriberIdsForAlert(type: string, index: number): string[] {
  const subscriberIds: string[] = []
  
  // Always include at least one Fire Ranger and one Incident Commander
  subscriberIds.push(`sub-fire-${(index % 5) + 1}`)
  subscriberIds.push(`sub-commander-${(index % 5) + 1}`)
  
  // Add subscribers based on alert type
  switch (type) {
    case 'wildlife_rescue':
    case 'wildlife':
      // Wildlife alerts: include wildlife biologists and rural homeowners
      subscriberIds.push(`sub-wildlife-${(index % 5) + 1}`)
      subscriberIds.push(`sub-wildlife-${((index + 1) % 5) + 1}`) // Second wildlife biologist
      subscriberIds.push(`sub-homeowner-${(index % 10) + 1}`)
      subscriberIds.push(`sub-homeowner-${((index + 1) % 10) + 1}`) // Second homeowner
      break
      
    case 'utility':
      // Utility alerts: include utility engineers and rural homeowners
      subscriberIds.push(`sub-utility-${(index % 5) + 1}`)
      subscriberIds.push(`sub-utility-${((index + 1) % 5) + 1}`) // Second utility engineer
      subscriberIds.push(`sub-homeowner-${(index % 10) + 1}`)
      subscriberIds.push(`sub-homeowner-${((index + 2) % 10) + 1}`) // Second homeowner
      break
      
    case 'evacuation':
      // Evacuation alerts: include many rural homeowners
      for (let i = 0; i < 4; i++) {
        subscriberIds.push(`sub-homeowner-${((index + i) % 10) + 1}`)
      }
      subscriberIds.push(`sub-fire-${((index + 1) % 5) + 1}`) // Additional fire ranger
      subscriberIds.push(`sub-commander-${((index + 1) % 5) + 1}`) // Additional commander
      break
      
    case 'ember_cloud':
    case 'hotspot':
    case 'detection':
      // Fire detection alerts: include mix of all types
      subscriberIds.push(`sub-fire-${((index + 1) % 5) + 1}`) // Additional fire ranger
      subscriberIds.push(`sub-homeowner-${(index % 10) + 1}`)
      subscriberIds.push(`sub-homeowner-${((index + 1) % 10) + 1}`)
      // Sometimes include utility or wildlife based on index
      if (index % 3 === 0) {
        subscriberIds.push(`sub-utility-${(index % 5) + 1}`)
      } else if (index % 3 === 1) {
        subscriberIds.push(`sub-wildlife-${(index % 5) + 1}`)
      }
      break
      
    case 'weather':
      // Weather alerts: include all types for awareness
      subscriberIds.push(`sub-homeowner-${(index % 10) + 1}`)
      subscriberIds.push(`sub-homeowner-${((index + 1) % 10) + 1}`)
      subscriberIds.push(`sub-utility-${(index % 5) + 1}`)
      subscriberIds.push(`sub-wildlife-${(index % 5) + 1}`)
      break
      
    default:
      // Default: include homeowners and vary others
      subscriberIds.push(`sub-homeowner-${(index % 10) + 1}`)
      subscriberIds.push(`sub-homeowner-${((index + 1) % 10) + 1}`)
      if (index % 2 === 0) {
        subscriberIds.push(`sub-utility-${(index % 5) + 1}`)
      } else {
        subscriberIds.push(`sub-wildlife-${(index % 5) + 1}`)
      }
      break
  }
  
  // Remove duplicates and return
  return [...new Set(subscriberIds)]
}

export function getDemoAlerts() {
  const now = Date.now()
  const australianLocations = [
    { name: 'Kosciuszko NP', lat: -36.5, lng: 148.3 },
    { name: 'Warrumbungle NP', lat: -31.3, lng: 149.0 },
    { name: 'Blue Mountains Ridge', lat: -33.5, lng: 150.3 },
    { name: 'Great Ocean Road Fringes', lat: -38.2, lng: 144.5 },
    { name: 'Daintree Rainforest Edge', lat: -16.2, lng: 145.4 },
    { name: 'Adelaide Hills Corridor', lat: -34.9, lng: 138.7 },
    { name: 'TAS Southwest Wilderness', lat: -43.2, lng: 146.0 },
    { name: 'Perth Hills Fringe', lat: -31.95, lng: 116.0 },
    { name: 'Kangaroo Island North', lat: -35.7, lng: 137.1 },
    { name: 'Grampians National Park', lat: -37.2, lng: 142.5 },
    { name: 'Brisbane Hinterland', lat: -27.3, lng: 152.8 },
    { name: 'Yarra Valley Vineyards', lat: -37.7, lng: 145.4 },
    { name: 'Snowy Mountains Alpine', lat: -36.5, lng: 148.3 },
    { name: 'Central Coast Fringe', lat: -33.3, lng: 151.4 },
    { name: 'Fraser Island Perimeter', lat: -25.2, lng: 153.1 },
  ]

  const alertTypes = [
    'ember_cloud',
    'hotspot',
    'wildlife_rescue',
    'evacuation',
    'detection',
    'weather',
    'wildlife',
    'utility',
  ] as const

  const severities = ['critical', 'high', 'medium', 'low', 'warning'] as const
  const statuses = ['active', 'controlled', 'resolved', 'patrolled'] as const

  const generateAlert = (index: number, hoursAgo: number) => {
    const location = australianLocations[index % australianLocations.length]
    const type = alertTypes[index % alertTypes.length]
    const severity = severities[index % severities.length]
    const status = statuses[index % statuses.length]

    let title = ''
    let message = ''
    let actions: string[] = []
    let impact = ''
    let videoUrl = ''
    let imageUrl = ''

    // Generate persona-specific alerts
    switch (type) {
      case 'ember_cloud':
        title = 'Ember Cloud Track Detected'
        message = `Large ember cloud detected moving towards ${location.name}. Drone swarm tracking trajectory.`
        actions = [
          `Evac 120 via Priya's SMS`,
          `Backburn dispatched to Mike`,
          `3 Koalas Rescued by Lena`,
        ]
        impact = '0 Losses - Successful evacuation'
        videoUrl = 'https://via.placeholder.com/300x200?text=Ember+Cloud+Thermal'
        imageUrl = 'https://via.placeholder.com/300x200?text=Ember+Plume'
        break
      case 'hotspot':
        title = 'Hotspot ID - Reactive Alert'
        message = `Hotspot detected in ${location.name}. Water drop coordinated.`
        actions = [
          'Water Drop Coordinated',
          'Wildlife: 2 Eagles Spotted',
          'Fire crew dispatched',
        ]
        impact = 'Hotspot contained - No spread'
        videoUrl = 'https://via.placeholder.com/300x200?text=Hotspot+Thermal'
        imageUrl = 'https://via.placeholder.com/300x200?text=Fire+Plume'
        break
      case 'wildlife_rescue':
        title = 'Wildlife Rescue Operation'
        message = `Wildlife detected in fire path at ${location.name}. Rescue team deployed.`
        actions = [
          '3 Koalas Rescued by Lena',
          'Wildlife Biologist team dispatched',
          'Habitat protection activated',
        ]
        impact = '5 wallabies rescued, 2 eagles relocated'
        videoUrl = 'https://via.placeholder.com/300x200?text=Koala+Rescue'
        imageUrl = 'https://via.placeholder.com/300x200?text=Rescued+Wildlife'
        break
      case 'evacuation':
        title = 'Evacuation Alert'
        message = `Evacuation order issued for ${location.name}. Emergency services coordinating.`
        actions = [
          `Evac 120 via Priya's SMS`,
          'Emergency services deployed',
          'Shelter locations activated',
        ]
        impact = 'All residents safely evacuated'
        videoUrl = 'https://via.placeholder.com/300x200?text=Evacuation'
        imageUrl = 'https://via.placeholder.com/300x200?text=Evac+Route'
        break
      case 'detection':
        title = 'Fire Detection Alert'
        message = `Fire detected at ${location.name}. Drone thermal imagery confirms active fire.`
        actions = ['Drone thermal scan', 'Fire crew dispatched', 'Backburn initiated']
        impact = 'Fire contained - 2 homes saved'
        videoUrl = 'https://via.placeholder.com/300x200?text=Thermal+Fire'
        imageUrl = 'https://via.placeholder.com/300x200?text=Fire+Detection'
        break
      case 'weather':
        title = 'Weather Warning'
        message = `Extreme weather conditions detected at ${location.name}. High wind risk.`
        actions = ['Weather monitoring', 'Preventive measures', 'Alert subscribers']
        impact = 'Early warning - No incidents'
        videoUrl = 'https://via.placeholder.com/300x200?text=Weather'
        imageUrl = 'https://via.placeholder.com/300x200?text=Storm+Front'
        break
      case 'wildlife':
        title = 'Wildlife Survey Alert'
        message = `Wildlife activity detected at ${location.name}. Monitoring endangered species.`
        actions = ['Wildlife survey', 'Habitat assessment', 'Protection measures']
        impact = 'Wildlife habitat protected'
        videoUrl = 'https://via.placeholder.com/300x200?text=Wildlife'
        imageUrl = 'https://via.placeholder.com/300x200?text=Koala+Sighting'
        break
      case 'utility':
        title = 'Utility Infrastructure Alert'
        message = `Power line fault detected near ${location.name}. Utility crew dispatched.`
        actions = [
          'Utility crew dispatched',
          'Power line inspection',
          'Infrastructure secured',
        ]
        impact = 'Potential ignition source eliminated'
        videoUrl = 'https://via.placeholder.com/300x200?text=Power+Line'
        imageUrl = 'https://via.placeholder.com/300x200?text=Utility+Fault'
        break
    }

    return {
      _id: `alert-${String(index + 1).padStart(3, '0')}`,
      type,
      severity,
      title,
      message,
      timestamp: new Date(now - hoursAgo * 3600000),
      location,
      status,
      actions,
      impact,
      videoUrl,
      imageUrl,
      acknowledged: index % 5 === 0, // Some alerts acknowledged
      geofenceId: `geo-${String((index % 22) + 1).padStart(3, '0')}`,
      droneId: `demo-drone-${(index % 20) + 1}`,
      subscriberIds: getSubscriberIdsForAlert(type, index),
    }
  }

  // Generate 50 alerts across different time periods
  const alerts = []
  for (let i = 0; i < 50; i++) {
    // Distribute alerts across different time periods
    // Ensure at least 10 alerts are within last 6 hours for default view
    let hoursAgo = 0
    if (i < 15) {
      // Last 6 hours (0-6 hours) - More alerts in recent period
      hoursAgo = Math.random() * 6
    } else if (i < 25) {
      // Last 24 hours (6-24 hours)
      hoursAgo = 6 + Math.random() * 18
    } else if (i < 35) {
      // Last week (1-7 days)
      hoursAgo = 24 + Math.random() * 144
    } else if (i < 42) {
      // Last month (1-4 weeks)
      hoursAgo = 168 + Math.random() * 504
    } else {
      // Last 12 months (1-12 months)
      hoursAgo = 672 + Math.random() * 8016
    }
    alerts.push(generateAlert(i, hoursAgo))
  }

  return alerts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}
