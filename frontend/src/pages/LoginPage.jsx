import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@demo.com');
  const [password, setPassword] = useState('Password123*');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error de autenticación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>Academic Project Platform</h1>
        <p>Ingrese con sus credenciales de prueba o del sistema.</p>
        {error && <div className="alert error">{error}</div>}
        <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo" />
        <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
        <button className="btn btn-primary" disabled={loading}>{loading ? 'Ingresando...' : 'Iniciar sesión'}</button>
        <div className="login-help">
          <span>Admin: admin@demo.com</span>
          <span>Clave: Password123*</span>
        </div>
      </form>
    </div>
  );
}
