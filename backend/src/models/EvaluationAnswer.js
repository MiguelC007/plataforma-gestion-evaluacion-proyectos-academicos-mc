import mongoose from 'mongoose';

const evaluationAnswerSchema = new mongoose.Schema(
  {
    evaluationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Evaluation', required: true },
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'RubricQuestion', required: true },
    score: { type: Number, required: true },
    comment: { type: String, trim: true, default: '' }
  },
  { timestamps: true }
);

evaluationAnswerSchema.index({ evaluationId: 1, questionId: 1 }, { unique: true });

export const EvaluationAnswer = mongoose.model('EvaluationAnswer', evaluationAnswerSchema);
