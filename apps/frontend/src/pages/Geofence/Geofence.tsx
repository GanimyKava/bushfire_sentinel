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
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  FormControlLabel,
  Switch,
  Menu,
  MenuItem,
} from '@mui/material'
import {
  Edit as EditIcon,
  NotificationImportant as AlertIcon,
  PlayArrow as SimulateIcon,
  LocalFireDepartment as FireIcon,
} from '@mui/icons-material'
import { MapContainer, TileLayer, Polygon, Popup, CircleMarker, LayersControl } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import api from '../../utils/axios'
import { Geofence as GeofenceType } from '../../types'
import { format } from 'date-fns'

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

const Geofence = () => {
  const [geofences, setGeofences] = useState<GeofenceType[]>([])
  const [center] = useState<[number, number]>([-25.2744, 133.7751]) // Australia center
  const [selectedGeofence, setSelectedGeofence] = useState<GeofenceType | null>(null)
  const [simulateDialog, setSimulateDialog] = useState(false)
  const [editDialog, setEditDialog] = useState(false)
  const [showFuelMoisture, setShowFuelMoisture] = useState(false)
  const [showPopDensity, setShowPopDensity] = useState(false)
  const [anchorEl, setAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({})

  useEffect(() => {
    fetchGeofences()
  }, [])

  const fetchGeofences = () => {
    console.log('Fetching geofences...')
    api
      .get('/geofences')
      .then((res) => {
        console.log('Geofences API response:', res)
        console.log('Geofences data received:', res.data)
        console.log('Number of geofences:', res.data?.length || 0)
        if (Array.isArray(res.data)) {
          setGeofences(res.data)
        } else {
          console.warn('Response data is not an array:', res.data)
          setGeofences([])
        }
      })
      .catch((error) => {
        console.error('Error fetching geofences:', error)
        console.error('Error response:', error.response?.data)
        console.error('Error status:', error.response?.status)
        setGeofences([])
      })
  }

  const getRiskColor = (riskLevel?: string) => {
    switch (riskLevel) {
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

  const getPolygonColor = (riskLevel?: string) => {
    switch (riskLevel) {
      case 'critical':
        return 'red'
      case 'high':
        return 'orange'
      case 'medium':
        return 'yellow'
      case 'low':
        return 'green'
      default:
        return 'blue'
    }
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, geofenceId: string) => {
    setAnchorEl({ ...anchorEl, [geofenceId]: event.currentTarget })
  }

  const handleMenuClose = () => {
    setAnchorEl({})
  }

  const handleSimulateBreach = (geofence: GeofenceType) => {
    setSelectedGeofence(geofence)
    setSimulateDialog(true)
    handleMenuClose()
  }

  const handleEditPolygon = (geofence: GeofenceType) => {
    setSelectedGeofence(geofence)
    setEditDialog(true)
    handleMenuClose()
  }

  const handleSubscribeAlert = async (geofence: GeofenceType) => {
    // Mock subscribe action
    alert(`Subscribed to alerts for ${geofence.name}`)
    handleMenuClose()
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Geofence Management – Define and Monitor High-Risk Bushfire Zones
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Monitor and manage protected zones across Australian regions
      </Typography>

      {/* Map and Layers Controls */}
      <Grid container spacing={3} sx={{ mb: 2 }}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControlLabel
              control={
                <Switch
                  checked={showFuelMoisture}
                  onChange={(e) => setShowFuelMoisture(e.target.checked)}
                />
              }
              label="Fuel Moisture Layer"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={showPopDensity}
                  onChange={(e) => setShowPopDensity(e.target.checked)}
                />
              }
              label="Population Density Layer"
            />
          </Box>
        </Grid>
      </Grid>

      {/* Interactive Map */}
      <Card sx={{ height: '600px', mb: 3 }}>
        <CardContent sx={{ p: 0, height: '100%' }}>
          <MapContainer center={center} zoom={5} style={{ height: '100%', width: '100%' }}>
            <LayersControl position="topright">
              <LayersControl.BaseLayer checked name="OpenStreetMap">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="Satellite">
                <TileLayer
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  attribution="Esri"
                />
              </LayersControl.BaseLayer>
            </LayersControl>
            {geofences && geofences.length > 0 ? geofences.map((geofence) => {
              const riskColor = getPolygonColor(geofence.riskLevel)
              const center = geofence.center || {
                lat: geofence.coordinates?.[0]?.[1] || geofence.coordinates?.[0]?.[0] || -33.8688,
                lng: geofence.coordinates?.[0]?.[0] || geofence.coordinates?.[0]?.[1] || 151.2093,
              }
              
              if (!geofence.coordinates || geofence.coordinates.length === 0) {
                console.warn('Geofence missing coordinates:', geofence.name)
                return null
              }

              return (
                <Box key={geofence._id}>
                  <Polygon
                    positions={geofence.coordinates.map((coord) => {
                      // Coordinates come as [lng, lat] from backend, Leaflet needs [lat, lng]
                      if (Array.isArray(coord) && coord.length >= 2) {
                        return [coord[1], coord[0]]
                      }
                      return [coord[1] || -33.8688, coord[0] || 151.2093]
                    })}
                    pathOptions={{
                      color: riskColor,
                      fillColor: riskColor,
                      fillOpacity: 0.3,
                      weight: 2,
                    }}
                  >
                    <Popup>
                      <Box>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                          <FireIcon sx={{ fontSize: 20, mr: 1, color: 'error.main' }} />
                          {geofence.name}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                          <strong>Area:</strong> {geofence.area} km²
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                          <strong>Risk Score:</strong>{' '}
                          <Chip
                            label={geofence.riskLevel || 'medium'}
                            size="small"
                            color={getRiskColor(geofence.riskLevel) as any}
                          />
                        </Typography>
                        {geofence.fuelLoad && (
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            <strong>Fuel Load:</strong> {geofence.fuelLoad} t/ha
                          </Typography>
                        )}
                        {geofence.triggers && geofence.triggers.length > 0 && (
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            <strong>Triggers:</strong> {geofence.triggers.join(', ')}
                          </Typography>
                        )}
                        {geofence.subscribers !== undefined && (
                          <Typography variant="body2">
                            <strong>Subscribers:</strong> {geofence.subscribers} homeowners
                          </Typography>
                        )}
                      </Box>
                    </Popup>
                  </Polygon>
                  {center && (
                    <CircleMarker
                      center={[center.lat, center.lng]}
                      radius={8}
                      pathOptions={{
                        color: riskColor,
                        fillColor: riskColor,
                        fillOpacity: 0.8,
                      }}
                    >
                      <Popup>{geofence.name}</Popup>
                    </CircleMarker>
                  )}
                </Box>
              )
            }).filter(Boolean) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  No geofences found. Loading...
                </Typography>
              </Box>
            )}
          </MapContainer>
        </CardContent>
      </Card>

      {/* Legend */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="subtitle2" sx={{ mr: 2 }}>
          Legend:
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'error.main' }} />
          <Typography variant="caption">Critical Risk Zone</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'warning.main' }} />
          <Typography variant="caption">High Risk Zone</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'info.main' }} />
          <Typography variant="caption">Medium Risk Zone</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'success.main' }} />
          <Typography variant="caption">Low Risk Zone</Typography>
        </Box>
      </Box>

      {/* Active Geofences Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Active Geofences
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Area</TableCell>
                  <TableCell>Risk Level</TableCell>
                  <TableCell>Subscribers</TableCell>
                  <TableCell>Last Scan</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {geofences && geofences.length > 0 ? (
                  geofences.map((geofence) => (
                    <TableRow key={geofence._id} hover>
                      <TableCell>{geofence._id.slice(0, 8)}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <FireIcon sx={{ fontSize: 16, color: 'error.main' }} />
                          {geofence.name}
                        </Box>
                      </TableCell>
                      <TableCell>{geofence.area} km²</TableCell>
                      <TableCell>
                        <Chip
                          label={geofence.riskLevel || 'medium'}
                          size="small"
                          color={getRiskColor(geofence.riskLevel) as any}
                        />
                      </TableCell>
                      <TableCell>{geofence.subscribers || 0} homeowners</TableCell>
                      <TableCell>
                        {geofence.lastScan
                          ? format(new Date(geofence.lastScan), 'PPp')
                          : 'Never'}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, geofence._id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl[geofence._id]}
                          open={Boolean(anchorEl[geofence._id])}
                          onClose={handleMenuClose}
                        >
                          <MenuItem onClick={() => handleEditPolygon(geofence)}>
                            <EditIcon sx={{ mr: 1 }} /> Edit Polygon
                          </MenuItem>
                          <MenuItem onClick={() => handleSubscribeAlert(geofence)}>
                            <AlertIcon sx={{ mr: 1 }} /> Subscribe Alert
                          </MenuItem>
                          <MenuItem onClick={() => handleSimulateBreach(geofence)}>
                            <SimulateIcon sx={{ mr: 1 }} /> Simulate Breach
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                      <Typography variant="body1" color="text.secondary">
                        No geofences found. Loading...
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Simulate Breach Dialog */}
      <Dialog
        open={simulateDialog}
        onClose={() => setSimulateDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Simulate Breach - {selectedGeofence?.name}</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <FireIcon sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Thermal Detection Alert
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Simulated breach detected in {selectedGeofence?.name}
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
              }}
            >
              <Typography variant="body2" color="text.secondary">
                [Thermal Video Feed - Mock]
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
              In production: Live thermal camera feed from drone swarm
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSimulateDialog(false)}>Close</Button>
          <Button variant="contained" color="error" onClick={() => setSimulateDialog(false)}>
            Dispatch Response
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Polygon Dialog */}
      <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Polygon - {selectedGeofence?.name}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Polygon editing functionality would be implemented here. Users can drag vertices to
            reshape the geofence boundary.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Current area: {selectedGeofence?.area} km²
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setEditDialog(false)}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Geofence
