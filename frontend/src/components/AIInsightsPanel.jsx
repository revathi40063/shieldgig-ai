import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { Brain, TrendingUp, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const riskFactors = [
  { factor: 'Weather', value: 78 },
  { factor: 'Traffic', value: 62 },
  { factor: 'Zone Risk', value: 45 },
  { factor: 'Claims Hist.', value: 30 },
  { factor: 'Time of Day', value: 55 },
  { factor: 'Earnings', value: 40 },
];

const COLORS = ['#f97316', '#8b5cf6', '#38bdf8', '#10b981', '#f43f5e', '#fbbf24'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(22,27,39,0.95)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 10, padding: '8px 14px', fontSize: '0.8rem',
      }}>
        <p style={{ color: '#f97316', fontWeight: 700 }}>{payload[0].payload.factor}</p>
        <p style={{ color: '#94a3b8' }}>Risk Score: <span style={{ color: '#f1f5f9', fontWeight: 600 }}>{payload[0].value}</span></p>
      </div>
    );
  }
  return null;
};

export default function AIInsightsPanel({ riskScore }) {
  return (
    <div className="glass-card" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(56,189,248,0.2))',
          border: '1px solid rgba(139,92,246,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Brain size={18} color="#8b5cf6" />
        </div>
        <div>
          <h3 style={{ fontWeight: 700, fontSize: '1rem' }}>AI Risk Model</h3>
          <p style={{ color: '#64748b', fontSize: '0.75rem' }}>Real-time parametric analysis</p>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <span style={{
            background: 'rgba(139,92,246,0.15)', color: '#a78bfa',
            border: '1px solid rgba(139,92,246,0.3)',
            padding: '4px 10px', borderRadius: 999,
            fontSize: '0.7rem', fontWeight: 700,
          }}>LIVE</span>
        </div>
      </div>

      {/* Bar Chart */}
      <div style={{ height: 160, marginBottom: 16 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={riskFactors} barSize={14}>
            <XAxis dataKey="factor" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {riskFactors.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="divider" />

      {/* Model Info */}
      <div style={{ display: 'flex', gap: 12 }}>
        {[
          { icon: TrendingUp, label: 'Model Accuracy', value: '94.2%', color: '#10b981' },
          { icon: AlertTriangle, label: 'Active Signals', value: '3 / 6', color: '#f97316' },
        ].map(({ icon: Icon, label, value, color }) => (
          <motion.div
            key={label}
            whileHover={{ scale: 1.03 }}
            style={{
              flex: 1, padding: '12px', borderRadius: 12,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <Icon size={14} color={color} style={{ marginBottom: 4 }} />
            <p style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: 2 }}>{label}</p>
            <p style={{ fontSize: '1.1rem', fontWeight: 800, color }}>{value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
