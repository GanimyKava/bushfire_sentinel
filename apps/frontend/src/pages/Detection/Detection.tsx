import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Avatar,
  Popover,
} from '@mui/material'
import {
  Warning as WarningIcon,
  Send as SendIcon,
  FlightTakeoff as DroneIcon,
  LocationOn as LocationIcon,
  PlayArrow as PlayIcon,
  LocalFireDepartment as FireIcon,
  FlashOn as FlashIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import api from '../../utils/axios'
import { Detection as DetectionType } from '../../types'
import { formatDistanceToNow } from 'date-fns'

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
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

const Detection = () => {
  const [detections, setDetections] = useState<DetectionType[]>([])
  const [simulateMenuAnchor, setSimulateMenuAnchor] = useState<null | HTMLElement>(null)
  const [simulateDialog, setSimulateDialog] = useState(false)
  const [simulateType, setSimulateType] = useState<'proactive_ember' | 'proactive_power' | 'reactive_perimeter' | 'reactive_hotspot' | null>(null)
  const [timeFilter, setTimeFilter] = useState('all_time')
  const [videoPopover, setVideoPopover] = useState<{ anchor: HTMLElement; videoUrl: string } | null>(null)

  useEffect(() => {
    fetchDetections()
  }, [])

  const fetchDetections = () => {
    api
      .get('/detections')
      .then((res) => {
        console.log('Detections data received:', res.data)
        setDetections(res.data || [])
      })
      .catch((error) => {
        console.error('Error fetching detections:', error)
        setDetections([])
      })
  }

  const handleSimulateMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setSimulateMenuAnchor(event.currentTarget)
  }

  const handleSimulateMenuClose = () => {
    setSimulateMenuAnchor(null)
  }

  const handleSimulateClick = (type: 'proactive_ember' | 'proactive_power' | 'reactive_perimeter' | 'reactive_hotspot') => {
    setSimulateType(type)
    setSimulateDialog(true)
    handleSimulateMenuClose()
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hotspot_in_smoke':
        return 'error'
      case 'wildlife_survey':
        return 'success'
      case 'ember':
        return 'warning'
      case 'spot_fire':
        return 'error'
      case 'wildfire':
        return 'error'
      case 'power_fault':
        return 'warning'
      case 'perimeter_breach':
        return 'error'
      default:
        return 'default'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'hotspot_in_smoke':
        return 'Hotspot in Smoke'
      case 'wildlife_survey':
        return 'Wildlife Survey'
      case 'ember':
        return 'Ember Detection'
      case 'spot_fire':
        return 'Spot Fire'
      case 'wildfire':
        return 'Wildfire'
      case 'power_fault':
        return 'Power Fault'
      case 'perimeter_breach':
        return 'Perimeter Breach'
      default:
        return type.replace('_', ' ')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'error'
      case 'controlled':
        return 'warning'
      case 'resolved':
        return 'success'
      case 'false_alarm':
        return 'default'
      default:
        return 'default'
    }
  }

  // Helper function to get image URL for detection cards
  const getDetectionImageUrl = (detection: DetectionType) => {
    // Use random wildlife images for Wildlife Survey detections
    if (detection.type === 'wildlife_survey') {
      // Use detection ID to consistently assign an image (so same detection always shows same image)
      // This ensures consistent display while appearing random across different detections
      const wildlifeImages = [
        '/koala-wildlife-survey.jpg',                    // Koala image
        '/sheep-wildlife-survey.jpg',                    // Sheep with fire image
        '/kangaroo-wildlife-survey.jpg',                 // Kangaroo with fire image
        '/kangaroo-sheep-wildlife-survey.jpg',           // Kangaroos and sheep with fire in background
        '/kangaroos-bushfire-wildlife-survey.jpg',       // Multiple kangaroos with large bushfire
      ]
      
      // Use a simple hash of the detection ID to consistently assign an image
      // This ensures the same detection always shows the same image
      if (detection._id) {
        const hash = detection._id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
        const imageIndex = hash % wildlifeImages.length
        return wildlifeImages[imageIndex]
      }
      
      // Fallback to first image if no ID
      return wildlifeImages[0]
    }
    // Use fire image for Perimeter Breach detections
    if (detection.type === 'perimeter_breach') {
      // Using a placeholder URL - replace with actual fire image path when available
      // The image should be placed in apps/frontend/public/perimeter-breach-fire.jpg
      return '/perimeter-breach-fire.jpg'
    }
    // Use power pole image for Power Fault detections
    if (detection.type === 'power_fault') {
      // Using a placeholder URL - replace with actual power pole image path when available
      // The image should be placed in apps/frontend/public/power-fault-pole.jpg
      return '/power-fault-pole.jpg'
    }
    // Use spot fire image for Spot Fire detections
    if (detection.type === 'spot_fire') {
      // Using a placeholder URL - replace with actual spot fire image path when available
      // The image should be placed in apps/frontend/public/spot-fire.jpg
      return '/spot-fire.jpg'
    }
    // Use random ember detection images for Ember Detection detections
    if (detection.type === 'ember') {
      // Use detection ID to consistently assign an image (so same detection always shows same image)
      // This ensures consistent display while appearing random across different detections
      const emberImages = [
        '/ember-detection-wildfire-sheep.jpg',           // Massive wildfire with sheep in foreground
        '/ember-detection-rural-fire.jpg',               // Rural landscape with fire and smoke plume
      ]
      
      // Use a simple hash of the detection ID to consistently assign an image
      if (detection._id) {
        const hash = detection._id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
        const imageIndex = hash % emberImages.length
        return emberImages[imageIndex]
      }
      
      // Fallback to first image if no ID
      return emberImages[0]
    }
    // For other types, use the detection's imageUrl or default
    return detection.imageUrl || undefined
  }

  // Helper function to get video URL for detection cards
  const getDetectionVideoUrl = (detection: DetectionType) => {
    // Use videos for Wildlife Survey detections
    if (detection.type === 'wildlife_survey') {
      const wildlifeVideos = [
        '/wildlife-survey-1.mp4',
        '/wildlife-survey-2.mp4',
      ]
      
      // Use a simple hash of the detection ID to consistently assign a video
      // This ensures the same detection always shows the same video
      if (detection._id) {
        const hash = detection._id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
        const videoIndex = hash % wildlifeVideos.length
        return wildlifeVideos[videoIndex]
      }
      
      // Fallback to first video if no ID
      return wildlifeVideos[0]
    }
    // For other types, return undefined (no video)
    return undefined
  }

  const totalDetections = detections.length
  const alertsSent = detections.filter((d) => d.alertSent).length
  const activeDrones = new Set(detections.map((d) => d.droneId)).size
  const monitoredLocations = ['Blue Mountains', 'Dorrigo NP']

  const typeDistribution = detections.reduce((acc, d) => {
    acc[d.type] = (acc[d.type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Alert Detection Center
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Real-time thermal anomaly detection and alert management
      </Typography>

      {/* Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <WarningIcon sx={{ fontSize: 40, color: 'error.main', mr: 2 }} />
                <Box>
                  <Typography variant="h4">{totalDetections}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Detections
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
                <SendIcon sx={{ fontSize: 40, color: 'warning.main', mr: 2 }} />
                <Box>
                  <Typography variant="h4">{alertsSent}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Alerts Sent
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
                  <Typography variant="h4">{activeDrones}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Drones
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
                <LocationIcon sx={{ fontSize: 40, color: 'success.main', mr: 2 }} />
                <Box>
                  <Typography variant="h4">{monitoredLocations.length}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Monitored Locations
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {monitoredLocations.join(', ')}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Action Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant={timeFilter === 'all_time' ? 'contained' : 'outlined'}
            onClick={() => setTimeFilter('all_time')}
            color={timeFilter === 'all_time' ? 'primary' : 'inherit'}
          >
            All Time
          </Button>
          <Button
            variant={timeFilter === 'today' ? 'contained' : 'outlined'}
            onClick={() => setTimeFilter('today')}
            color={timeFilter === 'today' ? 'primary' : 'inherit'}
          >
            Today
          </Button>
          <Button
            variant={timeFilter === 'week' ? 'contained' : 'outlined'}
            onClick={() => setTimeFilter('week')}
            color={timeFilter === 'week' ? 'primary' : 'inherit'}
          >
            This Week
          </Button>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<PlayIcon />}
            onClick={handleSimulateMenuOpen}
          >
            ▷ Simulate Detection
          </Button>
          <Menu
            anchorEl={simulateMenuAnchor}
            open={Boolean(simulateMenuAnchor)}
            onClose={handleSimulateMenuClose}
          >
            <MenuItem onClick={() => handleSimulateClick('proactive_ember')}>
              Proactive: Ember Detection
            </MenuItem>
            <MenuItem onClick={() => handleSimulateClick('proactive_power')}>
              Proactive: Power Fault
            </MenuItem>
            <MenuItem onClick={() => handleSimulateClick('reactive_perimeter')}>
              Reactive: Perimeter Breach
            </MenuItem>
            <MenuItem onClick={() => handleSimulateClick('reactive_hotspot')}>
              Reactive: Hotspot Detection
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Detection Map */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Detection Map
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Click on markers to view detection details
          </Typography>
          <Box sx={{ height: 400 }}>
            <MapContainer
              center={[-33.8688, 151.2093]}
              zoom={10}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              {detections.map((detection) => (
                <Marker
                  key={detection._id}
                  position={[detection.location.lat, detection.location.lng]}
                  icon={fireMarkerIcon}
                >
                  <Popup>
                    <Typography variant="subtitle2">{getTypeLabel(detection.type)}</Typography>
                    <Typography variant="body2">
                      {detection.location.name || `${detection.location.lat.toFixed(4)}, ${detection.location.lng.toFixed(4)}`}
                    </Typography>
                    <Typography variant="body2">Temp: {detection.temperature}°C</Typography>
                    <Typography variant="body2">Confidence: {(detection.confidence * 100).toFixed(0)}%</Typography>
                    <Chip
                      label={detection.status}
                      size="small"
                      color={getStatusColor(detection.status) as any}
                      sx={{ mt: 1 }}
                    />
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </Box>
        </CardContent>
      </Card>

      {/* Detection Type Distribution */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Detection Type Distribution
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(typeDistribution).map(([type, count]) => (
              <Grid item xs={12} sm={6} md={3} key={type}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography
                      variant="h5"
                      sx={{ color: `${getTypeColor(type)}.main`, fontWeight: 'bold' }}
                    >
                      {count}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {getTypeLabel(type)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Recent Detections Grid */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Detections
          </Typography>
          <Grid container spacing={2}>
            {detections.slice(0, 20).map((detection) => (
              <Grid item xs={12} sm={6} md={4} key={detection._id}>
                <Card variant="outlined" sx={{ height: '100%', position: 'relative' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2, position: 'relative' }}>
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: 1,
                          overflow: 'hidden',
                          bgcolor: 'grey.300',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          position: 'relative',
                        }}
                      >
                        {/* Fallback icon - always rendered behind image */}
                        <FireIcon 
                          sx={{ 
                            fontSize: 40, 
                            color: 'text.secondary',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                          }} 
                        />
                        {/* Image - covers icon if loaded successfully */}
                        {getDetectionImageUrl(detection) && (
                          <Box
                            component="img"
                            src={getDetectionImageUrl(detection)}
                            alt={getTypeLabel(detection.type)}
                            sx={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              position: 'relative',
                              zIndex: 1,
                            }}
                            onError={(e) => {
                              // Hide image on error, icon will show as fallback
                              const target = e.target as HTMLImageElement
                              target.style.display = 'none'
                            }}
                          />
                        )}
                      </Box>
                      
                      {/* Video thumbnail in top right corner - same size as image */}
                      {getDetectionVideoUrl(detection) && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: 80,
                            height: 80,
                            borderRadius: 1,
                            overflow: 'hidden',
                            bgcolor: 'grey.900',
                            cursor: 'pointer',
                            zIndex: 10,
                          }}
                          onMouseEnter={(e) => {
                            const videoUrl = getDetectionVideoUrl(detection)
                            if (videoUrl) {
                              setVideoPopover({
                                anchor: e.currentTarget,
                                videoUrl: videoUrl,
                              })
                            }
                          }}
                          onMouseLeave={() => {
                            setVideoPopover(null)
                          }}
                        >
                          {/* Video thumbnail - first frame */}
                          <Box
                            component="video"
                            src={getDetectionVideoUrl(detection)}
                            muted
                            playsInline
                            preload="metadata"
                            sx={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              opacity: 0.7,
                            }}
                          />
                          {/* Play button overlay */}
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              bgcolor: 'rgba(0, 0, 0, 0.3)',
                              '&:hover': {
                                bgcolor: 'rgba(0, 0, 0, 0.2)',
                              },
                            }}
                          >
                            <PlayIcon 
                              sx={{ 
                                fontSize: 32, 
                                color: 'white',
                                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
                              }} 
                            />
                          </Box>
                        </Box>
                      )}
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Chip
                            label={getTypeLabel(detection.type)}
                            size="small"
                            color={getTypeColor(detection.type) as any}
                          />
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {(detection.confidence * 100).toFixed(0)}% accuracy
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <DroneIcon sx={{ fontSize: 14 }} />
                          <Typography variant="caption">
                            {detection.droneName || detection.droneId}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <TimeIcon sx={{ fontSize: 14 }} />
                          <Typography variant="caption">
                            {formatDistanceToNow(new Date(detection.timestamp), { addSuffix: true })}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocationIcon sx={{ fontSize: 14 }} />
                          <Typography variant="caption">
                            {detection.location.name || detection.zone || `${detection.location.lat.toFixed(4)}, ${detection.location.lng.toFixed(4)}`}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ mb: 1 }}>
                      <Chip
                        label={detection.status}
                        size="small"
                        color={getStatusColor(detection.status) as any}
                        sx={{ mr: 1 }}
                      />
                      {detection.alertSent ? (
                        <Chip
                          icon={<FlashIcon />}
                          label="Alert Sent"
                          size="small"
                          color="warning"
                        />
                      ) : (
                        <Chip label="No Alert" size="small" color="default" />
                      )}
                    </Box>
                    {detection.actionsTaken && detection.actionsTaken.length > 0 && (
                      <Box sx={{ mb: 1 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                          Actions Taken:
                        </Typography>
                        <Typography variant="caption" display="block">
                          {detection.actionsTaken.join(', ')}
                        </Typography>
                      </Box>
                    )}
                    {detection.impact && (
                      <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                          Impact:
                        </Typography>
                        <Typography variant="caption" display="block">
                          {detection.impact}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Video Popover - Shows video on hover */}
      <Popover
        open={Boolean(videoPopover)}
        anchorEl={videoPopover?.anchor}
        onClose={() => setVideoPopover(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        disableRestoreFocus
        sx={{
          pointerEvents: 'none',
          '& .MuiPopover-paper': {
            pointerEvents: 'auto',
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: 4,
          },
        }}
        onMouseEnter={() => {
          // Keep popover open when hovering over it
        }}
        onMouseLeave={() => {
          setVideoPopover(null)
        }}
      >
        {videoPopover && (
          <Box
            sx={{
              width: 400,
              height: 300,
              position: 'relative',
            }}
          >
            <Box
              component="video"
              src={videoPopover.videoUrl}
              autoPlay
              muted
              loop
              playsInline
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
              onError={(e) => {
                // Hide video on error
                const target = e.target as HTMLVideoElement
                target.style.display = 'none'
              }}
            />
          </Box>
        )}
      </Popover>

      {/* Simulate Detection Dialog */}
      <Dialog
        open={simulateDialog}
        onClose={() => setSimulateDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Simulate Detection -{' '}
          {simulateType === 'proactive_ember'
            ? 'Proactive: Ember Detection'
            : simulateType === 'proactive_power'
            ? 'Proactive: Power Fault'
            : simulateType === 'reactive_perimeter'
            ? 'Reactive: Perimeter Breach'
            : simulateType === 'reactive_hotspot'
            ? 'Reactive: Hotspot Detection'
            : 'Detection'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            {simulateType === 'proactive_ember' && (
              <>
                <Typography variant="h6" gutterBottom>
                  Drone spots 3°C spike in eucalypt—alerts Sarah
                </Typography>
                <Box
                  sx={{
                    width: '100%',
                    height: 300,
                    bgcolor: 'grey.200',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 1,
                    mt: 2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    [Thermal Video: Drone FLIR feed showing ember hotspot in eucalypt forest]
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Alert sent to: Sarah Thompson (Fire Ranger, Blue Mountains)
                </Typography>
              </>
            )}
            {simulateType === 'proactive_power' && (
              <>
                <Typography variant="h6" gutterBottom>
                  Power fault detected—potential ignition source
                </Typography>
                <Box
                  sx={{
                    width: '100%',
                    height: 300,
                    bgcolor: 'grey.200',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 1,
                    mt: 2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    [Thermal Video: Power line showing heat signature]
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Alert sent to: Raj Kaur (Utility Engineer, Ausgrid)
                </Typography>
              </>
            )}
            {simulateType === 'reactive_perimeter' && (
              <>
                <Typography variant="h6" gutterBottom>
                  Swarm maps ember cloud over Sydney fringes—evac Priya's farm
                </Typography>
                <Box
                  sx={{
                    width: '100%',
                    height: 300,
                    bgcolor: 'grey.200',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 1,
                    mt: 2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    [Thermal Video: Drone swarm showing ember cloud approaching residential area]
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Evacuation alert sent to: Priya Singh (Rural Homeowner, Tamworth)
                </Typography>
              </>
            )}
            {simulateType === 'reactive_hotspot' && (
              <>
                <Typography variant="h6" gutterBottom>
                  Hotspot detected in smoke plume—rapid response initiated
                </Typography>
                <Box
                  sx={{
                    width: '100%',
                    height: 300,
                    bgcolor: 'grey.200',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 1,
                    mt: 2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    [Thermal Video: Thermal plume showing active hotspot]
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Alert sent to: Mike Hargreaves (Incident Commander, CFA)
                </Typography>
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSimulateDialog(false)}>Close</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setSimulateDialog(false)
              fetchDetections()
            }}
          >
            Confirm Detection
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Detection
