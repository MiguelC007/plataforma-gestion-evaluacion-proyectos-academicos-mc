import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function MainLayout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="content-area">
        <Navbar />
        <main className="page-content">{children}</main>
      </div>
    </div>
  );
}
