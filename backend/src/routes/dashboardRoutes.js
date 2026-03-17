import express from 'express';
import { getDashboard } from '../controllers/dashboardController.js';
import { authorize, protect } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.use(protect);
router.get('/', authorize('ADMIN', 'COORDINATOR', 'TEACHER', 'STUDENT'), getDashboard);
export default router;
