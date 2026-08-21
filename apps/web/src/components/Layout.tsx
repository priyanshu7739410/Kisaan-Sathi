import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Calendar as CalendarIcon, Camera, MessageSquare, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuthStore } from '../store/authStore';

export const Layout = () => {
  const location = useLocation();
  const { logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/calendar', label: 'Calendar', icon: CalendarIcon },
    { path: '/diagnostic', label: 'Scan', icon: Camera },
    { path: '/chat', label: 'Ask AI', icon: MessageSquare },
  ];

  return (
    <div className="layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top Header */}
      <header className="glass" style={{
        position: 'sticky', top: 0, zIndex: 50, padding: 'var(--space-3)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <button className="mobile-menu-btn" style={{ display: 'none' }} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 style={{ color: 'var(--color-primary)', fontSize: '1.5rem', margin: 0 }}>Kisan Sathi</h1>
        </div>
        <button onClick={logout} className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.875rem' }}>
          Logout
        </button>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Desktop Sidebar */}
        <aside className="sidebar desktop-only" style={{
          width: '240px', borderRight: '1px solid var(--color-border)',
          padding: 'var(--space-4)', backgroundColor: 'var(--color-surface)',
          display: 'flex', flexDirection: 'column', gap: 'var(--space-2)'
        }}>
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} style={{
              display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
              padding: 'var(--space-3)', borderRadius: 'var(--border-radius)',
              backgroundColor: location.pathname === item.path ? 'var(--color-accent)' : 'transparent',
              color: location.pathname === item.path ? 'white' : 'var(--color-text-primary)',
              fontWeight: location.pathname === item.path ? 600 : 400,
              transition: 'all 0.2s'
            }}>
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-4)' }}>
          <div className="container">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <nav className="mobile-nav mobile-only glass" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        padding: 'var(--space-2)', borderTop: '1px solid var(--color-border)',
        paddingBottom: 'calc(var(--space-2) + env(safe-area-inset-bottom))'
      }}>
        {navItems.map((item) => (
          <Link key={item.path} to={item.path} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
            color: location.pathname === item.path ? 'var(--color-accent)' : 'var(--color-text-secondary)',
            fontSize: '0.75rem', padding: 'var(--space-2)'
          }}>
            <item.icon size={24} />
            {item.label}
          </Link>
        ))}
      </nav>
      
      {/* Mobile Responsive Styles inline for simplicity, ideally in index.css */}
      <style>{`
        .mobile-only { display: none !important; }
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: flex !important; }
          main { padding-bottom: 80px !important; }
        }
      `}</style>
    </div>
  );
};
