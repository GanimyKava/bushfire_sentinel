# BushFire Sentinel - Project Summary

## 🌿🔥 Overview

**BushFire Sentinel** is a production-ready web application revolutionizing Australian bushfire management by integrating BVLOS drone swarms with Telstra 5G URLLC slices, Nokia's Network as a Code platform, and CAMARA APIs.

## 🎯 Key Features

### Core Functionality
- ✅ **Real-time Dashboard**: Live metrics, alerts, and quick actions
- ✅ **Geofence Management**: Interactive maps with Leaflet.js for Australian regions
- ✅ **Thermal Detection System**: Edge AI-powered anomaly detection with simulation
- ✅ **Drone Fleet Management**: Real-time monitoring of BVLOS drone swarms
- ✅ **Alert Center**: Multi-severity alerts with acknowledgment system
- ✅ **Subscriber Management**: Rural homeowner alert subscriptions
- ✅ **Role-based Access**: 5 distinct personas with tailored dashboards

### Australian Localization
- 🇦🇺 Regions: NSW Blue Mountains, VIC Great Ocean Road, QLD Wet Tropics, WA Karri forests, TAS Southwest
- 🔥 Terminology: "bushfire," "ember attack," "backburn," "spot fire," "fireground"
- 🐨 Wildlife: Koala rescue, wildlife triage, megafauna ecology
- 📅 Events: References to Black Summer 2019-20, Red Dawn 2024
- 🏛️ Infrastructure: Ausgrid lines, Pacific Highway references

### Technical Stack
- **Frontend**: React 18 + TypeScript + Material-UI + Vite
- **Backend**: Node.js + Express + Socket.io
- **Database**: MongoDB with geospatial indexing
- **Maps**: Leaflet.js with Australian-focused layers
- **Real-time**: WebSocket for live alerts
- **3D Visualization**: Three.js ready (drone fleet)
- **Deployment**: Vercel (frontend) + Render/Heroku (backend)

## 👥 Personas

### 1. Fire Ranger (Proactive)
- **Example**: Sarah Thompson (NSW Blue Mountains)
- **Focus**: Patrol routes, ember detection, proactive sweeps
- **Features**: Geofence monitoring, patrol launch buttons

### 2. Incident Commander (Reactive)
- **Example**: Mike Hargreaves (VIC CFA)
- **Focus**: Multi-agency coordination, command overlays
- **Features**: Full alert management, drone swarm orchestration

### 3. Rural Homeowner (Vulnerable)
- **Example**: Priya Singh (NSW Tamworth)
- **Focus**: Ember alerts, property protection
- **Features**: Subscriber dashboard, alert subscriptions

### 4. Utility Engineer (Infrastructure)
- **Example**: Raj Kaur (Ausgrid)
- **Focus**: Grid resilience, power line monitoring
- **Features**: Utility geofences, infrastructure alerts

### 5. Wildlife Biologist (Ecosystem)
- **Example**: Lena Kowalski (Parks Australia)
- **Focus**: Koala heat-stress tracking, wildlife triage
- **Features**: Wildlife zones, rescue coordination

## 🚀 Demo Features

### Simulation Mode
- **30-second detection loops**: Simulate thermal anomalies
- **Real-time alerts**: Socket.io broadcasts
- **Demo data**: Pre-seeded Australian locations

### Quick Actions
- "Simulate Detection" button for judges
- "Launch Patrol" for drone deployment
- Real-time metrics updates

## 📊 Sample Data

### Pre-seeded Content
- 12 users across 5 personas
- 5 DJI Matrice 300 RTK drones
- 5 geofences across Australian regions
- 3 rural homeowner subscribers
- Recent detections and alerts

### Australian Regions Covered
- NSW: Blue Mountains, Sydney, Tamworth
- VIC: Melbourne, Great Ocean Road
- QLD: Brisbane, Wet Tropics
- WA: Perth, Karri forests
- TAS: Hobart, Southwest wilderness

## 🔧 Architecture

### Monorepo Structure
```
bushfire-sentinel/
├── apps/
│   ├── frontend/     # React + TypeScript
│   └── backend/      # Node.js + Express
├── packages/          # Shared utilities
└── turbo.json         # Turborepo config
```

### API Endpoints
- `/api/auth` - Authentication (JWT)
- `/api/drones` - Drone fleet management
- `/api/geofences` - Geofence CRUD
- `/api/detections` - Thermal detections
- `/api/alerts` - Alert management
- `/api/subscribers` - Subscriber management
- `/api/dashboard` - Dashboard metrics

### Mock Integrations
- **CAMARA APIs**: SIM Swap Detection, Quality on Demand
- **Nokia NaaC**: Geofence orchestration, network slicing
- **Twilio**: SMS/Voice alerts
- **BOM**: Weather data, fire danger forecasts

## 🎨 UI/UX

### Design System
- **Color Palette**: Bush green (#2E7D32) + Fire orange (#FF6B35)
- **Typography**: Roboto, accessible contrast
- **Components**: Material-UI with custom theming
- **Responsive**: Mobile-first for field use

### Accessibility
- WCAG 2.2 AA compliant
- Screen reader friendly alerts
- High contrast mode support
- Keyboard navigation

## 📦 Deployment

### Development
```bash
npm install
npm run dev
```

### Production
- **Frontend**: Vercel (automatic from GitHub)
- **Backend**: Render/Heroku (with MongoDB Atlas)
- **Database**: MongoDB Atlas (free tier)

## 🧪 Testing

- Unit tests: Jest
- E2E tests: Cypress (ready)
- Performance: Lighthouse (target 90+)

## 📝 License

MIT - Built for Telstra Hackathon 2025

---

**Built with ❤️ for Australian bushfire management**

