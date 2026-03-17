import { AcademicPeriod } from '../models/AcademicPeriod.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

export const getAcademicPeriods = asyncHandler(async (req, res) => {
  const { year = '', isActive = '' } = req.query;
  const filter = {};
  if (year) filter.year = Number(year);
  if (isActive !== '') filter.isActive = isActive === 'true';
  res.json(await AcademicPeriod.find(filter).sort({ year: -1, number: 1 }));
});

export const createAcademicPeriod = asyncHandler(async (req, res) => {
  res.status(201).json(await AcademicPeriod.create(req.body));
});

export const updateAcademicPeriod = asyncHandler(async (req, res) => {
  const item = await AcademicPeriod.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!item) throw new ApiError(404, 'Periodo no encontrado');
  res.json(item);
});

export const deleteAcademicPeriod = asyncHandler(async (req, res) => {
  const item = await AcademicPeriod.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, 'Periodo no encontrado');
  res.json({ message: 'Periodo eliminado' });
});
