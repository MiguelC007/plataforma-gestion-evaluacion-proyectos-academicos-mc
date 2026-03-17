import { Project } from '../models/Project.js';
import { User } from '../models/User.js';
import { Evaluation } from '../models/Evaluation.js';
import { AcademicPeriod } from '../models/AcademicPeriod.js';
import { RubricTemplate } from '../models/RubricTemplate.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getDashboard = asyncHandler(async (_req, res) => {
  const [totalProjects, totalStudents, totalTeachers, totalEvaluations, totalActivePeriods, totalRubrics] = await Promise.all([
    Project.countDocuments(),
    User.countDocuments({ role: 'STUDENT' }),
    User.countDocuments({ role: 'TEACHER' }),
    Evaluation.countDocuments(),
    AcademicPeriod.countDocuments({ isActive: true }),
    RubricTemplate.countDocuments()
  ]);

  const projectsByType = await Project.aggregate([
    { $group: { _id: '$projectTypeId', total: { $sum: 1 } } },
    { $lookup: { from: 'projecttypes', localField: '_id', foreignField: '_id', as: 'type' } },
    { $unwind: '$type' },
    { $project: { label: '$type.name', total: 1 } }
  ]);

  const projectsByCareer = await Project.aggregate([
    { $group: { _id: '$careerId', total: { $sum: 1 } } },
    { $lookup: { from: 'careers', localField: '_id', foreignField: '_id', as: 'career' } },
    { $unwind: '$career' },
    { $project: { label: '$career.name', total: 1 } }
  ]);

  const projectsByPeriod = await Project.aggregate([
    { $group: { _id: '$periodId', total: { $sum: 1 } } },
    { $lookup: { from: 'academicperiods', localField: '_id', foreignField: '_id', as: 'period' } },
    { $unwind: '$period' },
    { $project: { label: '$period.label', total: 1 } }
  ]);

  const teacherParticipation = await User.aggregate([
    { $match: { role: 'TEACHER' } },
    { $unwind: '$teacherCategory' },
    { $group: { _id: '$teacherCategory', total: { $sum: 1 } } },
    { $project: { label: '$_id', total: 1 } }
  ]);

  const evaluationsStatus = await Evaluation.aggregate([
    { $group: { _id: '$status', total: { $sum: 1 } } },
    { $project: { label: '$_id', total: 1 } }
  ]);

  const studentPerformance = await User.aggregate([
    { $match: { role: 'STUDENT' } },
    { $lookup: { from: 'projects', localField: '_id', foreignField: 'studentIds', as: 'projects' } },
    { $lookup: { from: 'evaluations', localField: 'projects._id', foreignField: 'projectId', as: 'evaluations' } },
    {
      $project: {
        name: '$name',
        averageScore: {
          $cond: [
            { $gt: [{ $size: '$evaluations' }, 0] },
            { $avg: '$evaluations.totalScore' },
            0
          ]
        }
      }
    },
    { $sort: { averageScore: -1 } }
  ]);

  const lowHighDistribution = [
    { label: 'Altas (>=80)', total: studentPerformance.filter((s) => s.averageScore >= 80).length },
    { label: 'Medias (60-79)', total: studentPerformance.filter((s) => s.averageScore >= 60 && s.averageScore < 80).length },
    { label: 'Bajas (<60)', total: studentPerformance.filter((s) => s.averageScore < 60).length }
  ];

  const pendingProjects = await Project.find({ status: { $in: ['EN_EVALUACION', 'ENVIADO'] } }).select('title status');

  res.json({
    stats: { totalProjects, totalStudents, totalTeachers, totalEvaluations, totalActivePeriods, totalRubrics },
    charts: { projectsByType, projectsByCareer, projectsByPeriod, teacherParticipation, evaluationsStatus, studentPerformance, lowHighDistribution },
    pendingProjects
  });
});
