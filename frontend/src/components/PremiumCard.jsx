import { motion } from 'framer-motion';
import { IndianRupee, TrendingDown, Info } from 'lucide-react';

function CircularGauge({ value, max = 100, size = 120, color = '#f97316' }) {
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / max) * circumference;

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={8} />
      <motion.circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke={color} strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: circumference - progress }}
        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
        style={{ filter: `drop-shadow(0 0 8px ${color}60)` }}
      />
    </svg>
  );
}

export default function PremiumCard({ premium, riskScore }) {
  const riskLevel = riskScore > 70 ? 'High' : riskScore > 40 ? 'Medium' : 'Low';
  const riskColor = riskScore > 70 ? '#f43f5e' : riskScore > 40 ? '#f97316' : '#10b981';

  return (
    <div className="glass-card" style={{
      padding: '24px',
      background: 'linear-gradient(135deg, rgba(249,115,22,0.08), rgba(234,88,12,0.05))',
      border: '1px solid rgba(249,115,22,0.2)',
      boxShadow: '0 0 40px rgba(249,115,22,0.08)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <p style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 500, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Weekly Premium
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
            <IndianRupee size={20} color="#f97316" strokeWidth={2.5} />
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ fontSize: '2.4rem', fontWeight: 900, color: '#f97316', lineHeight: 1 }}
            >
              {premium}
            </motion.span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 }}>
            <TrendingDown size={12} color="#10b981" />
            <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 500 }}>
              12% lower than avg
            </span>
          </div>
        </div>
        {/* Gauge */}
        <div style={{ position: 'relative' }}>
          <CircularGauge value={riskScore} color={riskColor} size={110} />
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: riskColor }}>{riskScore}</span>
            <span style={{ fontSize: '0.6rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Risk</span>
          </div>
        </div>
      </div>

      <div className="divider" />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
          Risk Level:&nbsp;
          <span style={{ color: riskColor, fontWeight: 700 }}>{riskLevel}</span>
        </div>
        <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}>
          <Info size={11} /> AI-calculated
        </span>
      </div>
    </div>
  );
}
