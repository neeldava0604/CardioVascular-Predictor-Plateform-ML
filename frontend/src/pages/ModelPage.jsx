import React from 'react';
import { Cpu, BarChart2, CheckCircle2, ShieldCheck, Layers, ArrowUpRight, FileCode } from 'lucide-react';

export default function ModelPage({ modelInfo }) {
  const coefficients = modelInfo?.coefficients || {
    ap_hi: 0.884,
    age: 0.352,
    cholesterol: 0.334,
    weight: 0.178,
    gluc: -0.042,
    ap_lo: 0.086,
    active: -0.142,
    smoke: -0.078,
    gender: -0.015,
    height: -0.065,
    alco: -0.048
  };

  const testAcc = modelInfo?.test_accuracy ? (modelInfo.test_accuracy * 100).toFixed(2) : '71.84';
  const trainAcc = modelInfo?.train_accuracy ? (modelInfo.train_accuracy * 100).toFixed(2) : '72.45';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Page Header */}
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
          Machine Learning Model & Pipeline Architecture
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginTop: '4px' }}>
          Technical performance metrics, feature coefficient weights, and confusion matrix of the Logistic Regression classifier.
        </p>
      </div>

      {/* Model Spec Stat Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
        
        <div className="stat-card">
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Model Algorithm</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-rose)' }}>Logistic Regression</div>
          <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>L2 Penalty • L-BFGS Solver</div>
        </div>

        <div className="stat-card">
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Test Accuracy</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>{testAcc}%</div>
          <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>Evaluated on held-out test split</div>
        </div>

        <div className="stat-card">
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Train Accuracy</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>{trainAcc}%</div>
          <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>Consistent generalization</div>
        </div>

        <div className="stat-card">
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Artifact Files</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-purple)' }}>3 PKL Files</div>
          <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>Model, Scaler & Metadata</div>
        </div>

      </div>

      {/* Feature Coefficient Weights Chart */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BarChart2 size={22} color="var(--accent-rose)" /> Feature Log-Odds Coefficient Weights
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Positive coefficients indicate features that increase the log-odds of cardiovascular disease (e.g. Systolic Blood Pressure, Age, Cholesterol).
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {Object.entries(coefficients)
            .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
            .map(([feat, coef]) => {
              const isPos = coef > 0;
              const widthPct = Math.min(Math.abs(coef) * 90, 100);
              return (
                <div key={feat} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 90px', alignItems: 'center', gap: '1rem', fontSize: '0.875rem' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>{feat}</span>
                  <div style={{ background: 'rgba(255, 255, 255, 0.06)', height: '12px', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                    <div style={{
                      width: `${widthPct}%`,
                      height: '100%',
                      background: isPos ? 'linear-gradient(90deg, #fb7185, #f43f5e)' : 'linear-gradient(90deg, #38bdf8, #06b6d4)',
                      borderRadius: '6px',
                      transition: 'width 0.6s ease'
                    }} />
                  </div>
                  <span style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 800, color: isPos ? '#fca5a5' : '#7dd3fc' }}>
                    {coef > 0 ? `+${coef.toFixed(3)}` : coef.toFixed(3)}
                  </span>
                </div>
              );
            })}
        </div>
      </div>

      {/* Grid: Confusion Matrix & Classification Report */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.75rem' }}>
        
        {/* Confusion Matrix Table */}
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={20} color="var(--accent-cyan)" /> Confusion Matrix (Test Split)
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.875rem',
            textAlign: 'center'
          }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', color: '#6ee7b7', textTransform: 'uppercase', fontWeight: 700 }}>True Negatives (TN)</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)' }}>4,933</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Healthy Correctly Classified</div>
            </div>

            <div style={{ background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', color: '#fcd34d', textTransform: 'uppercase', fontWeight: 700 }}>False Positives (FP)</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fbbf24', fontFamily: 'var(--font-mono)' }}>1,391</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Type I Error</div>
            </div>

            <div style={{ background: 'rgba(244, 63, 94, 0.12)', border: '1px solid rgba(244, 63, 94, 0.3)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', color: '#fca5a5', textTransform: 'uppercase', fontWeight: 700 }}>False Negatives (FN)</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f87171', fontFamily: 'var(--font-mono)' }}>2,128</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Type II Error</div>
            </div>

            <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', color: '#6ee7b7', textTransform: 'uppercase', fontWeight: 700 }}>True Positives (TP)</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)' }}>4,044</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cardio Correctly Identified</div>
            </div>
          </div>
        </div>

        {/* Classification Report Metrics Table */}
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileCode size={20} color="var(--accent-purple)" /> Classification Metrics Table
          </h2>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '8px' }}>Class</th>
                <th style={{ padding: '8px' }}>Precision</th>
                <th style={{ padding: '8px' }}>Recall</th>
                <th style={{ padding: '8px' }}>F1-Score</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '10px 8px', fontWeight: 600, color: '#6ee7b7' }}>Class 0 (No Cardio)</td>
                <td style={{ padding: '10px 8px', fontFamily: 'var(--font-mono)' }}>0.70</td>
                <td style={{ padding: '10px 8px', fontFamily: 'var(--font-mono)' }}>0.78</td>
                <td style={{ padding: '10px 8px', fontFamily: 'var(--font-mono)' }}>0.74</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '10px 8px', fontWeight: 600, color: '#fca5a5' }}>Class 1 (Has Cardio)</td>
                <td style={{ padding: '10px 8px', fontFamily: 'var(--font-mono)' }}>0.74</td>
                <td style={{ padding: '10px 8px', fontFamily: 'var(--font-mono)' }}>0.66</td>
                <td style={{ padding: '10px 8px', fontFamily: 'var(--font-mono)' }}>0.70</td>
              </tr>
              <tr>
                <td style={{ padding: '10px 8px', fontWeight: 700, color: 'var(--text-main)' }}>Macro Avg</td>
                <td style={{ padding: '10px 8px', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>0.72</td>
                <td style={{ padding: '10px 8px', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>0.72</td>
                <td style={{ padding: '10px 8px', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>0.72</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
