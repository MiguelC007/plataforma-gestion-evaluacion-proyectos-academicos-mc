import mongoose from 'mongoose';

const academicPeriodSchema = new mongoose.Schema(
  {
    year: { type: Number, required: true },
    number: { type: Number, required: true },
    label: { type: String, required: true, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

academicPeriodSchema.index({ year: 1, number: 1 }, { unique: true });

export const AcademicPeriod = mongoose.model('AcademicPeriod', academicPeriodSchema);
