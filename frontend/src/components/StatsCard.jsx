export default function StatsCard({ title, value }) {
  return (
    <div className="card stats-card">
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}
