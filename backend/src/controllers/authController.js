import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/User.js';
import { signToken } from '../utils/jwt.js';

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ApiError(400, 'Correo y contraseña son requeridos');
  const user = await User.findOne({ email: email.toLowerCase() }).populate('careerId coordinatorCareerIds');
  if (!user || !user.isActive) throw new ApiError(401, 'Credenciales inválidas');
  const match = await user.comparePassword(password);
  if (!match) throw new ApiError(401, 'Credenciales inválidas');
  const token = signToken({ id: user._id, role: user.role });
  res.json({
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      teacherCategory: user.teacherCategory,
      careerId: user.careerId,
      coordinatorCareerIds: user.coordinatorCareerIds,
      studentCategory: user.studentCategory
    }
  });
});

export const me = asyncHandler(async (req, res) => {
  res.json(req.user);
});
