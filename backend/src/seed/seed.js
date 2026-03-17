import { connectDb } from '../config/db.js';
import { Career } from '../models/Career.js';
import { AcademicPeriod } from '../models/AcademicPeriod.js';
import { ProjectType } from '../models/ProjectType.js';
import { User } from '../models/User.js';
import { Project } from '../models/Project.js';
import { RubricTemplate } from '../models/RubricTemplate.js';
import { RubricQuestion } from '../models/RubricQuestion.js';
import { EvaluatorAssignment } from '../models/EvaluatorAssignment.js';
import { Evaluation } from '../models/Evaluation.js';
import { EvaluationAnswer } from '../models/EvaluationAnswer.js';
import { TEACHER_CATEGORIES } from '../utils/constants.js';

const clear = async () => {
  await Promise.all([
    Career.deleteMany(),
    AcademicPeriod.deleteMany(),
    ProjectType.deleteMany(),
    User.deleteMany(),
    Project.deleteMany(),
    RubricTemplate.deleteMany(),
    RubricQuestion.deleteMany(),
    EvaluatorAssignment.deleteMany(),
    Evaluation.deleteMany(),
    EvaluationAnswer.deleteMany()
  ]);
};

const createUser = async (payload) => User.create({ ...payload, passwordHash: await User.hashPassword('Password123*') });

