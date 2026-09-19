import React from 'react';
import { ArrowRight, ShieldCheck, Activity, Brain, Database, CheckCircle, Zap, Heart, Stethoscope, Sparkles } from 'lucide-react';
import PresetSelector from '../components/PresetSelector';

export default function HomePage({ onNavigatePredict, onSelectPreset }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      
      {/* Hero Section */}
      <section className="glass-panel" style={{ padding: '3rem 2.5rem', position: 'relative', overflow: 'hidden' }}>
        
        {/* Glow background circles */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(244, 63, 94, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '850px', display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative', zIndex: 1 }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(244, 63, 94, 0.12)', border: '1px solid rgba(244, 63, 94, 0.3)', padding: '6px 14px', borderRadius: '9999px', width: 'fit-content' }}>
            <Sparkles size={16} color="#f43f5e" />
            <span style={{ fontSize: '0.825rem', fontWeight: 700, color: '#fca5a5', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Advanced Clinical Predictive 
            </span>
          </div>

          <h1 style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em' }}>
            Next-Gen Cardiovascular <br />
            <span className="gradient-text-rose">Risk Intelligence Platform</span>
          </h1>

          <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Powered by Logistic Regression ML trained on 70,000+ patient records with full outlier handling, AHA blood pressure stratification, and real-time medical risk scoring.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={onNavigatePredict}
              style={{
                padding: '14px 28px',
                background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 25px rgba(244, 63, 94, 0.45)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.25s ease'
              }}
            >
              <Stethoscope size={20} />
              <span>Launch Risk Diagnostic Calculator</span>
              <ArrowRight size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              <ShieldCheck size={18} color="var(--accent-emerald)" />
              <span>HIPAA Compliant Standard Schema</span>
            </div>
          </div>

        </div>

      </section>

      {/* Stat Counter Cards Grid */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Model Test Accuracy</span>
            <Activity size={20} color="var(--accent-emerald)" />
          </div>
          <div className="gradient-text-rose" style={{ fontSize: '2.25rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
            71.84%
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Validated on 12,497 held-out test patients
          </div>
        </div>

        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Clean Dataset Records</span>
            <Database size={20} color="var(--accent-cyan)" />
          </div>
          <div className="gradient-text-cyan" style={{ fontSize: '2.25rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
            62,478
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            After IQR outlier & duplicate cleaning
          </div>
        </div>

        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Clinical Predictors</span>
            <Brain size={20} color="var(--accent-purple)" />
          </div>
          <div className="gradient-text-purple" style={{ fontSize: '2.25rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
            11 Features
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Age, BP, BMI, Cholesterol, Glucose, Habits
          </div>
        </div>

        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Inference Latency</span>
            <Zap size={20} color="var(--accent-amber)" />
          </div>
          <div className="gradient-text-gold" style={{ fontSize: '2.25rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
            &lt; 50ms
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Real-time FastAPI response speed
          </div>
        </div>

      </section>

      {/* Preset Patient Profiles Quick Launcher */}
      <section className="glass-panel" style={{ padding: '1.75rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          Test Drive Sample Patient Profiles
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          Click any preset profile below to auto-populate patient health parameters and run instant ML diagnosis.
        </p>
        <PresetSelector onSelectPreset={(data) => {
          onSelectPreset(data);
          onNavigatePredict();
        }} />
      </section>

      {/* Core Platform Capabilities Grid */}
      <section className="glass-panel" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.5rem', textAlign: 'center' }}>
          Platform Capabilities & Diagnostic Architecture
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ background: 'rgba(244, 63, 94, 0.15)', width: '42px', height: '42px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Heart size={22} color="#f43f5e" />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              Physiological Outlier Filtering
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Trims extreme noisy entries in blood pressure (ap_hi, ap_lo) and body metrics using 1.5 * IQR bounds to guarantee clean predictions.
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ background: 'rgba(6, 182, 212, 0.15)', width: '42px', height: '42px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Activity size={22} color="#06b6d4" />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              AHA Blood Pressure Stratification
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Categorizes Systolic and Diastolic blood pressure into American Heart Association clinical stages: Normal, Elevated, Stage 1, Stage 2.
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', width: '42px', height: '42px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <CheckCircle size={22} color="#10b981" />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              Actionable Recommendations
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Generates tailored medical advice based on identified high-risk factors including BMI, smoking, activity level, and cholesterol levels.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
