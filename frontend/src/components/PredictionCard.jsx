import React from 'react';
import { ShieldAlert, ShieldCheck, AlertCircle, CheckCircle2, HeartPulse, ListChecks, RotateCcw, ArrowUpRight } from 'lucide-react';
import RiskGauge from './RiskGauge';

export default function PredictionCard({ result, onReset }) {
  if (!result) return null;

  const isHighRisk = result.has_cardio_disease;
  const riskPercent = result.risk_score_percent;
  const riskLevel = result.risk_level;
  const badgeType = result.risk_badge;

  return (
    <div className="glass-panel" style={{
      padding: '1.75rem',
      borderColor: isHighRisk ? 'var(--border-highlight)' : 'rgba(16, 185, 129, 0.3)',
      boxShadow: isHighRisk ? 'var(--shadow-glow)' : '0 0 25px rgba(16, 185, 129, 0.15)'
    }}>
      
      {/* Header Result Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {isHighRisk ? (
            <div style={{ background: 'rgba(244, 63, 94, 0.2)', padding: '10px', borderRadius: '12px', border: '1px solid #f43f5e' }}>
              <ShieldAlert size={26} color="#f43f5e" />
            </div>
          ) : (
            <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '10px', borderRadius: '12px', border: '1px solid #10b981' }}>
              <ShieldCheck size={26} color="#10b981" />
            </div>
          )}
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {isHighRisk ? 'Cardiovascular Disease Risk Detected' : 'Low Cardiovascular Disease Risk'}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              ML Logistic Regression Model Inference Output
            </p>
          </div>
        </div>

        <button
          onClick={onReset}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-muted)',
            padding: '6px 12px',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <RotateCcw size={14} /> Re-assess
        </button>
      </div>

      {/* Main Grid: Gauge + Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem', alignItems: 'center' }}>
        
        {/* Radial Risk Gauge */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.25)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px solid var(--border-color)'
        }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            Cardio Risk Score
          </span>

          <RiskGauge percentage={riskPercent} riskLevel={riskLevel} badgeType={badgeType} />

          <div style={{ marginTop: '0.5rem', textAlign: 'center' }}>
            <span className={`badge badge-${badgeType === 'danger' || badgeType === 'critical' ? 'danger' : badgeType}`}>
              {riskLevel} ({riskPercent}%)
            </span>
          </div>
        </div>

        {/* Derived Clinical Metrics Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <HeartPulse size={16} /> Clinical Parameters
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '2px' }}>Body Mass Index</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>{result.metrics?.bmi}</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>{result.metrics?.bmi_status}</div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '2px' }}>Blood Pressure</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>{result.metrics?.bp_stage}</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>AHA Classification</div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '2px' }}>Patient Age</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>{result.metrics?.age_years} yrs</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>{Math.round(result.metrics?.age_years * 365.25)} days</div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.875rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '2px' }}>ML Confidence</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                {(result.risk_probability * 100).toFixed(1)}%
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>Logistic Reg</div>
            </div>

          </div>
        </div>

      </div>

      {/* Identified Risk Factors Section */}
      <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.875rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertCircle size={18} color={isHighRisk ? '#f43f5e' : '#f59e0b'} />
          Identified Clinical Risk Factors ({result.risk_factors?.length || 0})
        </h3>

        {result.risk_factors && result.risk_factors.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.625rem' }}>
            {result.risk_factors.map((factor, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(244, 63, 94, 0.08)',
                border: '1px solid rgba(244, 63, 94, 0.2)',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                color: '#fca5a5'
              }}>
                <ArrowUpRight size={16} color="#f43f5e" />
                <span>{factor}</span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            padding: '10px 14px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.875rem',
            color: '#6ee7b7',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircle2 size={18} color="#10b981" />
            <span>No significant high-risk cardiovascular factors detected in this evaluation.</span>
          </div>
        )}
      </div>

      {/* Recommendations Section */}
      <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '0.875rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ListChecks size={18} />
          Actionable Clinical Recommendations
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {result.recommendations?.map((rec, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              background: 'rgba(255, 255, 255, 0.02)',
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              fontSize: '0.875rem',
              color: 'var(--text-main)'
            }}>
              <span style={{ color: 'var(--accent-emerald)', fontWeight: 800 }}>•</span>
              <span>{rec}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
