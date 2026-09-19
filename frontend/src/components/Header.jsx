import React from 'react';
import { Heart, Activity, Info, ShieldCheck, AlertCircle } from 'lucide-react';

export default function Header({ apiHealthy, modelInfo, onOpenModelInfo }) {
  return (
    <header className="glass-panel" style={{ padding: '1.25rem 1.75rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Brand Logo & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
            padding: '12px',
            borderRadius: '16px',
            boxShadow: '0 0 20px rgba(244, 63, 94, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Heart className="heartbeat-icon" size={28} color="#ffffff" fill="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 className="gradient-text-rose" style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                Cardio
              </h1>
              <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>Logistic Regression ML</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              Clinical Cardiovascular Health Risk Assessment & Diagnostic Insights
            </p>
          </div>
        </div>

        {/* Action Controls & Health Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          
          {/* API Health Pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: apiHealthy ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)',
            border: `1px solid ${apiHealthy ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)'}`,
            padding: '6px 12px',
            borderRadius: '9999px',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: apiHealthy ? '#34d399' : '#f87171'
          }}>
            {apiHealthy ? <ShieldCheck size={16} /> : <AlertCircle size={16} />}
            <span>FastAPI: {apiHealthy ? 'Connected (8000)' : 'Connecting...'}</span>
          </div>

          {/* Model Accuracy Badge */}
          {modelInfo?.test_accuracy && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(6, 182, 212, 0.1)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              padding: '6px 12px',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#38bdf8'
            }}>
              <Activity size={16} />
              <span>Model Acc: {(modelInfo.test_accuracy * 100).toFixed(1)}%</span>
            </div>
          )}

          {/* Model Info Modal Trigger */}
          <button
            onClick={onOpenModelInfo}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              padding: '8px 14px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <Info size={16} />
            <span>Model Details</span>
          </button>
        </div>

      </div>
    </header>
  );
}
