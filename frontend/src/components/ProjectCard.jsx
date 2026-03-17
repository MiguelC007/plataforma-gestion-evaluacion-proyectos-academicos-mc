export default function ProjectCard({ project, onEdit }) {
  return (
    <div className="card project-card">
      <div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
      <div className="tag-row">
        <span className="tag">{project.projectTypeId?.name}</span>
        <span className="tag">{project.periodId?.label}</span>
        <span className="tag tag-status">{project.status}</span>
      </div>
      {onEdit && <button className="btn" onClick={() => onEdit(project)}>Editar</button>}
    </div>
  );
}
