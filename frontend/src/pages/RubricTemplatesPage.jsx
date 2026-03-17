import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { rubricsApi } from '../api/services';
import DataTable from '../components/DataTable';

export default function RubricTemplatesPage() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const load = () => rubricsApi.list().then(({ data }) => setItems(data));
  useEffect(() => { load(); }, []);
  return <div className="card"><div className="page-header"><h2>Rúbricas</h2><button className="btn btn-primary" onClick={() => navigate('/rubrics/new')}>Nueva rúbrica</button></div><DataTable columns={[{key:'name',label:'Nombre'},{key:'description',label:'Descripción'},{key:'questions',label:'Preguntas',render:(row)=>row.questions?.length || 0}]} data={items} actions={(row)=><div className="action-row"><button className="btn small" onClick={()=>navigate(`/rubrics/${row._id}`)}>Editar</button></div>} /></div>;
}