const run = async () => {
  await connectDb();
  await clear();

  const careers = await Career.insertMany([
    { name: 'Ingeniería en Sistemas', code: 'ISW', description: 'Carrera de sistemas' },
    { name: 'Diseño Gráfico', code: 'DGR', description: 'Carrera creativa y digital' },
    { name: 'Administración de Empresas', code: 'ADM', description: 'Carrera administrativa' }
  ]);

  const periods = await AcademicPeriod.insertMany([
    { year: 2026, number: 1, label: '2026-1', startDate: new Date('2026-01-15'), endDate: new Date('2026-04-15'), isActive: true },
    { year: 2026, number: 2, label: '2026-2', startDate: new Date('2026-05-01'), endDate: new Date('2026-08-20'), isActive: true },
    { year: 2026, number: 3, label: '2026-3', startDate: new Date('2026-09-01'), endDate: new Date('2026-12-10'), isActive: false }
  ]);

  const projectTypes = await ProjectType.insertMany([
    { name: 'Software', description: 'Desarrollo de aplicaciones web o móviles' },
    { name: 'Investigación', description: 'Proyecto académico de investigación' },
    { name: 'Innovación Social', description: 'Proyecto orientado a impacto social' }
  ]);

  const admin = await createUser({ name: 'Administrador General', email: 'admin@demo.com', role: 'ADMIN' });
  const coordinator = await createUser({ name: 'Coordinador Sistemas', email: 'coordinador@demo.com', role: 'COORDINATOR', coordinatorCareerIds: [careers[0]._id] });
  const methodTeacher = await createUser({ name: 'Dra. Ana Metodología', email: 'metodologico@demo.com', role: 'TEACHER', teacherCategory: [TEACHER_CATEGORIES.METHODOLOGICAL], careerId: careers[0]._id });
  const thematicTeacher1 = await createUser({ name: 'Ing. Carlos Backend', email: 'tematico1@demo.com', role: 'TEACHER', teacherCategory: [TEACHER_CATEGORIES.THEMATIC], careerId: careers[0]._id });
  const thematicTeacher2 = await createUser({ name: 'Lic. Laura UX', email: 'tematico2@demo.com', role: 'TEACHER', teacherCategory: [TEACHER_CATEGORIES.THEMATIC], careerId: careers[1]._id });
  const evaluator1 = await createUser({ name: 'MSc. José Evaluador', email: 'evaluador1@demo.com', role: 'TEACHER', teacherCategory: [TEACHER_CATEGORIES.EVALUATOR], careerId: careers[0]._id });
  const evaluator2 = await createUser({ name: 'MSc. María Evaluadora', email: 'evaluador2@demo.com', role: 'TEACHER', teacherCategory: [TEACHER_CATEGORIES.EVALUATOR], careerId: careers[0]._id });
  const student1 = await createUser({ name: 'Miguel Carranza', email: 'estudiante1@demo.com', role: 'STUDENT', careerId: careers[0]._id, studentCategory: 'Tesista' });
  const student2 = await createUser({ name: 'Genesis Medina', email: 'estudiante2@demo.com', role: 'STUDENT', careerId: careers[0]._id, studentCategory: 'Regular' });
  const student3 = await createUser({ name: 'Fany Navas', email: 'estudiante3@demo.com', role: 'STUDENT', careerId: careers[1]._id, studentCategory: 'Regular' });

  const rubric1 = await RubricTemplate.create({ name: 'Rúbrica Desarrollo de Software', description: 'Evaluación para proyectos de software', isActive: true });
  const rubric2 = await RubricTemplate.create({ name: 'Rúbrica Investigación Académica', description: 'Evaluación para trabajos de investigación', isActive: true });

  const rubric1Questions = await RubricQuestion.insertMany([
    { rubricTemplateId: rubric1._id, text: 'Planteamiento metodológico', order: 1, minScore: 1, maxScore: 10, weight: 2, isActive: true },
    { rubricTemplateId: rubric1._id, text: 'Calidad técnica del sistema', order: 2, minScore: 1, maxScore: 10, weight: 4, isActive: true },
    { rubricTemplateId: rubric1._id, text: 'Diseño de interfaz', order: 3, minScore: 1, maxScore: 10, weight: 2, isActive: true },
    { rubricTemplateId: rubric1._id, text: 'Presentación y defensa', order: 4, minScore: 1, maxScore: 10, weight: 2, isActive: true }
  ]);

  await RubricQuestion.insertMany([
    { rubricTemplateId: rubric2._id, text: 'Claridad del problema', order: 1, minScore: 1, maxScore: 5, weight: 3, isActive: true },
    { rubricTemplateId: rubric2._id, text: 'Marco teórico', order: 2, minScore: 1, maxScore: 5, weight: 2, isActive: true },
    { rubricTemplateId: rubric2._id, text: 'Resultados y conclusiones', order: 3, minScore: 1, maxScore: 5, weight: 5, isActive: true }
  ]);

  const projects = await Project.insertMany([
    {
      title: 'Plataforma Web para Gestión de Proyectos Académicos',
      description: 'Sistema completo para registrar, evaluar y reportar proyectos académicos.',
      projectTypeId: projectTypes[0]._id,
      careerId: careers[0]._id,
      periodId: periods[0]._id,
      studentIds: [student1._id, student2._id],
      methodologyTeacherId: methodTeacher._id,
      thematicTeacherIds: [thematicTeacher1._id],
      evaluatorIds: [evaluator1._id, evaluator2._id],
      documentUrl: 'https://drive.google.com/example/proyecto-academico',
      status: 'EN_EVALUACION',
      createdBy: student1._id
    },
    {
      title: 'Sistema de Tutorías Inteligentes',
      description: 'Aplicación para seguimiento de tutorías universitarias.',
      projectTypeId: projectTypes[0]._id,
      careerId: careers[0]._id,
      periodId: periods[1]._id,
      studentIds: [student2._id],
      methodologyTeacherId: methodTeacher._id,
      thematicTeacherIds: [thematicTeacher1._id],
      evaluatorIds: [evaluator1._id],
      documentUrl: 'https://onedrive.live.com/example/tutorias',
      status: 'BORRADOR',
      createdBy: student2._id
    },
    {
      title: 'Impacto del diseño UX en educación virtual',
      description: 'Investigación académica sobre experiencia de usuario.',
      projectTypeId: projectTypes[1]._id,
      careerId: careers[1]._id,
      periodId: periods[0]._id,
      studentIds: [student3._id],
      methodologyTeacherId: methodTeacher._id,
      thematicTeacherIds: [thematicTeacher2._id],
      evaluatorIds: [evaluator2._id],
      documentUrl: 'https://www.example.com/ux-research.pdf',
      status: 'ENVIADO',
      createdBy: student3._id
    }
  ]);

  const assignments = await EvaluatorAssignment.insertMany([
    { projectId: projects[0]._id, evaluatorId: evaluator1._id, rubricTemplateId: rubric1._id, assignedBy: coordinator._id, status: 'COMPLETADA' },
    { projectId: projects[0]._id, evaluatorId: evaluator2._id, rubricTemplateId: rubric1._id, assignedBy: coordinator._id, status: 'PENDIENTE' }
  ]);

  const evaluation1 = await Evaluation.create({
    projectId: projects[0]._id,
    evaluatorTeacherId: evaluator1._id,
    rubricTemplateId: rubric1._id,
    assignmentId: assignments[0]._id,
    status: 'ENVIADA',
    totalScore: 86,
    generalComment: 'Proyecto sólido con buen alcance técnico.',
    submittedAt: new Date()
  });

  await Evaluation.create({
    projectId: projects[0]._id,
    evaluatorTeacherId: evaluator2._id,
    rubricTemplateId: rubric1._id,
    assignmentId: assignments[1]._id,
    status: 'BORRADOR',
    totalScore: 0,
    generalComment: ''
  });

  await EvaluationAnswer.insertMany([
    { evaluationId: evaluation1._id, questionId: rubric1Questions[0]._id, score: 8, comment: 'Metodología clara' },
    { evaluationId: evaluation1._id, questionId: rubric1Questions[1]._id, score: 9, comment: 'Backend bien estructurado' },
    { evaluationId: evaluation1._id, questionId: rubric1Questions[2]._id, score: 8, comment: 'Interfaz ordenada' },
    { evaluationId: evaluation1._id, questionId: rubric1Questions[3]._id, score: 9, comment: 'Buena presentación' }
  ]);

  console.log('Seed ejecutado correctamente');
  console.log('Credenciales de prueba:');
  console.log('Admin -> admin@demo.com / Password123*');
  console.log('Coordinador -> coordinador@demo.com / Password123*');
  console.log('Docente evaluador -> evaluador1@demo.com / Password123*');
  console.log('Estudiante -> estudiante1@demo.com / Password123*');
  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
