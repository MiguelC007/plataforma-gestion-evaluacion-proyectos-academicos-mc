import { useEffect, useState } from 'react';

export const useCrud = (service, params = {}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setLoading(true);
      const { data } = await service.list(params);
      setItems(data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error cargando datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);
  return { items, setItems, loading, error, reload: load };
};
