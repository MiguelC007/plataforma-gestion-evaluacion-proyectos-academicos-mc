import express from 'express';
import { createAcademicPeriod, deleteAcademicPeriod, getAcademicPeriods, updateAcademicPeriod } from '../controllers/academicPeriodController.js';
import { authorize, protect } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.use(protect);
router.get('/', getAcademicPeriods);
router.post('/', authorize('ADMIN'), createAcademicPeriod);
router.put('/:id', authorize('ADMIN'), updateAcademicPeriod);
router.delete('/:id', authorize('ADMIN'), deleteAcademicPeriod);
export default router;
