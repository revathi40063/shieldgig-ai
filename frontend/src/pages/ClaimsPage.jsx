import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import DisruptionTrigger from '../components/DisruptionTrigger';
import PayoutModal from '../components/PayoutModal';

export default function ClaimsPage() {
  const navigate = useNavigate();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentClaim, setCurrentClaim] = useState(null);
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('shieldgig_worker') || '{}');
    if (!data.name) { navigate('/'); return; }
    setWorker(data);
    setClaims(data.claims || []);
  }, [navigate]);

  const handleTrigger = (trigger) => {
    setLoading(true);
    setActiveId(trigger.id);

    setTimeout(() => {
      const claim = {
        id: Date.now(),
        trigger: trigger.label,
        amount: trigger.amount,
        reason: trigger.reason,
        timestamp: new Date().toLocaleString('en-IN'),
        status: 'Paid',
        color: trigger.color,
      };

      const updatedWorker = {
        ...JSON.parse(localStorage.getItem('shieldgig_worker') || '{}'),
      };
      updatedWorker.claims = [...(updatedWorker.claims || []), claim];
      updatedWorker.totalSavings = (updatedWorker.totalSavings || 0) + claim.amount;
      localStorage.setItem('shieldgig_worker', JSON.stringify(updatedWorker));

      setClaims(updatedWorker.claims);
      setCurrentClaim(claim);
      setLoading(false);
      setActiveId(null);
      setModalOpen(true);
    }, 2200);
  };

  if (!worker) return null;

  const totalPaid = claims.reduce((s, c) => s + c.amount, 0);

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh' }}>
      <Navbar />

      <PayoutModal isOpen={modalOpen} onClose={() => setModalOpen(false)} claim={currentClaim} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: 6, letterSpacing: '-0.02em' }}>
            Disruption <span className="gradient-text">Simulator</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: 28 }}>
            Simulate parametric triggers — payouts activate automatically based on verified event data.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>

          {/* Left: Trigger + Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { label: 'Total Payouts', value: `₹${totalPaid.toLocaleString('en-IN')}`, color: '#10b981', icon: '💰' },
                { label: 'Claims Processed', value: claims.length, color: '#8b5cf6', icon: '⚡' },
              ].map(({ label, value, color, icon }) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.02 }}
                  className="glass-card"
                  style={{ padding: '16px 20px', border: `1px solid ${color}25` }}
                >
                  <div style={{ fontSize: '1.4rem', marginBottom: 6 }}>{icon}</div>
                  <p style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</p>
                  <p style={{ fontSize: '1.5rem', fontWeight: 800, color }}>{value}</p>
                </motion.div>
              ))}
            </div>

            {/* Trigger Buttons */}
            <div className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <Zap size={16} color="#f97316" />
                <h3 style={{ fontWeight: 700 }}>Trigger a Disruption</h3>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: 16 }}>
                Click any event below to simulate an auto-claim:
              </p>
              <DisruptionTrigger onTrigger={handleTrigger} loading={loading} activeId={activeId} />
            </div>

            {/* Processing animation */}
            <AnimatePresence>
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.25)',
                    borderRadius: 14, padding: '16px 20px',
                    display: 'flex', alignItems: 'center', gap: 12,
                  }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    style={{ flexShrink: 0 }}
                  >
                    <Zap size={20} color="#f97316" />
                  </motion.div>
                  <div>
                    <p style={{ fontWeight: 700, color: '#f97316', fontSize: '0.9rem' }}>AI Verifying Trigger...</p>
                    <p style={{ color: '#64748b', fontSize: '0.75rem' }}>
                      Checking IMD APIs, satellite data & geo-fencing...
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Claims Table */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <Clock size={16} color="#8b5cf6" />
              <h3 style={{ fontWeight: 700 }}>Claim History</h3>
              {claims.length > 0 && (
                <span style={{
                  marginLeft: 'auto', background: 'rgba(139,92,246,0.15)',
                  color: '#a78bfa', border: '1px solid rgba(139,92,246,0.3)',
                  padding: '3px 10px', borderRadius: 999, fontSize: '0.72rem', fontWeight: 700,
                }}>
                  {claims.length} Records
                </span>
              )}
            </div>

            {claims.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#64748b' }}>
                <AlertCircle size={40} color="#2d3561" style={{ margin: '0 auto 12px' }} />
                <p style={{ fontWeight: 600, marginBottom: 6 }}>No claims yet</p>
                <p style={{ fontSize: '0.8rem' }}>Trigger a disruption event to see payouts here.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 480, overflowY: 'auto', paddingRight: 4 }}>
                {[...claims].reverse().map((claim, i) => (
                  <motion.div
                    key={claim.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    style={{
                      padding: '14px 16px', borderRadius: 12,
                      background: 'rgba(16,185,129,0.05)',
                      border: '1px solid rgba(16,185,129,0.15)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <p style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: 3 }}>{claim.trigger}</p>
                        <p style={{ fontSize: '0.72rem', color: '#64748b' }}>{claim.timestamp}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontWeight: 800, color: '#10b981', fontSize: '1.1rem' }}>
                          +₹{claim.amount}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
                          <CheckCircle size={10} color="#10b981" />
                          <span style={{ fontSize: '0.68rem', color: '#10b981', fontWeight: 600 }}>Paid</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
