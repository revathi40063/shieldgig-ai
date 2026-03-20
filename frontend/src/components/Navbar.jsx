import { Link, useLocation } from 'react-router-dom';
import { Shield, LayoutDashboard, FileText, User, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

const navLinks = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/claims', label: 'Claims', icon: FileText },
  { path: '/profile', label: 'Profile', icon: User },
];

export default function Navbar() {
  const location = useLocation();
  const worker = JSON.parse(localStorage.getItem('shieldgig_worker') || '{}');

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(13, 17, 23, 0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      padding: '0 24px',
      height: '64px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      {/* Logo */}
      <Link to="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: 36, height: 36,
          background: 'linear-gradient(135deg, #f97316, #ea580c)',
          borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 20px rgba(249,115,22,0.4)',
        }}>
          <Shield size={20} color="white" strokeWidth={2.5} />
        </div>
        <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
          <span style={{ color: '#f97316' }}>Shield</span>
          <span style={{ color: '#f1f5f9' }}>Gig</span>
          <span style={{
            fontSize: '0.6rem', fontWeight: 700, color: '#8b5cf6',
            background: 'rgba(139,92,246,0.15)', padding: '2px 6px',
            borderRadius: 999, marginLeft: 6, verticalAlign: 'middle',
            border: '1px solid rgba(139,92,246,0.3)',
          }}>AI</span>
        </span>
      </Link>

      {/* Nav Links */}
      <div style={{ display: 'flex', gap: '4px' }}>
        {navLinks.map(({ path, label, icon: Icon }) => {
          const active = location.pathname === path;
          return (
            <Link key={path} to={path} style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '7px',
                  padding: '7px 14px', borderRadius: 10,
                  background: active ? 'rgba(249,115,22,0.12)' : 'transparent',
                  border: active ? '1px solid rgba(249,115,22,0.3)' : '1px solid transparent',
                  color: active ? '#f97316' : '#94a3b8',
                  fontSize: '0.875rem', fontWeight: active ? 600 : 400,
                  transition: 'all 0.2s ease',
                }}
              >
                <Icon size={15} />
                {label}
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* Right: Bell + Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 10, padding: '7px', cursor: 'pointer', position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Bell size={16} color="#94a3b8" />
          <span style={{
            position: 'absolute', top: 4, right: 4,
            width: 7, height: 7, borderRadius: '50%',
            background: '#f97316', border: '1.5px solid #0d1117',
          }} />
        </motion.button>

        <div style={{
          width: 34, height: 34, borderRadius: '50%',
          background: 'linear-gradient(135deg, #8b5cf6, #f97316)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: '0.85rem', color: 'white',
          boxShadow: '0 0 16px rgba(139,92,246,0.3)',
          cursor: 'pointer',
        }}>
          {worker.name ? worker.name.charAt(0).toUpperCase() : 'G'}
        </div>
      </div>
    </nav>
  );
}
