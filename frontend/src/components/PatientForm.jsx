import React from 'react';
import { User, Activity, Heart, Droplet, Flame, Stethoscope, Scale, ArrowRight } from 'lucide-react';

export default function PatientForm({ formData, onChange, onSubmit, isLoading }) {

  // Live BMI calculation
  const heightM = formData.height / 100;
  const bmi = heightM > 0 ? (formData.weight / (heightM * heightM)).toFixed(1) : 0;
  
  let bmiCategory = 'Normal';
  let bmiColor = '#10b981';
  if (bmi < 18.5) { bmiCategory = 'Underweight'; bmiColor = '#38bdf8'; }
  else if (bmi < 25.0) { bmiCategory = 'Normal'; bmiColor = '#10b981'; }
  else if (bmi < 30.0) { bmiCategory = 'Overweight'; bmiColor = '#f59e0b'; }
  else { bmiCategory = 'Obese'; bmiColor = '#f43f5e'; }

  // Live BP Category calculation
  let bpCategory = 'Normal';
  let bpColor = '#10b981';
  if (formData.ap_hi < 120 && formData.ap_lo < 80) {
    bpCategory = 'Normal'; bpColor = '#10b981';
  } else if (formData.ap_hi <= 129 && formData.ap_lo < 80) {
    bpCategory = 'Elevated'; bpColor = '#f59e0b';
  } else if (formData.ap_hi <= 139 || formData.ap_lo <= 89) {
    bpCategory = 'Stage 1 Hypertension'; bpColor = '#f97316';
  } else {
    bpCategory = 'Stage 2 Hypertension'; bpColor = '#f43f5e';
  }

  const handleSlider = (field, val) => {
    onChange({ ...formData, [field]: Number(val) });
  };

  const handleToggle = (field, val) => {
    onChange({ ...formData, [field]: val });
  };

  return (
    <form onSubmit={onSubmit} className="glass-panel" style={{ padding: '1.75rem' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Stethoscope className="gradient-text-rose" size={24} />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Patient Clinical Metrics
          </h2>
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Step 1 of 2 • Input Features</span>
      </div>

      {/* Grid Layout for Input Sections */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        
        {/* Section 1: Demographics & Biometrics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <User size={16} /> Demographics & Physical
          </h3>

          {/* Age Input */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>Age (Years)</label>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>{formData.age} yrs</span>
            </div>
            <input
              type="range"
              min="18"
              max="95"
              value={formData.age}
              onChange={(e) => handleSlider('age', e.target.value)}
            />
          </div>

          {/* Gender Selector */}
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
              Biological Gender
            </label>
            <div className="btn-toggle-group">
              <button
                type="button"
                className={`btn-toggle-option ${formData.gender === 1 ? 'active' : ''}`}
                onClick={() => handleToggle('gender', 1)}
              >
                Female (1)
              </button>
              <button
                type="button"
                className={`btn-toggle-option ${formData.gender === 2 ? 'active' : ''}`}
                onClick={() => handleToggle('gender', 2)}
              >
                Male (2)
              </button>
            </div>
          </div>

          {/* Height & Weight Sliders */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>Height (cm)</label>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>{formData.height} cm</span>
            </div>
            <input
              type="range"
              min="130"
              max="210"
              value={formData.height}
              onChange={(e) => handleSlider('height', e.target.value)}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>Weight (kg)</label>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>{formData.weight} kg</span>
            </div>
            <input
              type="range"
              min="35"
              max="160"
              value={formData.weight}
              onChange={(e) => handleSlider('weight', e.target.value)}
            />
          </div>

          {/* Live BMI Preview Card */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.25)',
            border: `1px solid ${bmiColor}40`,
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Scale size={18} color={bmiColor} />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Calculated BMI</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', marginRight: '6px' }}>{bmi}</span>
              <span className="badge" style={{ background: `${bmiColor}20`, color: bmiColor, border: `1px solid ${bmiColor}40` }}>
                {bmiCategory}
              </span>
            </div>
          </div>

        </div>

        {/* Section 2: Blood Pressure & Lab Biomarkers */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-rose)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Activity size={16} /> Blood Pressure & Labs
          </h3>

          {/* Systolic BP */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>Systolic BP (ap_hi mmHg)</label>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>{formData.ap_hi} mmHg</span>
            </div>
            <input
              type="range"
              min="80"
              max="210"
              value={formData.ap_hi}
              onChange={(e) => handleSlider('ap_hi', e.target.value)}
            />
          </div>

          {/* Diastolic BP */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)' }}>Diastolic BP (ap_lo mmHg)</label>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>{formData.ap_lo} mmHg</span>
            </div>
            <input
              type="range"
              min="50"
              max="140"
              value={formData.ap_lo}
              onChange={(e) => handleSlider('ap_lo', e.target.value)}
            />
          </div>

          {/* Live BP Classification Pill */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.25)',
            border: `1px solid ${bpColor}40`,
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Heart size={18} color={bpColor} />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>BP Stage</span>
            </div>
            <span className="badge" style={{ background: `${bpColor}20`, color: bpColor, border: `1px solid ${bpColor}40` }}>
              {bpCategory}
            </span>
          </div>

          {/* Cholesterol Level */}
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
              Cholesterol Level
            </label>
            <div className="btn-toggle-group">
              <button
                type="button"
                className={`btn-toggle-option ${formData.cholesterol === 1 ? 'active-emerald' : ''}`}
                onClick={() => handleToggle('cholesterol', 1)}
              >
                1: Normal
              </button>
              <button
                type="button"
                className={`btn-toggle-option ${formData.cholesterol === 2 ? 'active' : ''}`}
                onClick={() => handleToggle('cholesterol', 2)}
              >
                2: Above
              </button>
              <button
                type="button"
                className={`btn-toggle-option ${formData.cholesterol === 3 ? 'active' : ''}`}
                onClick={() => handleToggle('cholesterol', 3)}
              >
                3: High
              </button>
            </div>
          </div>

          {/* Glucose Level */}
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
              Glucose Level
            </label>
            <div className="btn-toggle-group">
              <button
                type="button"
                className={`btn-toggle-option ${formData.gluc === 1 ? 'active-emerald' : ''}`}
                onClick={() => handleToggle('gluc', 1)}
              >
                1: Normal
              </button>
              <button
                type="button"
                className={`btn-toggle-option ${formData.gluc === 2 ? 'active' : ''}`}
                onClick={() => handleToggle('gluc', 2)}
              >
                2: Above
              </button>
              <button
                type="button"
                className={`btn-toggle-option ${formData.gluc === 3 ? 'active' : ''}`}
                onClick={() => handleToggle('gluc', 3)}
              >
                3: High
              </button>
            </div>
          </div>

        </div>

        {/* Section 3: Lifestyle & Behavioral Risk */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-amber)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Flame size={16} /> Lifestyle Factors
          </h3>

          {/* Smoking Toggle */}
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
              Tobacco Smoker
            </label>
            <div className="btn-toggle-group">
              <button
                type="button"
                className={`btn-toggle-option ${formData.smoke === 0 ? 'active-emerald' : ''}`}
                onClick={() => handleToggle('smoke', 0)}
              >
                No (0)
              </button>
              <button
                type="button"
                className={`btn-toggle-option ${formData.smoke === 1 ? 'active' : ''}`}
                onClick={() => handleToggle('smoke', 1)}
              >
                Yes (1)
              </button>
            </div>
          </div>

          {/* Alcohol Toggle */}
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
              Alcohol Consumption
            </label>
            <div className="btn-toggle-group">
              <button
                type="button"
                className={`btn-toggle-option ${formData.alco === 0 ? 'active-emerald' : ''}`}
                onClick={() => handleToggle('alco', 0)}
              >
                No (0)
              </button>
              <button
                type="button"
                className={`btn-toggle-option ${formData.alco === 1 ? 'active' : ''}`}
                onClick={() => handleToggle('alco', 1)}
              >
                Yes (1)
              </button>
            </div>
          </div>

          {/* Physical Activity Toggle */}
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
              Physically Active
            </label>
            <div className="btn-toggle-group">
              <button
                type="button"
                className={`btn-toggle-option ${formData.active === 1 ? 'active-emerald' : ''}`}
                onClick={() => handleToggle('active', 1)}
              >
                Active (1)
              </button>
              <button
                type="button"
                className={`btn-toggle-option ${formData.active === 0 ? 'active' : ''}`}
                onClick={() => handleToggle('active', 0)}
              >
                Sedentary (0)
              </button>
            </div>
          </div>

          {/* Run Diagnostic Button */}
          <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '14px',
                background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem',
                fontWeight: 800,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 20px rgba(244, 63, 94, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              {isLoading ? (
                <span>Running ML Inference...</span>
              ) : (
                <>
                  <span>Calculate Risk Score</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </form>
  );
}
