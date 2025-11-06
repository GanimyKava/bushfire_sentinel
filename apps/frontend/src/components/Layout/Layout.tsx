import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import TopBar from './TopBar'
import Sidebar from './Sidebar'
import Footer from './Footer'

const Layout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', margin: 0, padding: 0 }}>
      <Box sx={{ width: '100%', margin: 0, padding: 0 }}>
        <TopBar />
      </Box>
      <Box sx={{ display: 'flex', flex: 1, mt: 0 }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: 'background.default',
            minHeight: 'calc(100vh - 64px)',
            marginTop: 0,
          }}
        >
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout

