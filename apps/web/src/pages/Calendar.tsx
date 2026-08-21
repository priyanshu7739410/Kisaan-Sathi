
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, Droplet, Sprout, ShieldAlert } from 'lucide-react';

export const Calendar = () => {
  const events = [
    { date: 'Today', title: 'Apply Fertilizer', type: 'task', icon: Sprout, completed: false },
    { date: 'Yesterday', title: 'Irrigated Field', type: 'log', icon: Droplet, completed: true },
    { date: '3 days ago', title: 'Pesticide Application', type: 'log', icon: ShieldAlert, completed: true },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <header>
        <h2 style={{ fontSize: '2rem' }}>Smart Calendar</h2>
        <p style={{ color: 'var(--color-text-secondary)' }}>Track crop cycles and log activities.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
            <h3>Active Crop Cycle</h3>
            <span style={{ padding: '4px 12px', backgroundColor: '#E8F5E9', color: 'var(--color-success)', borderRadius: 'var(--border-radius-pill)', fontSize: '0.875rem', fontWeight: 600 }}>
              Vegetative Stage
            </span>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
            <div style={{ flex: 1, height: '8px', backgroundColor: 'var(--color-border)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '40%', height: '100%', backgroundColor: 'var(--color-success)' }} />
            </div>
            <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Day 45 / 120</span>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: 'var(--space-4)' }}>Activity Timeline</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {events.map((event, idx) => (
              <motion.div 
                key={idx}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                  padding: 'var(--space-3)',
                  backgroundColor: event.completed ? 'var(--color-background)' : '#FFF3E0',
                  borderRadius: 'var(--border-radius)',
                  border: event.completed ? '1px solid var(--color-border)' : '1px solid var(--color-warning)'
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  backgroundColor: event.completed ? 'white' : 'var(--color-warning)',
                  color: event.completed ? 'var(--color-primary)' : 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <event.icon size={20} />
                </div>
                
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0, fontWeight: event.completed ? 500 : 600 }}>{event.title}</h4>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{event.date}</p>
                </div>

                {!event.completed && (
                  <button className="btn" style={{ padding: '4px 12px', fontSize: '0.875rem' }}>Done</button>
                )}
              </motion.div>
            ))}
          </div>

          <button className="btn-secondary" style={{ marginTop: 'var(--space-4)', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <CalendarIcon size={18} />
            Log New Activity
          </button>
        </div>
      </div>
    </div>
  );
};
