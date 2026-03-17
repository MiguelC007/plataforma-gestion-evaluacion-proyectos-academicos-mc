import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { evaluationsApi } from '../api/services';
import DataTable from '../components/DataTable';

export default function MyEvaluationsPage() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => { evaluationsApi.list().then(({ data }) => setItems(data)); }, []);
  return <div className="card"><h2>Mis evaluaciones</h2><DataTable columns={[{key:'projectId',label:'Proyecto',render:(row)=>row.projectId?.title},{key:'status',label:'Estado'},{key:'totalScore',label:'Total'}]} data={items} actions={(row)=><button className="btn small" onClick={()=>navigate(`/evaluate/${row._id}`)}>Abrir</button>} /></div>;
}
