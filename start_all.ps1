# Script para iniciar todo automáticamente
# Ejecutar: powershell -ExecutionPolicy Bypass -File .\start_all.ps1

Write-Host "================================" -ForegroundColor Yellow
Write-Host "BibliaQuiz - Iniciando ambiente" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Yellow
Write-Host ""

# Verificar MongoDB
Write-Host "[1/3] Verificando MongoDB..." -ForegroundColor Cyan
$mongodCheck = & mongod --version 2>$null
if (-not $mongodCheck) {
    Write-Host "❌ MongoDB no está instalado" -ForegroundColor Red
    Write-Host "Descarga desde: https://www.mongodb.com/try/download/community" -ForegroundColor Yellow
    exit
}
Write-Host "✅ MongoDB encontrado" -ForegroundColor Green

# Verificar Node.js
Write-Host "[2/3] Verificando Node.js..." -ForegroundColor Cyan
$nodeCheck = & node --version 2>$null
if (-not $nodeCheck) {
    Write-Host "❌ Node.js no está instalado" -ForegroundColor Red
    Write-Host "Descarga desde: https://nodejs.org/ (LTS recomendado)" -ForegroundColor Yellow
    exit
}
Write-Host "✅ Node.js $nodeCheck encontrado" -ForegroundColor Green

# Verificar frontend
Write-Host "[3/3] Verificando archivos..." -ForegroundColor Cyan
if (-not (Test-Path "index.html")) {
    Write-Host "❌ index.html no encontrado" -ForegroundColor Red
    exit
}
if (-not (Test-Path "backend/package.json")) {
    Write-Host "❌ backend no está configurado" -ForegroundColor Red
    exit
}
Write-Host "✅ Archivos encontrados" -ForegroundColor Green

Write-Host ""
Write-Host "================================" -ForegroundColor Yellow
Write-Host "Iniciando servicios..." -ForegroundColor Green
Write-Host "================================" -ForegroundColor Yellow
Write-Host ""

# Instalar dependencias del backend si no existen
if (-not (Test-Path "backend/node_modules")) {
    Write-Host "[Backend] Instalando dependencias..." -ForegroundColor Cyan
    cd backend
    npm install
    cd ..
    Write-Host "✅ Dependencias instaladas" -ForegroundColor Green
    Write-Host ""
}

# Crear carpeta de datos MongoDB si no existe
$mongoDataPath = "C:\data\db"
if (-not (Test-Path $mongoDataPath)) {
    Write-Host "[MongoDB] Creando carpeta de datos..." -ForegroundColor Cyan
    New-Item -ItemType Directory -Force -Path $mongoDataPath | Out-Null
    Write-Host "✅ Carpeta creada" -ForegroundColor Green
}

# Iniciar MongoDB
Write-Host "[MongoDB] Iniciando en puerto 27017..." -ForegroundColor Cyan
$mongoProcess = Start-Process mongod -ArgumentList "--dbpath $mongoDataPath" -WindowStyle Minimized -PassThru
Write-Host "✅ MongoDB iniciado (PID: $($mongoProcess.Id))" -ForegroundColor Green

# Esperar a que MongoDB esté listo
Start-Sleep -Seconds 2

# Iniciar Backend
Write-Host "[Backend] Iniciando en puerto 3001..." -ForegroundColor Cyan
$backendProcess = Start-Process powershell -ArgumentList "cd '$PSScriptRoot\backend'; npm run dev" -WindowStyle Hidden -PassThru
Write-Host "✅ Backend iniciado (PID: $($backendProcess.Id))" -ForegroundColor Green

# Esperar a que Backend esté listo
Start-Sleep -Seconds 3

# Iniciar Frontend
Write-Host "[Frontend] Iniciando en puerto 8080..." -ForegroundColor Cyan
$frontendProcess = Start-Process powershell -ArgumentList "npx http-server -p 8080 -o" -WindowStyle Hidden -PassThru
Write-Host "✅ Frontend iniciado (PID: $($frontendProcess.Id))" -ForegroundColor Green

Write-Host ""
Write-Host "================================" -ForegroundColor Green
Write-Host "✅ Todos los servicios iniciados" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""
Write-Host "Acceso:" -ForegroundColor Yellow
Write-Host "  Frontend: http://localhost:8080" -ForegroundColor Cyan
Write-Host "  Backend:  http://localhost:3001/api/health" -ForegroundColor Cyan
Write-Host "  MongoDB:  localhost:27017" -ForegroundColor Cyan
Write-Host ""
Write-Host "Para detener, ejecuta:" -ForegroundColor Yellow
Write-Host "  .\stop_all.ps1" -ForegroundColor Cyan
Write-Host ""
Write-Host "Presiona Ctrl+C para cancelar, o cierra esta ventana cuando termines." -ForegroundColor Yellow
Write-Host ""

# Mantener script activo
while ($true) {
    # Verificar si los procesos siguen ejecutándose
    if ($mongoProcess.HasExited) {
        Write-Host "[Alerta] MongoDB finalizó inesperadamente" -ForegroundColor Red
    }
    if ($backendProcess.HasExited) {
        Write-Host "[Alerta] Backend finalizó inesperadamente" -ForegroundColor Red
    }
    if ($frontendProcess.HasExited) {
        Write-Host "[Alerta] Frontend finalizó inesperadamente" -ForegroundColor Red
    }
    
    Start-Sleep -Seconds 5
}
