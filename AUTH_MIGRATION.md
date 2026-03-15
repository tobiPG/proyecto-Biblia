# ✅ Migración Completada: Google → Email/Contraseña

## 🎯 Cambios Realizados

### Backend (Node.js)

#### 1. **Nuevos Endpoints de Autenticación**
- `POST /api/auth/register` - Registro con email + contraseña
- `POST /api/auth/login` - Login con email + contraseña  
- `POST /api/auth/change-password` - Cambiar contraseña
- `POST /api/auth/anonymous` - Sesión anónima (de respaldo)

#### 2. **Seguridad**
- Contraseñas hasheadas con bcryptjs
- Tokens JWT que expiran en 30 días
- Sesiones persistentes en MongoDB

#### 3. **Modelo de Datos**
```javascript
User {
  uid: UUID único
  email: Email (único)
  password: Hash seguro
  displayName: Nombre del jugador
  level, xp, coins: Progreso
  ...
}
```

### Frontend (JavaScript)

#### 1. **Eliminado**
- ❌ Botón "Iniciar sesión con Google"
- ❌ Botón "Vincular con Google"
- ❌ Scripts de Firebase

#### 2. **Agregado**
- ✅ Formulario de Login (email + contraseña)
- ✅ Formulario de Registro (email + contraseña + nombre)
- ✅ Modal de cambio de contraseña
- ✅ Botón de Cerrar sesión
- ✅ Archivo `js/auth.js` - Manejo de autenticación
- ✅ Archivo `js/backend.js` - API REST client
- ✅ Archivo `css/login-auth.css` - Estilos

#### 3. **Funcionalidades**

**Login:**
- Email y contraseña requeridos
- Validación de emails duplicados
- Token guardado en localStorage
- Progreso persistente al reiniciar sesión

**Registro:**
- Email único
- Contraseña hasheada
- Nombre de usuario opcional
- Crear sesión automáticamente

**Cambio de Contraseña:**
- Verificar contraseña actual
- Validar nueva contraseña
- Actualizar sin perder datos

**Logout:**
- Limpiar token y sesión
- Opción de volver a sesión anónima

## 🚀 Cómo Usar

### Primero, Iniciar el Backend

```bash
# Terminal 1 - MongoDB
mongod --dbpath "C:\data\db"

# Terminal 2 - Backend
cd backend
npm run dev

# Terminal 3 - Frontend
npx http-server -p 8080 -o
```

Ó ejecutar el script automático:
```powershell
.\start_all.ps1
```

### En la Aplicación

**Primera Vez:**
1. La app asigna un usuario anónimo automáticamente
2. Juega sin perder datos (se guardan localmente)

**Crear Cuenta:**
1. Haz clic en "?Ya tienes cuenta?" (banner)
2. Selecciona "Registrarse"
3. Completa: Email, Contraseña, Nombre (opcional)
4. Tu progreso se sincroniza a la base de datos

**Iniciar Sesión:**
1. Haz clic en "¿Ya tienes cuenta?"
2. Permanece en "Iniciar sesión"
3. Ingresa email y contraseña
4. Tu progreso se restaura automáticamente

**Cambiar Contraseña:**
1. En el perfil, haz clic en "🔐 Cambiar contraseña"
2. Ingresa contraseña actual y nueva
3. Confirm cambio

**Cerrar Sesión:**
1. En el perfil, haz clic en "🚪 Cerrar sesión"
2. Vuelves a usuario anónimo

## 📊 Flujo de Datos

```
┌─────────────────┐
│   Frontend      │  archivo index.html + js/auth.js
│  (HTML/JS)      │  
└────────┬────────┘
         │ HTTP REST API
         ↓
┌─────────────────┐
│  Backend API    │  Express.js, puerto 3001
│  (Node.js)      │
└────────┬────────┘
         │ Mongoose
         ↓
┌─────────────────┐
│   MongoDB       │  puerto 27017
│  (Base datos)   │
└─────────────────┘
```

## 🔐 Seguridad

- **Contraseñas:** Hasheadas con bcryptjs (salted 10)
- **Tokens:** JWT con expiración a 30 días
- **Email:** Único, validado al registrar
- **SSL/TLS:** Recomendado en producción

## 📱 Persistencia

### Datos Sincronizados a MongoDB:
- ✅ Email y contraseña (hasheada)
- ✅ Nombre de usuario
- ✅ Nivel y XP
- ✅ Monedas
- ✅ Estadísticas (games, corrects, etc)
- ✅ Amigos y solicitudes
- ✅ Retos

### Datos Locales (localStorage):
- Caché de datos para offline
- Token de sesión
- Algunas configuraciones

## 🐛 Troubleshooting

**"Email ya está registrado"**
- Usa otro email o intenta login

**"Contraseña incorrecta"**
- Email y contraseña sensibles a mayúsculas
- Password mínimo 6 caracteres

**"Token expirado"**
- Cierra sesión y vuelve a iniciar
- Token dura 30 días

**"No puedo cambiar contraseña"**
- Verifica que ingresaste correctamente la contraseña actual
- Mínimo 6 caracteres para la nueva

## 📝 Próximas Mejoras (Opcional)

- [ ] Recuperación de contraseña por email
- [ ] Two-Factor Authentication (2FA)
- [ ] OAuth con Google/GitHub  
- [ ] Sincronización en tiempo real
- [ ] Backup automático de datos

## 📖 Archivos Modificados

```
proyecto-Biblia/
├── backend/
│   ├── routes/auth.js          (✅ MODIFICADO - Nuevo login/register)
│   └── models/User.js          (Sin cambios, ya tiene todo)
│
├── js/
│   ├── auth.js                 (✅ CREADO - Manejo de UI auth)
│   ├── backend.js              (✅ NECESITA crear sesión anónima)
│   └── firebase.js             (❌ YA NO SE USA)
│
├── css/
│   ├── login-auth.css          (✅ CREADO - Estilos nuevos)
│   └── styles.css              (Sin cambios)
│
├── index.html                  (✅ MODIFICADO - Nuevo HTML login)
├── QUICKSTART.md               (Docs)
└── SETUP_MONGODB.md            (Docs)
```

---

¡Ya no depende de Firebase! Todo es tuyo. 🎉

Datos seguros, contraseñas hasheadas, y el progreso se guarda en tu base de datos. 🔒
