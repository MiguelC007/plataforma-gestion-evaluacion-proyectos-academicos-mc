import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { rubricsApi } from '../api/services';
import FormInput from '../components/FormInput';

const emptyQuestion = { text: '', order: 1, minScore: 1, maxScore: 5, weight: 1, isActive: true };

export default function RubricBuilderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', description: '', isActive: true, questions: [emptyQuestion] });
  useEffect(() => { if (id && id !== 'new') rubricsApi.get(id).then(({ data }) => setForm({ ...data, questions: data.questions.length ? data.questions : [emptyQuestion] })); }, [id]);
  const updateQuestion = (index, key, value) => setForm({ ...form, questions: form.questions.map((q, i) => i === index ? { ...q, [key]: value } : q) });
  const addQuestion = () => setForm({ ...form, questions: [...form.questions, { ...emptyQuestion, order: form.questions.length + 1 }] });
  const submit = async (e) => { e.preventDefault(); const payload = { ...form, questions: form.questions.map((q, index) => ({ ...q, order: index + 1 })) }; if (id && id !== 'new') await rubricsApi.update(id, payload); else await rubricsApi.create(payload); navigate('/rubrics'); };
  return <form className="card form-card wide" onSubmit={submit}><h2>Constructor de rúbrica</h2><FormInput label="Nombre" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} /><FormInput label="Descripción" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} />{form.questions.map((q,index)=><div className="question-row" key={index}><FormInput label={`Pregunta ${index+1}`} value={q.text} onChange={(e)=>updateQuestion(index,'text',e.target.value)} /><FormInput label="Min" type="number" value={q.minScore} onChange={(e)=>updateQuestion(index,'minScore',Number(e.target.value))} /><FormInput label="Max" type="number" value={q.maxScore} onChange={(e)=>updateQuestion(index,'maxScore',Number(e.target.value))} /><FormInput label="Peso" type="number" value={q.weight} onChange={(e)=>updateQuestion(index,'weight',Number(e.target.value))} /></div>)}<div className="action-row"><button type="button" className="btn" onClick={addQuestion}>Agregar pregunta</button><button className="btn btn-primary">Guardar rúbrica</button></div></form>;
}
