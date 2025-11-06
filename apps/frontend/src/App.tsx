import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard/Dashboard'
import Geofence from './pages/Geofence/Geofence'
import Detection from './pages/Detection/Detection'
import Subscribers from './pages/Subscribers/Subscribers'
import Drones from './pages/Drones/Drones'
import Alerts from './pages/Alerts/Alerts'
import Analytics from './pages/Analytics/Analytics'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route
        path="/"
        element={user ? <Layout /> : <Navigate to="/login" />}
      >
        <Route index element={<Dashboard />} />
        <Route path="geofence" element={<Geofence />} />
        <Route path="detection" element={<Detection />} />
        <Route path="subscribers" element={<Subscribers />} />
        <Route path="drones" element={<Drones />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default App

