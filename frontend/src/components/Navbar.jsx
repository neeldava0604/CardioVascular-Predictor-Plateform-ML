import React from 'react';
import {
  Heart,
  Home,
  Stethoscope,
  BarChart3,
  Database,
  Cpu,
  HelpCircle,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  Sun,
  Moon,
  Menu,
  X
} from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  apiHealthy,
  modelInfo,
  theme,
  toggleTheme,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) {
  const tabs = [
    { id: 'home', label: 'Overview', icon: Home },
    { id: 'predict', label: 'Risk Predictor', icon: Stethoscope},
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'dataset', label: 'Dataset', icon: Database },
    { id: 'model', label: 'Model AI', icon: Cpu },
    { id: 'faq', label: 'Clinical Guide', icon: HelpCircle },
  ];

  return (
    <>
      {/* Mobile Top Header */}
      <header className="mobile-header">
        <div
          onClick={() => setActiveTab('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
            padding: '8px',
            borderRadius: '12px',
            boxShadow: '0 0 15px rgba(244, 63, 94, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Heart className="heartbeat-icon" size={20} color="#ffffff" fill="#ffffff" />
          </div>
          <div>
            <h1 className="gradient-text-rose" style={{ fontSize: '1.2rem', fontWeight: 800 }}>
              Cardio
            </h1>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={toggleTheme}
            style={{
              background: 'var(--input-bg)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              padding: '8px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#8b5cf6" />}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: 'var(--input-bg)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              padding: '8px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Vertical Sidebar */}
      <aside className={`sidebar-vertical ${isMobileMenuOpen ? 'mobile-open' : ''}`}>

        {/* Top Brand Section */}
        <div>
          <div
            onClick={() => {
              setActiveTab('home');
              if (setIsMobileMenuOpen) setIsMobileMenuOpen(false);
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer', marginBottom: '1.5rem', padding: '0.25rem' }}
          >
            <div style={{
              background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
              padding: '12px',
              borderRadius: '16px',
              boxShadow: '0 0 25px rgba(244, 63, 94, 0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Heart className="heartbeat-icon" size={26} color="#ffffff" fill="#ffffff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <h1 className="gradient-text-rose" style={{ fontSize: '1.45rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                  Cardio
                </h1>
              </div>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.75rem', fontWeight: 500, marginTop: '2px' }}>
                Cardiovascular Health Intelligence
              </p>
            </div>
          </div>

          <div style={{ height: '1px', background: 'var(--border-color)', margin: '1rem 0' }} />

          {/* Navigation Items */}
          <nav className="sidebar-nav">
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', paddingLeft: '8px', marginBottom: '4px' }}>
              Main Menu
            </span>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (setIsMobileMenuOpen) setIsMobileMenuOpen(false);
                  }}
                  className={`nav-tab-vertical ${isActive ? 'active' : ''}`}
                >
                  <Icon size={19} />
                  <span style={{ flex: 1 }}>{tab.label}</span>
                  {tab.badge && (
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      background: isActive ? 'rgba(255, 255, 255, 0.25)' : 'var(--accent-rose)',
                      color: '#ffffff',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                    }}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Theme Toggle & System Status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>

          {/* Theme Toggle Button */}
          <div>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', paddingLeft: '8px', display: 'block', marginBottom: '6px' }}>
              Appearance
            </span>
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {theme === 'dark' ? (
                  <Moon size={16} color="#c084fc" />
                ) : (
                  <Sun size={16} color="#f59e0b" />
                )}
                <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
              </div>
              <div className="theme-toggle-pill">
                {theme === 'dark' ? <Moon size={12} color="#c084fc" /> : <Sun size={12} color="#f59e0b" />}
                <span style={{ fontWeight: 700, textTransform: 'capitalize' }}>{theme}</span>
              </div>
            </button>
          </div>

          <div style={{ height: '1px', background: 'var(--border-color)' }} />

          {/* System Status Indicators */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', paddingLeft: '8px' }}>
              System Status
            </span>

            {/* API Health */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: apiHealthy ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)',
              border: `1px solid ${apiHealthy ? 'rgba(16, 185, 129, 0.25)' : 'rgba(244, 63, 94, 0.25)'}`,
              padding: '7px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.775rem',
              fontWeight: 600,
              color: apiHealthy ? '#10b981' : '#f43f5e'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {apiHealthy ? <ShieldCheck size={15} /> : <AlertCircle size={15} />}
                <span>FastAPI Engine</span>
              </div>
              <span className={`badge ${apiHealthy ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
                {apiHealthy ? 'Online' : 'Offline'}
              </span>
            </div>

            {/* Model Accuracy Pill */}
            {modelInfo?.test_accuracy && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.25)',
                padding: '7px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.775rem',
                fontWeight: 600,
                color: 'var(--accent-cyan)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={15} />
                  <span>Model Test Acc</span>
                </div>
                <span style={{ fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                  {(modelInfo.test_accuracy * 100).toFixed(1)}%
                </span>
              </div>
            )}
          </div>

        </div>

      </aside>
    </>
  );
}
