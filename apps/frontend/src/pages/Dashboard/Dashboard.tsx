import { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
  LinearProgress,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import {
  FlightTakeoff as DroneIcon,
  Map as MapIcon,
  Warning as AlertIcon,
  Pets as WildlifeIcon,
  PlayArrow as PlayIcon,
  LocalFireDepartment as FireIcon,
  People as PeopleIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  WatchLater as WatchLaterIcon,
  BatteryChargingFull as BatteryIcon,
} from '@mui/icons-material'
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Tooltip } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import api from '../../utils/axios'
import { format } from 'date-fns'
import { Geofence as GeofenceType, Alert as AlertType } from '../../types'

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Create fire marker icon for alerts
const fireMarkerIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjRkY0NzAwIi8+Cjwvc3ZnPgo=',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
})

const Dashboard = () => {
  const [drones, setDrones] = useState<any[]>([])
  const [recentAlerts, setRecentAlerts] = useState<any[]>([])
  const [recentDetections, setRecentDetections] = useState<any[]>([])
  const [isSimulating, setIsSimulating] = useState(false)
  const [geofences, setGeofences] = useState<GeofenceType[]>([])
  const [alerts, setAlerts] = useState<AlertType[]>([])
  const [geofenceFilter, setGeofenceFilter] = useState<'my' | 'all'>('my') // Default to "My Geofences"
  const [alertsRange, setAlertsRange] = useState<'active' | '24hours' | '7days'>('active')
  const [center] = useState<[number, number]>([-25.2744, 133.7751]) // Australia center

  useEffect(() => {
    // Fetch dashboard data
    api.get('/drones').then((res) => {
      setDrones(res.data || [])
    }).catch(() => {
      setDrones([])
    })
    
    api.get('/alerts?limit=10&timeFilter=24hours').then((res) => {
      setRecentAlerts(res.data || [])
    }).catch(() => {
      setRecentAlerts([])
    })
    
    api.get('/detections?limit=5').then((res) => {
      setRecentDetections(res.data || [])
    }).catch(() => {
      setRecentDetections([])
    })

    fetchGeofences()
    fetchAlerts()
  }, [])

  useEffect(() => {
    fetchAlerts()
  }, [alertsRange])

  const fetchGeofences = () => {
    api.get('/geofences').then((res) => {
      setGeofences(res.data || [])
    }).catch(() => {
      setGeofences([])
    })
  }

  const fetchAlerts = () => {
    const timeFilter = alertsRange === 'active' ? undefined : alertsRange
    api.get(`/alerts${timeFilter ? `?timeFilter=${timeFilter}` : ''}`).then((res) => {
      setAlerts(res.data || [])
    }).catch(() => {
      setAlerts([])
    })
  }

  const getGeofenceColor = (geofence: GeofenceType): string => {
    // Map color-coded geofences based on alerts (same logic as Alerts page)
    const activeAlerts = filteredAlerts.filter((a) => a.geofenceId === geofence._id && a.status === 'active')
    const emberAlerts = filteredAlerts.filter((a) => a.geofenceId === geofence._id && a.type === 'ember_cloud')
    const patrolledAlerts = filteredAlerts.filter((a) => a.geofenceId === geofence._id && a.status === 'patrolled')

    if (activeAlerts.length > 0 && geofence.riskLevel === 'critical') {
      return '#ff0000' // Red: Active Severe
    } else if (emberAlerts.length > 0) {
      return '#ff8800' // Orange: Ember Risk
    } else if (patrolledAlerts.length > 0) {
      return '#00ff00' // Green: Patrolled
    }

    // Default based on risk level
    switch (geofence.riskLevel) {
      case 'critical':
        return '#ff4444'
      case 'high':
        return '#ff8800'
      case 'medium':
        return '#ffaa00'
      case 'low':
        return '#88ff88'
      default:
        return '#888888'
    }
  }


  const filteredGeofences = geofenceFilter === 'my' 
    ? geofences.filter((g) => g.region?.toLowerCase().includes('nsw')) // Filter for NSW geofences
    : geofences // Show all geofences across Australia

  // Get list of filtered geofence IDs for alert filtering
  const filteredGeofenceIds = filteredGeofences.map((g) => g._id)

  const filteredAlerts = alerts.filter((alert) => {
    // First filter by alerts range
    const passesTimeFilter = alertsRange === 'active' 
      ? (alert.status === 'active' || !alert.status)
      : true // Time filter is handled by API
    
    if (!passesTimeFilter) return false

    // Filter alerts to only show those associated with currently selected geofences
    if (alert.geofenceId) {
      return filteredGeofenceIds.includes(alert.geofenceId)
    }
    
    // If alert doesn't have geofenceId, check if location is within any filtered geofence
    if (alert.location?.lat && alert.location?.lng) {
      // Check if alert location is within any of the filtered geofences
      return filteredGeofences.some((geofence) => {
        if (!geofence.center) return false
        // Simple distance check (within ~50km of geofence center)
        // For more accuracy, you'd need to check if point is inside polygon
        const distance = Math.sqrt(
          Math.pow(alert.location!.lat - geofence.center.lat, 2) +
          Math.pow(alert.location!.lng - geofence.center.lng, 2)
        )
        // Rough approximation: 0.5 degrees ≈ 50km at Australian latitudes
        return distance < 0.5
      })
    }
    
    // If no geofenceId and no location, don't show the alert
    return false
  })

  const handleSimulate = async () => {
    setIsSimulating(true)
    try {
      await api.post('/detections/simulate')
    } catch (error) {
      console.error('Simulation error:', error)
    }
    setTimeout(() => setIsSimulating(false), 30000)
  }

  const handleLaunchPatrol = () => {
    window.location.href = '/drones?action=launch'
  }

  // Calculate drone fleet status
  const droneStatus = {
    patrolling: drones.filter((d) => d.status === 'patrolling').length,
    idle: drones.filter((d) => d.status === 'idle').length,
    charging: drones.filter((d) => d.status === 'charging').length,
    maintenance: drones.filter((d) => d.status === 'maintenance').length,
    offline: drones.filter((d) => d.status === 'offline').length,
  }

  // Calculate alert distribution
  const alertDistribution = {
    critical: recentAlerts.filter((a) => a.severity === 'critical' || a.severity === 'high').length,
    warning: recentAlerts.filter((a) => a.severity === 'warning' || a.severity === 'medium').length,
    info: recentAlerts.filter((a) => a.severity === 'info' || a.severity === 'low').length,
  }

  const totalAlerts = alertDistribution.critical + alertDistribution.warning + alertDistribution.info

  return (
    <Box>
      {/* Metrics Cards - Separate cards in a single row */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Monitored Zones */}
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <MapIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    150km²
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Monitored Zones
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Active Geofences */}
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <MapIcon sx={{ fontSize: 32, color: 'success.main' }} />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: 'success.main' }}>
                    22
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Geofences
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Active Drones */}
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <DroneIcon sx={{ fontSize: 32, color: 'info.main' }} />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: 'info.main' }}>
                    12
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Drones
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Alerts Today */}
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <AlertIcon sx={{ fontSize: 32, color: 'warning.main' }} />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: 'warning.main' }}>
                    5
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Alerts Today
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Wildlife Rescues */}
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <WildlifeIcon sx={{ fontSize: 32, color: 'success.main' }} />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: 'success.main' }}>
                    23
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Wildlife Rescues
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Subscribers */}
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <PeopleIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    30
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Subscribers
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<PlayIcon />}
          onClick={handleSimulate}
          disabled={isSimulating}
          sx={{ backgroundColor: 'primary.main' }}
        >
          {isSimulating ? 'Simulating Detection...' : 'Simulate Detection'}
        </Button>
        <Button
          variant="outlined"
          size="large"
          startIcon={<DroneIcon />}
          onClick={handleLaunchPatrol}
          sx={{ borderColor: 'primary.main', color: 'primary.main' }}
        >
          Launch Patrol
        </Button>
      </Box>

      {/* 4 Quadrants Layout */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Top Left Quadrant - Map with Dropdowns */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent>
              {/* Dropdowns */}
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <FormControl size="small" sx={{ minWidth: 180 }}>
                  <InputLabel>Geofences</InputLabel>
                  <Select
                    value={geofenceFilter}
                    label="Geofences"
                    onChange={(e) => setGeofenceFilter(e.target.value as 'my' | 'all')}
                  >
                    <MenuItem value="my">My Geofences</MenuItem>
                    <MenuItem value="all">All Geofences</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 180 }}>
                  <InputLabel>Alerts Range</InputLabel>
                  <Select
                    value={alertsRange}
                    label="Alerts Range"
                    onChange={(e) => setAlertsRange(e.target.value as 'active' | '24hours' | '7days')}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="24hours">Last 24 hours</MenuItem>
                    <MenuItem value="7days">Last 7 days</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              
              {/* Map */}
              <Box sx={{ height: '400px', width: '100%', borderRadius: 1, overflow: 'hidden' }}>
                <MapContainer 
                  center={center} 
                  zoom={4} 
                  minZoom={4}
                  maxBounds={[[-44, 113], [-10, 154]]} // Australia bounds [south, west], [north, east]
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  {/* Geofences as CircleMarkers (matching Alerts page) */}
                  {filteredGeofences && filteredGeofences.length > 0 && filteredGeofences.map((geofence) => {
                    const color = getGeofenceColor(geofence)
                    const centerCoord = geofence.center || {
                      lat: geofence.coordinates?.[0]?.[1] || -33.8688,
                      lng: geofence.coordinates?.[0]?.[0] || 151.2093,
                    }
                    const geofenceAlerts = filteredAlerts.filter((a) => a.geofenceId === geofence._id)
                    
                    return (
                      <CircleMarker
                        key={geofence._id}
                        center={[centerCoord.lat, centerCoord.lng]}
                        radius={10 + geofenceAlerts.length * 2}
                        pathOptions={{
                          color: color,
                          fillColor: color,
                          fillOpacity: 0.6,
                          weight: 2,
                        }}
                      >
                        <Popup>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {geofence.name}
                          </Typography>
                          <Typography variant="caption">
                            Risk: {geofence.riskLevel || 'Unknown'} • {geofenceAlerts.length} alerts
                          </Typography>
                          <Typography variant="caption" sx={{ display: 'block' }}>
                            Area: {geofence.area} km²
                          </Typography>
                        </Popup>
                      </CircleMarker>
                    )
                  })}

                  {/* Alerts as Fire Markers with Hover Tooltips */}
                  {filteredAlerts && filteredAlerts.length > 0 && filteredAlerts
                    .filter((a) => a.location && (a.status === 'active' || !a.status))
                    .map((alert) => {
                      if (!alert.location?.lat || !alert.location?.lng) return null
                      
                      // Find associated geofence
                      const associatedGeofence = alert.geofenceId 
                        ? geofences.find((g) => g._id === alert.geofenceId)
                        : geofences.find((g) => {
                            if (!g.center || !alert.location) return false
                            // Check if alert is within geofence (simple distance check)
                            const distance = Math.sqrt(
                              Math.pow(alert.location.lat - g.center.lat, 2) +
                              Math.pow(alert.location.lng - g.center.lng, 2)
                            )
                            return distance < 0.5 // Rough approximation
                          })
                      
                      return (
                        <Marker
                          key={alert._id}
                          position={[alert.location.lat, alert.location.lng]}
                          icon={fireMarkerIcon}
                        >
                          <Tooltip permanent={false}>
                            <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
                              <strong>{alert.title}</strong><br/>
                              Type: {alert.type?.replace('_', ' ').toUpperCase() || 'Unknown'}<br/>
                              Severity: {alert.severity?.toUpperCase() || 'Unknown'}<br/>
                              Status: {alert.status?.toUpperCase() || 'ACTIVE'}<br/>
                              Location: {alert.location.name || 'Unknown'}<br/>
                              {alert.timestamp && (
                                <>
                                  Time: {format(new Date(alert.timestamp), 'MMM dd, HH:mm')}<br/>
                                </>
                              )}
                              {associatedGeofence?.populationDensity !== undefined && (
                                <>
                                  Pop. Density: {associatedGeofence.populationDensity} people/km²<br/>
                                </>
                              )}
                              {alert.actions && alert.actions.length > 0 && (
                                <>
                                  Actions: {alert.actions.slice(0, 2).join(', ')}
                                  {alert.actions.length > 2 && ` +${alert.actions.length - 2} more`}<br/>
                                </>
                              )}
                              {alert.impact && (
                                <>
                                  <strong>Impact:</strong> {alert.impact}
                                </>
                              )}
                            </div>
                          </Tooltip>
                          <Popup>
                            <Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                {alert.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                {alert.message || 'No description available'}
                              </Typography>
                              <Box sx={{ mb: 1 }}>
                                <Chip
                                  label={alert.severity?.toUpperCase() || 'UNKNOWN'}
                                  size="small"
                                  color={
                                    alert.severity === 'critical' || alert.severity === 'high' ? 'error' :
                                    alert.severity === 'warning' || alert.severity === 'medium' ? 'warning' : 'info'
                                  }
                                  sx={{ mr: 0.5 }}
                                />
                                <Chip
                                  label={alert.status?.toUpperCase() || 'ACTIVE'}
                                  size="small"
                                  variant="outlined"
                                  sx={{ mr: 0.5 }}
                                />
                              </Box>
                              <Typography variant="body2" sx={{ mb: 0.5 }}>
                                <strong>Location:</strong> {alert.location.name || 'Unknown Location'}
                              </Typography>
                              {alert.timestamp && (
                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                  <strong>Time:</strong> {format(new Date(alert.timestamp), 'PPp')}
                                </Typography>
                              )}
                              {alert.actions && alert.actions.length > 0 && (
                                <Box sx={{ mt: 1 }}>
                                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                                    Actions Taken:
                                  </Typography>
                                  {alert.actions.map((action, idx) => (
                                    <Typography key={idx} variant="caption" sx={{ display: 'block' }}>
                                      • {action}
                                    </Typography>
                                  ))}
                                </Box>
                              )}
                              {alert.impact && (
                                <Box sx={{ mt: 1 }}>
                                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    Impact:
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {alert.impact}
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                          </Popup>
                        </Marker>
                      )
                    })}
                </MapContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Right Quadrant - Recent Detections */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FireIcon color="error" />
                Recent Detections
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              {recentDetections.length > 0 ? (
                <List sx={{ maxHeight: 400, overflow: 'auto' }}>
                  {recentDetections.map((detection, index) => (
                    <Box key={detection._id || index}>
                      <ListItem sx={{ px: 0 }}>
                        <Avatar sx={{ bgcolor: 'error.main', mr: 2, width: 32, height: 32 }}>
                          <FireIcon sx={{ fontSize: 18 }} />
                        </Avatar>
                        <ListItemText
                          primary={
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {detection.type?.replace('_', ' ').toUpperCase() || 'Detection'}
                            </Typography>
                          }
                          secondary={
                            <Box>
                              <Typography variant="caption" color="text.secondary">
                                {detection.location?.name || 'Unknown Location'}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                {detection.timestamp ? format(new Date(detection.timestamp), 'HH:mm') : 'Just now'}
                              </Typography>
                            </Box>
                          }
                        />
                        <Chip
                          label={detection.status || 'active'}
                          size="small"
                          color={
                            detection.status === 'resolved' ? 'success' :
                            detection.status === 'controlled' ? 'warning' : 'error'
                          }
                        />
                      </ListItem>
                      {index < recentDetections.length - 1 && <Divider />}
                    </Box>
                  ))}
                </List>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <WatchLaterIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    No recent detections
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Bottom Left Quadrant - Drone Fleet Status */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DroneIcon color="primary" />
                Drone Fleet Status
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Patrolling</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {droneStatus.patrolling} / {drones.length || 20}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={drones.length > 0 ? (droneStatus.patrolling / drones.length) * 100 : 60}
                  sx={{ height: 8, borderRadius: 4, backgroundColor: 'grey.200' }}
                  color="success"
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Idle</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {droneStatus.idle} / {drones.length || 20}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={drones.length > 0 ? (droneStatus.idle / drones.length) * 100 : 25}
                  sx={{ height: 8, borderRadius: 4, backgroundColor: 'grey.200' }}
                  color="info"
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Charging</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {droneStatus.charging} / {drones.length || 20}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={drones.length > 0 ? (droneStatus.charging / drones.length) * 100 : 10}
                  sx={{ height: 8, borderRadius: 4, backgroundColor: 'grey.200' }}
                  color="warning"
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Maintenance</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {droneStatus.maintenance} / {drones.length || 20}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={drones.length > 0 ? (droneStatus.maintenance / drones.length) * 100 : 5}
                  sx={{ height: 8, borderRadius: 4, backgroundColor: 'grey.200' }}
                  color="error"
                />
              </Box>

              <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <BatteryIcon sx={{ color: 'success.main' }} />
                  <Typography variant="body2" color="text.secondary">
                    Avg Battery: 78%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Bottom Right Quadrant - Alert Distribution */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AlertIcon color="warning" />
                Alert Distribution
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ErrorIcon sx={{ color: 'error.main', fontSize: 20 }} />
                    <Typography variant="body2">Critical/High</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'error.main' }}>
                    {alertDistribution.critical}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={totalAlerts > 0 ? (alertDistribution.critical / totalAlerts) * 100 : 30}
                  sx={{ height: 8, borderRadius: 4, backgroundColor: 'grey.200' }}
                  color="error"
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AlertIcon sx={{ color: 'warning.main', fontSize: 20 }} />
                    <Typography variant="body2">Warning/Medium</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'warning.main' }}>
                    {alertDistribution.warning}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={totalAlerts > 0 ? (alertDistribution.warning / totalAlerts) * 100 : 50}
                  sx={{ height: 8, borderRadius: 4, backgroundColor: 'grey.200' }}
                  color="warning"
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircleIcon sx={{ color: 'info.main', fontSize: 20 }} />
                    <Typography variant="body2">Info/Low</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'info.main' }}>
                    {alertDistribution.info}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={totalAlerts > 0 ? (alertDistribution.info / totalAlerts) * 100 : 20}
                  sx={{ height: 8, borderRadius: 4, backgroundColor: 'grey.200' }}
                  color="info"
                />
              </Box>

              <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                <Typography variant="body2" color="text.secondary">
                  Total Alerts (24h): <Typography component="span" sx={{ fontWeight: 600, color: 'primary.main' }}>{totalAlerts || 5}</Typography>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Alerts - Full Width Below Quadrants */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AlertIcon color="warning" />
                Recent Alerts (Last 24 Hours)
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              {recentAlerts.length > 0 ? (
                <List>
                  {recentAlerts.slice(0, 10).map((alert, index) => (
                    <Box key={alert._id || index}>
                      <ListItem>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {alert.title}
                              </Typography>
                              <Chip
                                label={alert.severity || 'info'}
                                size="small"
                                color={
                                  alert.severity === 'critical' || alert.severity === 'high'
                                    ? 'error'
                                    : alert.severity === 'warning' || alert.severity === 'medium'
                                    ? 'warning'
                                    : 'info'
                                }
                              />
                              {alert.status && (
                                <Chip
                                  label={alert.status}
                                  size="small"
                                  variant="outlined"
                                  color={
                                    alert.status === 'resolved' ? 'success' :
                                    alert.status === 'controlled' ? 'warning' : 'default'
                                  }
                                />
                              )}
                            </Box>
                          }
                          secondary={
                            <Box sx={{ mt: 0.5 }}>
                              <Typography variant="body2" color="text.secondary">
                                {alert.location?.name || 'Unknown Location'} • {alert.timestamp ? format(new Date(alert.timestamp), 'PPp') : 'Unknown time'}
                              </Typography>
                              {alert.message && (
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                  {alert.message}
                                </Typography>
                              )}
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < Math.min(recentAlerts.length, 10) - 1 && <Divider />}
                    </Box>
                  ))}
                </List>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <AlertIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    No alerts in the last 24 hours
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard
