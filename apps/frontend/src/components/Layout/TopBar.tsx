import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
} from '@mui/material'
import {
  Notifications as NotificationsIcon,
  AccountCircle,
  Logout,
  LocalFireDepartment as FireIcon,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useState } from 'react'

const TopBar = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleProfile = () => {
    navigate('/profile')
    handleMenuClose()
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
    handleMenuClose()
  }

  return (
    <AppBar 
      position="static" 
      sx={{ 
        background: 'linear-gradient(135deg, #1B5E20 0%, #FF6B35 100%)',
        width: '100%',
        left: 0,
        right: 0,
        margin: 0,
        padding: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1, // Ensure TopBar is above Sidebar
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 3 }, py: 1 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2, 
            flexGrow: 0, 
            mr: 4, 
            cursor: 'pointer' 
          }}
          onClick={() => navigate('/')}
        >
          <FireIcon sx={{ fontSize: { xs: 32, sm: 40 }, color: '#FFD700' }} />
          <Box>
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: 700, color: 'white', lineHeight: 1.2, mb: 0.25 }}
            >
              BushFire Sentinel
            </Typography>
            <Typography
              variant="caption"
              sx={{ 
                color: 'white', 
                opacity: 0.9, 
                display: { xs: 'none', sm: 'block' },
                lineHeight: 1.2
              }}
            >
              Advanced Bushfire Detection & Management System
            </Typography>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          color="inherit"
          onClick={() => navigate('/alerts')}
          aria-label="alerts"
        >
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          onClick={handleMenuOpen}
          size="small"
          sx={{ ml: 2 }}
          aria-label="account menu"
        >
          <Avatar
            sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}
            alt={user?.name}
            src={user?.avatar}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleProfile}>
            <AccountCircle sx={{ mr: 1 }} /> Profile
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Logout sx={{ mr: 1 }} /> Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar

