import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, trim: true, unique: true },
    description: { type: String, trim: true, default: '' },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

careerSchema.index({ name: 1 });
careerSchema.index({ code: 1 }, { unique: true });

export const Career = mongoose.model('Career', careerSchema);
