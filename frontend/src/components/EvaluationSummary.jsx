export default function EvaluationSummary({ evaluation }) {
  return (
    <div className="card">
      <h3>{evaluation.projectId?.title}</h3>
      <p>Estado: {evaluation.status}</p>
      <p>Total: {evaluation.totalScore}</p>
    </div>
  );
}
