import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { user } = useAuth();
  const links = [
    { to: '/', label: 'Dashboard', roles: ['ADMIN', 'COORDINATOR', 'TEACHER', 'STUDENT'] },
    { to: '/users', label: 'Usuarios', roles: ['ADMIN', 'COORDINATOR'] },
    { to: '/careers', label: 'Carreras', roles: ['ADMIN', 'COORDINATOR'] },
    { to: '/periods', label: 'Periodos', roles: ['ADMIN'] },
    { to: '/project-types', label: 'Tipos de Proyecto', roles: ['ADMIN'] },
    { to: '/projects', label: 'Proyectos', roles: ['ADMIN', 'COORDINATOR', 'TEACHER', 'STUDENT'] },
    { to: '/rubrics', label: 'Rúbricas', roles: ['ADMIN', 'COORDINATOR', 'TEACHER'] },
    { to: '/assignments', label: 'Asignaciones', roles: ['ADMIN', 'COORDINATOR'] },
    { to: '/my-evaluations', label: 'Mis Evaluaciones', roles: ['TEACHER'] },
    { to: '/results', label: 'Resultados', roles: ['ADMIN', 'COORDINATOR', 'TEACHER', 'STUDENT'] },
    { to: '/reports', label: 'Dashboard Reportes', roles: ['ADMIN', 'COORDINATOR', 'TEACHER', 'STUDENT'] }
  ];
  return (
    <aside className="sidebar">
      <div className="brand">Liceria Tech</div>
      <nav>
        {links.filter((item) => item.roles.includes(user?.role)).map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
