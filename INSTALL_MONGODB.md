# 🚀 Instalación Rápida de MongoDB

## Opción 1: MongoDB Community (Local) - RECOMENDADO

### Windows (Descarga manual)

1. **Descargar:**
   - Ve a: https://www.mongodb.com/try/download/community
   - Selecciona "Windows" y descarga el `.msi`

2. **Instalar:**
   - Ejecuta el instalador (.msi)
   - Elige "Install MongoDB as a Service" (automático al iniciar Windows)
   - Instala en `C:\Program Files\MongoDB\Server\6.0` (o la versión más reciente)

3. **Verificar:**
   ```powershell
   mongod --version
   ```

4. **Iniciar:**
   ```powershell
   mongod --dbpath "C:\data\db"
   ```

### Mac

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Linux (Ubuntu)

```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

---

## Opción 2: MongoDB Atlas (En la Nube - Gratuito) 🌩️

1. **Crear cuenta:**
   - Ve a: https://www.mongodb.com/cloud/atlas
   - Haz clic en "Try Free"
   - Crea una cuenta

2. **Crear cluster:**
   - Selecciona "Free" (M0 - Gratuito)
   - Elige región (ej: AWS - N. Virginia)

3. **Obtener conexión:**
   - Copia la connection string
   - Reemplaza en `backend/.env`:
     ```
     MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/bibliaquiz?retryWrites=true&w=majority
     ```

4. **Whitelist IP:**
   - En Atlas: Network Access → Add IP Address
   - Permite tu IP (o 0.0.0.0 para desarrollo)

---

## Opción 3: Docker (Si tienes Docker instalado)

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

---

## Después de instalar MongoDB:

### 1. Crear carpeta de datos (si usas local):
```powershell
mkdir C:\data\db
```

### 2. Iniciar MongoDB en otra terminal:
```powershell
mongod --dbpath "C:\data\db"
```

### 3. En otra terminal, iniciar Backend:
```powershell
cd backend
npm run dev
```

### 4. En otra terminal, iniciar Frontend:
```powershell
npx http-server -p 8080 -o
```

**¡Listo! La app está corriendo.** 🎉

---

## Troubleshooting

### "mongod not found"
- Asegúrate que MongoDB está en C:\Program Files\MongoDB\Server\6.0\bin
- O agrega a PATH: `C:\Program Files\MongoDB\Server\6.0\bin`

### Puerto 27017 en uso
```powershell
netstat -ano | findstr :27017
taskkill /PID <PID_NUMBER> /F
```

### MongoDB no inicia
```powershell
# Limpiar
rm -r C:\data\db

# Crear nueva carpeta
mkdir C:\data\db

# Reiniciar
mongod --dbpath "C:\data\db"
```
