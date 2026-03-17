import { Project } from '../models/Project.js';
import { Evaluation } from '../models/Evaluation.js';
import { EvaluatorAssignment } from '../models/EvaluatorAssignment.js';

export const refreshProjectStatus = async (projectId) => {
  const assignments = await EvaluatorAssignment.find({ projectId });
  const evaluations = await Evaluation.find({ projectId });
  let status = 'BORRADOR';
  if (assignments.length > 0) status = 'EN_EVALUACION';
  const allSubmitted = assignments.length > 0 && evaluations.length > 0 && evaluations.every((item) => item.status === 'ENVIADA');
  if (allSubmitted) status = 'EVALUADO';
  await Project.findByIdAndUpdate(projectId, { status });
  return status;
};
