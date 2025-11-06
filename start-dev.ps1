# BushFire Sentinel - Development Startup Script

Write-Host "🌿🔥 Starting BushFire Sentinel..." -ForegroundColor Green
Write-Host ""

# Start Backend
Write-Host "Starting Backend Server on port 5000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd apps/backend; npm run dev" -WindowStyle Normal

# Wait a bit
Start-Sleep -Seconds 3

# Start Frontend
Write-Host "Starting Frontend Server on port 3000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd apps/frontend; npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "✓ Servers starting in separate windows" -ForegroundColor Green
Write-Host ""
Write-Host "Access the application at:" -ForegroundColor Cyan
Write-Host "  Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "  Backend API: http://localhost:5000/api" -ForegroundColor White
Write-Host ""
Write-Host "Note: MongoDB connection is optional for demo." -ForegroundColor Yellow
Write-Host "      For full functionality, ensure MongoDB is running or use MongoDB Atlas." -ForegroundColor Yellow

