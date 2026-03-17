import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { careersApi, periodsApi, projectTypesApi, projectsApi, usersApi } from '../api/services';
import FormInput from '../components/FormInput';
import SelectInput from '../components/SelectInput';

export default function ProjectFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', projectTypeId: '', careerId: '', periodId: '', studentIds: [], methodologyTeacherId: '', thematicTeacherIds: [], documentUrl: '', status: 'BORRADOR' });
  const [options, setOptions] = useState({ careers: [], periods: [], types: [], students: [], teachers: [] });

  useEffect(() => {
    Promise.all([careersApi.list(), periodsApi.list(), projectTypesApi.list(), usersApi.list(), id ? projectsApi.get(id) : Promise.resolve({ data: null })]).then(([careers, periods, types, users, project]) => {
      setOptions({
        careers: careers.data,
        periods: periods.data,
        types: types.data,
        students: users.data.filter((u) => u.role === 'STUDENT'),
        teachers: users.data.filter((u) => u.role === 'TEACHER')
      });
      if (project.data) {
        setForm({
          ...project.data,
          projectTypeId: project.data.projectTypeId?._id,
          careerId: project.data.careerId?._id,
          periodId: project.data.periodId?._id,
          studentIds: project.data.studentIds?.map((s) => s._id) || [],
          methodologyTeacherId: project.data.methodologyTeacherId?._id || '',
          thematicTeacherIds: project.data.thematicTeacherIds?.map((t) => t._id) || []
        });
      }
    });
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    const payload = { ...form };
    if (id) await projectsApi.update(id, payload); else await projectsApi.create(payload);
    navigate('/projects');
  };

  return (
    <form className="card form-card wide" onSubmit={submit}>
      <h2>{id ? 'Editar proyecto' : 'Nuevo proyecto'}</h2>
      <div className="form-grid two">
        <FormInput label="Título" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <FormInput label="URL documento" value={form.documentUrl} onChange={(e) => setForm({ ...form, documentUrl: e.target.value })} />
        <FormInput label="Descripción" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <SelectInput label="Tipo" value={form.projectTypeId} onChange={(e) => setForm({ ...form, projectTypeId: e.target.value })} options={options.types.map((t) => ({ value: t._id, label: t.name }))} />
        <SelectInput label="Carrera" value={form.careerId} onChange={(e) => setForm({ ...form, careerId: e.target.value })} options={options.careers.map((c) => ({ value: c._id, label: c.name }))} />
        <SelectInput label="Periodo" value={form.periodId} onChange={(e) => setForm({ ...form, periodId: e.target.value })} options={options.periods.map((p) => ({ value: p._id, label: p.label }))} />
        <SelectInput label="Metodológico" value={form.methodologyTeacherId} onChange={(e) => setForm({ ...form, methodologyTeacherId: e.target.value })} options={options.teachers.map((t) => ({ value: t._id, label: t.name }))} />
        <SelectInput label="Estado" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} options={['BORRADOR', 'ENVIADO', 'EN_EVALUACION', 'EVALUADO', 'CERRADO'].map((v) => ({ value: v, label: v }))} />
      </div>
      <SelectInput label="Estudiantes" multiple value={form.studentIds} onChange={(e) => setForm({ ...form, studentIds: [...e.target.selectedOptions].map((o) => o.value) })} options={options.students.map((s) => ({ value: s._id, label: s.name }))} />
      <SelectInput label="Docentes temáticos" multiple value={form.thematicTeacherIds} onChange={(e) => setForm({ ...form, thematicTeacherIds: [...e.target.selectedOptions].map((o) => o.value) })} options={options.teachers.map((t) => ({ value: t._id, label: t.name }))} />
      <button className="btn btn-primary">Guardar proyecto</button>
    </form>
  );
}
