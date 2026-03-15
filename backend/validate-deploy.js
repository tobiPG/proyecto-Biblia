/**
 * 🔍 BIBLIAQUIZ - Script de Validación Pre-Deploy
 * ============================================
 * Ejecutar con: node validate-deploy.js
 * 
 * Este script verifica que todo esté configurado
 * correctamente antes de subir a producción.
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

console.log('\n🔍 ====================================');
console.log('   VALIDACIÓN PRE-DEPLOY BIBLIAQUIZ');
console.log('====================================\n');

let errors = [];
let warnings = [];

// ============================================
// 1. VARIABLES DE ENTORNO
// ============================================
console.log('📋 1. Verificando variables de entorno...\n');

const requiredVars = [
  'MONGODB_URI',
  'JWT_SECRET',
  'CORS_ORIGIN'
];

requiredVars.forEach(varName => {
  if (!process.env[varName]) {
    errors.push(`❌ Falta variable: ${varName}`);
  } else {
    console.log(`   ✅ ${varName}: Configurada`);
  }
});

// Validar JWT_SECRET
if (process.env.JWT_SECRET) {
  if (process.env.JWT_SECRET.length < 32) {
    warnings.push('⚠️  JWT_SECRET muy corta (mínimo 32 caracteres)');
  }
  if (process.env.JWT_SECRET.includes('CAMBIAR') || 
      process.env.JWT_SECRET.includes('tu_clave')) {
    errors.push('❌ JWT_SECRET parece ser un valor de ejemplo. Cambiar por clave real.');
  }
}

// Validar CORS_ORIGIN
if (process.env.CORS_ORIGIN) {
  if (process.env.CORS_ORIGIN.includes('localhost')) {
    warnings.push('⚠️  CORS_ORIGIN apunta a localhost. ¿Es producción?');
  }
}

// Validar NODE_ENV
if (process.env.NODE_ENV !== 'production') {
  warnings.push('⚠️  NODE_ENV no está configurado como "production"');
}

// ============================================
// 2. CONEXIÓN A MONGODB
// ============================================
console.log('\n📋 2. Verificando conexión a MongoDB...\n');

try {
  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000
  });
  console.log('   ✅ Conexión a MongoDB exitosa');
  
  // Verificar colecciones
  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log(`   ✅ Colecciones encontradas: ${collections.length}`);
  collections.forEach(c => console.log(`      - ${c.name}`));
  
  await mongoose.disconnect();
} catch (err) {
  errors.push(`❌ Error conectando a MongoDB: ${err.message}`);
}

// ============================================
// 3. VERIFICAR ARCHIVOS IMPORTANTES
// ============================================
console.log('\n📋 3. Verificando archivos...\n');

import fs from 'fs';
import path from 'path';

const criticalFiles = [
  'server.js',
  'package.json',
  'routes/auth.js',
  'routes/users.js',
  'models/User.js'
];

criticalFiles.forEach(file => {
  if (fs.existsSync(path.join(process.cwd(), file))) {
    console.log(`   ✅ ${file}`);
  } else {
    errors.push(`❌ Archivo faltante: ${file}`);
  }
});

// Verificar que .env NO se suba a Git
const gitignorePath = path.join(process.cwd(), '..', '.gitignore');
if (fs.existsSync(gitignorePath)) {
  const gitignore = fs.readFileSync(gitignorePath, 'utf8');
  if (!gitignore.includes('.env')) {
    warnings.push('⚠️  .env no está en .gitignore - PELIGRO de exponer credenciales');
  }
}

// ============================================
// RESUMEN
// ============================================
console.log('\n====================================');
console.log('   RESUMEN DE VALIDACIÓN');
console.log('====================================\n');

if (warnings.length > 0) {
  console.log('⚠️  ADVERTENCIAS:');
  warnings.forEach(w => console.log(`   ${w}`));
  console.log('');
}

if (errors.length > 0) {
  console.log('❌ ERRORES (corregir antes de deploy):');
  errors.forEach(e => console.log(`   ${e}`));
  console.log('\n🚫 NO LISTO PARA PRODUCCIÓN\n');
  process.exit(1);
} else {
  console.log('✅ ¡Todo verificado correctamente!');
  console.log('🚀 LISTO PARA PRODUCCIÓN\n');
  process.exit(0);
}
