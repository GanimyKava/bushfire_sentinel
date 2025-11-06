import { useNavigate, useLocation } from 'react-router-dom'
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  Map as MapIcon,
  Search as SearchIcon,
  People as PeopleIcon,
  FlightTakeoff as FlightIcon,
  Warning as WarningIcon,
  BarChart as AnalyticsIcon,
} from '@mui/icons-material'

const drawerWidth = 240

const menuItems = [
  { text: 'Dashboard', icon: DashboardIcon, path: '/' },
  { text: 'Geofence', icon: MapIcon, path: '/geofence' },
  { text: 'Detection', icon: SearchIcon, path: '/detection' },
  { text: 'Subscribers', icon: PeopleIcon, path: '/subscribers' },
  { text: 'Drones', icon: FlightIcon, path: '/drones' },
  { text: 'Alerts', icon: WarningIcon, path: '/alerts' },
  { text: 'Analytics', icon: AnalyticsIcon, path: '/analytics' },
]

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        position: 'relative',
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'background.paper',
          position: 'absolute',
          top: 0, // Will be positioned by the parent flex container
          height: '100%',
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <List>
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  selected={isActive}
                  onClick={() => navigate(item.path)}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: 'primary.light',
                      color: 'primary.contrastText',
                      '&:hover': {
                        backgroundColor: 'primary.main',
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'primary.contrastText',
                      },
                    },
                  }}
                >
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Box>
    </Drawer>
  )
}

export default Sidebar

