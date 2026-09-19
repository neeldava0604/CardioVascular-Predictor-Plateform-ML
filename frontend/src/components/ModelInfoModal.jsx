import React from 'react';
import { X, Cpu, Layers, Database, Activity, BarChart2 } from 'lucide-react';

export default function ModelInfoModal({ isOpen, onClose, modelInfo }) {
  if (!isOpen) return null;

  const coefficients = modelInfo?.coefficients || {};
  const testAcc = modelInfo?.test_accuracy ? (modelInfo.test_accuracy * 100).toFixed(2) : '71.84';
  const trainAcc = modelInfo?.train_accuracy ? (modelInfo.train_accuracy * 100).toFixed(2) : '72.45';

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1.5rem'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '680px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '1.75rem',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)'
      }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.875rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu className="gradient-text-rose" size={24} />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Machine Learning Pipeline Details
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Content Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Key Metrics Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Algorithm</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-rose)' }}>Logistic Regression</div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Test Accuracy</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>{testAcc}%</div>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Train Accuracy</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>{trainAcc}%</div>
            </div>
          </div>

          {/* Preprocessing Summary */}
          <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Database size={16} color="var(--accent-cyan)" /> Preprocessing & Outlier Pipeline
            </h3>
            <ul style={{ fontSize: '0.825rem', color: 'var(--text-muted)', paddingLeft: '1.25rem', lineHeight: '1.6' }}>
              <li><strong>Duplicate Removal:</strong> Purged exact duplicate patient rows from dataset.</li>
              <li><strong>IQR Outlier Trimming:</strong> Filtered extreme outliers in <code>weight</code>, <code>height</code>, <code>ap_hi</code>, and <code>ap_lo</code> based on 1.5 * IQR bounds.</li>
              <li><strong>Physiological Filtering:</strong> Enforced clinical boundaries (Systolic &gt; Diastolic, 70 &le; ap_hi &le; 240, 40 &le; ap_lo &le; 160).</li>
              <li><strong>Feature Scaling:</strong> Applied <code>StandardScaler</code> normalization to all continuous predictors.</li>
            </ul>
          </div>

          {/* Logistic Regression Coefficient Weights */}
          <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BarChart2 size={16} color="var(--accent-rose)" /> Feature Weights (Log Odds Coefficients)
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {Object.entries(coefficients).map(([feat, coef]) => {
                const isPos = coef > 0;
                const widthPct = Math.min(Math.abs(coef) * 80, 100);
                return (
                  <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem' }}>
                    <span style={{ width: '90px', fontWeight: 600, color: 'var(--text-muted)' }}>{feat}</span>
                    <div style={{ flex: 1, background: 'rgba(255, 255, 255, 0.05)', height: '8px', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                      <div style={{
                        width: `${widthPct}%`,
                        height: '100%',
                        background: isPos ? 'var(--accent-rose)' : 'var(--accent-cyan)',
                        borderRadius: '4px',
                        transition: 'width 0.5s ease'
                      }} />
                    </div>
                    <span style={{ width: '60px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700, color: isPos ? '#fca5a5' : '#7dd3fc' }}>
                      {coef > 0 ? `+${coef.toFixed(3)}` : coef.toFixed(3)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Close Button */}
        <div style={{ marginTop: '1.25rem', textAlign: 'right' }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 18px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
}
