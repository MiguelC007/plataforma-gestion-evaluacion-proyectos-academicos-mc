import mongoose from 'mongoose';
import { EVALUATION_STATUS } from '../utils/constants.js';

const evaluationSchema = new mongoose.Schema(
  {
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    evaluatorTeacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rubricTemplateId: { type: mongoose.Schema.Types.ObjectId, ref: 'RubricTemplate', required: true },
    assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'EvaluatorAssignment', required: true },
    status: { type: String, enum: EVALUATION_STATUS, default: 'BORRADOR' },
    totalScore: { type: Number, default: 0 },
    generalComment: { type: String, trim: true, default: '' },
    submittedAt: { type: Date, default: null }
  },
  { timestamps: true }
);

evaluationSchema.index({ projectId: 1, evaluatorTeacherId: 1 }, { unique: true });

export const Evaluation = mongoose.model('Evaluation', evaluationSchema);
