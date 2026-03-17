import express from 'express';
import { createRubric, deleteRubric, getRubricById, getRubrics, updateRubric } from '../controllers/rubricController.js';
import { authorize, protect } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.use(protect);
router.get('/', getRubrics);
router.get('/:id', getRubricById);
router.post('/', authorize('ADMIN', 'COORDINATOR', 'TEACHER'), createRubric);
router.put('/:id', authorize('ADMIN', 'COORDINATOR', 'TEACHER'), updateRubric);
router.delete('/:id', authorize('ADMIN'), deleteRubric);
export default router;
