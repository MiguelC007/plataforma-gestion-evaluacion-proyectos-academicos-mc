import { useEffect, useState } from 'react';
import { resultsApi } from '../api/services';

export default function ResultsPage() {
  const [items, setItems] = useState([]);
  useEffect(() => { resultsApi.list().then(({ data }) => setItems(data)); }, []);
  return <div className="results-list">{items.map((item)=><div className="card" key={item.project._id}><h3>{item.project.title}</h3><p>Promedio consolidado: <strong>{item.averageScore}</strong></p><ul>{item.evaluations.map((ev)=><li key={ev._id}>{ev.evaluatorTeacherId?.name}: {ev.totalScore} ({ev.status})</li>)}</ul></div>)}</div>;
}
