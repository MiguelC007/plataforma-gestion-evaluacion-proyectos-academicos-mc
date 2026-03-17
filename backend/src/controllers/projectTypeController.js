import { ProjectType } from '../models/ProjectType.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { buildTextSearch } from '../utils/query.js';

export const getProjectTypes = asyncHandler(async (req, res) => {
  const { search = '', isActive = '' } = req.query;
  const filter = { ...buildTextSearch(search, ['name', 'description']) };
  if (isActive !== '') filter.isActive = isActive === 'true';
  res.json(await ProjectType.find(filter).sort({ name: 1 }));
});

export const createProjectType = asyncHandler(async (req, res) => {
  res.status(201).json(await ProjectType.create(req.body));
});

export const updateProjectType = asyncHandler(async (req, res) => {
  const item = await ProjectType.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) throw new ApiError(404, 'Tipo de proyecto no encontrado');
  res.json(item);
});

export const deleteProjectType = asyncHandler(async (req, res) => {
  const item = await ProjectType.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, 'Tipo de proyecto no encontrado');
  res.json({ message: 'Tipo de proyecto eliminado' });
});
