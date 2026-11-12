# BibliaQuiz

Quiz bíblico con casi 4.000 preguntas: partidas por categoría y dificultad, desafío diario, retos
1 vs 1 entre amigos, clanes, insignias, versículos y modo estudio.

## Qué incluye

- **Partidas** de 10 preguntas (13 categorías + aleatorio, 4 dificultades). El servidor envía las
  preguntas de una en una, baraja las opciones, mide el tiempo (30 s por pregunta) y corrige: el
  cliente nunca recibe la respuesta correcta antes de contestar.
- **Desafío diario**: las mismas 10 preguntas para todos cada día (UTC), una vez por día, con racha.
- **Retos 1 vs 1 entre amigos** (asíncronos): ambos juegan las mismas preguntas; gana quien hace más
  puntos y, en empate, el más rápido. El rival tiene 48 h; si no juega, gana quien sí jugó.
- **Amigos** por código, **clasificación** global o de amigos (semanal o histórica), **clanes** con
  puntos semanales, **insignias**, **versículo del día** con favoritos y **modo estudio**.

Puntuación: Fácil 10 · Intermedio 20 · Difícil 30 · Experto 50, con ×1,5 si respondes en menos de
5 s y ×1,25 en menos de 10 s. Nivel = 1 por cada 500 puntos.

## Arquitectura

```
server/   API en Node.js + TypeScript + Express + SQLite (better-sqlite3)
  src/db/          esquema y migraciones versionadas (PRAGMA user_version)
  src/data/        banco de preguntas, versículos, categorías e insignias
  src/services/    lógica: auth, partidas, retos, amigos, clanes, estadísticas
  src/routes/      endpoints REST (validados con zod)
  src/tests/       pruebas de integración (node:test)
web/      Frontend en React + Vite + TypeScript + Tailwind
  src/pages/       Inicio, Jugar, Partida, Amigos, Retos, Progreso, Clasificación,
                   Versículos, Estudio, Clanes, Ajustes
```

En producción un único proceso sirve el API (`/api`) y el frontend compilado (`web/dist`).

### Seguridad

- Sesión en cookie `httpOnly` + `SameSite=Lax` (+ `Secure` en producción); en la base de datos
  solo se guarda el hash SHA-256 del token.
- Contraseñas con bcrypt (coste 12), mínimo 8 caracteres; límite de 20 intentos de login/registro
  cada 15 min por IP.
- Puntos, monedas de progreso, rachas e insignias los calcula **solo el servidor**.
- Helmet con CSP estricta; las peticiones que modifican datos desde otros orígenes se rechazan.
- Los nombres de jugador y de clan solo aceptan letras, números y `_ . -`; React escapa todo el texto.
- Borrado de cuenta desde Ajustes (elimina todos los datos en cascada).

## Cómo correrlo

Requiere Node.js 20+.

```bash
npm install
cp server/.env.example server/.env
npm run dev:server   # API en http://localhost:4000
npm run dev:web      # en otra terminal, la web en http://localhost:5173
```

Pruebas: `npm test`. Build de producción: `npm run build && npm start`.

## Despliegue (Railway o Fly.io)

SQLite guarda los datos en un archivo, así que el servidor necesita un **disco persistente**.

**Railway:** crea un servicio desde este repo (usa el `Dockerfile` y `railway.json`), añade un
*Volume* montado en `/data` y define `NODE_ENV=production` y `DB_PATH=/data/bibliaquiz.db`.

**Fly.io:** `fly launch --no-deploy`, `fly volumes create bibliaquiz_data --size 1` y `fly deploy`
(ver `fly.toml`).

Copia de seguridad: descarga el archivo `/data/bibliaquiz.db` periódicamente (con el servidor en
marcha usa `sqlite3 bibliaquiz.db ".backup copia.db"`).
