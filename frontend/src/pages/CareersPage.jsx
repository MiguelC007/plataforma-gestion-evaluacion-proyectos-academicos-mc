import { useState } from 'react';
import { careersApi } from '../api/services';
import { useCrud } from '../hooks/useCrud';
import DataTable from '../components/DataTable';
import FormInput from '../components/FormInput';

export default function CareersPage() {
  const { items, reload } = useCrud(careersApi);
  const [form, setForm] = useState({ name: '', code: '', description: '', isActive: true });
  const [editingId, setEditingId] = useState('');
  const submit = async (e) => { e.preventDefault(); editingId ? await careersApi.update(editingId, form) : await careersApi.create(form); setForm({ name: '', code: '', description: '', isActive: true }); setEditingId(''); reload(); };
  const editItem = (item) => { setForm(item); setEditingId(item._id); };
  const remove = async (id) => { if (confirm('¿Eliminar carrera?')) { await careersApi.remove(id); reload(); } };
  return <div className="crud-grid"><form className="card form-card" onSubmit={submit}><h3>Carrera</h3><FormInput label="Nombre" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} required /><FormInput label="Código" value={form.code} onChange={(e)=>setForm({...form,code:e.target.value})} required /><FormInput label="Descripción" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} /><button className="btn btn-primary">Guardar</button></form><div className="card"><DataTable columns={[{key:'name',label:'Nombre'},{key:'code',label:'Código'},{key:'description',label:'Descripción'}]} data={items} actions={(row)=><div className="action-row"><button className="btn small" onClick={()=>editItem(row)}>Editar</button><button className="btn btn-danger small" onClick={()=>remove(row._id)}>Eliminar</button></div>} /></div></div>;
}
