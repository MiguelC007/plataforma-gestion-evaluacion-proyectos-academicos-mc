import { useState } from 'react';
import { periodsApi } from '../api/services';
import { useCrud } from '../hooks/useCrud';
import DataTable from '../components/DataTable';
import FormInput from '../components/FormInput';

export default function AcademicPeriodsPage() {
  const { items, reload } = useCrud(periodsApi);
  const [form, setForm] = useState({ year: 2026, number: 1, label: '2026-1', startDate: '2026-01-15', endDate: '2026-04-15', isActive: true });
  const [editingId, setEditingId] = useState('');
  const submit = async (e) => { e.preventDefault(); const payload = { ...form }; editingId ? await periodsApi.update(editingId, payload) : await periodsApi.create(payload); setEditingId(''); reload(); };
  const editItem = (item) => { setForm({ ...item, startDate: item.startDate?.slice(0,10), endDate: item.endDate?.slice(0,10) }); setEditingId(item._id); };
  return <div className="crud-grid"><form className="card form-card" onSubmit={submit}><h3>Periodo Académico</h3><FormInput label="Año" type="number" value={form.year} onChange={(e)=>setForm({...form,year:Number(e.target.value)})}/><FormInput label="Número" type="number" value={form.number} onChange={(e)=>setForm({...form,number:Number(e.target.value)})}/><FormInput label="Label" value={form.label} onChange={(e)=>setForm({...form,label:e.target.value})}/><FormInput label="Inicio" type="date" value={form.startDate} onChange={(e)=>setForm({...form,startDate:e.target.value})}/><FormInput label="Fin" type="date" value={form.endDate} onChange={(e)=>setForm({...form,endDate:e.target.value})}/><button className="btn btn-primary">Guardar</button></form><div className="card"><DataTable columns={[{key:'label',label:'Periodo'},{key:'year',label:'Año'},{key:'number',label:'No.'},{key:'startDate',label:'Inicio',render:(row)=>new Date(row.startDate).toLocaleDateString()},{key:'endDate',label:'Fin',render:(row)=>new Date(row.endDate).toLocaleDateString()}]} data={items} actions={(row)=><button className="btn small" onClick={()=>editItem(row)}>Editar</button>} /></div></div>;
}
