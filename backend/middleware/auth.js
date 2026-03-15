import Session from '../models/Session.js';
import User from '../models/User.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.query.token;
    
    if (!token) {
      // Si no hay token, crear usuario anónimo
      // En un request real, se pasa sin token y el backend maneja sesiones anónimas
      return next();
    }
    
    const session = await Session.findOne({ 
      token,
      expiresAt: { $gt: new Date() }
    });
    
    if (!session) {
      return res.status(401).json({ error: 'Token no válido o expirado' });
    }
    
    const user = await User.findOne({ uid: session.userId });
    
    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }
    
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    console.error('Error en auth middleware:', error);
    next();
  }
};

export const getOrCreateAnonymousUser = async (deviceId) => {
  try {
    // Buscar si existe ya un usuario para este dispositivo
    let user = await User.findOne({ deviceId });
    
    if (!user) {
      user = new User({
        displayName: `Jugador${Math.floor(Math.random() * 9999)}`,
        isAnonymous: true,
        deviceId
      });
      await user.save();
    }
    
    return user;
  } catch (error) {
    console.error('Error creando usuario anónimo:', error);
    throw error;
  }
};
