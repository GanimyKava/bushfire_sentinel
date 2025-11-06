import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tooltip,
} from '@mui/material'
import {
  CheckCircle as CheckIcon,
  PlayArrow as PlayIcon,
  LocationOn as LocationIcon,
  Warning as WarningIcon,
  LocalFireDepartment as FireIcon,
} from '@mui/icons-material'
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import api from '../../utils/axios'
import { Alert, Geofence, Subscriber } from '../../types'
import { format, formatDistanceToNow } from 'date-fns'
import { useAuth } from '../../contexts/AuthContext'

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Create fire marker icon
const fireMarkerIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjRkY0NzAwIi8+Cjwvc3ZnPgo=',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
})

const Alerts = () => {
  const { user } = useAuth()
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [geofences, setGeofences] = useState<Geofence[]>([])
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [timeFilter, setTimeFilter] = useState('6hours')
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)
  const [videoDialog, setVideoDialog] = useState(false)
  const [center] = useState<[number, number]>([-25.2744, 133.7751]) // Australia center

  const fetchAlerts = () => {
    console.log('Fetching alerts with timeFilter:', timeFilter)
    api
      .get('/alerts', { params: { timeFilter, limit: 100 } })
      .then((res) => {
        console.log('Alerts API response:', res)
        console.log('Alerts data received:', res.data)
        console.log('Number of alerts:', res.data?.length || 0)
        if (Array.isArray(res.data)) {
          setAlerts(res.data)
        } else {
          console.warn('Response data is not an array:', res.data)
          setAlerts([])
        }
      })
      .catch((error) => {
        console.error('Error fetching alerts:', error)
        console.error('Error response:', error.response?.data)
        console.error('Error status:', error.response?.status)
        setAlerts([])
      })
  }

  useEffect(() => {
    fetchAlerts()
    fetchGeofences()
    fetchSubscribers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeFilter])

  const fetchGeofences = () => {
    api
      .get('/geofences')
      .then((res) => {
        setGeofences(res.data || [])
      })
      .catch((error) => {
        console.error('Error fetching geofences:', error)
        setGeofences([])
      })
  }

  const fetchSubscribers = () => {
    api
      .get('/subscribers')
      .then((res) => {
        setSubscribers(res.data || [])
      })
      .catch((error) => {
        console.error('Error fetching subscribers:', error)
        setSubscribers([])
      })
  }

  const getRecipientInfo = (alert: Alert) => {
    if (alert.subscriberIds && alert.subscriberIds.length > 0) {
      const subscriber = subscribers.find((s) => alert.subscriberIds?.includes(s._id))
      if (subscriber) {
        return {
          name: subscriber.name,
          persona: subscriber.persona || 'Unknown',
        }
      }
    }
    if (alert.userId) {
      const subscriber = subscribers.find((s) => s.userId === alert.userId)
      if (subscriber) {
        return {
          name: subscriber.name,
          persona: subscriber.persona || 'Unknown',
        }
      }
    }
    return {
      name: 'System',
      persona: 'system',
    }
  }

  const getPersonaLabel = (persona?: string) => {
    if (!persona) return 'Unknown'
    return persona
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const handleAcknowledge = async (id: string) => {
    try {
      await api.patch(`/alerts/${id}`, { acknowledged: true })
      setAlerts((prev) => prev.map((a) => (a._id === id ? { ...a, acknowledged: true } : a)))
    } catch (error) {
      console.error('Error acknowledging alert:', error)
    }
  }

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'critical':
        return 'error'
      case 'high':
        return 'warning'
      case 'medium':
        return 'info'
      case 'low':
        return 'success'
      default:
        return 'default'
    }
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active':
        return 'error'
      case 'controlled':
        return 'warning'
      case 'resolved':
        return 'success'
      case 'patrolled':
        return 'info'
      default:
        return 'default'
    }
  }

  const getTypeLabel = (type?: string) => {
    switch (type) {
      case 'ember_cloud':
        return 'Ember Cloud Track'
      case 'hotspot':
        return 'Hotspot ID'
      case 'wildlife_rescue':
        return 'Wildlife Rescue'
      case 'evacuation':
        return 'Evacuation'
      case 'detection':
        return 'Fire Detection'
      case 'weather':
        return 'Weather Warning'
      case 'wildlife':
        return 'Wildlife Survey'
      case 'utility':
        return 'Utility Alert'
      default:
        return type || 'Unknown'
    }
  }

  const getGeofenceColor = (geofence: Geofence): string => {
    // Map color-coded geofences based on alerts
    const activeAlerts = alerts.filter((a) => a.geofenceId === geofence._id && a.status === 'active')
    const emberAlerts = alerts.filter((a) => a.geofenceId === geofence._id && a.type === 'ember_cloud')
    const patrolledAlerts = alerts.filter((a) => a.geofenceId === geofence._id && a.status === 'patrolled')

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

  const getPersonaRelevance = () => {
    if (!user?.role) return null

    const relevance: { [key: string]: string } = {
      fire_ranger: 'Your patrol zone - Monitor closely',
      incident_commander: 'Command priority - Coordinate response',
      rural_homeowner: 'Near your location - Check evacuation routes',
      utility_engineer: 'Infrastructure risk - Inspect immediately',
      wildlife_biologist: 'Wildlife impact - Habitat assessment needed',
    }

    return relevance[user.role] || null
  }

  const timeFilterOptions = [
    { value: '15min', label: 'Last 15 Minutes' },
    { value: '1hour', label: 'Last 1 Hour' },
    { value: '6hours', label: 'Last 6 Hours' },
    { value: '24hours', label: 'Last 24 Hours' },
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' },
    { value: '12months', label: 'Last 12 Months' },
  ]

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Alert Center
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Real-time bushfire alerts and notifications - {alerts.length} alerts found
      </Typography>

      {/* Filters */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Time Filter</InputLabel>
            <Select
              value={timeFilter}
              label="Time Filter"
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              {timeFilterOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
            <Chip
              icon={<FireIcon sx={{ color: '#ff0000 !important' }} />}
              label="Red: Active Severe"
              size="small"
              sx={{ bgcolor: '#ffebee' }}
            />
            <Chip
              icon={<WarningIcon sx={{ color: '#ff8800 !important' }} />}
              label="Orange: Ember Risk"
              size="small"
              sx={{ bgcolor: '#fff3e0' }}
            />
            <Chip
              icon={<CheckIcon sx={{ color: '#00ff00 !important' }} />}
              label="Green: Patrolled"
              size="small"
              sx={{ bgcolor: '#e8f5e9' }}
            />
          </Box>
        </Grid>
      </Grid>

      {/* Map Panel */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Alert Map - Color-Coded Geofences
              </Typography>
              <Box sx={{ height: 500, mt: 2 }}>
                <MapContainer
                  center={center}
                  zoom={5}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {geofences.map((geofence) => {
                    const color = getGeofenceColor(geofence)
                    const centerCoord = geofence.center || {
                      lat: geofence.coordinates?.[0]?.[1] || -33.8688,
                      lng: geofence.coordinates?.[0]?.[0] || 151.2093,
                    }
                    const geofenceAlerts = alerts.filter((a) => a.geofenceId === geofence._id)

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
                          <Typography variant="subtitle2">{geofence.name}</Typography>
                          <Typography variant="caption">
                            Risk: {geofence.riskLevel || 'Unknown'} • {geofenceAlerts.length} alerts
                          </Typography>
                        </Popup>
                      </CircleMarker>
                    )
                  })}
                  {alerts
                    .filter((a) => a.location && a.status === 'active')
                    .map((alert) => (
                      <Marker
                        key={alert._id}
                        position={[alert.location!.lat, alert.location!.lng]}
                        icon={fireMarkerIcon}
                      >
                        <Popup>
                          <Typography variant="subtitle2">{alert.title}</Typography>
                          <Typography variant="caption">{alert.location?.name}</Typography>
                        </Popup>
                      </Marker>
                    ))}
                </MapContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Alerts Table Panel */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Alerts ({alerts.length})
              </Typography>
              <TableContainer sx={{ maxHeight: 700, mt: 2, overflowX: 'auto' }}>
                <Table stickyHeader sx={{ tableLayout: 'auto' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Timestamp</TableCell>
                      <TableCell>Recipient</TableCell>
                      <TableCell>User Type</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Alert Type</TableCell>
                      <TableCell>Message</TableCell>
                      <TableCell>Actions Taken</TableCell>
                      <TableCell>Severity</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Impact</TableCell>
                      <TableCell>Live Feed</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {alerts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={11} align="center" sx={{ py: 4 }}>
                          <Typography variant="body2" color="text.secondary">
                            No alerts found for the selected time period
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      alerts.map((alert) => {
                        const personaRelevance = getPersonaRelevance()
                        const recipientInfo = getRecipientInfo(alert)
                        return (
                          <TableRow
                            key={alert._id}
                          >
                            {/* Timestamp */}
                            <TableCell>
                              <Box>
                                <Typography variant="body2">
                                  {format(new Date(alert.timestamp), 'MMM dd, HH:mm')}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                                </Typography>
                              </Box>
                            </TableCell>
                            
                            {/* Recipient */}
                            <TableCell>
                              <Typography 
                                variant="body2"
                                sx={{ wordBreak: 'break-word' }}
                              >
                                {recipientInfo.name}
                              </Typography>
                            </TableCell>
                            
                            {/* User Type */}
                            <TableCell>
                              <Chip
                                label={getPersonaLabel(recipientInfo.persona)}
                                size="small"
                                variant="outlined"
                                color={recipientInfo.persona === 'system' ? 'default' : 'primary'}
                              />
                            </TableCell>
                            
                            {/* Location */}
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LocationIcon fontSize="small" color="action" />
                                <Typography 
                                  variant="body2"
                                  sx={{ wordBreak: 'break-word' }}
                                >
                                  {alert.location?.name || 'Unknown Location'}
                                </Typography>
                              </Box>
                            </TableCell>
                            
                            {/* Alert Type */}
                            <TableCell>
                              <Chip
                                label={getTypeLabel(alert.type)}
                                size="small"
                                variant="outlined"
                              />
                            </TableCell>
                            
                            {/* Message */}
                            <TableCell>
                              <Tooltip title={alert.message || alert.title} arrow>
                                <Typography 
                                  variant="body2" 
                                  sx={{ 
                                    cursor: 'help',
                                    wordBreak: 'break-word',
                                    maxWidth: 300,
                                  }}
                                >
                                  {alert.message || alert.title || 'No message'}
                                </Typography>
                              </Tooltip>
                            </TableCell>
                            
                            {/* Actions Taken */}
                            <TableCell>
                              {alert.actions && alert.actions.length > 0 ? (
                                <Tooltip
                                  title={
                                    <Box>
                                      {alert.actions.map((action, idx) => (
                                        <Typography key={idx} variant="body2">
                                          • {action}
                                        </Typography>
                                      ))}
                                    </Box>
                                  }
                                  arrow
                                >
                                  <Typography 
                                    variant="body2" 
                                    sx={{ 
                                      cursor: 'help',
                                      wordBreak: 'break-word',
                                      maxWidth: 200,
                                    }}
                                  >
                                    {alert.actions.join(', ')}
                                  </Typography>
                                </Tooltip>
                              ) : (
                                <Typography variant="body2" color="text.secondary">
                                  No actions
                                </Typography>
                              )}
                            </TableCell>
                            
                            {/* Severity */}
                            <TableCell>
                              <Chip
                                label={alert.severity?.toUpperCase() || 'UNKNOWN'}
                                size="small"
                                color={getSeverityColor(alert.severity) as any}
                              />
                            </TableCell>
                            
                            {/* Status */}
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Chip
                                  label={alert.status?.toUpperCase() || 'UNKNOWN'}
                                  size="small"
                                  color={getStatusColor(alert.status) as any}
                                />
                                {personaRelevance && (
                                  <Tooltip title={personaRelevance}>
                                    <WarningIcon sx={{ fontSize: 16, color: 'warning.main' }} />
                                  </Tooltip>
                                )}
                              </Box>
                            </TableCell>
                            
                            {/* Impact */}
                            <TableCell>
                              <Tooltip title={alert.impact || 'No impact data'} arrow>
                                <Typography 
                                  variant="body2" 
                                  color="text.secondary" 
                                  sx={{ 
                                    cursor: 'help',
                                    wordBreak: 'break-word',
                                    maxWidth: 200,
                                  }}
                                >
                                  {alert.impact || 'No impact data'}
                                </Typography>
                              </Tooltip>
                            </TableCell>
                            
                            {/* Live Feed */}
                            <TableCell>
                              {(alert.videoUrl || alert.imageUrl) ? (
                                <IconButton
                                  size="small"
                                  onClick={() => {
                                    setSelectedAlert(alert)
                                    setVideoDialog(true)
                                  }}
                                  color="primary"
                                >
                                  <PlayIcon />
                                </IconButton>
                              ) : (
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                                  -
                                </Typography>
                              )}
                            </TableCell>
                          </TableRow>
                        )
                      })
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Video/Image Dialog */}
      <Dialog
        open={videoDialog}
        onClose={() => setVideoDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedAlert?.title} - {selectedAlert?.location?.name}
        </DialogTitle>
        <DialogContent>
          {selectedAlert && (
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {selectedAlert.message}
              </Typography>
              {selectedAlert.videoUrl && (
                <Box
                  component="img"
                  src={selectedAlert.videoUrl}
                  alt="Alert video"
                  sx={{ width: '100%', borderRadius: 1, mb: 2 }}
                />
              )}
              {selectedAlert.imageUrl && (
                <Box
                  component="img"
                  src={selectedAlert.imageUrl}
                  alt="Alert image"
                  sx={{ width: '100%', borderRadius: 1 }}
                />
              )}
              {selectedAlert.actions && selectedAlert.actions.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Actions Taken:
                  </Typography>
                  {selectedAlert.actions.map((action, idx) => (
                    <Chip
                      key={idx}
                      label={action}
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </Box>
              )}
              {selectedAlert.impact && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Impact:
                  </Typography>
                  <Typography variant="body2">{selectedAlert.impact}</Typography>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVideoDialog(false)}>Close</Button>
          {selectedAlert && !selectedAlert.acknowledged && (
            <Button
              variant="contained"
              onClick={() => {
                handleAcknowledge(selectedAlert._id)
                setVideoDialog(false)
              }}
            >
              Acknowledge
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Alerts
