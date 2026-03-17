import { Evaluation } from '../models/Evaluation.js';
import { EvaluationAnswer } from '../models/EvaluationAnswer.js';
import { RubricQuestion } from '../models/RubricQuestion.js';
import { EvaluatorAssignment } from '../models/EvaluatorAssignment.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ROLES } from '../utils/constants.js';
import { refreshProjectStatus } from '../services/projectService.js';

export const getMyEvaluations = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.user.role === ROLES.TEACHER) filter.evaluatorTeacherId = req.user._id;
  const items = await Evaluation.find(filter)
    .populate({ path: 'projectId', populate: ['projectTypeId', 'careerId', 'periodId', { path: 'studentIds', select: 'name email' }] })
    .populate('rubricTemplateId')
    .sort({ createdAt: -1 });
  res.json(items);
});

export const getEvaluationById = asyncHandler(async (req, res) => {
  const evaluation = await Evaluation.findById(req.params.id)
    .populate({ path: 'projectId', populate: ['projectTypeId', 'careerId', 'periodId', { path: 'studentIds', select: 'name email' }] })
    .populate('rubricTemplateId');
  if (!evaluation) throw new ApiError(404, 'Evaluación no encontrada');
  const questions = await RubricQuestion.find({ rubricTemplateId: evaluation.rubricTemplateId._id }).sort({ order: 1 });
  const answers = await EvaluationAnswer.find({ evaluationId: evaluation._id });
  res.json({ ...evaluation.toObject(), questions, answers });
});

export const saveEvaluation = asyncHandler(async (req, res) => {
  const { answers = [], generalComment = '', status = 'BORRADOR' } = req.body;
  const evaluation = await Evaluation.findById(req.params.id);
  if (!evaluation) throw new ApiError(404, 'Evaluación no encontrada');
  if (String(evaluation.evaluatorTeacherId) !== String(req.user._id) && req.user.role !== ROLES.ADMIN) throw new ApiError(403, 'No puede editar esta evaluación');

  const questions = await RubricQuestion.find({ rubricTemplateId: evaluation.rubricTemplateId });
  const questionMap = new Map(questions.map((q) => [String(q._id), q]));
  let totalScore = 0;

  await EvaluationAnswer.deleteMany({ evaluationId: evaluation._id });
  for (const answer of answers) {
    const question = questionMap.get(String(answer.questionId));
    if (!question) throw new ApiError(400, 'Pregunta inválida en la evaluación');
    if (answer.score < question.minScore || answer.score > question.maxScore) {
      throw new ApiError(400, `El puntaje para "${question.text}" debe estar entre ${question.minScore} y ${question.maxScore}`);
    }
    totalScore += Number(answer.score) * Number(question.weight || 1);
    await EvaluationAnswer.create({ evaluationId: evaluation._id, questionId: answer.questionId, score: answer.score, comment: answer.comment || '' });
  }

  evaluation.totalScore = totalScore;
  evaluation.generalComment = generalComment;
  evaluation.status = status;
  evaluation.submittedAt = status === 'ENVIADA' ? new Date() : null;
  await evaluation.save();

  const assignmentStatus = status === 'ENVIADA' ? 'COMPLETADA' : 'EN_PROCESO';
  await EvaluatorAssignment.findByIdAndUpdate(evaluation.assignmentId, { status: assignmentStatus });
  await refreshProjectStatus(evaluation.projectId);

  res.json({ message: 'Evaluación guardada correctamente', totalScore });
});
