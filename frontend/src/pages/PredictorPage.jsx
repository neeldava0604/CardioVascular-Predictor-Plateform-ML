import React from 'react';
import PresetSelector from '../components/PresetSelector';
import PatientForm from '../components/PatientForm';
import PredictionCard from '../components/PredictionCard';

export default function PredictorPage({
  formData,
  setFormData,
  predictionResult,
  setPredictionResult,
  handleSubmit,
  isLoading,
  errorMsg
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Page Header */}
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
          Cardiovascular Risk Diagnostic Engine
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginTop: '4px' }}>
          Input patient parameters below to execute real-time ML Logistic Regression inference.
        </p>
      </div>

      {/* Preset Patient Profile Selector */}
      <PresetSelector onSelectPreset={(data) => {
        setFormData(data);
        setPredictionResult(null);
      }} />

      {/* Error Alert Pill if API error */}
      {errorMsg && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.15)',
          border: '1px solid #f43f5e',
          color: '#fca5a5',
          padding: '12px 16px',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.875rem',
          fontWeight: 600
        }}>
          ⚠️ {errorMsg}
        </div>
      )}

      {/* Main Grid: Form vs Results Card */}
      <div style={{ display: 'grid', gridTemplateColumns: predictionResult ? '1fr 1fr' : '1fr', gap: '1.75rem' }}>
        
        {/* Patient Input Form */}
        <PatientForm
          formData={formData}
          onChange={setFormData}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />

        {/* Prediction Results Display */}
        {predictionResult && (
          <PredictionCard
            result={predictionResult}
            onReset={() => setPredictionResult(null)}
          />
        )}

      </div>

    </div>
  );
}
