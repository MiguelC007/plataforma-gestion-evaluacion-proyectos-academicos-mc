import { Project } from '../models/Project.js';
import { Evaluation } from '../models/Evaluation.js';
import { User } from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getResults = asyncHandler(async (req, res) => {
  const { periodId = '', careerId = '', studentId = '', projectId = '' } = req.query;
  const projectFilter = {};
  if (periodId) projectFilter.periodId = periodId;
  if (careerId) projectFilter.careerId = careerId;
  if (studentId) projectFilter.studentIds = studentId;
  if (projectId) projectFilter._id = projectId;

  const projects = await Project.find(projectFilter).populate('careerId periodId studentIds projectTypeId');
  const projectIds = projects.map((p) => p._id);
  const evaluations = await Evaluation.find({ projectId: { $in: projectIds } }).populate('evaluatorTeacherId', 'name email');

  const data = projects.map((project) => {
    const evals = evaluations.filter((ev) => String(ev.projectId) === String(project._id));
    const average = evals.length ? evals.reduce((sum, ev) => sum + ev.totalScore, 0) / evals.length : 0;
    return {
      project,
      evaluations: evals,
      averageScore: Number(average.toFixed(2))
    };
  });

  res.json(data);
});

export const getStudentResults = asyncHandler(async (_req, res) => {
  const students = await User.find({ role: 'STUDENT' }).select('name email careerId').populate('careerId');
  const results = [];
  for (const student of students) {
    const projects = await Project.find({ studentIds: student._id });
    const projectIds = projects.map((p) => p._id);
    const evaluations = await Evaluation.find({ projectId: { $in: projectIds }, status: 'ENVIADA' });
    const average = evaluations.length ? evaluations.reduce((sum, item) => sum + item.totalScore, 0) / evaluations.length : 0;
    results.push({ student, projectsCount: projects.length, evaluationsCount: evaluations.length, averageScore: Number(average.toFixed(2)) });
  }
  res.json(results.sort((a, b) => b.averageScore - a.averageScore));
});
