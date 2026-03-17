import mongoose from 'mongoose';

const rubricTemplateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: '' },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

rubricTemplateSchema.index({ name: 1 });

export const RubricTemplate = mongoose.model('RubricTemplate', rubricTemplateSchema);
