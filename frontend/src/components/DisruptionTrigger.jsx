import { motion } from 'framer-motion';
import { CloudRain, Flame, Waves, AlertOctagon, Loader } from 'lucide-react';

const triggers = [
  {
    id: 'rain',
    icon: CloudRain,
    label: 'Heavy Rain',
    description: 'Rainfall > 50mm detected',
    color: '#38bdf8',
    bgColor: 'rgba(56,189,248,0.1)',
    borderColor: 'rgba(56,189,248,0.3)',
    amount: 500,
    reason: 'Heavy rainfall disrupted delivery operations in your zone. Parametric trigger activated.',
  },
  {
    id: 'heat',
    icon: Flame,
    label: 'Heatwave',
    description: 'Temperature > 42°C',
    color: '#f43f5e',
    bgColor: 'rgba(244,63,94,0.1)',
    borderColor: 'rgba(244,63,94,0.3)',
    amount: 350,
    reason: 'Extreme heat advisory issued. Heatwave compensation triggered automatically.',
  },
  {
    id: 'flood',
    icon: Waves,
    label: 'Flood / Waterlogging',
    description: 'IMD Flood Alert Level 3',
    color: '#8b5cf6',
    bgColor: 'rgba(139,92,246,0.1)',
    borderColor: 'rgba(139,92,246,0.3)',
    amount: 750,
    reason: 'IMD issued flood alert for your delivery zone. Maximum payout triggered.',
  },
  {
    id: 'curfew',
    icon: AlertOctagon,
    label: 'Curfew / Shutdown',
    description: 'Government order active',
    color: '#fbbf24',
    bgColor: 'rgba(251,191,36,0.1)',
    borderColor: 'rgba(251,191,36,0.3)',
    amount: 600,
    reason: 'Government-imposed curfew disrupted gig work. Shutdown payout triggered.',
  },
];

export default function DisruptionTrigger({ onTrigger, loading, activeId }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
      {triggers.map((t) => {
        const Icon = t.icon;
        const isActive = activeId === t.id;

        return (
          <motion.button
            key={t.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => !loading && onTrigger(t)}
            style={{
              background: isActive ? t.bgColor : 'rgba(255,255,255,0.04)',
              border: `1px solid ${isActive ? t.borderColor : 'rgba(255,255,255,0.08)'}`,
              borderRadius: 14,
              padding: '18px 16px',
              cursor: loading ? 'not-allowed' : 'pointer',
              textAlign: 'left',
              transition: 'all 0.3s ease',
              opacity: loading && !isActive ? 0.5 : 1,
              boxShadow: isActive ? `0 0 24px ${t.color}30` : 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: t.bgColor, border: `1px solid ${t.borderColor}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {isActive && loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Loader size={16} color={t.color} />
                  </motion.div>
                ) : (
                  <Icon size={16} color={t.color} />
                )}
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.85rem', color: isActive ? t.color : '#f1f5f9' }}>
                  {t.label}
                </p>
              </div>
            </div>
            <p style={{ fontSize: '0.73rem', color: '#64748b', lineHeight: 1.4 }}>
              {t.description}
            </p>
            <div style={{ marginTop: 10 }}>
              <span style={{
                fontSize: '0.7rem', fontWeight: 600, color: t.color,
                background: t.bgColor, border: `1px solid ${t.borderColor}`,
                padding: '3px 8px', borderRadius: 999,
              }}>
                ₹{t.amount} payout
              </span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
