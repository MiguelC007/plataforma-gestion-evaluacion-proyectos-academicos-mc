import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { evaluationsApi } from '../api/services';
import ScoreInput from '../components/ScoreInput';

export default function EvaluateProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [generalComment, setGeneralComment] = useState('');

  useEffect(() => { evaluationsApi.get(id).then(({ data }) => { setData(data); setGeneralComment(data.generalComment || ''); setAnswers(data.questions.map((q) => ({ questionId: q._id, score: data.answers.find((a) => a.questionId === q._id)?.score || q.minScore, comment: data.answers.find((a) => a.questionId === q._id)?.comment || '' }))); }); }, [id]);
  const updateAnswer = (index, key, value) => setAnswers(answers.map((item, i) => i === index ? { ...item, [key]: value } : item));
  const save = async (status) => { await evaluationsApi.update(id, { answers, generalComment, status }); navigate('/my-evaluations'); };
  if (!data) return null;
  return <div className="card form-card wide"><h2>Evaluar proyecto: {data.projectId?.title}</h2>{data.questions.map((q,index)=><div key={q._id} className="question-row"><div className="question-info"><strong>{q.order}. {q.text}</strong><span>Rango {q.minScore} - {q.maxScore} | Peso {q.weight}</span></div><ScoreInput label="Puntaje" min={q.minScore} max={q.maxScore} value={answers[index]?.score || q.minScore} onChange={(e)=>updateAnswer(index,'score',Number(e.target.value))} /></div>)}<textarea className="input" rows="4" placeholder="Comentario general" value={generalComment} onChange={(e)=>setGeneralComment(e.target.value)} /><div className="action-row"><button className="btn" onClick={()=>save('BORRADOR')}>Guardar borrador</button><button className="btn btn-primary" onClick={()=>save('ENVIADA')}>Enviar evaluación</button></div></div>;
}
