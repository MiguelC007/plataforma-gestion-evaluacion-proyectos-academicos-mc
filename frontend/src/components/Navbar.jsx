import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="topbar">
      <div>
        <h1>Plataforma de Gestión y Evaluación Académica</h1>
        <p>{user?.name} - {user?.role}</p>
      </div>
      <button className="btn btn-danger" onClick={logout}>Cerrar sesión</button>
    </header>
  );
}
