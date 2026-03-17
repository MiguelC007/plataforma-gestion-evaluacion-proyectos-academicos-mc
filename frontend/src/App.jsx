import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import RoleGuard from './components/RoleGuard';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UsersPage from './pages/UsersPage';
import CareersPage from './pages/CareersPage';
import AcademicPeriodsPage from './pages/AcademicPeriodsPage';
import ProjectTypesPage from './pages/ProjectTypesPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectFormPage from './pages/ProjectFormPage';
import RubricTemplatesPage from './pages/RubricTemplatesPage';
import RubricBuilderPage from './pages/RubricBuilderPage';
import AssignEvaluatorsPage from './pages/AssignEvaluatorsPage';
import MyEvaluationsPage from './pages/MyEvaluationsPage';
import EvaluateProjectPage from './pages/EvaluateProjectPage';
import ResultsPage from './pages/ResultsPage';
import ReportsDashboardPage from './pages/ReportsDashboardPage';
import NotFoundPage from './pages/NotFoundPage';

const WithLayout = (component) => <ProtectedRoute><MainLayout>{component}</MainLayout></ProtectedRoute>;

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={WithLayout(<DashboardPage />)} />
          <Route path="/users" element={WithLayout(<RoleGuard roles={['ADMIN', 'COORDINATOR']}><UsersPage /></RoleGuard>)} />
          <Route path="/careers" element={WithLayout(<RoleGuard roles={['ADMIN', 'COORDINATOR']}><CareersPage /></RoleGuard>)} />
          <Route path="/periods" element={WithLayout(<RoleGuard roles={['ADMIN']}><AcademicPeriodsPage /></RoleGuard>)} />
          <Route path="/project-types" element={WithLayout(<RoleGuard roles={['ADMIN']}><ProjectTypesPage /></RoleGuard>)} />
          <Route path="/projects" element={WithLayout(<ProjectsPage />)} />
          <Route path="/projects/new" element={WithLayout(<ProjectFormPage />)} />
          <Route path="/projects/:id" element={WithLayout(<ProjectFormPage />)} />
          <Route path="/rubrics" element={WithLayout(<RoleGuard roles={['ADMIN', 'COORDINATOR', 'TEACHER']}><RubricTemplatesPage /></RoleGuard>)} />
          <Route path="/rubrics/new" element={WithLayout(<RoleGuard roles={['ADMIN', 'COORDINATOR', 'TEACHER']}><RubricBuilderPage /></RoleGuard>)} />
          <Route path="/rubrics/:id" element={WithLayout(<RoleGuard roles={['ADMIN', 'COORDINATOR', 'TEACHER']}><RubricBuilderPage /></RoleGuard>)} />
          <Route path="/assignments" element={WithLayout(<RoleGuard roles={['ADMIN', 'COORDINATOR']}><AssignEvaluatorsPage /></RoleGuard>)} />
          <Route path="/my-evaluations" element={WithLayout(<RoleGuard roles={['TEACHER', 'ADMIN']}><MyEvaluationsPage /></RoleGuard>)} />
          <Route path="/evaluate/:id" element={WithLayout(<RoleGuard roles={['TEACHER', 'ADMIN']}><EvaluateProjectPage /></RoleGuard>)} />
          <Route path="/results" element={WithLayout(<ResultsPage />)} />
          <Route path="/reports" element={WithLayout(<ReportsDashboardPage />)} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
