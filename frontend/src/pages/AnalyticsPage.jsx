import React, { useState } from 'react';
import {
  BarChart2,
  PieChart,
  TrendingUp,
  Filter,
  Users,
  HeartPulse,
  Activity,
  Layers,
  Zap,
  CheckCircle2,
  Info
} from 'lucide-react';

export default function AnalyticsPage() {
  const [selectedBmiIdx, setSelectedBmiIdx] = useState(null);

  // BMI spectrum dataset
  const bmiData = [
    { label: 'Underweight (<18.5)', riskPct: 18.2, count: '1,420 patients', color: '#10b981', status: 'Low Risk' },
    { label: 'Normal (18.5 - 24.9)', riskPct: 31.4, count: '24,180 patients', color: '#06b6d4', status: 'Optimal' },
    { label: 'Overweight (25 - 29.9)', riskPct: 51.6, count: '23,890 patients', color: '#f59e0b', status: 'Moderate Risk' },
    { label: 'Obese Class I (30 - 34.9)', riskPct: 67.8, count: '10,120 patients', color: '#f97316', status: 'High Risk' },
    { label: 'Obese Class II+ (≥35)', riskPct: 82.4, count: '2,868 patients', color: '#f43f5e', status: 'Critical Risk' },
  ];

  // BP Matrix Heatmap data
  const bpMatrix = [
    { sys: '≥ 140 (Stage 2)', dia80: '68%', dia89: '75%', dia99: '84%', dia100: '92%', status: 'Critical' },
    { sys: '130 - 139 (Stage 1)', dia80: '48%', dia89: '59%', dia99: '71%', dia100: '82%', status: 'High' },
    { sys: '120 - 129 (Elevated)', dia80: '32%', dia89: '44%', dia99: '58%', dia100: '72%', status: 'Moderate' },
    { sys: '< 120 (Normal)', dia80: '19%', dia89: '28%', dia99: '42%', dia100: '61%', status: 'Low' },
  ];

  // Lifestyle & Clinical Factors data
  const factorData = [
    { factor: 'Cholesterol Level', normal: '39.1%', elevated: '76.4%', gap: '+37.3%', color: '#f43f5e' },
    { factor: 'Blood Glucose Level', normal: '43.2%', elevated: '69.8%', gap: '+26.6%', color: '#f59e0b' },
    { factor: 'Physical Inactivity', normal: '41.5% (Active)', elevated: '61.8% (Sedentary)', gap: '+20.3%', color: '#06b6d4' },
    { factor: 'Tobacco Smoking', normal: '38.2% (No)', elevated: '64.7% (Smoker)', gap: '+26.5%', color: '#8b5cf6' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* Page Header */}
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(6, 182, 212, 0.12)', border: '1px solid rgba(6, 182, 212, 0.3)', padding: '4px 12px', borderRadius: '9999px', marginBottom: '8px' }}>
          <Activity size={14} color="#06b6d4" />
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Exploratory Data Analysis (EDA)
          </span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
          Dataset Analytics & Risk Correlation Graphs
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginTop: '4px' }}>
          Interactive statistical visualization computed across 62,478 cleaned clinical patient records.
        </p>
      </div>

      {/* Overview Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>

        <div className="stat-card">
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Original Dataset</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>70,000</div>
          <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>Raw initial patient logs</div>
        </div>

        <div className="stat-card">
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Filtered Outliers</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-rose)', fontFamily: 'var(--font-mono)' }}>7,522</div>
          <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>IQR weight, height & BP bounds</div>
        </div>

        <div className="stat-card">
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Clean Training Sample</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>62,478</div>
          <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>High fidelity clinical records</div>
        </div>

        <div className="stat-card">
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Target Ratio</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>49.2% / 50.8%</div>
          <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>Balanced Cardio vs Healthy</div>
        </div>

      </div>

      {/* GRAPH 1: BMI Distribution & Risk Spectrum Graph */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <BarChart2 size={22} color="var(--accent-rose)" /> Graph 1: Body Mass Index (BMI) & Cardio Risk Spectrum
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Observed cardiovascular disease probability across body mass index categories.
            </p>
          </div>
          <div className="badge badge-warning" style={{ fontSize: '0.75rem' }}>
            <Zap size={13} /> High Correlation Factor
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {bmiData.map((item, idx) => {
            const isHovered = selectedBmiIdx === idx;
            return (
              <div
                key={item.label}
                onMouseEnter={() => setSelectedBmiIdx(idx)}
                onMouseLeave={() => setSelectedBmiIdx(null)}
                style={{
                  background: isHovered ? 'var(--bg-card-hover)' : 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${isHovered ? item.color : 'var(--border-color)'}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem 1.25rem',
                  transition: 'all 0.25s ease',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>{item.label}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({item.count})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span className="badge" style={{ background: `${item.color}22`, color: item.color, border: `1px solid ${item.color}55`, fontSize: '0.7rem' }}>
                      {item.status}
                    </span>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: item.color, fontFamily: 'var(--font-mono)' }}>
                      {item.riskPct}% Risk
                    </span>
                  </div>
                </div>

                {/* Animated Visual Bar */}
                <div style={{ background: 'var(--input-bg)', height: '14px', borderRadius: '7px', overflow: 'hidden', position: 'relative' }}>
                  <div style={{
                    width: `${item.riskPct}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${item.color}bb 0%, ${item.color} 100%)`,
                    borderRadius: '7px',
                    transition: 'width 0.8s ease-in-out',
                    boxShadow: isHovered ? `0 0 15px ${item.color}66` : 'none'
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* GRAPH 2 & GRAPH 3 GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '1.75rem' }}>

        {/* GRAPH 2: BP Heatmap Matrix */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
              <HeartPulse size={22} color="var(--accent-cyan)" /> Graph 2: Blood Pressure Risk Heatmap Matrix
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Interaction matrix between Systolic (rows) and Diastolic (columns) blood pressure vs disease incidence.
            </p>

            {/* Matrix Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '6px', fontSize: '0.85rem' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px', color: 'var(--text-dim)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Systolic \ Diastolic</th>
                    <th style={{ textAlign: 'center', padding: '8px', color: 'var(--text-muted)' }}>&lt; 80</th>
                    <th style={{ textAlign: 'center', padding: '8px', color: 'var(--text-muted)' }}>80 - 89</th>
                    <th style={{ textAlign: 'center', padding: '8px', color: 'var(--text-muted)' }}>90 - 99</th>
                    <th style={{ textAlign: 'center', padding: '8px', color: 'var(--text-muted)' }}>≥ 100</th>
                  </tr>
                </thead>
                <tbody>
                  {bpMatrix.map((row) => (
                    <tr key={row.sys}>
                      <td style={{ fontWeight: 700, padding: '8px', color: 'var(--text-main)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{row.sys}</td>
                      <td style={{ textAlign: 'center', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', fontWeight: 700, borderRadius: '6px', padding: '10px', fontFamily: 'var(--font-mono)' }}>{row.dia80}</td>
                      <td style={{ textAlign: 'center', background: 'rgba(6, 182, 212, 0.15)', color: '#38bdf8', fontWeight: 700, borderRadius: '6px', padding: '10px', fontFamily: 'var(--font-mono)' }}>{row.dia89}</td>
                      <td style={{ textAlign: 'center', background: 'rgba(245, 158, 11, 0.18)', color: '#fbbf24', fontWeight: 700, borderRadius: '6px', padding: '10px', fontFamily: 'var(--font-mono)' }}>{row.dia99}</td>
                      <td style={{ textAlign: 'center', background: 'rgba(244, 63, 94, 0.22)', color: '#f87171', fontWeight: 800, borderRadius: '6px', padding: '10px', fontFamily: 'var(--font-mono)' }}>{row.dia100}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '1.25rem', fontSize: '0.775rem', color: 'var(--text-dim)', background: 'var(--input-bg)', padding: '8px 12px', borderRadius: 'var(--radius-sm)' }}>
            <Info size={14} color="var(--accent-cyan)" />
            <span>Patients with Systolic ≥140 and Diastolic ≥100 exhibit over 92% cardio risk.</span>
          </div>
        </div>

        {/* GRAPH 3: Multi-Factor Clinical & Lifestyle Comparison Graph */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
              <Layers size={22} color="var(--accent-amber)" /> Graph 3: Clinical & Lifestyle Risk Multiplier Comparison
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Comparative impact of single risk factor elevations on cardiovascular disease probability.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {factorData.map((f) => (
                <div key={f.factor} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-main)' }}>{f.factor}</span>
                    <span style={{ fontSize: '0.775rem', fontWeight: 800, color: f.color, fontFamily: 'var(--font-mono)', background: `${f.color}20`, padding: '2px 8px', borderRadius: '4px' }}>
                      Risk Shift: {f.gap}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.775rem' }}>
                    <div style={{ background: 'var(--input-bg)', padding: '6px 10px', borderRadius: '6px' }}>
                      <span style={{ color: 'var(--text-dim)', display: 'block' }}>Normal State:</span>
                      <strong style={{ color: '#34d399', fontFamily: 'var(--font-mono)' }}>{f.normal}</strong>
                    </div>
                    <div style={{ background: 'var(--input-bg)', padding: '6px 10px', borderRadius: '6px' }}>
                      <span style={{ color: 'var(--text-dim)', display: 'block' }}>Elevated / Active State:</span>
                      <strong style={{ color: f.color, fontFamily: 'var(--font-mono)' }}>{f.elevated}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '1.25rem', fontSize: '0.775rem', color: 'var(--text-dim)', background: 'var(--input-bg)', padding: '8px 12px', borderRadius: 'var(--radius-sm)' }}>
            <CheckCircle2 size={14} color="var(--accent-emerald)" />
            <span>Elevated Cholesterol presents the highest individual risk variance (+37.3%).</span>
          </div>
        </div>

      </div>

    </div>
  );
}
