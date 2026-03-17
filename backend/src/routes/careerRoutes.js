import express from 'express';
import { createCareer, deleteCareer, getCareers, updateCareer } from '../controllers/careerController.js';
import { authorize, protect } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.use(protect);
router.get('/', getCareers);
router.post('/', authorize('ADMIN'), createCareer);
router.put('/:id', authorize('ADMIN'), updateCareer);
router.delete('/:id', authorize('ADMIN'), deleteCareer);
export default router;
