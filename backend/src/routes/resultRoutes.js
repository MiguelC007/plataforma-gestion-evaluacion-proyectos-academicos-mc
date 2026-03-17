import express from 'express';
import { getResults, getStudentResults } from '../controllers/resultController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.use(protect);
router.get('/', getResults);
router.get('/students/summary', getStudentResults);
export default router;
