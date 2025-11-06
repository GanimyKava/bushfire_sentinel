import { Box, Typography, Card, CardContent, Avatar, Chip, Grid } from '@mui/material'
import { useAuth } from '../../contexts/AuthContext'

const Profile = () => {
  const { user } = useAuth()

  if (!user) return null

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar
              sx={{ width: 80, height: 80, mr: 3, bgcolor: 'primary.main' }}
              src={user.avatar}
            >
              {user.name?.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h5">{user.name}</Typography>
              <Chip
                label={user.role?.replace('_', ' ').toUpperCase()}
                sx={{ mt: 1 }}
                color="primary"
              />
            </Box>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Email
              </Typography>
              <Typography variant="body1">{user.email}</Typography>
            </Grid>
            {user.region && (
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  Region
                </Typography>
                <Typography variant="body1">{user.region}</Typography>
              </Grid>
            )}
            {user.bio && (
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  Bio
                </Typography>
                <Typography variant="body1">{user.bio}</Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Profile

