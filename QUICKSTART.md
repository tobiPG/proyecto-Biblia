# MongoDB + Node.js Backend - Setup Rápido

## 🚀 Inicio Rápido (Windows)

### Opción 1: Automático (Recomendado)

```powershell
# En PowerShell como Admin:
powershell -ExecutionPolicy Bypass -File .\start_all.ps1
```

Esto inicia todo automáticamente:
- ✅ MongoDB (puerto 27017)
- ✅ Backend API (puerto 3001)
- ✅ Frontend (puerto 8080)

### Opción 2: Manual

**Terminal 1 - MongoDB:**
```bash
mongod --dbpath "C:\data\db"
```

**Terminal 2 - Backend:**
```bash
cd backend
npm install  # Solo la primera vez
npm run dev
```

**Terminal 3 - Frontend:**
```bash
npx http-server -p 8080 -o
```

## ✅ Verificar que todo funciona

1. Abre http://localhost:8080
2. Abre DevTools (F12) → Console
3. Deberías ver: "Backend inicializado correctamente"
4. Juega, tu progreso se guarda automáticamente

## 📚 Documentación

- [Backend README](backend/README.md) - API endpoints
- [SETUP_MONGODB.md](SETUP_MONGODB.md) - Instalación detallada
- [DESARROLLO.md](DESARROLLO.md) - Features de la app

## 🐛 Problemas?

### "MongoDB no encontrado"
```bash
# Windows: Descargar desde https://www.mongodb.com/try/download/community
# O con Chocolatey: choco install mongodb-community
```

### "Puerto 3001 ya en uso"
```bash
# Cambiar en backend/.env
PORT=3002
```

### "Error de conexión a base de datos"
```bash
# Crear carpeta de datos:
mkdir C:\data\db
# E iniciar MongoDB manualmente
```

## 🔄 Detener

```powershell
# Si usastestart_all.ps1:
.\stop_all.ps1

# O Ctrl+C en cada terminal
```

---

¡Listo! No se usa Firebase, ahora todo es tuyo con MongoDB. 🎉
