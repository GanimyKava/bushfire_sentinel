# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB locally or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Option B: MongoDB Atlas (Recommended)**
1. Sign up at https://www.mongodb.com/cloud/atlas (free tier)
2. Create a cluster
3. Get connection string
4. Update `apps/backend/.env` with `MONGODB_URI`

### 3. Configure Environment

Create `apps/backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bushfire-sentinel
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
```

Create `apps/frontend/.env` (optional):
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start Development

```bash
# Start both frontend and backend
npm run dev
```

Or individually:
```bash
# Terminal 1: Backend
cd apps/backend && npm run dev

# Terminal 2: Frontend
cd apps/frontend && npm run dev
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

### 6. Login

Use any email/password - the system auto-creates users for demo:
- Email: `sarah.thompson@nsw.gov.au`
- Password: `demo123`

Or use any email/password combination!

## 📱 Features to Try

1. **Dashboard**: View metrics, launch patrol, simulate detection
2. **Geofence**: See Australian regions on interactive map
3. **Drones**: Monitor drone fleet in real-time
4. **Detection**: View thermal detections, simulate new ones
5. **Alerts**: Real-time alert notifications
6. **Subscribers**: Manage rural homeowner alerts

## 🎯 Demo Flow

1. Login with any credentials
2. Click "Simulate Detection" on dashboard
3. Watch real-time alerts appear
4. Navigate to Detection page to see thermal data
5. Check Geofence map for Australian zones
6. View Drone fleet status

## 🔧 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- For Atlas: Whitelist your IP address

### Port Already in Use
- Change `PORT` in `apps/backend/.env`
- Update `FRONTEND_URL` accordingly

### Frontend Can't Connect to Backend
- Check `VITE_API_URL` in `apps/frontend/.env`
- Ensure backend is running on correct port
- Check CORS settings in backend

## 📚 Next Steps

- Read `PROJECT_SUMMARY.md` for full feature list
- Check `DEPLOYMENT.md` for production setup
- Explore the codebase in `apps/` directory

Happy coding! 🔥🌿

