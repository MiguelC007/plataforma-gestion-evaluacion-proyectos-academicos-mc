import express from 'express';
import { createProjectType, deleteProjectType, getProjectTypes, updateProjectType } from '../controllers/projectTypeController.js';
import { authorize, protect } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.use(protect);
router.get('/', getProjectTypes);
router.post('/', authorize('ADMIN'), createProjectType);
router.put('/:id', authorize('ADMIN'), updateProjectType);
router.delete('/:id', authorize('ADMIN'), deleteProjectType);
export default router;
