# BibliaQuiz Backend - MongoDB + Node.js

Backend para BibliaQuiz que reemplaza Firebase con una solución propia usando Node.js, Express y MongoDB.

## Requisitos

- Node.js 16+
- MongoDB 4.4+

## Instalación

### 1. Instalar MongoDB

**Windows:**
```bash
# Descargar desde https://www.mongodb.com/try/download/community
# O usar Chocolatey:
choco install mongodb-community
```

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo apt-get install mongodb
```

### 2. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 3. Configurar variables de entorno

Copiar `.env.example` a `.env` y ajustar valores:

```bash
cp .env.example .env
```

Contenido del `.env`:
```
MONGODB_URI=mongodb://localhost:27017/bibliaquiz
PORT=3001
NODE_ENV=development
JWT_SECRET=tu_clave_secreta_super_segura_aqui_2024
CORS_ORIGIN=http://localhost:8080
```

## Ejecutar el Backend

### Desarrollo (con auto-reload):
```bash
npm run dev
```

### Producción:
```bash
npm start
```

El servidor estará disponible en `http://localhost:3001`

## Endpoints principales

### Autenticación

- `POST /api/auth/anonymous` - Crear sesión anónima
- `POST /api/auth/google` - Login con Google
- `POST /api/auth/validate` - Validar token
- `POST /api/auth/logout` - Cerrar sesión

### Usuarios

- `GET /api/users/me` - Obtener perfil actual
- `PUT /api/users/me` - Actualizar perfil
- `PUT /api/users/me/stats` - Actualizar estadísticas
- `PUT /api/users/me/coins` - Actualizar monedas
- `GET /api/users/leaderboard` - Obtener tabla de clasificación
- `GET /api/users/find/:code` - Buscar por código de amigo
- `POST /api/users/friend-request/:targetUserId` - Enviar solicitud
- `POST /api/users/friend-request/:fromUserId/accept` - Aceptar solicitud
- `POST /api/users/friend-request/:fromUserId/reject` - Rechazar solicitud
- `GET /api/users/friends` - Obtener amigos
- `GET /api/users/friend-requests` - Obtener solicitudes
- `DELETE /api/users/friends/:friendId` - Eliminar amigo

### Retos

- `POST /api/challenges` - Crear reto
- `GET /api/challenges/pending` - Obtener retos pendientes
- `GET /api/challenges/sent` - Obtener mis retos enviados
- `GET /api/challenges/active` - Obtener retos activos
- `GET /api/challenges/:challengeId` - Obtener reto específico
- `PUT /api/challenges/:challengeId/accept` - Aceptar reto
- `DELETE /api/challenges/:challengeId/reject` - Rechazar reto
- `PUT /api/challenges/:challengeId/result` - Enviar resultado

## Estructura de archivos

```
backend/
├── models/
│   ├── User.js           # Esquema de usuario
│   ├── Challenge.js      # Esquema de reto
│   └── Session.js        # Esquema de sesión
├── routes/
│   ├── auth.js           # Rutas de autenticación
│   ├── users.js          # Rutas de usuarios
│   └── challenges.js     # Rutas de retos
├── middleware/
│   └── auth.js           # Middleware de autenticación
├── server.js             # Servidor principal
├── package.json          # Dependencias
└── .env                  # Configuración (no incluir en git)
```

## Migración desde Firebase

Las rutas del backend están diseñadas para reemplazar directamente las llamadas a Firestore. El frontend simplemente necesita cambiar:

```javascript
// Antes (Firebase)
await FirebaseService.createChallenge(friendId, category, difficulty)

// Ahora (Backend)
await fetch('/api/challenges', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: JSON.stringify({ friendId, category, difficulty })
})
```

## Notas de desarrollo

- MongoDB debe estar ejecutándose localmente
- El JWT_SECRET debe cambiarse en producción
- Los tokens expiran en 30 días
- Las sesiones se eliminan automáticamente después de expirar
- CORS está configurado para http://localhost:8080 por defecto

## Troubleshooting

### MongoDB no se conecta
```bash
# Verificar que MongoDB está corriendo
mongosh
```

### Puerto 3001 ya en uso
```bash
# Cambiar en .env
PORT=3002
```

### Error de CORS
Verificar que `CORS_ORIGIN` en `.env` coincide con la URL del frontend.
