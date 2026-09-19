import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PredictorPage from './pages/PredictorPage';
import AnalyticsPage from './pages/AnalyticsPage';
import DatasetPage from './pages/DatasetPage';
import ModelPage from './pages/ModelPage';
import FaqPage from './pages/FaqPage';

const API_BASE_URL = 'http://127.0.0.1:8000';

const DEFAULT_FORM_DATA = {
  age: 52,
  gender: 2, // Male
  height: 172,
  weight: 80,
  ap_hi: 135,
  ap_lo: 88,
  cholesterol: 2, // Above Normal
  gluc: 1, // Normal
  smoke: 0,
  alco: 0,
  active: 1
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiHealthy, setApiHealthy] = useState(false);
  const [modelInfo, setModelInfo] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Light/Dark Theme state initialization
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('cardioai_theme') || 'dark';
  });

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sync theme attribute on document root & localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cardioai_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  // Check backend health on mount
  useEffect(() => {
    checkApiHealth();
  }, []);

  const checkApiHealth = async () => {
    try {
      const healthRes = await fetch(`${API_BASE_URL}/api/health`);
      if (healthRes.ok) {
        const healthData = await healthRes.json();
        setApiHealthy(healthData.status === 'healthy');
      }

      const infoRes = await fetch(`${API_BASE_URL}/api/info`);
      if (infoRes.ok) {
        const infoData = await infoRes.json();
        setModelInfo(infoData);
      }
    } catch (err) {
      console.warn("FastAPI backend connection check at http://127.0.0.1:8000", err);
      setApiHealthy(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Inference call failed');
      }

      const result = await response.json();
      setPredictionResult(result);
    } catch (err) {
      console.error("Prediction Error:", err);
      setErrorMsg(err.message || "Failed to communicate with FastAPI backend. Ensure backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-layout">

      {/* Vertical Left Sidebar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        apiHealthy={apiHealthy}
        modelInfo={modelInfo}
        theme={theme}
        toggleTheme={toggleTheme}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Content View on the Right */}
      <main className="main-content-area">
        {activeTab === 'home' && (
          <HomePage
            onNavigatePredict={() => setActiveTab('predict')}
            onSelectPreset={(presetData) => {
              setFormData(presetData);
              setPredictionResult(null);
            }}
          />
        )}

        {activeTab === 'predict' && (
          <PredictorPage
            formData={formData}
            setFormData={setFormData}
            predictionResult={predictionResult}
            setPredictionResult={setPredictionResult}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            errorMsg={errorMsg}
          />
        )}

        {activeTab === 'analytics' && <AnalyticsPage />}

        {activeTab === 'dataset' && <DatasetPage />}

        {activeTab === 'model' && <ModelPage modelInfo={modelInfo} />}

        {activeTab === 'faq' && <FaqPage />}

        {/* Footer */}
        <div style={{ marginTop: '3rem' }}>
          <Footer onNavigate={setActiveTab} />
        </div>
      </main>

    </div>
  );
}
