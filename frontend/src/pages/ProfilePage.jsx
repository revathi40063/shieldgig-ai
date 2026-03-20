import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, MapPin, Briefcase, Phone, Calendar, Shield, TrendingUp, Star, Edit, LogOut } from 'lucide-react';
import Navbar from '../components/Navbar';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [worker, setWorker] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('shieldgig_worker') || '{}');
    if (!data.name) { navigate('/'); return; }
    setWorker(data);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('shieldgig_worker');
    navigate('/');
  };

  if (!worker) return null;

  const claims = worker.claims || [];
  const totalSavings = claims.reduce((s, c) => s + c.amount, 0);

  // Build chart data from claims
  const chartData = claims.map((c, i) => ({
    name: `#${i + 1}`,
    amount: c.amount,
    cumulative: claims.slice(0, i + 1).reduce((s, cc) => s + cc.amount, 0),
  }));

  const stats = [
    { label: 'Total Saved', value: `₹${totalSavings.toLocaleString('en-IN')}`, color: '#10b981', icon: '💰' },
    { label: 'Claims Made', value: claims.length, color: '#8b5cf6', icon: '⚡' },
    { label: 'Risk Score', value: worker.riskScore, color: worker.riskScore > 60 ? '#f43f5e' : '#f97316', icon: '🎯' },
    { label: 'Weekly Premium', value: `₹${worker.premium}`, color: '#f97316', icon: '🛡️' },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'rgba(22,27,39,0.98)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 10, padding: '8px 14px', fontSize: '0.8rem',
        }}>
          <p style={{ color: '#10b981', fontWeight: 700 }}>₹{payload[0]?.value?.toLocaleString('en-IN')}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh' }}>
      <Navbar />
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px' }}>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(249,115,22,0.08))',
            border: '1px solid rgba(139,92,246,0.2)',
            borderRadius: 20, padding: '28px',
            display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24, flexWrap: 'wrap',
          }}
        >
          {/* Avatar */}
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'linear-gradient(135deg, #8b5cf6, #f97316)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2rem', fontWeight: 900, color: 'white',
            boxShadow: '0 0 30px rgba(139,92,246,0.4)',
            flexShrink: 0,
          }}>
            {worker.name.charAt(0).toUpperCase()}
          </div>

          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 6 }}>{worker.name}</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              {[
                { icon: MapPin, value: worker.city, color: '#38bdf8' },
                { icon: Briefcase, value: worker.platform, color: '#8b5cf6' },
                { icon: Phone, value: `+91 ${worker.phone}`, color: '#10b981' },
                { icon: Calendar, value: `Joined ${worker.joinedDate}`, color: '#f97316' },
              ].map(({ icon: Icon, value, color }) => (
                <span key={value} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.83rem', color: '#94a3b8' }}>
                  <Icon size={12} color={color} /> {value}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', padding: '8px 14px' }}
            >
              <Edit size={13} /> Edit Profile
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              style={{
                background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.25)',
                color: '#f43f5e', borderRadius: 10, padding: '8px 14px',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                fontSize: '0.8rem', fontWeight: 500, fontFamily: 'Inter, sans-serif',
              }}
            >
              <LogOut size={13} /> Logout
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 24 }}>
          {stats.map(({ label, value, color, icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.03 }}
              className="glass-card"
              style={{ padding: '20px', border: `1px solid ${color}20` }}
            >
              <div style={{ fontSize: '1.4rem', marginBottom: 8 }}>{icon}</div>
              <p style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{label}</p>
              <p style={{ fontSize: '1.6rem', fontWeight: 800, color }}>{value}</p>
            </motion.div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

          {/* Savings Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card"
            style={{ padding: '24px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <TrendingUp size={16} color="#10b981" />
              <h3 style={{ fontWeight: 700, fontSize: '0.95rem' }}>Cumulative Savings</h3>
            </div>
            {chartData.length > 0 ? (
              <div style={{ height: 180 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="cumulative" stroke="#10b981" strokeWidth={2.5} fill="url(#grad)" dot={{ fill: '#10b981', r: 4 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div style={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: '0.85rem' }}>
                No savings data yet
              </div>
            )}
          </motion.div>

          {/* Coverage Plan */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card"
            style={{ padding: '24px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Shield size={16} color="#f97316" />
              <h3 style={{ fontWeight: 700, fontSize: '0.95rem' }}>My Plan Summary</h3>
            </div>
            {[
              { label: 'Plan Type', value: 'Parametric Basic', color: '#f97316' },
              { label: 'Coverage Period', value: 'Weekly Auto-Renewal', color: '#8b5cf6' },
              { label: 'AI Scoring', value: 'Enabled', color: '#10b981' },
              { label: 'Payout Speed', value: '< 2 minutes', color: '#38bdf8' },
              { label: 'Manual Claims', value: 'Not Required', color: '#10b981' },
              { label: 'IRDAI Reg No.', value: 'SG-AI-2024-001', color: '#64748b' },
            ].map(({ label, value, color }) => (
              <div key={label} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
                fontSize: '0.82rem',
              }}>
                <span style={{ color: '#64748b' }}>{label}</span>
                <span style={{ fontWeight: 600, color }}>{value}</span>
              </div>
            ))}
          </motion.div>

          {/* Claim History Full */}
          {claims.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card"
              style={{ padding: '24px', gridColumn: 'span 2' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <Star size={16} color="#fbbf24" />
                <h3 style={{ fontWeight: 700, fontSize: '0.95rem' }}>Full Claim History</h3>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem' }}>
                  <thead>
                    <tr>
                      {['#', 'Event', 'Amount', 'Timestamp', 'Status'].map(h => (
                        <th key={h} style={{
                          padding: '10px 14px', textAlign: 'left',
                          color: '#64748b', fontWeight: 600, fontSize: '0.75rem',
                          textTransform: 'uppercase', letterSpacing: '0.05em',
                          borderBottom: '1px solid rgba(255,255,255,0.07)',
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[...claims].reverse().map((claim, i) => (
                      <tr key={claim.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <td style={{ padding: '12px 14px', color: '#64748b' }}>{claims.length - i}</td>
                        <td style={{ padding: '12px 14px', fontWeight: 600 }}>{claim.trigger}</td>
                        <td style={{ padding: '12px 14px', fontWeight: 700, color: '#10b981' }}>+₹{claim.amount}</td>
                        <td style={{ padding: '12px 14px', color: '#64748b' }}>{claim.timestamp}</td>
                        <td style={{ padding: '12px 14px' }}>
                          <span className="badge badge-success">✓ Paid</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
