# 🧪 Guía de Prueba - BibliaQuiz con Email/Contraseña

## ✅ STATUS ACTUAL

- ✅ **Backend:** Corriendo en http://localhost:3001
- ✅ **Frontend:** Corriendo en http://localhost:8080  
- ⏳ **MongoDB:** Pendiente de instalar (ver instrucciones)

---

## 📋 PASOS PARA PROBAR

### 1️⃣ Instalar MongoDB

**⚠️ IMPORTANTE:** El backend intentará conectar a MongoDB en `mongodb://localhost:27017/bibliaquiz`

**Opción A: Descargar e instalar (RECOMENDADO)**
```
1. Ve a: https://www.mongodb.com/try/download/community
2. Descarga la versión Community (.msi para Windows)
3. Ejecuta instalador → Elige "Install as Service"
```

**Opción B: Usar Atlas (En la nube, GRATIS)**
```
1. Ve a: https://www.mongodb.com/cloud/atlas
2. Crea cuenta gratuita
3. Crea un cluster M0 (gratis)
4. Copia la connection string
5. Reemplaza en backend/.env:
   MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/bibliaquiz
```

### 2️⃣ Iniciar MongoDB (si instalaste localmente)

```powershell
# Crear carpeta de datos
mkdir C:\data\db

# Iniciar en otra terminal
mongod --dbpath "C:\data\db"
```

### 3️⃣ En otra terminal, iniciar Backend

```powershell
cd backend
npm run dev
```

Deberías ver:
```
✅ Conectado a MongoDB
🚀 Servidor ejecutándose en http://localhost:3001
```

### 4️⃣ Frontend ya está corriendo

Abre en navegador: **http://localhost:8080**

---

## 🧪 CASOS DE PRUEBA

### TEST 1: Usuario Anónimo (Sin Login)

1. Abre http://localhost:8080
2. **Esperado:** La app carga, ves "Usuario anónimo"
3. Abre DevTools (F12 → Console)
4. **Esperado:** Ves `Backend inicializado correctamente`
5. Intenta jugar una ronda
6. **Esperado:** Funciona normalmente, datos se guardan localmente

### TEST 2: Registrarse (Crear Cuenta)

1. En la app, haz clic en "¿Ya tienes cuenta?" (banner)
2. Haz clic en "Registrarse"
3. Completa:
   - Email: `prueba@ejemplo.com`
   - Contraseña: `password123`
   - Nombre: `Juan` (opcional)
4. Haz clic en "📝 Crear cuenta"
5. **Esperado:** 
   - ✅ Cuenta creada
   - ✅ Sesión iniciada automáticamente
   - ✅ Token guardado en localStorage
   - ✅ Datos se sincronizan a MongoDB

### TEST 3: Verificar Persistencia

1. Después de registrarse, juega 2-3 rondas
2. Anota tus monedad y nivel actual
3. **Recarga la página** (F5)
4. **Esperado:**
   - ✅ Sigues conectado con el mismo usuario
   - ✅ Monedas y nivel son IGUALES (persistieron)
   - ✅ En DevTools → Application → LocalStorage → backend_token (existe)

### TEST 4: Logout y Login

1. En Social → Haz clic en "🚪 Cerrar sesión"
2. **Esperado:** Se limpia sesión, vuelves a anónimo
3. Haz clic nuevamente en "¿Ya tienes cuenta?"
4. Elige "Iniciar sesión"
5. Ingresa:
   - Email: `prueba@ejemplo.com`
   - Contraseña: `password123`
6. Haz clic en "🔑 Iniciar sesión"
7. **Esperado:**
   - ✅ Sesión iniciada
   - ✅ Recupera MISMO datos que antes de logout
   - ✅ Token nuevo en localStorage

### TEST 5: Email Duplicado

1. Intenta registrarte con mismo email: `prueba@ejemplo.com`
2. **Esperado:** ❌ Error: "El email ya está registrado"

### TEST 6: Contraseña Incorrecta

1. Intenta login con:
   - Email: `prueba@ejemplo.com`
   - Contraseña: `wrongpassword`
2. **Esperado:** ❌ Error: "Email o contraseña incorrectos"

### TEST 7: Cambiar Contraseña

1. (Estar logueado como `prueba@ejemplo.com`)
2. En Social → Botón "🔐 Cambiar contraseña"
3. Completa:
   - Contraseña actual: `password123`
   - Nueva: `newpass456`
   - Confirmar: `newpass456`
4. Haz clic "Cambiar"
5. **Esperado:** ✅ "Contraseña cambiada correctamente"
6. Logout
7. Intenta login con `newpass456`
8. **Esperado:** ✅ Funciona con nueva contraseña

---

## 📊 Verificar Base de Datos

### En MongoDB (Local o Atlas)

Una vez logueado, en MongoDB Compass o terminal:

```javascript
// Conectar a tu base de datos
use bibliaquiz

// Ver todos los usuarios
db.users.find()

// Ver un usuario específico por email
db.users.findOne({ email: "prueba@ejemplo.com" })
```

**Deberías ver:**
```json
{
  "_id": ObjectId("..."),
  "uid": "uuid-aqui",
  "email": "prueba@ejemplo.com",
  "password": "$2a$10$...",  // contraseña hasheada (bcrypt)
  "displayName": "Juan",
  "level": 1,
  "xp": 0,
  "coins": 0,
  ...
}
```

---

## ✅ CHECKLIST DE PRUEBA

- [ ] MongoDB está corriendo
- [ ] Backend inicia sin errores
- [ ] Frontend carga en http://localhost:8080
- [ ] Usuario anónimo funciona
- [ ] Puedo registrarme con email
- [ ] Puedo hacer logout
- [ ] Puedo hacer login con email y contraseña
- [ ] Al recargar, mi progreso persiste
- [ ] Puedo cambiar contraseña
- [ ] Los datos están en MongoDB

---

## 🐛 Errores Comunes

### "No se puede conectar al Backend"
- Asegúrate que el Backend está corriendo: http://localhost:3001/api/health
- Deberías ver: `{ status: 'ok', timestamp: '...' }`

### "MongoDB no se conecta"
- Instala MongoDB Community Edition
- Ejecuta: `mongod --dbpath "C:\data\db"`
- O usa MongoDB Atlas (en la nube)

### "Puerto 3001/8080 ya en uso"
```powershell
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### "npm: No se encuentra"
- Instala Node.js desde https://nodejs.org/

### "npx: No se encuentra"
- Usa Node.js LTS (versión 18+)

---

## 📞 Soporte

Si algo no funciona:

1. **Verifica logs del Backend:** Console de la terminal
2. **Verifica DevTools del Frontend:** F12 → Console
3. **Verifica MongoDB:** `mongosh` o MongoDB Compass

---

## 🎉 Resumen

Esta configuración permite:
- ✅ **Registro/Login:** Email + Contraseña (sin Google)
- ✅ **Seguridad:** Contraseñas hasheadas con bcryptjs
- ✅ **Persistencia:** Datos guardados en MongoDB
- ✅ **Soporta múltiples usuarios:** Cada uno con su progreso
- ✅ **Cambio de contraseña:** Seguro y validado

**Todas las características funcionan sin Firebase.** 🚀
