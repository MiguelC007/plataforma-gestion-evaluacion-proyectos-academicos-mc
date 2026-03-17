import { useState } from 'react';
import { projectTypesApi } from '../api/services';
import { useCrud } from '../hooks/useCrud';
import DataTable from '../components/DataTable';
import FormInput from '../components/FormInput';

export default function ProjectTypesPage() {
  const { items, reload } = useCrud(projectTypesApi);
  const [form, setForm] = useState({ name: '', description: '', isActive: true });
  const [editingId, setEditingId] = useState('');
  const submit = async (e) => { e.preventDefault(); editingId ? await projectTypesApi.update(editingId, form) : await projectTypesApi.create(form); setForm({ name: '', description: '', isActive: true }); setEditingId(''); reload(); };
  const editItem = (item) => { setForm(item); setEditingId(item._id); };
  return <div className="crud-grid"><form className="card form-card" onSubmit={submit}><h3>Tipo de Proyecto</h3><FormInput label="Nombre" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/><FormInput label="Descripción" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})}/><button className="btn btn-primary">Guardar</button></form><div className="card"><DataTable columns={[{key:'name',label:'Nombre'},{key:'description',label:'Descripción'}]} data={items} actions={(row)=><button className="btn small" onClick={()=>editItem(row)}>Editar</button>} /></div></div>;
}
