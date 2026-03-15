import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcryptjs from 'bcryptjs';
import User from '../models/User.js';
import Session from '../models/Session.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Registrarse con email y contraseña
router.post('/register', async (req, res) => {
  try {
    const { email, password, displayName } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }
    
    // Verificar que email no existe
    let user = await User.findOne({ email: email.toLowerCase() });
    
    if (user) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }
    
    // Hashear contraseña
    const hashedPassword = await bcryptjs.hash(password, 10);
    
    // Crear nuevo usuario
    user = new User({
      email: email.toLowerCase(),
      displayName: displayName || email.split('@')[0],
      password: hashedPassword,
      isAnonymous: false,
      friendCode: generateFriendCode()
    });
    
    await user.save();
    
    // Crear sesión
    const session = new Session({
      userId: user.uid,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });
    await session.save();
    
    res.json({
      token: session.token,
      user: {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        level: user.level,
        xp: user.xp,
        coins: user.coins,
        isAnonymous: user.isAnonymous
      }
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: error.message });
  }
});

// Login con email y contraseña
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }
    
    // Buscar usuario
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }
    
    // Verificar contraseña
    const passwordValid = await bcryptjs.compare(password, user.password);
    
    if (!passwordValid) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }
    
    // Crear sesión
    const session = new Session({
      userId: user.uid,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });
    await session.save();
    
    // Actualizar lastActive
    user.lastActive = new Date();
    await user.save();
    
    res.json({
      token: session.token,
      user: {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        level: user.level,
        xp: user.xp,
        coins: user.coins,
        isAnonymous: user.isAnonymous
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: error.message });
  }
});

// Crear sesión anónima (sin login)
router.post('/anonymous', async (req, res) => {
  try {
    const { deviceId } = req.body;
    
    // Buscar si existe un usuario para este dispositivo
    let user = await User.findOne({ isAnonymous: true });
    
    if (!user) {
      // Crear nuevo usuario anónimo
      user = new User({
        displayName: `Jugador${Math.floor(Math.random() * 9999)}`,
        isAnonymous: true
      });
      await user.save();
    }
    
    // Crear sesión
    const session = new Session({
      userId: user.uid,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 días
    });
    await session.save();
    
    res.json({
      token: session.token,
      user: {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        level: user.level,
        xp: user.xp,
        coins: user.coins,
        isAnonymous: user.isAnonymous
      }
    });
  } catch (error) {
    console.error('Error creando sesión anónima:', error);
    res.status(500).json({ error: error.message });
  }
});

// Validar token
router.post('/validate', authMiddleware, (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  
  res.json({
    valid: true,
    user: req.user
  });
});

// Logout
router.post('/logout', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (token) {
      await Session.deleteOne({ token });
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cambiar contraseña
router.post('/change-password', authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }
    
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Contraseñas requeridas' });
    }
    
    const user = await User.findOne({ uid: req.user.uid });
    
    if (!user || !user.password) {
      return res.status(400).json({ error: 'Usuario sin contraseña' });
    }
    
    // Verificar contraseña actual
    const passwordValid = await bcryptjs.compare(currentPassword, user.password);
    
    if (!passwordValid) {
      return res.status(401).json({ error: 'Contraseña actual incorrecta' });
    }
    
    // Hashear nueva contraseña
    user.password = await bcryptjs.hash(newPassword, 10);
    await user.save();
    
    res.json({ success: true, message: 'Contraseña actualizada' });
  } catch (error) {
    console.error('Error cambiando contraseña:', error);
    res.status(500).json({ error: error.message });
  }
});

function generateFriendCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export default router;
