import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, BookOpen, ShieldAlert, Heart, Activity, Scale } from 'lucide-react';

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How does the Logistic Regression model predict Cardiovascular Disease risk?",
      answer: "The model analyzes 11 key clinical and lifestyle predictors (Age, Gender, Height, Weight, Systolic BP, Diastolic BP, Cholesterol, Glucose, Smoking, Alcohol, Physical Activity). Features are standardized using StandardScaler before computing log-odds probability through the trained Logistic Regression decision boundary."
    },
    {
      question: "Why is Age given in days in cardio_train.csv?",
      answer: "In medical datasets like cardio_train.csv, age is stored in exact days (e.g. 18,250 days = 50 years) to avoid rounding discrepancies. The CardioAI backend automatically converts inputs in Years to Days before feeding data to the model scaler."
    },
    {
      question: "What are the American Heart Association (AHA) Blood Pressure classifications?",
      answer: "Normal: <120 Systolic and <80 Diastolic mmHg. Elevated: 120-129 Systolic and <80 Diastolic. Stage 1 Hypertension: 130-139 Systolic or 80-89 Diastolic. Stage 2 Hypertension: >=140 Systolic or >=90 Diastolic."
    },
    {
      question: "How was the dataset preprocessed for outliers?",
      answer: "Using 1.5 * IQR (Interquartile Range) filtering on continuous columns. Extreme outliers in Weight (<39.5kg or >107.5kg), Height (<142.5cm or >186.5cm), Systolic BP (<90 or >170 mmHg), and Diastolic BP (<65 or >105 mmHg) were removed alongside duplicate rows."
    },
    {
      question: "Is this tool suitable for direct clinical diagnosis?",
      answer: "This application is designed as a Machine Learning clinical decision support demonstration. While it achieves ~72% predictive accuracy on 62,478 records, it should complement—not replace—professional evaluation by a licensed cardiologist."
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Page Header */}
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
          Clinical Guidance & Frequently Asked Questions
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginTop: '4px' }}>
          Medical reference standards, blood pressure guidelines, and AI model documentation.
        </p>
      </div>

      {/* AHA Blood Pressure Classification Reference Table */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={22} color="var(--accent-rose)" /> AHA Blood Pressure Categories
        </h2>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px' }}>Category</th>
                <th style={{ padding: '10px 12px' }}>Systolic (ap_hi)</th>
                <th style={{ padding: '10px 12px' }}>Diastolic (ap_lo)</th>
                <th style={{ padding: '10px 12px' }}>Action Recommendation</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px', fontWeight: 700, color: '#34d399' }}>Normal</td>
                <td style={{ padding: '12px', fontFamily: 'var(--font-mono)' }}>&lt; 120 mmHg</td>
                <td style={{ padding: '12px', fontFamily: 'var(--font-mono)' }}>&lt; 80 mmHg</td>
                <td style={{ padding: '12px', color: 'var(--text-muted)' }}>Maintain heart-healthy habits</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px', fontWeight: 700, color: '#fbbf24' }}>Elevated</td>
                <td style={{ padding: '12px', fontFamily: 'var(--font-mono)' }}>120 – 129 mmHg</td>
                <td style={{ padding: '12px', fontFamily: 'var(--font-mono)' }}>&lt; 80 mmHg</td>
                <td style={{ padding: '12px', color: 'var(--text-muted)' }}>Adopt dietary and lifestyle modifications</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px', fontWeight: 700, color: '#f97316' }}>Hypertension Stage 1</td>
                <td style={{ padding: '12px', fontFamily: 'var(--font-mono)' }}>130 – 139 mmHg</td>
                <td style={{ padding: '12px', fontFamily: 'var(--font-mono)' }}>80 – 89 mmHg</td>
                <td style={{ padding: '12px', color: 'var(--text-muted)' }}>Consult physician regarding BP management</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', fontWeight: 700, color: '#f87171' }}>Hypertension Stage 2</td>
                <td style={{ padding: '12px', fontFamily: 'var(--font-mono)' }}>&ge; 140 mmHg</td>
                <td style={{ padding: '12px', fontFamily: 'var(--font-mono)' }}>&ge; 90 mmHg</td>
                <td style={{ padding: '12px', color: 'var(--text-muted)' }}>Prompt medical evaluation & medication</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <HelpCircle size={22} color="var(--accent-cyan)" /> Frequently Asked Questions
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease'
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '1.125rem 1.25rem',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-main)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem'
                  }}
                >
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp size={20} color="var(--accent-rose)" /> : <ChevronDown size={20} color="var(--text-muted)" />}
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 1.25rem 1.125rem 1.25rem',
                    color: 'var(--text-muted)',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    borderTop: '1px solid var(--border-color)',
                    paddingTop: '0.875rem'
                  }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
