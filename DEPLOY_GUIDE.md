# 🚀 GUÍA DE DESPLIEGUE - BibliaQuiz

## Índice
1. [Preparación](#1-preparación)
2. [Backend en Render (Recomendado)](#2-backend-en-render)
3. [Frontend en Vercel](#3-frontend-en-vercel)
4. [Configuración Final](#4-configuración-final)
5. [Verificación](#5-verificación)

---

## 1. Preparación

### 1.1 Requisitos
- Cuenta de GitHub con el código subido
- Cuenta de MongoDB Atlas (ya la tienes)
- Cuenta en Render.com (gratis)
- Cuenta en Vercel.com (gratis)

### 1.2 Subir código a GitHub
```bash
git init
git add .
git commit -m "Preparado para producción"
git remote add origin https://github.com/TU_USUARIO/bibliaquiz.git
git push -u origin main
```

### 1.3 Variables de entorno necesarias
| Variable | Ejemplo | Descripción |
|----------|---------|-------------|
| MONGODB_URI | mongodb+srv://... | Conexión a MongoDB Atlas |
| JWT_SECRET | abc123...xyz | Clave de 64+ caracteres |
| CORS_ORIGIN | https://bibliaquiz.vercel.app | URL exacta del frontend |
| NODE_ENV | production | Modo de ejecución |
| PORT | 3001 | Puerto del servidor |

---

## 2. Backend en Render

### Paso 1: Crear cuenta
1. Ir a https://render.com
2. Click "Get Started for Free"
3. Conectar con GitHub

### Paso 2: Crear Web Service
1. Dashboard → "New" → "Web Service"
2. Conectar tu repositorio de GitHub
3. Configurar:
   - **Name:** bibliaquiz-api
   - **Region:** Oregon (o más cercano)
   - **Root Directory:** backend
   - **Environment:** Node
   - **Build Command:** npm install
   - **Start Command:** npm start
   - **Instance Type:** Free

### Paso 3: Variables de entorno
En la sección "Environment" agregar:

```
MONGODB_URI = mongodb+srv://oagg1130_db_user:tivRTjIfXSZRpp1O@cluster0.8mrhaj2.mongodb.net/bibliaquiz?retryWrites=true&w=majority

JWT_SECRET = [Generar con: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"]

CORS_ORIGIN = https://bibliaquiz.vercel.app

NODE_ENV = production

PORT = 3001
```

### Paso 4: Desplegar
1. Click "Create Web Service"
2. Esperar 2-5 minutos
3. Copiar URL del servicio (ej: `https://bibliaquiz-api.onrender.com`)

---

## 3. Frontend en Vercel

### Paso 1: Crear cuenta
1. Ir a https://vercel.com
2. "Sign up" con GitHub

### Paso 2: Importar proyecto
1. "Add New" → "Project"
2. Seleccionar repositorio de GitHub
3. Configurar:
   - **Framework Preset:** Other
   - **Root Directory:** ./ (raíz del proyecto, NO backend)
   - **Build Command:** (dejar vacío)
   - **Output Directory:** (dejar vacío)

### Paso 3: Desplegar
1. Click "Deploy"
2. Esperar 1-2 minutos
3. Copiar URL (ej: `https://bibliaquiz.vercel.app`)

---

## 4. Configuración Final

### 4.1 Actualizar URL del backend en el frontend
Editar `js/backend.js` línea 10:
```javascript
const PRODUCTION_API_URL = 'https://bibliaquiz-api.onrender.com/api';
```

### 4.2 Actualizar CORS en Render
En Render → tu servicio → Environment:
```
CORS_ORIGIN = https://bibliaquiz.vercel.app
```
(Usar la URL exacta que te dio Vercel)

### 4.3 Redesplegar
1. Hacer commit y push de los cambios
2. Render y Vercel detectan automáticamente y despliegan

---

## 5. Verificación

### 5.1 Probar endpoint de salud
```bash
curl https://bibliaquiz-api.onrender.com/api/health
```
Debe responder: `{"status":"ok",...}`

### 5.2 Probar frontend
1. Abrir https://bibliaquiz.vercel.app
2. Registrar cuenta nueva
3. Jugar un quiz
4. Verificar que se guarda el progreso

### 5.3 Checklist final
- [ ] Backend responde en /api/health
- [ ] Frontend carga sin errores de consola
- [ ] Registro de usuarios funciona
- [ ] Login funciona
- [ ] El progreso se guarda correctamente
- [ ] PWA se puede instalar

---

## Solución de Problemas

### Error CORS
```
Access to fetch blocked by CORS policy
```
**Solución:** Verificar que CORS_ORIGIN en Render sea EXACTAMENTE igual a la URL de Vercel (incluyendo https://)

### Error de conexión MongoDB
```
MongoServerSelectionError
```
**Solución:** 
1. En MongoDB Atlas → Network Access → Add IP Address → "Allow Access from Anywhere" (0.0.0.0/0)
2. Verificar usuario y contraseña

### Backend se duerme (Render Free)
En el plan gratuito de Render, el backend se duerme después de 15 minutos sin uso.
**Solución:** Usar https://cron-job.org para hacer ping cada 10 minutos a `/api/health`

---

## Costos Estimados

| Servicio | Plan | Costo |
|----------|------|-------|
| Vercel | Hobby | $0/mes |
| Render | Free | $0/mes |
| MongoDB Atlas | M0 | $0/mes |
| **Total** | | **$0/mes** |

Para más tráfico:
- Render Starter: $7/mes (siempre activo)
- MongoDB M10: $57/mes (mayor rendimiento)

---

## Contacto
Si tienes problemas, revisa la documentación:
- Render: https://render.com/docs
- Vercel: https://vercel.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com
