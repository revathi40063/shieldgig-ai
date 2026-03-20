import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, TrendingUp, CheckCircle, CloudSun, Thermometer, Wind, Droplets, Shield, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import PremiumCard from '../components/PremiumCard';
import AIInsightsPanel from '../components/AIInsightsPanel';

const weatherData = {
  Mumbai: { temp: 34, condition: 'Partly Cloudy', humidity: 78, wind: 22, icon: '⛅', alert: false },
  Delhi: { temp: 43, condition: 'Heatwave Warning', humidity: 32, wind: 15, icon: '☀️', alert: true },
  Bangalore: { temp: 28, condition: 'Mild & Pleasant', humidity: 65, wind: 18, icon: '🌤️', alert: false },
  Chennai: { temp: 38, condition: 'Heavy Rain Alert', humidity: 85, wind: 35, icon: '🌧️', alert: true },
  Hyderabad: { temp: 36, condition: 'Partly Cloudy', humidity: 55, wind: 20, icon: '⛅', alert: false },
  Kolkata: { temp: 32, condition: 'Thunderstorm Risk', humidity: 82, wind: 28, icon: '⛈️', alert: true },
  Pune: { temp: 30, condition: 'Clear Skies', humidity: 60, wind: 12, icon: '☀️', alert: false },
  Ahmedabad: { temp: 41, condition: 'Extreme Heat', humidity: 28, wind: 10, icon: '🔥', alert: true },
};

