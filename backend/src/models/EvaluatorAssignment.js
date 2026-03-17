import mongoose from 'mongoose';
import { ASSIGNMENT_STATUS } from '../utils/constants.js';

const evaluatorAssignmentSchema = new mongoose.Schema(
  {
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    evaluatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rubricTemplateId: { type: mongoose.Schema.Types.ObjectId, ref: 'RubricTemplate', required: true },
    assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ASSIGNMENT_STATUS, default: 'PENDIENTE' }
  },
  { timestamps: true }
);

evaluatorAssignmentSchema.index({ projectId: 1, evaluatorId: 1 }, { unique: true });

export const EvaluatorAssignment = mongoose.model('EvaluatorAssignment', evaluatorAssignmentSchema);
