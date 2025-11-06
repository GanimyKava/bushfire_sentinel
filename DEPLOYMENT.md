# Deployment Guide

## Prerequisites

- Node.js 18+
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

#### Backend (`apps/backend/.env`)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bushfire-sentinel
JWT_SECRET=your-secret-key-change-in-production
FRONTEND_URL=http://localhost:3000
```

#### Frontend (`apps/frontend/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Development Servers

```bash
# Start both frontend and backend
npm run dev

# Or start individually:
cd apps/frontend && npm run dev
cd apps/backend && npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### 4. Login

Use any email/password combination (auto-creates user on first login):
- Email: `sarah.thompson@nsw.gov.au`
- Password: `demo123`

Or create your own user - any email/password will work for demo.

## Production Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Set build command: `cd apps/frontend && npm install && npm run build`
3. Set output directory: `apps/frontend/dist`
4. Add environment variable: `VITE_API_URL=https://your-backend-url.com/api`

### Backend (Render/Heroku)

1. Connect repository to Render
2. Set build command: `cd apps/backend && npm install && npm run build`
3. Set start command: `cd apps/backend && npm start`
4. Add environment variables:
   - `MONGODB_URI` (MongoDB Atlas connection string)
   - `JWT_SECRET` (random secret)
   - `FRONTEND_URL` (your Vercel URL)

### MongoDB Atlas

1. Create free cluster at https://www.mongodb.com/cloud/atlas
2. Get connection string
3. Update `MONGODB_URI` in backend environment variables

## Features

- ✅ Real-time alerts via Socket.io
- ✅ Role-based authentication (5 personas)
- ✅ Geofence management with Leaflet maps
- ✅ Drone fleet monitoring
- ✅ Thermal detection simulation
- ✅ Subscriber management
- ✅ Australian localization
- ✅ Responsive design

## Testing

```bash
npm run test
npm run lint
```

