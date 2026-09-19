import React from 'react';

export default function RiskGauge({ percentage, riskLevel, badgeType }) {
  // Color determination based on risk percentage
  let gaugeColor = '#10b981'; // Green
  if (percentage >= 75) gaugeColor = '#e11d48'; // Critical Red
  else if (percentage >= 50) gaugeColor = '#f43f5e'; // High Rose
  else if (percentage >= 30) gaugeColor = '#f59e0b'; // Moderate Amber

  const radius = 80;
  const strokeWidth = 14;
  const normalizedRadius = radius - strokeWidth * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', margin: '1rem 0' }}>
      
      <svg
        height={radius * 2}
        width={radius * 2}
        style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}
      >
        {/* Outer Glow Circle */}
        <circle
          stroke={gaugeColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset, opacity: 0.25, filter: `blur(8px)` }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Background Track Circle */}
        <circle
          stroke="rgba(255, 255, 255, 0.08)"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Active Progress Circle */}
        <circle
          stroke={gaugeColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{
            strokeDashoffset,
            transition: 'stroke-dashoffset 1s ease-in-out, stroke 0.5s ease',
            strokeLinecap: 'round'
          }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>

      {/* Center Text Display */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1, fontFamily: 'var(--font-mono)' }}>
          {percentage}%
        </div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: gaugeColor, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>
          {riskLevel}
        </div>
      </div>

    </div>
  );
}
