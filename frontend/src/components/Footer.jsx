import React from 'react';
import { Heart, ShieldCheck } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="glass-panel" style={{ padding: '2rem', marginTop: '3rem', borderTop: '1px solid var(--border-color)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>

        {/* Brand Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)', padding: '6px', borderRadius: '8px' }}>
              <Heart size={18} color="#ffffff" fill="#ffffff" />
            </div>
            <span className="gradient-text-rose" style={{ fontSize: '1.25rem', fontWeight: 800 }}>Cardio</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Next-generation cardiovascular health risk prediction engine. Combining clinical outlier preprocessing with Logistic Regression machine learning.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.875rem' }}>
            Navigation
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem' }}>
            <li><button onClick={() => onNavigate('home')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textAlign: 'left' }}>Overview Dashboard</button></li>
            <li><button onClick={() => onNavigate('predict')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textAlign: 'left' }}>Risk Predictor</button></li>
            <li><button onClick={() => onNavigate('analytics')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textAlign: 'left' }}>Analytics & EDA</button></li>
            <li><button onClick={() => onNavigate('model')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textAlign: 'left' }}>Model AI Architecture</button></li>
            <li><button onClick={() => onNavigate('faq')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textAlign: 'left' }}>Clinical FAQ & Guide</button></li>
          </ul>
        </div>

        {/* System Specs */}
        <div>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.875rem' }}>
            System Architecture
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <li>Backend: <strong>FastAPI (Uvicorn)</strong></li>
            <li>Frontend: <strong>React (Vite)</strong></li>
            <li>Model: <strong>Scikit-Learn LogisticRegression</strong></li>
            <li>Scaler: <strong>StandardScaler (.pkl)</strong></li>
            <li>Dataset: <strong>cardio_train.csv (70k records)</strong></li>
          </ul>
        </div>

      </div>

      <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', fontSize: '0.775rem', color: 'var(--text-dim)' }}>
        <div>
          Cardio Platform © 2026 • Trained on cardio_train dataset
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldCheck size={14} color="var(--accent-emerald)" />
          <span>Educational & Clinical Decision Support Demo</span>
        </div>
      </div>
    </footer>
  );
}
