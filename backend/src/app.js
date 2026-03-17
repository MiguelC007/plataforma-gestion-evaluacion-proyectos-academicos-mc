import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { env } from './config/env.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import careerRoutes from './routes/careerRoutes.js';
import academicPeriodRoutes from './routes/academicPeriodRoutes.js';
import projectTypeRoutes from './routes/projectTypeRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import rubricRoutes from './routes/rubricRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';
import evaluationRoutes from './routes/evaluationRoutes.js';
import resultRoutes from './routes/resultRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';

const app = express();
app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(morgan('dev'));
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ message: 'API running successfully' }));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/academic-periods', academicPeriodRoutes);
app.use('/api/project-types', projectTypeRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/rubrics', rubricRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/evaluations', evaluationRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
