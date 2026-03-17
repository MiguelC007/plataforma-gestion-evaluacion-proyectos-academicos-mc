import { useState } from 'react';
import { usersApi, careersApi } from '../api/services';
import { useCrud } from '../hooks/useCrud';
import DataTable from '../components/DataTable';
import FormInput from '../components/FormInput';
import SelectInput from '../components/SelectInput';
import LoadingSpinner from '../components/LoadingSpinner';

const initialState = { name: '', email: '', password: 'Password123*', role: 'STUDENT', teacherCategory: [], careerId: '', studentCategory: '', isActive: true };
const roleOptions = ['ADMIN', 'COORDINATOR', 'TEACHER', 'STUDENT'];
const teacherOptions = ['METHODOLOGICAL', 'THEMATIC', 'EVALUATOR'];

export default function UsersPage() {
  const { items, loading, reload } = useCrud(usersApi);
  const { items: careers } = useCrud(careersApi);
  const [form, setForm] = useState(initialState);
  const [editingId, setEditingId] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const payload = { ...form, teacherCategory: form.teacherCategory.filter(Boolean) };
    if (editingId) await usersApi.update(editingId, payload); else await usersApi.create(payload);
    setForm(initialState); setEditingId(''); reload();
  };

  const editItem = (item) => setForm({ ...item, careerId: item.careerId?._id || '', password: '', teacherCategory: item.teacherCategory || [] }) || setEditingId(item._id);
  const remove = async (id) => { if (confirm('¿Eliminar usuario?')) { await usersApi.remove(id); reload(); } };

  if (loading) return <LoadingSpinner />;
  return (
    <div className="crud-grid">
      <form className="card form-card" onSubmit={submit}>
        <h3>{editingId ? 'Editar usuario' : 'Nuevo usuario'}</h3>
        <FormInput label="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <FormInput label="Correo" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <FormInput label="Contraseña" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <SelectInput label="Rol" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} options={roleOptions.map((v) => ({ value: v, label: v }))} />
        <SelectInput label="Carrera" value={form.careerId} onChange={(e) => setForm({ ...form, careerId: e.target.value })} options={careers.map((c) => ({ value: c._id, label: c.name }))} />
        <SelectInput label="Categoría docente" multiple value={form.teacherCategory} onChange={(e) => setForm({ ...form, teacherCategory: [...e.target.selectedOptions].map((o) => o.value) })} options={teacherOptions.map((v) => ({ value: v, label: v }))} />
        <FormInput label="Categoría estudiante" value={form.studentCategory} onChange={(e) => setForm({ ...form, studentCategory: e.target.value })} />
        <button className="btn btn-primary">{editingId ? 'Actualizar' : 'Guardar'}</button>
      </form>
      <div className="card">
        <h3>Usuarios</h3>
        <DataTable columns={[
          { key: 'name', label: 'Nombre' },
          { key: 'email', label: 'Correo' },
          { key: 'role', label: 'Rol' },
          { key: 'teacherCategory', label: 'Categoría', render: (row) => row.teacherCategory?.join(', ') || '-' },
          { key: 'careerId', label: 'Carrera', render: (row) => row.careerId?.name || '-' }
        ]} data={items} actions={(row) => <div className="action-row"><button className="btn small" onClick={() => editItem(row)}>Editar</button><button className="btn btn-danger small" onClick={() => remove(row._id)}>Eliminar</button></div>} />
      </div>
    </div>
  );
}
