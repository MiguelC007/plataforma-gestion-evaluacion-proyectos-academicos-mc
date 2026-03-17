import mongoose from 'mongoose';

const rubricQuestionSchema = new mongoose.Schema(
  {
    rubricTemplateId: { type: mongoose.Schema.Types.ObjectId, ref: 'RubricTemplate', required: true },
    text: { type: String, required: true, trim: true },
    order: { type: Number, required: true },
    minScore: { type: Number, required: true },
    maxScore: { type: Number, required: true },
    weight: { type: Number, default: 1 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

rubricQuestionSchema.index({ rubricTemplateId: 1, order: 1 }, { unique: true });

export const RubricQuestion = mongoose.model('RubricQuestion', rubricQuestionSchema);
