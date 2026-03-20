import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, IndianRupee, Clock, Zap } from 'lucide-react';

export default function PayoutModal({ isOpen, onClose, claim }) {
  if (!claim) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40 }}
            transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
            onClick={e => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, #161b27, #1a2236)',
              border: '1px solid rgba(16,185,129,0.3)',
              borderRadius: 24,
              padding: '40px 32px',
              maxWidth: 440, width: '100%',
              boxShadow: '0 0 60px rgba(16,185,129,0.15), 0 32px 64px rgba(0,0,0,0.5)',
              position: 'relative', textAlign: 'center',
            }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute', top: 16, right: 16,
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8, padding: '6px', cursor: 'pointer', display: 'flex',
              }}
            >
              <X size={16} color="#94a3b8" />
            </button>

            {/* Success Icon with animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.6, delay: 0.2 }}
              style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'rgba(16,185,129,0.15)',
                border: '2px solid rgba(16,185,129,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 0 40px rgba(16,185,129,0.3)',
              }}
            >
              <CheckCircle size={40} color="#10b981" />
            </motion.div>

            <div style={{ marginBottom: 8 }}>
              <span style={{
                background: 'rgba(16,185,129,0.1)', color: '#34d399',
                border: '1px solid rgba(16,185,129,0.25)',
                padding: '4px 12px', borderRadius: 999,
                fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                Claim Auto-Triggered ✓
              </span>
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 6 }}>
              Payout Processed!
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: 28 }}>
              {claim.reason}
            </p>

            {/* Amount */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.35, type: 'spring', bounce: 0.4 }}
              style={{
                background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(56,189,248,0.1))',
                border: '1px solid rgba(16,185,129,0.25)',
                borderRadius: 16, padding: '24px', marginBottom: 24,
              }}
            >
              <p style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: 4 }}>Payout Amount</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                <IndianRupee size={28} color="#10b981" strokeWidth={2.5} />
                <span style={{ fontSize: '3rem', fontWeight: 900, color: '#10b981', lineHeight: 1 }}>
                  {claim.amount.toLocaleString('en-IN')}
                </span>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.75rem', marginTop: 4 }}>
                Transferred to your linked UPI ID
              </p>
            </motion.div>

            {/* Details */}
            <div style={{ textAlign: 'left', marginBottom: 28 }}>
              {[
                { icon: Zap, label: 'Trigger', value: claim.trigger },
                { icon: Clock, label: 'Timestamp', value: claim.timestamp },
                { icon: CheckCircle, label: 'Status', value: 'Paid', color: '#10b981' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#64748b', fontSize: '0.8rem' }}>
                    <Icon size={13} /> {label}
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem', color: color || '#f1f5f9' }}>{value}</span>
                </div>
              ))}
            </div>

            <button
              onClick={onClose}
              className="btn-primary"
              style={{ width: '100%', padding: '14px' }}
            >
              Great, Thanks! 🎉
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
