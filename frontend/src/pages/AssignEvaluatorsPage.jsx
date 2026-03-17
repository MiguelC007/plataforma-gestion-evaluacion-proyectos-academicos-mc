import { useEffect, useState } from 'react';
import { assignmentsApi, projectsApi, rubricsApi, usersApi } from '../api/services';
import SelectInput from '../components/SelectInput';

export default function AssignEvaluatorsPage() {
  const [options, setOptions] = useState({ projects: [], evaluators: [], rubrics: [] });
  const [form, setForm] = useState({ projectId: '', evaluatorIds: [], rubricTemplateId: '' });
  const [message, setMessage] = useState('');
  useEffect(() => {
    Promise.all([projectsApi.list(), usersApi.list(), rubricsApi.list()]).then(([projects, users, rubrics]) => {
      setOptions({ projects: projects.data, evaluators: users.data.filter((u) => u.teacherCategory?.includes('EVALUATOR')), rubrics: rubrics.data });
    });
  }, []);
  const submit = async (e) => { e.preventDefault(); const { data } = await assignmentsApi.create(form); setMessage(`${data.message}. Nuevas: ${data.createdCount}`); };
  return <form className="card form-card" onSubmit={submit}><h2>Asignación transaccional de evaluadores</h2>{message && <div className="alert success">{message}</div>}<SelectInput label="Proyecto" value={form.projectId} onChange={(e)=>setForm({...form,projectId:e.target.value})} options={options.projects.map((p)=>({value:p._id,label:p.title}))} /><SelectInput label="Evaluadores" multiple value={form.evaluatorIds} onChange={(e)=>setForm({...form,evaluatorIds:[...e.target.selectedOptions].map((o)=>o.value)})} options={options.evaluators.map((u)=>({value:u._id,label:u.name}))} /><SelectInput label="Rúbrica" value={form.rubricTemplateId} onChange={(e)=>setForm({...form,rubricTemplateId:e.target.value})} options={options.rubrics.map((r)=>({value:r._id,label:r.name}))} /><button className="btn btn-primary">Generar asignaciones</button></form>;
}
