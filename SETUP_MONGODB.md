# Migración de Firebase a MongoDB + Node.js - Guía de Instalación

## Status de Migración

✅ Backend completamente creado
✅ API endpoints listos
✅ Frontend actualizado para usar Backend
⏳ Pendiente: Instalar MongoDB y ejecutar

## 🎯 Próximos Pasos

### 1️⃣ Instalar MongoDB

**Windows:**
```bash
# Opción A: Descargar desde sitio oficial
# 1. Ir a: https://www.mongodb.com/try/download/community
# 2. Descargar MongoDB Community (.msi)
# 3. Ejecutar instalador (seguir pasos por defecto)
# 4. MongoDB se instalará como servicio y arrancará automáticamente

# Opción B: Usar Chocolatey (si lo tenés instalado)
choco install mongodb-community
```

**Verificar instalación:**
```powershell
mongod --version
```

**Iniciar MongoDB (si no está como servicio):**
```powershell
# En Windows, encontrar mongod.exe y ejecutarlo, o:
mongod --dbpath "C:\data\db"
```

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### 2️⃣ Instalar Dependencias del Backend

```bash
cd backend
npm install
```

### 3️⃣ Configurar Variables de Entorno

```bash
cd backend

# Copiar template
cp .env.example .env

# Editar .env (opcional, los valores por defecto funcionan):
# MONGODB_URI=mongodb://localhost:27017/bibliaquiz
# PORT=3001
```

### 4️⃣ Ejecutar el Backend

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Deberías ver:
```
✅ Conectado a MongoDB
🚀 Servidor ejecutándose en http://localhost:3001
```

### 5️⃣ Ejecutar el Frontend

**Terminal 2 - Frontend:**
```bash
# En la raíz del proyecto
npx http-server -p 8080 -o
```

O continuá con el servidor que ya tenías:

```powershell
# Si ya está ejecutándose en terminal
http://localhost:8080
```

## ✅ Verificación

Abre tu navegador en `http://localhost:8080` y:

1. ✅ La app debe cargar sin errores de Firebase
2. ✅ Deberías ver "Backend inicializado correctamente" en consola
3. ✅ Puedes jugar normalmente
4. ✅ Al volver a abrir, tu progreso se recupera (localStorage)

## 📱 Pruebas Básicas

### Test 1: Sesión Anónima
- Abre la app
- Deberías tener un usuario anónimo con ID generado
- Tus monedas y progreso se guardan localmente

### Test 2: Progreso
- Juega algunas rondas
- Recarga la página
- Tus monedas y nivel deben persistir

### Test 3: Tabla de Clasificación
- Ve a "Ranked" o "Social"
- Deberías ver a otros jugadores (anónimos del backend)

## 🐛 Troubleshooting

### "Conectado a MongoDB" pero MongoDB no inicia

**Windows:**
```powershell
# Crear carpeta de datos
mkdir C:\data\db

# Iniciar MongoDB
mongod --dbpath "C:\data\db"

# En otra terminal, iniciar backend
cd backend
npm run dev
```

### Puerto 3001 ya en uso

```bash
# Cambiar puerto en backend/.env
PORT=3002

# Y en frontend/backend.js, cambiar:
const API_BASE_URL = 'http://localhost:3002/api';
```

### Error "Error de respuesta" en la app

1. Verifica que el backend está corriendo: `http://localhost:3001/api/health`
2. Revisa console del navegador (F12) para más detalles
3. Revisa console del backend

### MongoDB no inicia en Windows

```powershell
# Verificar si el puerto 27017 está en uso
netstat -ano | findstr :27017

# Si algún proceso lo usa:
taskkill /PID <PID_NÚMERO> /F
```

## 🔄 Flujo Actual

```
Frontend (http://localhost:8080)
    ↓
backend.js (HTTP requests)
    ↓
Backend API (http://localhost:3001)
    ↓
MongoDB (puerto 27017)
```

## 📝 Migraciones Pendientes (Opcional)

Si querés migrar LOGIN CON GOOGLE real:

1. En `backend/routes/auth.js`, reemplazar simular con Google OAuth real
2. En frontend, usar Google Sign-In API real en lugar de simulado
3. Requerirá Google Cloud Console setup

Por ahora todo funciona sin Google pero con sesiones anónimas.

## 🚀 Siguiente: Despliegue a Producción

Cuando estés listo para publicar:

1. **Base de datos**: Usar MongoDB Atlas (cloud gratuito)
   - https://www.mongodb.com/cloud/atlas

2. **Backend**: Desplegar en Heroku, Railway, Vercel, etc.

3. **Frontend**: Publicar en GitHub Pages o servidor

Pero por ahora, ¡todo funciona local! 🎉

## ❓ Preguntas Frecuentes

**P: ¿Pierdo mis datos si reinicio MongoDB?**
A: No. MongoDB persiste datos en disco. Solo si borras la carpeta de datos.

**P: ¿Puedo usar MongoDB en la nube?**
A: Sí, MongoDB Atlas es gratuito para desarrollo.

**P: ¿El backend está listo para producción?**
A: Funciona bien, pero falta implementar:
   - Validaciones más robustas
   - Rate limiting
   - Logging más detallado
   - Tests automatizados

---

¿Necesitas ayuda? Revisa los logs en ambas terminales. 🔍
