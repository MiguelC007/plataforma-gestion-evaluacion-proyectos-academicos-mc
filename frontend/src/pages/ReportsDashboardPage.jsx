import { useEffect, useState } from 'react';
import { dashboardApi, resultsApi } from '../api/services';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import ChartCard from '../components/ChartCard';
import DataTable from '../components/DataTable';

export default function ReportsDashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const [students, setStudents] = useState([]);
  useEffect(() => { dashboardApi.get().then(({ data }) => setDashboard(data)); resultsApi.students().then(({ data }) => setStudents(data)); }, []);
  if (!dashboard) return null;
  return <div className="page-grid"><ChartCard title="Proyectos por periodo"><ResponsiveContainer width="100%" height={250}><BarChart data={dashboard.charts.projectsByPeriod}><XAxis dataKey="label" /><YAxis /><Tooltip /><Bar dataKey="total" /></BarChart></ResponsiveContainer></ChartCard><ChartCard title="Evaluaciones completadas vs pendientes"><ResponsiveContainer width="100%" height={250}><BarChart data={dashboard.charts.evaluationsStatus}><XAxis dataKey="label" /><YAxis /><Tooltip /><Bar dataKey="total" /></BarChart></ResponsiveContainer></ChartCard><div className="card"><h3>Ranking de estudiantes</h3><DataTable columns={[{key:'student',label:'Estudiante',render:(row)=>row.student.name},{key:'projectsCount',label:'Proyectos'},{key:'evaluationsCount',label:'Evaluaciones'},{key:'averageScore',label:'Promedio'}]} data={students} /></div></div>;
}
