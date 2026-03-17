import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { dashboardApi } from '../api/services';
import LoadingSpinner from '../components/LoadingSpinner';
import StatsCard from '../components/StatsCard';
import ChartCard from '../components/ChartCard';

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardApi.get().then(({ data }) => setData(data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;
  const { stats, charts, pendingProjects } = data;
  return (
    <div className="page-grid">
      <section className="stats-grid">
        <StatsCard title="Total proyectos" value={stats.totalProjects} />
        <StatsCard title="Total estudiantes" value={stats.totalStudents} />
        <StatsCard title="Total docentes" value={stats.totalTeachers} />
        <StatsCard title="Total evaluaciones" value={stats.totalEvaluations} />
        <StatsCard title="Periodos activos" value={stats.totalActivePeriods} />
        <StatsCard title="Rúbricas" value={stats.totalRubrics} />
      </section>

      <section className="charts-grid">
        <ChartCard title="Proyectos por tipo">
          <ResponsiveContainer width="100%" height={250}><BarChart data={charts.projectsByType}><XAxis dataKey="label" /><YAxis /><Tooltip /><Bar dataKey="total" /></BarChart></ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Participación docente por categoría">
          <ResponsiveContainer width="100%" height={250}><PieChart><Pie data={charts.teacherParticipation} dataKey="total" nameKey="label" outerRadius={80}>{charts.teacherParticipation.map((_, i) => <Cell key={i} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Proyectos por carrera">
          <ResponsiveContainer width="100%" height={250}><BarChart data={charts.projectsByCareer}><XAxis dataKey="label" /><YAxis /><Tooltip /><Bar dataKey="total" /></BarChart></ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Distribución de desempeño">
          <ResponsiveContainer width="100%" height={250}><BarChart data={charts.lowHighDistribution}><XAxis dataKey="label" /><YAxis /><Tooltip /><Bar dataKey="total" /></BarChart></ResponsiveContainer>
        </ChartCard>
      </section>

      <div className="card">
        <h3>Proyectos con seguimiento pendiente</h3>
        <ul>{pendingProjects.map((item) => <li key={item._id}>{item.title} - {item.status}</li>)}</ul>
      </div>
    </div>
  );
}
