import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, User, MapPin, Smartphone, ChevronRight, Zap } from 'lucide-react';

const PLATFORMS = ['Swiggy', 'Zomato', 'Blinkit', 'BigBasket', 'Dunzo', 'Other'];
const CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune', 'Ahmedabad'];

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', city: '', platform: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.city) e.city = 'City is required';
    if (!form.platform) e.platform = 'Platform is required';
    if (!form.phone || form.phone.length !== 10) e.phone = 'Valid 10-digit phone required';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);

    // Simulate AI scoring
    setTimeout(() => {
      const riskScore = Math.floor(Math.random() * 50) + 30;
      const premium = Math.floor(riskScore * 2.8 + Math.random() * 40);
      const workerData = { ...form, riskScore, premium, joinedDate: new Date().toLocaleDateString('en-IN'), totalSavings: 0, claims: [] };
      localStorage.setItem('shieldgig_worker', JSON.stringify(workerData));
      navigate('/dashboard');
    }, 1800);
  };

  const inputStyle = (field) => ({
    width: '100%', padding: '13px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: `1px solid ${errors[field] ? '#f43f5e' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: 12, color: '#f1f5f9', fontSize: '0.9rem',
    fontFamily: 'Inter, sans-serif', outline: 'none',
    transition: 'all 0.2s',
  });

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Background Orbs */}
      <div style={{
        position: 'absolute', top: '-10%', left: '-5%', width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', right: '-5%', width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 1 }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <motion.div
            className="animate-float"
            style={{
              width: 72, height: 72, borderRadius: 20,
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 0 40px rgba(249,115,22,0.4), 0 12px 32px rgba(0,0,0,0.3)',
            }}
          >
            <Shield size={36} color="white" strokeWidth={2} />
          </motion.div>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: 6, letterSpacing: '-0.03em' }}>
            <span style={{ color: '#f97316' }}>Shield</span>
            <span style={{ color: '#f1f5f9' }}>Gig</span>
            <span style={{
              fontSize: '0.7rem', fontWeight: 700, color: '#8b5cf6',
              background: 'rgba(139,92,246,0.15)', padding: '3px 8px',
              borderRadius: 999, marginLeft: 8, verticalAlign: 'middle',
              border: '1px solid rgba(139,92,246,0.3)',
            }}>AI</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Parametric insurance for India's gig workers
          </p>
        </div>

        {/* Card */}
        <div className="glass-card" style={{
          padding: '32px',
          background: 'rgba(22,27,39,0.8)',
          border: '1px solid rgba(255,255,255,0.09)',
          boxShadow: '0 32px 64px rgba(0,0,0,0.4)',
        }}>
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 4 }}>Get Protected Today</h2>
            <p style={{ color: '#64748b', fontSize: '0.82rem' }}>
              Register in seconds — no paperwork required
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Name */}
            <div>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                <User size={13} /> Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={form.name}
                onChange={e => { setForm(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: '' })); }}
                style={inputStyle('name')}
              />
              {errors.name && <p style={{ color: '#f43f5e', fontSize: '0.75rem', marginTop: 4 }}>{errors.name}</p>}
            </div>

            {/* City */}
            <div>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                <MapPin size={13} /> City
              </label>
              <select
                id="city"
                value={form.city}
                onChange={e => { setForm(p => ({ ...p, city: e.target.value })); setErrors(p => ({ ...p, city: '' })); }}
                style={{ ...inputStyle('city'), cursor: 'pointer' }}
              >
                <option value="" style={{ background: '#161b27' }}>Select your city</option>
                {CITIES.map(c => <option key={c} value={c} style={{ background: '#161b27' }}>{c}</option>)}
              </select>
              {errors.city && <p style={{ color: '#f43f5e', fontSize: '0.75rem', marginTop: 4 }}>{errors.city}</p>}
            </div>

            {/* Platform */}
            <div>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Zap size={13} /> Delivery Platform
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {PLATFORMS.map(p => (
                  <motion.button
                    key={p} type="button"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { setForm(prev => ({ ...prev, platform: p })); setErrors(prev => ({ ...prev, platform: '' })); }}
                    style={{
                      padding: '7px 14px', borderRadius: 8, fontSize: '0.8rem', fontWeight: 500,
                      background: form.platform === p ? 'rgba(249,115,22,0.15)' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${form.platform === p ? 'rgba(249,115,22,0.4)' : 'rgba(255,255,255,0.08)'}`,
                      color: form.platform === p ? '#f97316' : '#94a3b8',
                      cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                      transition: 'all 0.2s',
                    }}
                  >
                    {p}
                  </motion.button>
                ))}
              </div>
              {errors.platform && <p style={{ color: '#f43f5e', fontSize: '0.75rem', marginTop: 4 }}>{errors.platform}</p>}
            </div>

            {/* Phone */}
            <div>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Smartphone size={13} /> Phone Number
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                  color: '#64748b', fontSize: '0.9rem', fontWeight: 600,
                }}>+91</span>
                <input
                  id="phone"
                  type="tel"
                  placeholder="9876543210"
                  maxLength={10}
                  value={form.phone}
                  onChange={e => { setForm(p => ({ ...p, phone: e.target.value.replace(/\D/g, '') })); setErrors(p => ({ ...p, phone: '' })); }}
                  style={{ ...inputStyle('phone'), paddingLeft: 48 }}
                />
              </div>
              {errors.phone && <p style={{ color: '#f43f5e', fontSize: '0.75rem', marginTop: 4 }}>{errors.phone}</p>}
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              style={{
                width: '100%', padding: '14px', marginTop: 4,
                background: loading
                  ? 'rgba(249,115,22,0.5)'
                  : 'linear-gradient(135deg, #f97316, #ea580c)',
                border: 'none', borderRadius: 12, color: 'white',
                fontSize: '0.95rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                fontFamily: 'Inter, sans-serif',
                boxShadow: loading ? 'none' : '0 8px 24px rgba(249,115,22,0.35)',
                transition: 'all 0.3s ease',
              }}
            >
              {loading ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                    <Shield size={18} />
                  </motion.div>
                  AI Scoring Your Risk Profile...
                </>
              ) : (
                <>
                  Get Started — It's Free
                  <ChevronRight size={18} />
                </>
              )}
            </motion.button>
          </form>
        </div>

        {/* Trust badges */}
        <div style={{ textAlign: 'center', marginTop: 24, display: 'flex', justifyContent: 'center', gap: 20 }}>
          {['🔒 IRDAI Compliant', '⚡ Instant Payout', '🤖 AI-Powered'].map(t => (
            <span key={t} style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 500 }}>{t}</span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
