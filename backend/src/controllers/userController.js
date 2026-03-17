import { User } from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { buildTextSearch } from '../utils/query.js';

export const getUsers = asyncHandler(async (req, res) => {
  const { search = '', role = '' } = req.query;
  const filter = { ...buildTextSearch(search, ['name', 'email']) };
  if (role) filter.role = role;
  const users = await User.find(filter).select('-passwordHash').populate('careerId coordinatorCareerIds').sort({ createdAt: -1 });
  res.json(users);
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-passwordHash').populate('careerId coordinatorCareerIds');
  if (!user) throw new ApiError(404, 'Usuario no encontrado');
  res.json(user);
});

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, teacherCategory = [], careerId = null, coordinatorCareerIds = [], studentCategory = '', isActive = true } = req.body;
  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists) throw new ApiError(400, 'El correo ya existe');
  const passwordHash = await User.hashPassword(password || 'Password123*');
  const user = await User.create({ name, email: email.toLowerCase(), passwordHash, role, teacherCategory, careerId, coordinatorCareerIds, studentCategory, isActive });
  const created = await User.findById(user._id).select('-passwordHash').populate('careerId coordinatorCareerIds');
  res.status(201).json(created);
});

export const updateUser = asyncHandler(async (req, res) => {
  const { password, ...payload } = req.body;
  if (payload.email) payload.email = payload.email.toLowerCase();
  if (password) payload.passwordHash = await User.hashPassword(password);
  const user = await User.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true }).select('-passwordHash').populate('careerId coordinatorCareerIds');
  if (!user) throw new ApiError(404, 'Usuario no encontrado');
  res.json(user);
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) throw new ApiError(404, 'Usuario no encontrado');
  res.json({ message: 'Usuario eliminado correctamente' });
});
