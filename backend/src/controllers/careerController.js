import { Career } from '../models/Career.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { buildTextSearch } from '../utils/query.js';

export const getCareers = asyncHandler(async (req, res) => {
  const { search = '', isActive = '' } = req.query;
  const filter = { ...buildTextSearch(search, ['name', 'code', 'description']) };
  if (isActive !== '') filter.isActive = isActive === 'true';
  res.json(await Career.find(filter).sort({ name: 1 }));
});

export const createCareer = asyncHandler(async (req, res) => {
  res.status(201).json(await Career.create(req.body));
});

export const updateCareer = asyncHandler(async (req, res) => {
  const item = await Career.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) throw new ApiError(404, 'Carrera no encontrada');
  res.json(item);
});

export const deleteCareer = asyncHandler(async (req, res) => {
  const item = await Career.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, 'Carrera no encontrada');
  res.json({ message: 'Carrera eliminada' });
});