const coverageTypes = [
  { icon: '🌧️', label: 'Rain Disruption', covered: true, amount: 500 },
  { icon: '🔥', label: 'Heatwave', covered: true, amount: 350 },
  { icon: '🌊', label: 'Flood/Waterlog', covered: true, amount: 750 },
  { icon: '🚫', label: 'Curfew/Shutdown', covered: true, amount: 600 },
  { icon: '🚑', label: 'Accident Cover', covered: false, amount: 2000 },
  { icon: '🏥', label: 'Hospitalization', covered: false, amount: 5000 },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const [worker, setWorker] = useState(null);
  const [weather, setWeather] = useState(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('shieldgig_worker') || '{}');
    if (!data.name) { navigate('/'); return; }
    setWorker(data);
    setWeather(weatherData[data.city] || weatherData['Mumbai']);
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, [navigate]);

  if (!worker) return null;

  const claims = JSON.parse(localStorage.getItem('shieldgig_worker') || '{}').claims || [];
  const recentClaims = claims.slice(-3).reverse();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
  };

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh' }}>
      <Navbar />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>

        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'linear-gradient(135deg, rgba(249,115,22,0.12), rgba(139,92,246,0.08))',
            border: '1px solid rgba(249,115,22,0.2)',
            borderRadius: 20, padding: '24px 28px', marginBottom: 28,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: 16,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: '1.6rem' }}>👋</span>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                Welcome, <span className="gradient-text">{worker.name}</span>
              </h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 5 }}>
                <MapPin size={13} color="#f97316" /> {worker.city}
              </span>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 5 }}>
                <Briefcase size={13} color="#8b5cf6" /> {worker.platform}
              </span>
              <span className="badge badge-success" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <CheckCircle size={10} /> Coverage Active
              </span>
            </div>
          </div>

          {/* Live Clock */}
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f1f5f9', fontVariantNumeric: 'tabular-nums' }}>
              {time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
              {time.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}
            </div>
          </div>
        </motion.div>

        {/* Grid Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>

          {/* Premium Card */}
          <motion.div custom={0} variants={cardVariants} initial="hidden" animate="visible">
            <PremiumCard premium={worker.premium} riskScore={worker.riskScore} />
          </motion.div>

          {/* Weather Widget */}
          {weather && (
            <motion.div custom={1} variants={cardVariants} initial="hidden" animate="visible">
              <div className="glass-card" style={{
                padding: '24px',
                background: weather.alert
                  ? 'linear-gradient(135deg, rgba(244,63,94,0.08), rgba(249,115,22,0.05))'
                  : 'linear-gradient(135deg, rgba(56,189,248,0.08), rgba(16,185,129,0.05))',
                border: `1px solid ${weather.alert ? 'rgba(244,63,94,0.2)' : 'rgba(56,189,248,0.2)'}`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div>
                    <p style={{ color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                      Live Weather — {worker.city}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: '2.5rem' }}>{weather.icon}</span>
                      <span style={{ fontSize: '2.5rem', fontWeight: 900, color: weather.alert ? '#f43f5e' : '#38bdf8' }}>
                        {weather.temp}°C
                      </span>
                    </div>
                    <p style={{ color: weather.alert ? '#f43f5e' : '#94a3b8', fontWeight: weather.alert ? 700 : 400, fontSize: '0.875rem', marginTop: 4 }}>
                      {weather.condition}
                    </p>
                  </div>
                  {weather.alert && (
                    <span className="badge badge-danger">⚠ Alert</span>
                  )}
                </div>

                <div className="divider" />

                <div style={{ display: 'flex', gap: 16 }}>
                  {[
                    { icon: Droplets, label: 'Humidity', value: `${weather.humidity}%`, color: '#38bdf8' },
                    { icon: Wind, label: 'Wind', value: `${weather.wind} km/h`, color: '#8b5cf6' },
                  ].map(({ icon: Icon, label, value, color }) => (
                    <div key={label} style={{ flex: 1 }}>
                      <Icon size={13} color={color} />
                      <p style={{ fontSize: '0.7rem', color: '#64748b', margin: '3px 0 2px' }}>{label}</p>
                      <p style={{ fontWeight: 700, color, fontSize: '0.9rem' }}>{value}</p>
                    </div>
                  ))}
                  <div style={{ flex: 1 }}>
                    <TrendingUp size={13} color="#10b981" />
                    <p style={{ fontSize: '0.7rem', color: '#64748b', margin: '3px 0 2px' }}>Trigger Risk</p>
                    <p style={{ fontWeight: 700, color: weather.alert ? '#f43f5e' : '#10b981', fontSize: '0.9rem' }}>
                      {weather.alert ? 'High' : 'Low'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* AI Insights */}
          <motion.div custom={2} variants={cardVariants} initial="hidden" animate="visible" style={{ gridColumn: 'span 1' }}>
            <AIInsightsPanel riskScore={worker.riskScore} />
          </motion.div>

          {/* Coverage Cards */}
          <motion.div custom={3} variants={cardVariants} initial="hidden" animate="visible">
            <div className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <Shield size={16} color="#f97316" />
                <h3 style={{ fontWeight: 700, fontSize: '1rem' }}>Coverage Plan</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {coverageTypes.map(c => (
                  <div key={c.label} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '10px 12px', borderRadius: 10,
                    background: c.covered ? 'rgba(16,185,129,0.06)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${c.covered ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.05)'}`,
                    opacity: c.covered ? 1 : 0.5,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>{c.icon}</span>
                      <span style={{ fontSize: '0.82rem', color: c.covered ? '#f1f5f9' : '#64748b' }}>{c.label}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: c.covered ? '#10b981' : '#64748b' }}>
                        ₹{c.amount}
                      </span>
                      {c.covered
                        ? <CheckCircle size={13} color="#10b981" />
                        : <span style={{ fontSize: '0.65rem', color: '#64748b', border: '1px solid rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: 999 }}>Upgrade</span>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Claims */}
          <motion.div custom={4} variants={cardVariants} initial="hidden" animate="visible">
            <div className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Star size={16} color="#fbbf24" />
                  <h3 style={{ fontWeight: 700, fontSize: '1rem' }}>Recent Payouts</h3>
                </div>
              </div>
              {recentClaims.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px 0', color: '#64748b' }}>
                  <p style={{ fontSize: '2rem', marginBottom: 8 }}>💤</p>
                  <p style={{ fontSize: '0.85rem' }}>No claims yet.</p>
                  <p style={{ fontSize: '0.75rem', marginTop: 4 }}>Go to Claims to trigger a simulation.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {recentClaims.map((claim, i) => (
                    <div key={i} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '10px 12px', borderRadius: 10,
                      background: 'rgba(16,185,129,0.06)',
                      border: '1px solid rgba(16,185,129,0.12)',
                    }}>
                      <div>
                        <p style={{ fontSize: '0.83rem', fontWeight: 600 }}>{claim.trigger}</p>
                        <p style={{ fontSize: '0.72rem', color: '#64748b' }}>{claim.timestamp}</p>
                      </div>
                      <span style={{ fontWeight: 800, color: '#10b981', fontSize: '1rem' }}>
                        +₹{claim.amount}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
