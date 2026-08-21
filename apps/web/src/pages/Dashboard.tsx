
import { motion } from 'motion/react';
import { Sun, CloudRain, Wind, AlertTriangle, CheckCircle } from 'lucide-react';

export const Dashboard = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <header>
        <h2 style={{ fontSize: '2rem' }}>Farm Overview</h2>
        <p style={{ color: 'var(--color-text-secondary)' }}>Welcome back, Farmer.</p>
      </header>

      <motion.div 
        className="card"
        style={{ borderColor: 'var(--color-warning)', borderLeftWidth: '8px', position: 'relative', overflow: 'hidden' }}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
          <AlertTriangle color="var(--color-warning)" size={32} />
          <div>
            <h3 style={{ color: 'var(--color-warning)' }}>Heatwave Warning</h3>
            <p>Temperatures are expected to exceed 40°C in the next 48 hours.</p>
            
            <div style={{ marginTop: 'var(--space-3)', display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              <button className="btn" style={{ backgroundColor: 'var(--color-primary)' }}>
                Mulch and Irrigate (Recommended)
              </button>
              <button className="btn-secondary">
                Do nothing
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-4)' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Weather Context</h3>
            <Sun size={24} color="#F5A623" />
          </div>
          <h1 style={{ fontSize: '3rem', margin: 'var(--space-2) 0' }}>38°C</h1>
          <div style={{ display: 'flex', gap: 'var(--space-3)', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><CloudRain size={16} /> 0%</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Wind size={16} /> 12 km/h</span>
          </div>
        </div>

        <div className="card">
          <h3>Today's Task</h3>
          <div style={{ marginTop: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: '#E0DCD5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle size={24} color="var(--color-primary)" />
            </div>
            <div>
              <p style={{ fontWeight: 600 }}>Apply Fertilizer</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Crop Cycle: Cotton - Vegetative Stage</p>
            </div>
          </div>
          <button className="btn-secondary" style={{ marginTop: 'var(--space-3)', width: '100%' }}>Mark Complete</button>
        </div>
      </div>
    </div>
  );
};
