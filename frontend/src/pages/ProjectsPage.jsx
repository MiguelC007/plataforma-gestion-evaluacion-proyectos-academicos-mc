import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { projectsApi } from '../api/services';
import ProjectCard from '../components/ProjectCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ProjectsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => { projectsApi.list().then(({ data }) => setItems(data)).finally(() => setLoading(false)); }, []);
  if (loading) return <LoadingSpinner />;
  return <div><div className="page-header"><h2>Proyectos Académicos</h2><Link className="btn btn-primary" to="/projects/new">Nuevo proyecto</Link></div><div className="project-grid">{items.map((project) => <ProjectCard key={project._id} project={project} onEdit={() => navigate(`/projects/${project._id}`)} />)}</div></div>;
}
