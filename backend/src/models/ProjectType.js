import mongoose from 'mongoose';

const projectTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, trim: true, default: '' },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

projectTypeSchema.index({ name: 1 }, { unique: true });

export const ProjectType = mongoose.model('ProjectType', projectTypeSchema);
