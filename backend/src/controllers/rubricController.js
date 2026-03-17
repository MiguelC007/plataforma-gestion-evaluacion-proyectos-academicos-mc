import { RubricTemplate } from '../models/RubricTemplate.js';
import { RubricQuestion } from '../models/RubricQuestion.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

export const getRubrics = asyncHandler(async (_req, res) => {
  const templates = await RubricTemplate.find().sort({ createdAt: -1 }).lean();
  const rubricIds = templates.map((item) => item._id);
  const questions = await RubricQuestion.find({ rubricTemplateId: { $in: rubricIds } }).sort({ order: 1 });
  const mapped = templates.map((template) => ({
    ...template,
    questions: questions.filter((q) => String(q.rubricTemplateId) === String(template._id))
  }));
  res.json(mapped);
});

export const getRubricById = asyncHandler(async (req, res) => {
  const template = await RubricTemplate.findById(req.params.id).lean();
  if (!template) throw new ApiError(404, 'Rúbrica no encontrada');
  const questions = await RubricQuestion.find({ rubricTemplateId: template._id }).sort({ order: 1 });
  res.json({ ...template, questions });
});

export const createRubric = asyncHandler(async (req, res) => {
  const { name, description, isActive = true, questions = [] } = req.body;
  const template = await RubricTemplate.create({ name, description, isActive });
  if (questions.length) {
    await RubricQuestion.insertMany(questions.map((q, index) => ({ ...q, order: q.order || index + 1, rubricTemplateId: template._id })));
  }
  res.status(201).json(await RubricTemplate.findById(template._id));
});

export const updateRubric = asyncHandler(async (req, res) => {
  const { questions = [], ...templatePayload } = req.body;
  const template = await RubricTemplate.findByIdAndUpdate(req.params.id, templatePayload, { new: true, runValidators: true });
  if (!template) throw new ApiError(404, 'Rúbrica no encontrada');
  await RubricQuestion.deleteMany({ rubricTemplateId: template._id });
  if (questions.length) {
    await RubricQuestion.insertMany(questions.map((q, index) => ({ ...q, order: q.order || index + 1, rubricTemplateId: template._id })));
  }
  res.json(await RubricTemplate.findById(template._id));
});

export const deleteRubric = asyncHandler(async (req, res) => {
  const template = await RubricTemplate.findByIdAndDelete(req.params.id);
  if (!template) throw new ApiError(404, 'Rúbrica no encontrada');
  await RubricQuestion.deleteMany({ rubricTemplateId: req.params.id });
  res.json({ message: 'Rúbrica eliminada' });
});
