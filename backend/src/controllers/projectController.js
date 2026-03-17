import { Project } from '../models/Project.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ROLES } from '../utils/constants.js';

const basePopulate = [
  { path: 'projectTypeId' },
  { path: 'careerId' },
  { path: 'periodId' },
  { path: 'studentIds', select: 'name email studentCategory careerId', populate: { path: 'careerId', select: 'name code' } },
  { path: 'methodologyTeacherId', select: 'name email teacherCategory' },
  { path: 'thematicTeacherIds', select: 'name email teacherCategory' },
  { path: 'evaluatorIds', select: 'name email teacherCategory' },
  { path: 'createdBy', select: 'name email role' }
];

export const getProjects = asyncHandler(async (req, res) => {
  const { periodId = '', careerId = '', status = '' } = req.query;
  const filter = {};
  if (periodId) filter.periodId = periodId;
  if (careerId) filter.careerId = careerId;
  if (status) filter.status = status;

  if (req.user.role === ROLES.STUDENT) filter.studentIds = req.user._id;
  if (req.user.role === ROLES.TEACHER) {
    filter.$or = [
      { methodologyTeacherId: req.user._id },
      { thematicTeacherIds: req.user._id },
      { evaluatorIds: req.user._id }
    ];
  }
  if (req.user.role === ROLES.COORDINATOR && req.user.coordinatorCareerIds?.length) {
    filter.careerId = { $in: req.user.coordinatorCareerIds.map((c) => c._id || c) };
  }

  const items = await Project.find(filter).populate(basePopulate).sort({ createdAt: -1 });
  res.json(items);
});

export const getProjectById = asyncHandler(async (req, res) => {
  const item = await Project.findById(req.params.id).populate(basePopulate);
  if (!item) throw new ApiError(404, 'Proyecto no encontrado');
  res.json(item);
});

export const createProject = asyncHandler(async (req, res) => {
  const payload = { ...req.body, createdBy: req.user._id };
  if (payload.methodologyTeacherId && Array.isArray(payload.thematicTeacherIds) && payload.thematicTeacherIds.includes(payload.methodologyTeacherId)) {
    throw new ApiError(400, 'El docente metodológico no debe repetirse como temático');
  }
  if (req.user.role === ROLES.STUDENT && (!payload.studentIds || payload.studentIds.length === 0)) {
    payload.studentIds = [req.user._id];
  }
  const item = await Project.create(payload);
  res.status(201).json(await Project.findById(item._id).populate(basePopulate));
});

export const updateProject = asyncHandler(async (req, res) => {
  const payload = { ...req.body };
  if (payload.methodologyTeacherId && Array.isArray(payload.thematicTeacherIds) && payload.thematicTeacherIds.includes(payload.methodologyTeacherId)) {
    throw new ApiError(400, 'El docente metodológico no debe repetirse como temático');
  }
  const item = await Project.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true }).populate(basePopulate);
  if (!item) throw new ApiError(404, 'Proyecto no encontrado');
  res.json(item);
});

export const deleteProject = asyncHandler(async (req, res) => {
  const item = await Project.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, 'Proyecto no encontrado');
  res.json({ message: 'Proyecto eliminado' });
});
