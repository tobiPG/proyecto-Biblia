import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Cargar variables de entorno
dotenv.config();

// Importar rutas
import userRoutes from './routes/users.js';
import challengeRoutes from './routes/challenges.js';
import authRoutes from './routes/auth.js';
import rankedRoutes from './routes/ranked.js';
import clanRoutes from './routes/clans.js';
import tournamentRoutes from './routes/tournaments.js';
import { initSocket } from './socket/gameSocket.js';

async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/bibliaquiz';
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
  console.log('✅ Conectado a MongoDB:', uri.includes('localhost') ? 'local' : 'Atlas');
}

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  'http://localhost:8080',
  'http://localhost:3000',
  'http://localhost:5500',
  'http://127.0.0.1:8080',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5500',
  'null'
];

// Socket.io con CORS
const io = new Server(httpServer, {
  cors: {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || origin === 'null') return callback(null, true);
      if (origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) return callback(null, true);
      callback(null, true); // En desarrollo, permitir todo
    },
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Inicializar lógica de sockets
initSocket(io);

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || origin === 'null') return callback(null, true);
    if (origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) return callback(null, true);
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check (incluye estado de socket.io)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date(), sockets: io.engine.clientsCount });
});

// Rutas HTTP
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/ranked', rankedRoutes);
app.use('/api/clans', clanRoutes);
app.use('/api/tournaments', tournamentRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'BibliaQuiz API Backend',
    version: '2.0.0',
    features: ['REST API', 'Socket.io real-time 1v1'],
    endpoints: { auth: '/api/auth', users: '/api/users', challenges: '/api/challenges', ranked: '/api/ranked', clans: '/api/clans', tournaments: '/api/tournaments' }
  });
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ error: err.message, status: err.status || 500 });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Conectar a MongoDB y arrancar servidor
connectDB().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`🚀 Servidor HTTP + Socket.io en http://localhost:${PORT}`);
    console.log(`🔌 Socket.io listo para conexiones en tiempo real`);
  });
}).catch(err => {
  console.error('Error fatal:', err);
  process.exit(1);
});
