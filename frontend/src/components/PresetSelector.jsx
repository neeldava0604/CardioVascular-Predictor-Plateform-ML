import React from 'react';
import { UserCheck, ShieldAlert, Sparkles, AlertTriangle } from 'lucide-react';

export const PRESETS = [
  {
    id: 'healthy',
    title: 'Healthy Young Adult',
    subtitle: '28 yrs • Normal BP • Active',
    icon: UserCheck,
    color: '#10b981',
    data: {
      age: 28,
      gender: 1, // Female
      height: 165,
      weight: 58,
      ap_hi: 115,
      ap_lo: 75,
      cholesterol: 1, // Normal
      gluc: 1, // Normal
      smoke: 0,
      alco: 0,
      active: 1
    }
  },
  {
    id: 'borderline',
    title: 'Borderline Risk Profile',
    subtitle: '50 yrs • Slightly Elevated BP',
    icon: Sparkles,
    color: '#f59e0b',
    data: {
      age: 50,
      gender: 2, // Male
      height: 172,
      weight: 78,
      ap_hi: 128,
      ap_lo: 82,
      cholesterol: 2, // Above Normal
      gluc: 1, // Normal
      smoke: 0,
      alco: 1,
      active: 1
    }
  },
  {
    id: 'hypertensive',
    title: 'Hypertensive Senior',
    subtitle: '62 yrs • High BP • Above Normal Chol',
    icon: AlertTriangle,
    color: '#f43f5e',
    data: {
      age: 62,
      gender: 2, // Male
      height: 168,
      weight: 88,
      ap_hi: 155,
      ap_lo: 95,
      cholesterol: 3, // Well Above Normal
      gluc: 2, // Above Normal
      smoke: 1,
      alco: 0,
      active: 0
    }
  }
];

export default function PresetSelector({ onSelectPreset }) {
  return (
    <div style={{ marginBottom: '1.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Quick Load Sample Patient Profiles:
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.875rem' }}>
        {PRESETS.map((preset) => {
          const Icon = preset.icon;
          return (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset.data)}
              className="glass-panel"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.875rem',
                padding: '0.875rem 1.125rem',
                border: '1px solid var(--border-color)',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.25 ease',
                background: 'rgba(17, 24, 39, 0.5)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = preset.color;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                background: `${preset.color}20`,
                border: `1px solid ${preset.color}40`,
                borderRadius: '12px',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Icon size={20} color={preset.color} />
              </div>
              <div>
                <div style={{ fontSize: '0.925rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {preset.title}
                </div>
                <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                  {preset.subtitle}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
