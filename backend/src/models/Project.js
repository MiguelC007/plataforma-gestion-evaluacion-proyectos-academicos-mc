import mongoose from 'mongoose';
import { PROJECT_STATUS } from '../utils/constants.js';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    projectTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProjectType', required: true },
    careerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Career', required: true },
    periodId: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicPeriod', required: true },
    studentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    methodologyTeacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    thematicTeacherIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    evaluatorIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    documentUrl: { type: String, required: true, trim: true },
    status: { type: String, enum: PROJECT_STATUS, default: 'BORRADOR' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

projectSchema.index({ title: 1 });
projectSchema.index({ careerId: 1, periodId: 1 });
projectSchema.index({ studentIds: 1 });

export const Project = mongoose.model('Project', projectSchema);
