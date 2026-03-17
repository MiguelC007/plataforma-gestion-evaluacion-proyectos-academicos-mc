import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { ROLES, TEACHER_CATEGORIES } from '../utils/constants.js';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: Object.values(ROLES), required: true },
    teacherCategory: [{ type: String, enum: Object.values(TEACHER_CATEGORIES) }],
    careerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Career', default: null },
    coordinatorCareerIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Career' }],
    studentCategory: { type: String, trim: true, default: '' },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });

userSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compare(password, this.passwordHash);
};

userSchema.statics.hashPassword = async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const User = mongoose.model('User', userSchema);
