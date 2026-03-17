import express from 'express';
import { createAssignments, getAssignments } from '../controllers/assignmentController.js';
import { authorize, protect } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.use(protect);
router.get('/', authorize('ADMIN', 'COORDINATOR'), getAssignments);
router.post('/', authorize('ADMIN', 'COORDINATOR'), createAssignments);
export default router;
