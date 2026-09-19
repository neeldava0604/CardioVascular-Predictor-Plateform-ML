import os
import joblib
import numpy as np
import pandas as pd
from typing import Dict, Any, List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(
    title="Cardiovascular Disease Prediction API",
    description="FastAPI service for predicting Cardio Health Risk using Logistic Regression ML model",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL = None
SCALER = None
PIPELINE_META = None

def load_artifacts():
    global MODEL, SCALER, PIPELINE_META
    pipeline_path = "cardio_pipeline.pkl"
    model_path = "cardio_model.pkl"
    scaler_path = "cardio_scaler.pkl"

    if os.path.exists(pipeline_path):
        meta = joblib.load(pipeline_path)
        MODEL = meta.get('model')
        SCALER = meta.get('scaler')
        PIPELINE_META = meta
        print("Successfully loaded model and scaler from cardio_pipeline.pkl")
    elif os.path.exists(model_path) and os.path.exists(scaler_path):
        MODEL = joblib.load(model_path)
        SCALER = joblib.load(scaler_path)
        print("Successfully loaded model and scaler from individual .pkl files")
    else:
        raise FileNotFoundError("Model or Scaler pickle files not found. Run train_model.py first.")

@app.on_event("startup")
def startup_event():
    load_artifacts()

class CardioInput(BaseModel):
    age: float = Field(..., description="Age in years (e.g. 50) or days (e.g. 18250)")
    gender: int = Field(..., description="Gender (1: Female, 2: Male)")
    height: float = Field(..., description="Height in cm (e.g. 165)")
    weight: float = Field(..., description="Weight in kg (e.g. 70)")
    ap_hi: int = Field(..., description="Systolic Blood Pressure (e.g. 120)")
    ap_lo: int = Field(..., description="Diastolic Blood Pressure (e.g. 80)")
    cholesterol: int = Field(..., description="Cholesterol level (1: Normal, 2: Above Normal, 3: Well Above Normal)")
    gluc: int = Field(..., description="Glucose level (1: Normal, 2: Above Normal, 3: Well Above Normal)")
    smoke: int = Field(..., description="Smoking status (0: No, 1: Yes)")
    alco: int = Field(..., description="Alcohol consumption (0: No, 1: Yes)")
    active: int = Field(..., description="Physical activity (0: No, 1: Yes)")

    class Config:
        json_schema_extra = {
            "example": {
                "age": 55,
                "gender": 2,
                "height": 175,
                "weight": 82,
                "ap_hi": 135,
                "ap_lo": 85,
                "cholesterol": 2,
                "gluc": 1,
                "smoke": 0,
                "alco": 0,
                "active": 1
            }
        }

@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "Cardiovascular Disease Prediction API is running",
        "endpoints": {
            "predict": "/api/predict (POST)",
            "health": "/api/health (GET)",
            "info": "/api/info (GET)"
        }
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "model_loaded": MODEL is not None,
        "scaler_loaded": SCALER is not None,
        "test_accuracy": PIPELINE_META.get("test_accuracy") if PIPELINE_META else None
    }

@app.get("/api/info")
def get_model_info():
    if not PIPELINE_META:
        return {"status": "Loaded simple model without full metadata"}
    return {
        "model_type": "Logistic Regression",
        "feature_cols": PIPELINE_META.get("feature_cols"),
        "train_accuracy": PIPELINE_META.get("train_accuracy"),
        "test_accuracy": PIPELINE_META.get("test_accuracy"),
        "confusion_matrix": PIPELINE_META.get("confusion_matrix"),
        "coefficients": PIPELINE_META.get("coefficients"),
        "classification_report": PIPELINE_META.get("classification_report")
    }

