import { User } from '../models/User.js';
import { verifyToken } from '../utils/jwt.js';
import { ApiError } from '../utils/ApiError.js';

export const protect = async (req, _res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return next(new ApiError(401, 'Token requerido'));
  const token = auth.split(' ')[1];
  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select('-passwordHash').populate('careerId coordinatorCareerIds');
    if (!user || !user.isActive) return next(new ApiError(401, 'Usuario no autorizado'));
    req.user = user;
    next();
  } catch {
    next(new ApiError(401, 'Token inválido'));
  }
};

export const authorize = (...roles) => (req, _res, next) => {
  if (!req.user || !roles.includes(req.user.role)) return next(new ApiError(403, 'No autorizado para esta acción'));
  next();
};
