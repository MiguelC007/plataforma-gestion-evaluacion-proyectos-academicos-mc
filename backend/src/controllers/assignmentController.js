import { EvaluatorAssignment } from '../models/EvaluatorAssignment.js';
import { Evaluation } from '../models/Evaluation.js';
import { Project } from '../models/Project.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { refreshProjectStatus } from '../services/projectService.js';

export const getAssignments = asyncHandler(async (_req, res) => {
  const items = await EvaluatorAssignment.find()
    .populate('projectId evaluatorId rubricTemplateId assignedBy')
    .sort({ assignedAt: -1 });
  res.json(items);
});

export const createAssignments = asyncHandler(async (req, res) => {
  const { projectId, evaluatorIds = [], rubricTemplateId } = req.body;
  if (!projectId || !rubricTemplateId || evaluatorIds.length === 0) throw new ApiError(400, 'Proyecto, evaluadores y rúbrica son requeridos');
  const project = await Project.findById(projectId);
  if (!project) throw new ApiError(404, 'Proyecto no encontrado');

  const created = [];
  for (const evaluatorId of evaluatorIds) {
    let assignment = await EvaluatorAssignment.findOne({ projectId, evaluatorId });
    if (!assignment) {
      assignment = await EvaluatorAssignment.create({ projectId, evaluatorId, rubricTemplateId, assignedBy: req.user._id });
      await Evaluation.create({ projectId, evaluatorTeacherId: evaluatorId, rubricTemplateId, assignmentId: assignment._id });
      created.push(assignment);
    }
  }

  project.evaluatorIds = [...new Set([...(project.evaluatorIds || []).map(String), ...evaluatorIds.map(String)])];
  project.status = 'EN_EVALUACION';
  await project.save();
  await refreshProjectStatus(projectId);
  res.status(201).json({ message: 'Asignaciones procesadas correctamente', createdCount: created.length });
});
