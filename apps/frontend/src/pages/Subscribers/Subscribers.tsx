import { useState, useEffect, useRef } from 'react'
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
  Grid,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material'
import {
  Add as AddIcon,
  VerifiedUser as VerifiedIcon,
  CheckCircle as CheckIcon,
  Upload as UploadIcon,
  LocationOn as LocationIcon,
  Warning as WarningIcon,
} from '@mui/icons-material'
import api from '../../utils/axios'
import { Subscriber, Geofence } from '../../types'
import { format } from 'date-fns'

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [geofences, setGeofences] = useState<Geofence[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [verifyDialog, setVerifyDialog] = useState<string | null>(null)
  const [geofenceDialog, setGeofenceDialog] = useState<Subscriber | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchSubscribers()
    fetchGeofences()
  }, [])

  const fetchSubscribers = () => {
    console.log('Fetching subscribers...')
    api
      .get('/subscribers')
      .then((res) => {
        console.log('Subscribers data received:', res.data)
        console.log('Number of subscribers:', res.data?.length || 0)
        setSubscribers(res.data || [])
      })
      .catch((error) => {
        console.error('Error fetching subscribers:', error)
        console.error('Error response:', error.response?.data)
        setSubscribers([])
      })
  }

  const fetchGeofences = () => {
    api
      .get('/geofences')
      .then((res) => {
        console.log('Geofences data received:', res.data)
        setGeofences(res.data || [])
      })
      .catch((error) => {
        console.error('Error fetching geofences:', error)
        setGeofences([])
      })
  }

  const getSubscribedGeofences = (subscriber: Subscriber): Geofence[] => {
    if (!subscriber.subscribedGeofences || subscriber.subscribedGeofences.length === 0) {
      return []
    }
    return geofences.filter((g) => subscriber.subscribedGeofences?.includes(g._id))
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

  const handleVerify = async (id: string) => {
    try {
      await api.post(`/subscribers/${id}/verify`)
      setVerifyDialog(null)
      fetchSubscribers()
    } catch (error) {
      console.error('Verification error:', error)
    }
  }

  const handleCSVImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (e) => {
      const text = e.target?.result as string
      const lines = text.split('\n').slice(1) // Skip header
      const subscribers = lines
        .filter((line) => line.trim())
        .map((line) => {
          const [name, email, phone, persona, lat, lng, address] = line.split(',')
          return {
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            persona: persona.trim(),
            location: {
              lat: parseFloat(lat.trim()),
              lng: parseFloat(lng.trim()),
              address: address?.trim(),
            },
            subscribedZones: [],
            alertsEnabled: true,
            alertPrefs: { sms: true, push: true, otpVerified: false },
          }
        })

      try {
        await api.post('/subscribers/bulk', { subscribers })
        fetchSubscribers()
        alert(`Successfully imported ${subscribers.length} subscribers`)
      } catch (error) {
        console.error('Import error:', error)
        alert('Failed to import subscribers')
      }
    }
    reader.readAsText(file)
  }

  const getPersonaLabel = (persona?: string) => {
    if (!persona) return 'Unknown'
    return persona
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const getPersonaColor = (persona?: string) => {
    switch (persona) {
      case 'fire_ranger':
        return 'primary'
      case 'incident_commander':
        return 'error'
      case 'rural_homeowner':
        return 'warning'
      case 'utility_engineer':
        return 'info'
      case 'wildlife_biologist':
        return 'success'
      default:
        return 'default'
    }
  }

  const totalSubs = subscribers.length
  const activeSubs = subscribers.filter((s) => s.alertsEnabled).length

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Subscriber Management – Enroll Users for Personalized Bushfire Alerts
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Manage subscriber enrollments and alert preferences
      </Typography>

      {/* Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4">{totalSubs}</Typography>
              <Typography variant="body2" color="text.secondary">
                Total Subscribers
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4">{activeSubs}</Typography>
              <Typography variant="body2" color="text.secondary">
                Active Subscribers
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Actions */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Add Subscriber
        </Button>
        <Button
          variant="outlined"
          startIcon={<UploadIcon />}
          onClick={() => fileInputRef.current?.click()}
        >
          Import CSV
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          style={{ display: 'none' }}
          onChange={handleCSVImport}
        />
      </Box>

      {/* Subscribers Table */}
      <Card>
        <CardContent>
          {subscribers.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                No subscribers found. Loading...
              </Typography>
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User ID</TableCell>
                    <TableCell>Persona</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Subscribed Geofences</TableCell>
                    <TableCell>Alert Prefs</TableCell>
                    <TableCell>Last Received</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subscribers.map((subscriber) => (
                  <TableRow key={subscriber._id}>
                    <TableCell>{subscriber.userId || subscriber._id.slice(0, 8)}</TableCell>
                    <TableCell>
                      <Chip
                        label={getPersonaLabel(subscriber.persona)}
                        size="small"
                        color={getPersonaColor(subscriber.persona) as any}
                      />
                    </TableCell>
                    <TableCell>{subscriber.name}</TableCell>
                    <TableCell>
                      {(() => {
                        const subscribedGeofences = getSubscribedGeofences(subscriber)
                        const count = subscribedGeofences.length || subscriber.subscribedZones?.length || 0
                        
                        if (count === 0) {
                          return <Chip label="0" size="small" color="default" />
                        }

                        const tooltipContent = subscribedGeofences.length > 0 ? (
                          <Box>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                              Subscribed Geofences ({count}):
                            </Typography>
                            {subscribedGeofences.map((geo) => (
                              <Box key={geo._id} sx={{ mb: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                  {geo.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {geo.region} • Risk: {geo.riskLevel || 'Unknown'} • {geo.area} km²
                                </Typography>
                              </Box>
                            ))}
                            <Button
                              size="small"
                              onClick={() => setGeofenceDialog(subscriber)}
                              sx={{ mt: 1 }}
                            >
                              View Details
                            </Button>
                          </Box>
                        ) : (
                          <Typography variant="body2">
                            {count} geofence{count !== 1 ? 's' : ''} subscribed
                          </Typography>
                        )

                        return (
                          <Tooltip
                            title={tooltipContent}
                            arrow
                            placement="top"
                            enterDelay={300}
                            leaveDelay={200}
                            componentsProps={{
                              tooltip: {
                                sx: {
                                  maxWidth: 400,
                                  bgcolor: 'rgba(0, 0, 0, 0.9)',
                                  p: 2,
                                },
                              },
                            }}
                          >
                            <Chip
                              label={count}
                              size="small"
                              color="primary"
                              onClick={() => subscribedGeofences.length > 0 && setGeofenceDialog(subscriber)}
                              sx={{ cursor: subscribedGeofences.length > 0 ? 'pointer' : 'default' }}
                            />
                          </Tooltip>
                        )
                      })()}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        {subscriber.alertPrefs?.sms && (
                          <Chip label="SMS" size="small" variant="outlined" />
                        )}
                        {subscriber.alertPrefs?.push && (
                          <Chip label="Push" size="small" variant="outlined" />
                        )}
                        {subscriber.alertPrefs?.otpVerified && (
                          <Tooltip title="OTP Verified via Telstra">
                            <CheckIcon sx={{ fontSize: 16, color: 'success.main' }} />
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      {subscriber.lastReceived
                        ? format(new Date(subscriber.lastReceived), 'PPp')
                        : 'Never'}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Verify via CAMARA">
                        <IconButton
                          size="small"
                          onClick={() => setVerifyDialog(subscriber._id)}
                          color={subscriber.camaraVerified ? 'success' : 'default'}
                        >
                          <VerifiedIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Add Subscriber Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Subscriber</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Use the login system to auto-create subscribers, or add manually via CSV import.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Verify Dialog */}
      <Dialog open={verifyDialog !== null} onClose={() => setVerifyDialog(null)}>
        <DialogTitle>CAMARA Number Verification</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Verifying phone number via CAMARA SIM Swap Detection API...
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This is a mock verification. In production, this would verify the subscriber's phone
            number is not associated with recent SIM swap activity.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVerifyDialog(null)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => verifyDialog && handleVerify(verifyDialog)}
          >
            Verify
          </Button>
        </DialogActions>
      </Dialog>

      {/* Geofence Details Dialog */}
      <Dialog
        open={geofenceDialog !== null}
        onClose={() => setGeofenceDialog(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationIcon color="primary" />
            <Typography variant="h6">
              Subscribed Geofences - {geofenceDialog?.name}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          {geofenceDialog && (
            <Box>
              {(() => {
                const subscribedGeofences = getSubscribedGeofences(geofenceDialog)
                
                if (subscribedGeofences.length === 0) {
                  return (
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                      No geofences subscribed
                    </Typography>
                  )
                }

                return (
                  <List>
                    {subscribedGeofences.map((geo, index) => (
                      <Box key={geo._id}>
                        <ListItem>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <Typography variant="h6">{geo.name}</Typography>
                                <Chip
                                  label={geo.riskLevel?.toUpperCase() || 'UNKNOWN'}
                                  size="small"
                                  color={getRiskColor(geo.riskLevel) as any}
                                />
                              </Box>
                            }
                            secondary={
                              <Box sx={{ mt: 1 }}>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                  <strong>Region:</strong> {geo.region}
                                </Typography>
                                {geo.description && (
                                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                    <strong>Description:</strong> {geo.description}
                                  </Typography>
                                )}
                                <Box sx={{ display: 'flex', gap: 2, mt: 1, flexWrap: 'wrap' }}>
                                  <Chip
                                    icon={<LocationIcon />}
                                    label={`${geo.area} km²`}
                                    size="small"
                                    variant="outlined"
                                  />
                                  {geo.fuelLoad && (
                                    <Chip
                                      icon={<WarningIcon />}
                                      label={`Fuel Load: ${geo.fuelLoad} t/ha`}
                                      size="small"
                                      variant="outlined"
                                    />
                                  )}
                                  {geo.subscribers !== undefined && (
                                    <Chip
                                      label={`${geo.subscribers} subscribers`}
                                      size="small"
                                      variant="outlined"
                                    />
                                  )}
                                </Box>
                                {geo.triggers && geo.triggers.length > 0 && (
                                  <Box sx={{ mt: 1 }}>
                                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                                      <strong>Triggers:</strong>
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                      {geo.triggers.map((trigger, idx) => (
                                        <Chip
                                          key={idx}
                                          label={trigger}
                                          size="small"
                                          variant="outlined"
                                          color="info"
                                        />
                                      ))}
                                    </Box>
                                  </Box>
                                )}
                                {geo.lastScan && (
                                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                                    <strong>Last Scan:</strong> {format(new Date(geo.lastScan), 'PPp')}
                                  </Typography>
                                )}
                              </Box>
                            }
                          />
                        </ListItem>
                        {index < subscribedGeofences.length - 1 && <Divider />}
                      </Box>
                    ))}
                  </List>
                )
              })()}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGeofenceDialog(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Subscribers
