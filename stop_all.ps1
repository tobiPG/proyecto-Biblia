# Script para detener todos los servicios
# Ejecutar: powershell -ExecutionPolicy Bypass -File .\stop_all.ps1

Write-Host "Deteniendo servicios..." -ForegroundColor Yellow

# Detener MongoDB
Write-Host "Deteniendo MongoDB..." -ForegroundColor Cyan
Stop-Process -Name mongod -Force -ErrorAction SilentlyContinue
Write-Host "✅ MongoDB detenido" -ForegroundColor Green

# Detener Node.js (Backend)
Write-Host "Deteniendo Backend..." -ForegroundColor Cyan
Stop-Process -Name node -Force -ErrorAction SilentlyContinue
Write-Host "✅ Backend detenido" -ForegroundColor Green

# Detener http-server
Write-Host "Deteniendo Frontend..." -ForegroundColor Cyan
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
Write-Host "✅ Frontend detenido" -ForegroundColor Green

Write-Host ""
Write-Host "✅ Todos los servicios detenidos" -ForegroundColor Green
