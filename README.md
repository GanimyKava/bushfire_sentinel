# BushFire Sentinel 🌿🔥

**Revolutionizing Australian Bushfire Management with Telstra's Network APIs**

A production-ready web application for proactive and reactive bushfire defense, integrating BVLOS drone swarms with Telstra 5G URLLC slices, Nokia's Network as a Code platform, and CAMARA APIs.

## 🎯 Mission

Deploy AI-powered drone fleets for:
- **Proactive Defense**: Autonomous sweeps detecting 2°C thermal spikes (72-hour forecasts)
- **Reactive Response**: Swarm mapping of perimeters/hotspots through smoke
- **Wildlife Protection**: Koala rescue and ecosystem monitoring
- **Grid Resilience**: Utility infrastructure protection

## 🏗️ Architecture

- **Frontend**: React + TypeScript + Material-UI
- **Backend**: Node.js + Express + Socket.io
- **Database**: MongoDB (GeoJSON for geofences)
- **Maps**: Leaflet.js (Australia-focused)
- **3D Visualization**: Three.js
- **Real-time**: WebSocket for alerts
- **Deployment**: Vercel (frontend) + Render (backend)

### Architecture Diagram



## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development servers
npm run dev

# Build for production
npm run build
```

## 📦 Deployment

### GitHub Pages

The application is automatically deployed to GitHub Pages on every push to the `main` branch via GitHub Actions.

**Setup Instructions:**
1. Go to your repository Settings → Pages
2. Under "Source", select "GitHub Actions"
3. The workflow will automatically deploy on push to `main` branch

**Manual Deployment:**
- Go to Actions tab → "Deploy to GitHub Pages" → "Run workflow"

**Environment Variables (Optional):**
- `VITE_API_URL`: Backend API URL (defaults to Render backend URL)
- Set in repository Settings → Secrets and variables → Actions

### Local Development

For local development, the frontend runs on `http://localhost:3000` and proxies API requests to `http://localhost:5000`.

## 👥 Personas

- **Fire Ranger** (Proactive patrols)
- **Incident Commander** (Reactive coordination)
- **Rural Homeowner** (Ember alerts)
- **Utility Engineer** (Grid resilience)
- **Wildlife Biologist** (Ecosystem monitoring)

## 🇦🇺 Australian Localization

Tailored for NSW, VIC, QLD, WA, TAS with:
- Local terminology (bushfire, ember attack, backburn)
- Regional references (Blue Mountains, Great Ocean Road)
- Wildlife focus (koalas, wallabies, wedge-tailed eagles)
- Real events (Black Summer 2019-20, Red Dawn 2024)

## 📄 License

MIT

---

Built for Telstra Hackathon 2025

