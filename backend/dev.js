// dev.js — arranca MongoMemoryServer y luego lanza server.js
// Solo para desarrollo local sin MongoDB instalado
import { MongoMemoryServer } from 'mongodb-memory-server';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('[dev] Iniciando MongoDB en memoria...');
const mongod = await MongoMemoryServer.create({ instance: { port: 27017 } });
const uri = mongod.getUri();
console.log('[dev] MongoDB listo en:', uri);

process.env.MONGODB_URI = uri;
process.env.PORT = process.env.PORT || '3001';
process.env.NODE_ENV = 'development';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key_bibliaquiz_2026_local';
process.env.CORS_ORIGIN = 'http://localhost:8080';

// Lanzar server.js en el mismo proceso usando import dinámico
await import(pathToFileURL(join(__dirname, 'server.js')).href);
