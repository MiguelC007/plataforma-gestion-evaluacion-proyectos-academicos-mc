import express from 'express';
import { getEvaluationById, getMyEvaluations, saveEvaluation } from '../controllers/evaluationController.js';
import { authorize, protect } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.use(protect);
router.get('/', authorize('ADMIN', 'COORDINATOR', 'TEACHER'), getMyEvaluations);
router.get('/:id', authorize('ADMIN', 'COORDINATOR', 'TEACHER'), getEvaluationById);
router.put('/:id', authorize('ADMIN', 'TEACHER'), saveEvaluation);
export default router;