def compute_medical_metrics(data: CardioInput):
    if data.age < 120:
        age_years = float(data.age)
        age_days = age_years * 365.25
    else:
        age_days = float(data.age)
        age_years = age_days / 365.25

    height_m = data.height / 100.0
    bmi = round(data.weight / (height_m ** 2), 1) if height_m > 0 else 0.0

    if bmi < 18.5:
        bmi_status = "Underweight"
    elif bmi < 25.0:
        bmi_status = "Normal Weight"
    elif bmi < 30.0:
        bmi_status = "Overweight"
    else:
        bmi_status = "Obese"

    if data.ap_hi < 120 and data.ap_lo < 80:
        bp_stage = "Normal"
    elif 120 <= data.ap_hi <= 129 and data.ap_lo < 80:
        bp_stage = "Elevated"
    elif (130 <= data.ap_hi <= 139) or (80 <= data.ap_lo <= 89):
        bp_stage = "Hypertension Stage 1"
    elif (data.ap_hi >= 140) or (data.ap_lo >= 90):
        bp_stage = "Hypertension Stage 2"
    else:
        bp_stage = "Borderline"

    risk_factors = []
    if data.ap_hi >= 130 or data.ap_lo >= 85:
        risk_factors.append(f"Elevated Blood Pressure ({data.ap_hi}/{data.ap_lo} mmHg)")
    if data.cholesterol > 1:
        chol_desc = "Above Normal" if data.cholesterol == 2 else "Well Above Normal"
        risk_factors.append(f"Elevated Cholesterol ({chol_desc})")
    if data.gluc > 1:
        gluc_desc = "Above Normal" if data.gluc == 2 else "Well Above Normal"
        risk_factors.append(f"Elevated Glucose ({gluc_desc})")
    if bmi >= 25.0:
        risk_factors.append(f"High Body Mass Index (BMI: {bmi} - {bmi_status})")
    if data.smoke == 1:
        risk_factors.append("Active Tobacco Smoking")
    if data.alco == 1:
        risk_factors.append("Regular Alcohol Consumption")
    if data.active == 0:
        risk_factors.append("Physical Inactivity / Sedentary Lifestyle")
    if age_years >= 55:
        risk_factors.append(f"Age Risk Factor ({round(age_years)} years)")

    recommendations = []
    if data.ap_hi >= 130 or data.ap_lo >= 85:
        recommendations.append("Monitor blood pressure regularly and consult a cardiologist regarding BP management.")
    if data.cholesterol > 1 or data.gluc > 1:
        recommendations.append("Adopt a heart-healthy diet (low in saturated fats and refined sugars) and schedule lipid/glucose lab tests.")
    if bmi >= 25.0:
        recommendations.append("Aim for gradual weight reduction through caloric deficit and structured exercise.")
    if data.smoke == 1:
        recommendations.append("Engage in a smoking cessation program to drastically improve cardiovascular prognosis.")
    if data.active == 0:
        recommendations.append("Incorporate at least 150 minutes of moderate aerobic exercise per week.")
    if not recommendations:
        recommendations.append("Maintain current healthy lifestyle, balanced nutrition, and annual health checkups.")

    return {
        "age_years": round(age_years, 1),
        "age_days": round(age_days),
        "bmi": bmi,
        "bmi_status": bmi_status,
        "bp_stage": bp_stage,
        "risk_factors": risk_factors,
        "recommendations": recommendations
    }

@app.post("/api/predict")
def predict(data: CardioInput):
    if MODEL is None or SCALER is None:
        raise HTTPException(status_code=500, detail="Model artifact is not loaded on backend.")

    try:
        age_days = data.age * 365.25 if data.age < 120 else data.age

        input_features = [
            age_days,
            data.gender,
            data.height,
            data.weight,
            data.ap_hi,
            data.ap_lo,
            data.cholesterol,
            data.gluc,
            data.smoke,
            data.alco,
            data.active
        ]

        feature_cols = PIPELINE_META.get('feature_cols', [
            'age', 'gender', 'height', 'weight', 'ap_hi', 'ap_lo', 'cholesterol', 'gluc', 'smoke', 'alco', 'active'
        ]) if PIPELINE_META else [
            'age', 'gender', 'height', 'weight', 'ap_hi', 'ap_lo', 'cholesterol', 'gluc', 'smoke', 'alco', 'active'
        ]
        input_df = pd.DataFrame([input_features], columns=feature_cols)
        input_scaled = SCALER.transform(input_df)

        prediction = int(MODEL.predict(input_scaled)[0])
        probabilities = MODEL.predict_proba(input_scaled)[0]
        risk_probability = float(probabilities[1]) 
        risk_percent = round(risk_probability * 100, 1)

        if risk_percent < 30.0:
            risk_level = "Low Risk"
            risk_badge = "success"
        elif risk_percent < 60.0:
            risk_level = "Moderate Risk"
            risk_badge = "warning"
        elif risk_percent < 80.0:
            risk_level = "High Risk"
            risk_badge = "danger"
        else:
            risk_level = "Critical Risk"
            risk_badge = "critical"

        medical_insights = compute_medical_metrics(data)

        return {
            "status": "success",
            "prediction": prediction, 
            "has_cardio_disease": bool(prediction == 1),
            "risk_score_percent": risk_percent,
            "risk_probability": round(risk_probability, 4),
            "risk_level": risk_level,
            "risk_badge": risk_badge,
            "metrics": {
                "age_years": medical_insights["age_years"],
                "bmi": medical_insights["bmi"],
                "bmi_status": medical_insights["bmi_status"],
                "bp_stage": medical_insights["bp_stage"]
            },
            "risk_factors": medical_insights["risk_factors"],
            "recommendations": medical_insights["recommendations"]
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Inference error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
