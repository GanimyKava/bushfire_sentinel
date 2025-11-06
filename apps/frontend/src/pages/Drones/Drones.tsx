import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from '@mui/material'
import {
  FlightTakeoff as DroneIcon,
  ExpandMore as ExpandMoreIcon,
  BatteryStd as BatteryIcon,
  Warning as WarningIcon,
} from '@mui/icons-material'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import api from '../../utils/axios'
import { Drone } from '../../types'
import { format } from 'date-fns'

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

const Drones = () => {
  const [drones, setDrones] = useState<Drone[]>([])
  const [expandedDrone, setExpandedDrone] = useState<string | false>(false)

  useEffect(() => {
    fetchDrones()
    const interval = setInterval(fetchDrones, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchDrones = () => {
    api
      .get('/drones')
      .then((res) => {
        console.log('Drones data received:', res.data)
        setDrones(res.data || [])
      })
      .catch((error) => {
        console.error('Error fetching drones:', error)
        setDrones([])
      })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'patrolling':
        return 'primary'
      case 'idle':
        return 'success'
      case 'charging':
        return 'warning'
      case 'maintenance':
        return 'error'
      default:
        return 'default'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'patrolling':
        return <DroneIcon sx={{ color: 'primary.main', mr: 1 }} />
      case 'charging':
        return <BatteryIcon sx={{ color: 'warning.main', mr: 1 }} />
      case 'maintenance':
        return <WarningIcon sx={{ color: 'error.main', mr: 1 }} />
      default:
        return <DroneIcon sx={{ mr: 1 }} />
    }
  }

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedDrone(isExpanded ? panel : false)
  }

  const inFlightCount = drones.filter((d) => d.status === 'patrolling').length

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Drone Fleet Management
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Monitor and manage your bushfire detection drone fleet
      </Typography>

      {/* Summary Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <DroneIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography variant="h4">{drones.length}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Drones
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <DroneIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography variant="h4">{inFlightCount}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    In Flight
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Drone Fleet List */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Drone Fleet
          </Typography>
          <Box>
            {drones.map((drone, index) => {
              const isExpanded = expandedDrone === drone._id
              const daysAgo = drone.lastAlert
                ? Math.floor((Date.now() - new Date(drone.lastAlert).getTime()) / (1000 * 60 * 60 * 24))
                : null

              return (
                <Accordion
                  key={drone._id}
                  expanded={isExpanded}
                  onChange={handleChange(drone._id)}
                  sx={{ mb: 1 }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', pr: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                        {getStatusIcon(drone.status)}
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {drone.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {drone.droneModel}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 100 }}>
                          <BatteryIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="body2" sx={{ minWidth: 40 }}>
                            {drone.battery}%
                          </Typography>
                          <Chip
                            label={drone.status}
                            size="small"
                            color={getStatusColor(drone.status) as any}
                            sx={{ ml: 1 }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={3}>
                      {/* Drone Specifications */}
                      <Grid item xs={12} md={4}>
                        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                          Drone Specifications
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            <strong>Range:</strong> 15 km (BVLOS)
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            <strong>Battery Capacity:</strong> 6140 mAh
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            <strong>Max Flight Time:</strong> {drone.specs?.flightTime || 55} min
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            <strong>Thermal Camera:</strong> {drone.specs?.camera || 'FLIR TZ20-R'}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            <strong>Resolution:</strong> 4K (3840×2160)
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            <strong>IMEI:</strong> 357123456789{String(index + 1).padStart(3, '0')}
                          </Typography>
                          <Typography variant="body2">
                            <strong>IP Address:</strong> 192.168.1.{100 + index + 1}
                          </Typography>
                        </Box>
                      </Grid>

                      {/* 5G Slice Information */}
                      <Grid item xs={12} md={4}>
                        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                          5G Slice Information
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            <strong>Slice Name:</strong> Slice-{drone.networkSlice || 'Standard'}-{String(index + 1).padStart(2, '0')}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            <strong>Latency:</strong> {drone.specs?.latency || drone.networkSlice === 'URLLC' ? '<5ms' : '<10ms'}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            <strong>Bandwidth:</strong> {drone.networkSlice === 'URLLC' ? '800Mbps UL / 1Gbps DL' : '60Mbps UL / 350Mbps DL'}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            <strong>Priority:</strong> {drone.patrollingType === 'proactive' ? 'proactive thermal scan' : 'reactive fire response'}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            <strong>QoS Class:</strong> 5Q1-{drone.networkSlice === 'URLLC' ? '9' : '8'}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            <strong>Slice ID:</strong> {String(index + 1).padStart(3, '0')}-{drone.networkSlice || 'Standard'}
                          </Typography>
                          <Typography variant="body2">
                            <strong>PLMN:</strong> 505-01 (Telstra)
                          </Typography>
                        </Box>
                      </Grid>

                      {/* Current Status */}
                      <Grid item xs={12} md={4}>
                        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                          Current Status
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                            Last Thermal Detection:
                          </Typography>
                          {drone.lastAlert ? (
                            <Box>
                              <Typography variant="body2" sx={{ mb: 0.5 }}>
                                <strong>Date/Time:</strong> {format(new Date(drone.lastAlert), 'd/M/yyyy, h:mm:ss a')}
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 0.5 }}>
                                <strong>Type:</strong> {drone.patrollingType === 'proactive' ? 'Ember Detection' : 'Spot Fire Detection'}
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 0.5 }}>
                                <strong>Confidence:</strong> {Math.floor(85 + Math.random() * 10)}%
                              </Typography>
                              <Typography variant="body2">
                                <strong>Location:</strong> {drone.zone || 'Unknown Zone'}
                              </Typography>
                            </Box>
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              No detections yet
                            </Typography>
                          )}
                          {daysAgo !== null && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                              Last detected {daysAgo === 0 ? 'today' : `${daysAgo}d ago`}
                            </Typography>
                          )}
                        </Box>
                      </Grid>

                      {/* Network Location Map */}
                      <Grid item xs={12}>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
                          Network Location
                        </Typography>
                        <Box sx={{ height: 300, mb: 2 }}>
                          <MapContainer
                            center={[drone.location.lat, drone.location.lng]}
                            zoom={12}
                            style={{ height: '100%', width: '100%' }}
                          >
                            <TileLayer
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            />
                            <Marker position={[drone.location.lat, drone.location.lng]}>
                              <Popup>
                                <Typography variant="subtitle2">{drone.name}</Typography>
                                <Typography variant="body2">{drone.droneModel}</Typography>
                                <Typography variant="body2">Status: {drone.status}</Typography>
                                <Typography variant="body2">Battery: {drone.battery}%</Typography>
                                {drone.zone && (
                                  <Typography variant="body2">Zone: {drone.zone}</Typography>
                                )}
                              </Popup>
                            </Marker>
                          </MapContainer>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="caption" color="text.secondary">
                            Last updated: {format(new Date(drone.lastUpdate), 'd/M/yyyy, h:mm:ss a')}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Lat: {drone.location.lat.toFixed(6)}, Lng: {drone.location.lng.toFixed(6)}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              )
            })}
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Drones
