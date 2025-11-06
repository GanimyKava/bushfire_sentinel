import User from '../models/User.js'
import Drone from '../models/Drone.js'
import Geofence from '../models/Geofence.js'
import Subscriber from '../models/Subscriber.js'
import Alert from '../models/Alert.js'
import Detection from '../models/Detection.js'
import bcrypt from 'bcryptjs'

export async function seedDatabase() {
  try {
    // Check if data already exists
    const userCount = await User.countDocuments()
    if (userCount > 0) {
      console.log('Database already seeded')
      return
    }

    // Seed Users - Australian personas
    const hashedPassword = await bcrypt.hash('demo123', 10)
    const users = [
      // Fire Rangers (Proactive) - 5 users
      {
        email: 'sarah.thompson@nsw.gov.au',
        password: hashedPassword,
        name: 'Sarah Thompson',
        role: 'fire_ranger' as const,
        bio: 'Patrolling 50km² daily, hates missing embers',
        region: 'NSW Blue Mountains',
        phone: '+61 400 123 456',
      },
      {
        email: 'tom.reilly@cfa.vic.gov.au',
        password: hashedPassword,
        name: 'Tom Reilly',
        role: 'fire_ranger' as const,
        bio: 'VIC Great Ocean Road specialist, 15 years patrolling coastal zones',
        region: 'VIC Great Ocean Road',
        phone: '+61 400 123 457',
      },
      {
        email: 'aisha.patel@qfes.qld.gov.au',
        password: hashedPassword,
        name: 'Aisha Patel',
        role: 'fire_ranger' as const,
        bio: 'QLD Wet Tropics ranger, expert in rainforest fire behavior',
        region: 'QLD Wet Tropics',
        phone: '+61 400 123 458',
      },
      {
        email: 'david.murphy@rfs.nsw.gov.au',
        password: hashedPassword,
        name: 'David Murphy',
        role: 'fire_ranger' as const,
        bio: 'NSW Southern Highlands, backburn specialist',
        region: 'NSW Southern Highlands',
        phone: '+61 400 123 459',
      },
      {
        email: 'sophie.taylor@dfes.wa.gov.au',
        password: hashedPassword,
        name: 'Sophie Taylor',
        role: 'fire_ranger' as const,
        bio: 'WA Karri forests, proactive fuel reduction expert',
        region: 'WA Karri Forests',
        phone: '+61 400 123 460',
      },
      // Incident Commanders (Reactive) - 5 users
      {
        email: 'mike.hargreaves@cfa.vic.gov.au',
        password: hashedPassword,
        name: 'Mike Hargreaves',
        role: 'incident_commander' as const,
        bio: 'Coords chaos in smoke, CFA Chief with 25 years experience',
        region: 'VIC Melbourne',
        phone: '+61 400 234 561',
      },
      {
        email: 'elena.vasquez@rfs.nsw.gov.au',
        password: hashedPassword,
        name: 'Elena Vasquez',
        role: 'incident_commander' as const,
        bio: 'NSW multi-agency coordination, Black Summer veteran',
        region: 'NSW Sydney',
        phone: '+61 400 234 562',
      },
      {
        email: 'james.mitchell@qfes.qld.gov.au',
        password: hashedPassword,
        name: 'James Mitchell',
        role: 'incident_commander' as const,
        bio: 'QLD incident response, coordinates statewide operations',
        region: 'QLD Brisbane',
        phone: '+61 400 234 563',
      },
      {
        email: 'karen.white@dfes.wa.gov.au',
        password: hashedPassword,
        name: 'Karen White',
        role: 'incident_commander' as const,
        bio: 'WA emergency coordination, Perth Metro specialist',
        region: 'WA Perth',
        phone: '+61 400 234 564',
      },
      {
        email: 'robert.brown@tasfires.tas.gov.au',
        password: hashedPassword,
        name: 'Robert Brown',
        role: 'incident_commander' as const,
        bio: 'TAS wilderness fire response, remote area expert',
        region: 'TAS Hobart',
        phone: '+61 400 234 565',
      },
      // Rural Homeowners (Vulnerable) - 10 users
      {
        email: 'priya.singh@example.com',
        password: hashedPassword,
        name: 'Priya Singh',
        role: 'rural_homeowner' as const,
        bio: '10-acre worrywart, needs ember alerts',
        region: 'NSW Tamworth',
        phone: '+61 400 345 671',
      },
      {
        email: 'jacko.wilson@example.com',
        password: hashedPassword,
        name: 'Jacko Wilson',
        role: 'rural_homeowner' as const,
        bio: 'WA outback property owner, 50km from nearest town',
        region: 'WA Outback',
        phone: '+61 400 345 672',
      },
      {
        email: 'margaret.chen@example.com',
        password: hashedPassword,
        name: 'Margaret Chen',
        role: 'rural_homeowner' as const,
        bio: 'TAS Southwest wilderness, isolated property',
        region: 'TAS Southwest',
        phone: '+61 400 345 673',
      },
      {
        email: 'peter.anderson@example.com',
        password: hashedPassword,
        name: 'Peter Anderson',
        role: 'rural_homeowner' as const,
        bio: 'NSW Blue Mountains, heritage property protection',
        region: 'NSW Blue Mountains',
        phone: '+61 400 345 674',
      },
      {
        email: 'lisa.martin@example.com',
        password: hashedPassword,
        name: 'Lisa Martin',
        role: 'rural_homeowner' as const,
        bio: 'VIC Great Ocean Road fringe, coastal property',
        region: 'VIC Great Ocean Road',
        phone: '+61 400 345 675',
      },
      {
        email: 'mark.davis@example.com',
        password: hashedPassword,
        name: 'Mark Davis',
        role: 'rural_homeowner' as const,
        bio: 'QLD hinterland, bushfire-prone area',
        region: 'QLD Hinterland',
        phone: '+61 400 345 676',
      },
      {
        email: 'jennifer.thompson@example.com',
        password: hashedPassword,
        name: 'Jennifer Thompson',
        role: 'rural_homeowner' as const,
        bio: 'NSW Central Coast, rural acreage',
        region: 'NSW Central Coast',
        phone: '+61 400 345 677',
      },
      {
        email: 'michael.williams@example.com',
        password: hashedPassword,
        name: 'Michael Williams',
        role: 'rural_homeowner' as const,
        bio: 'VIC Yarra Valley, vineyard property',
        region: 'VIC Yarra Valley',
        phone: '+61 400 345 678',
      },
      {
        email: 'susan.jones@example.com',
        password: hashedPassword,
        name: 'Susan Jones',
        role: 'rural_homeowner' as const,
        bio: 'SA Adelaide Hills, lifestyle property',
        region: 'SA Adelaide Hills',
        phone: '+61 400 345 679',
      },
      {
        email: 'chris.taylor@example.com',
        password: hashedPassword,
        name: 'Chris Taylor',
        role: 'rural_homeowner' as const,
        bio: 'NSW Southern Tablelands, farm property',
        region: 'NSW Southern Tablelands',
        phone: '+61 400 345 680',
      },
      // Utility Engineers (Infrastructure) - 5 users
      {
        email: 'raj.kaur@ausgrid.com.au',
        password: hashedPassword,
        name: 'Raj Kaur',
        role: 'utility_engineer' as const,
        bio: 'Grid sparks 30% fires, Ausgrid transmission specialist',
        region: 'NSW Sydney',
        phone: '+61 400 456 781',
      },
      {
        email: 'liam.osullivan@tasnetworks.com.au',
        password: hashedPassword,
        name: 'Liam O\'Sullivan',
        role: 'utility_engineer' as const,
        bio: 'TAS grid resilience specialist, extreme weather expert',
        region: 'TAS Hobart',
        phone: '+61 400 456 782',
      },
      {
        email: 'amy.zhang@energex.com.au',
        password: hashedPassword,
        name: 'Amy Zhang',
        role: 'utility_engineer' as const,
        bio: 'QLD power infrastructure, bushfire risk mitigation',
        region: 'QLD Brisbane',
        phone: '+61 400 456 783',
      },
      {
        email: 'daniel.kim@powercor.com.au',
        password: hashedPassword,
        name: 'Daniel Kim',
        role: 'utility_engineer' as const,
        bio: 'VIC distribution network, fire prevention systems',
        region: 'VIC Melbourne',
        phone: '+61 400 456 784',
      },
      {
        email: 'emma.walsh@westernpower.wa.gov.au',
        password: hashedPassword,
        name: 'Emma Walsh',
        role: 'utility_engineer' as const,
        bio: 'WA power grid, rural line protection',
        region: 'WA Perth',
        phone: '+61 400 456 785',
      },
      // Wildlife Biologists (Ecosystem) - 5 users
      {
        email: 'lena.kowalski@parks.gov.au',
        password: hashedPassword,
        name: 'Lena Kowalski',
        role: 'wildlife_biologist' as const,
        bio: 'Koala heat-stress tracker, NSW wildlife specialist',
        region: 'NSW',
        phone: '+61 400 567 891',
      },
      {
        email: 'dylan.ng@wwf.org.au',
        password: hashedPassword,
        name: 'Dylan Ng',
        role: 'wildlife_biologist' as const,
        bio: 'QLD megafauna ecology expert, post-fire recovery',
        region: 'QLD',
        phone: '+61 400 567 892',
      },
      {
        email: 'sarah.connor@australianwildlife.org',
        password: hashedPassword,
        name: 'Sarah Connor',
        role: 'wildlife_biologist' as const,
        bio: 'VIC wildlife rescue, post-fire triage specialist',
        region: 'VIC',
        phone: '+61 400 567 893',
      },
      {
        email: 'michael.fitzgerald@parks.wa.gov.au',
        password: hashedPassword,
        name: 'Michael Fitzgerald',
        role: 'wildlife_biologist' as const,
        bio: 'WA native species protection, habitat restoration',
        region: 'WA',
        phone: '+61 400 567 894',
      },
      {
        email: 'nicole.brown@tasparks.tas.gov.au',
        password: hashedPassword,
        name: 'Nicole Brown',
        role: 'wildlife_biologist' as const,
        bio: 'TAS endangered species, wilderness conservation',
        region: 'TAS',
        phone: '+61 400 567 895',
      },
    ]
    await User.insertMany(users)

    // Seed Drones - DJI Matrice 300 RTK with FLIR payloads
    const drones = [
      {
        name: 'DJI-M300-001',
        droneModel: 'DJI Matrice 300 RTK',
        status: 'patrolling' as const,
        location: { lat: -33.8688, lng: 151.2093, altitude: 120 },
        battery: 85,
        zone: 'Blue Mountains West',
        lastUpdate: new Date(),
      },
      {
        name: 'DJI-M300-002',
        droneModel: 'DJI Matrice 300 RTK',
        status: 'active' as const,
        location: { lat: -37.8136, lng: 144.9631, altitude: 100 },
        battery: 92,
        zone: 'Great Ocean Road',
        lastUpdate: new Date(),
      },
      {
        name: 'DJI-M300-003',
        droneModel: 'DJI Matrice 300 RTK',
        status: 'patrolling' as const,
        location: { lat: -27.4698, lng: 153.0251, altitude: 110 },
        battery: 78,
        zone: 'Wet Tropics',
        lastUpdate: new Date(),
      },
      {
        name: 'DJI-M300-004',
        droneModel: 'DJI Matrice 300 RTK',
        status: 'active' as const,
        location: { lat: -31.9505, lng: 115.8605, altitude: 105 },
        battery: 88,
        zone: 'Karri Forests',
        lastUpdate: new Date(),
      },
      {
        name: 'DJI-M300-005',
        droneModel: 'DJI Matrice 300 RTK',
        status: 'maintenance' as const,
        location: { lat: -34.9285, lng: 138.6007, altitude: 0 },
        battery: 45,
        zone: 'Adelaide Hills',
        lastUpdate: new Date(),
      },
    ]
    await Drone.insertMany(drones)

    // Seed Geofences - Australian regions
    const geofences = [
      {
        name: 'Blue Mountains High Risk',
        description: 'Eucalypt fuel load zone - Black Summer affected area',
        coordinates: [
          [-33.9, 150.3],
          [-33.8, 150.3],
          [-33.8, 150.4],
          [-33.9, 150.4],
          [-33.9, 150.3],
        ],
        type: 'proactive' as const,
        priority: 'high' as const,
        area: 45,
        region: 'NSW Blue Mountains',
      },
      {
        name: 'Great Ocean Road Fringe',
        description: 'Coastal bushfire corridor - ember attack zone',
        coordinates: [
          [-38.5, 143.5],
          [-38.4, 143.5],
          [-38.4, 143.6],
          [-38.5, 143.6],
          [-38.5, 143.5],
        ],
        type: 'reactive' as const,
        priority: 'critical' as const,
        area: 32,
        region: 'VIC Great Ocean Road',
      },
      {
        name: 'Koala Habitat Zone - Wet Tropics',
        description: 'Koala thermal stress monitoring - Red Dawn 2024 affected',
        coordinates: [
          [-27.5, 153.0],
          [-27.4, 153.0],
          [-27.4, 153.1],
          [-27.5, 153.1],
          [-27.5, 153.0],
        ],
        type: 'wildlife' as const,
        priority: 'medium' as const,
        area: 28,
        region: 'QLD Wet Tropics',
      },
      {
        name: 'Ausgrid Power Line Corridor',
        description: 'Utility infrastructure - Pacific Highway adjacent',
        coordinates: [
          [-33.7, 151.0],
          [-33.6, 151.0],
          [-33.6, 151.1],
          [-33.7, 151.1],
          [-33.7, 151.0],
        ],
        type: 'utility' as const,
        priority: 'high' as const,
        area: 15,
        region: 'NSW Sydney',
      },
      {
        name: 'TAS Southwest Wilderness',
        description: 'Remote backburn coordination zone',
        coordinates: [
          [-43.5, 146.0],
          [-43.4, 146.0],
          [-43.4, 146.1],
          [-43.5, 146.1],
          [-43.5, 146.0],
        ],
        type: 'proactive' as const,
        priority: 'medium' as const,
        area: 38,
        region: 'TAS Southwest',
      },
    ]
    await Geofence.insertMany(geofences)

    // Seed Subscribers - Rural homeowners
    const subscribers = [
      {
        name: 'Priya Singh',
        email: 'priya.singh@example.com',
        phone: '+61 400 123 456',
        location: { lat: -31.0833, lng: 150.9167, address: 'Tamworth, NSW' },
        alertsEnabled: true,
        subscribedZones: ['Blue Mountains High Risk'],
      },
      {
        name: 'Jacko Wilson',
        email: 'jacko.wilson@example.com',
        phone: '+61 400 789 012',
        location: { lat: -31.95, lng: 115.86, address: 'Perth, WA' },
        alertsEnabled: true,
        subscribedZones: ['Great Ocean Road Fringe'],
      },
      {
        name: 'Margaret Chen',
        email: 'margaret.chen@example.com',
        phone: '+61 400 345 678',
        location: { lat: -42.88, lng: 147.33, address: 'Hobart, TAS' },
        alertsEnabled: true,
        subscribedZones: ['TAS Southwest Wilderness'],
      },
    ]
    await Subscriber.insertMany(subscribers)

    // Seed Recent Detections
    const detections = [
      {
        timestamp: new Date(Date.now() - 3600000),
        location: { lat: -33.8688, lng: 151.2093 },
        temperature: 32.5,
        type: 'ember' as const,
        confidence: 0.85,
        droneId: 'DJI-M300-001',
        status: 'confirmed' as const,
      },
      {
        timestamp: new Date(Date.now() - 7200000),
        location: { lat: -37.8136, lng: 144.9631 },
        temperature: 28.3,
        type: 'spot_fire' as const,
        confidence: 0.92,
        droneId: 'DJI-M300-002',
        status: 'investigating' as const,
      },
    ]
    await Detection.insertMany(detections)

    // Seed Alerts
    const alerts = [
      {
        type: 'detection' as const,
        severity: 'warning' as const,
        title: 'Thermal ember detected',
        message: '2°C temperature spike detected in Blue Mountains zone - proactive sweep flagged potential ignition source',
        timestamp: new Date(),
        location: { lat: -33.8688, lng: 151.2093 },
        acknowledged: false,
      },
      {
        type: 'weather' as const,
        severity: 'info' as const,
        title: 'High fire danger forecast',
        message: 'BOM forecast: High fire danger for NSW tomorrow - consider backburn operations',
        timestamp: new Date(Date.now() - 3600000),
        acknowledged: false,
      },
      {
        type: 'wildlife' as const,
        severity: 'warning' as const,
        title: 'Koala heat stress alert',
        message: 'Elevated thermal readings in koala habitat zone - wildlife triage team dispatched',
        timestamp: new Date(Date.now() - 1800000),
        location: { lat: -27.4698, lng: 153.0251 },
        acknowledged: false,
      },
    ]
    await Alert.insertMany(alerts)

    console.log('Database seeded successfully with Australian data')
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}
