import pandas as pd
import numpy as np
import joblib
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

def train_and_save_model():
    data_path = Path('cardio_train.csv')
    if not data_path.exists():
        raise FileNotFoundError(f"Dataset {data_path} not found.")

    print(f"Loading dataset from {data_path}...")
    df = pd.read_csv(data_path, sep=';')
    print(f"Original Dataset Shape: {df.shape}")

    # Drop id column if present
    if 'id' in df.columns:
        df = df.drop('id', axis=1)

    # 1. Remove duplicate rows
    initial_len = len(df)
    df = df.drop_duplicates()
    print(f"Removed {initial_len - len(df)} duplicate rows. New shape: {df.shape}")

    # 2. Outlier Removal based on IQR (from Cardio_Preprocessing_Outliers_Updated.ipynb)
    outlier_cols = ['weight', 'height', 'ap_hi', 'ap_lo']
    for col in outlier_cols:
        Q1 = df[col].quantile(0.25)
        Q3 = df[col].quantile(0.75)
        IQR = Q3 - Q1
        lower = Q1 - 1.5 * IQR
        upper = Q3 + 1.5 * IQR
        before = len(df)
        df = df[(df[col] >= lower) & (df[col] <= upper)]
        print(f"Filter IQR on '{col}': Removed {before - len(df)} rows. Range [{lower:.1f}, {upper:.1f}]")

    # Additional sanity filtering for extreme blood pressure anomalies
    df = df[(df['ap_hi'] >= 70) & (df['ap_hi'] <= 240)]
    df = df[(df['ap_lo'] >= 40) & (df['ap_lo'] <= 160)]
    df = df[df['ap_hi'] > df['ap_lo']] # Systolic must be greater than Diastolic

    print(f"Final Cleaned Dataset Shape: {df.shape}")

    # Separate features and target
    feature_cols = ['age', 'gender', 'height', 'weight', 'ap_hi', 'ap_lo', 'cholesterol', 'gluc', 'smoke', 'alco', 'active']
    X = df[feature_cols]
    y = df['cardio']

    # 3. Train-Test Split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    # 4. Feature Scaling (StandardScaler)
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # 5. Model Training (Logistic Regression)
    print("Training Logistic Regression Model...")
    model = LogisticRegression(max_iter=1000, random_state=42, C=1.0)
    model.fit(X_train_scaled, y_train)

    # 6. Evaluation
    y_train_pred = model.predict(X_train_scaled)
    y_test_pred = model.predict(X_test_scaled)
    y_test_proba = model.predict_proba(X_test_scaled)[:, 1]

    train_acc = accuracy_score(y_train, y_train_pred)
    test_acc = accuracy_score(y_test, y_test_pred)
    conf_matrix = confusion_matrix(y_test, y_test_pred).tolist()
    class_report = classification_report(y_test, y_test_pred, output_dict=True)

    print(f"\n--- Model Performance Summary ---")
    print(f"Train Accuracy: {train_acc:.4f} ({train_acc*100:.2f}%)")
    print(f"Test Accuracy:  {test_acc:.4f} ({test_acc*100:.2f}%)")
    print("\nConfusion Matrix:")
    print(np.array(conf_matrix))

    # 7. Save Model & Scaler Artifacts (.pkl)
    Path('artifacts').mkdir(parents=True, exist_ok=True)
    
    # Root level pickles as requested by user
    joblib.dump(model, 'cardio_model.pkl')
    joblib.dump(scaler, 'cardio_scaler.pkl')

    # Also save into artifacts/ for backend reference
    joblib.dump(model, 'artifacts/cardio_model.pkl')
    joblib.dump(scaler, 'artifacts/cardio_scaler.pkl')

    pipeline_meta = {
        'model': model,
        'scaler': scaler,
        'feature_cols': feature_cols,
        'train_accuracy': float(train_acc),
        'test_accuracy': float(test_acc),
        'confusion_matrix': conf_matrix,
        'classification_report': class_report,
        'coefficients': dict(zip(feature_cols, model.coef_[0])),
        'intercept': float(model.intercept_[0])
    }
    joblib.dump(pipeline_meta, 'cardio_pipeline.pkl')
    joblib.dump(pipeline_meta, 'artifacts/cardio_pipeline.pkl')

    print("\nSaved pickle artifacts successfully:")
    print(" - cardio_model.pkl")
    print(" - cardio_scaler.pkl")
    print(" - cardio_pipeline.pkl")
    print(" - artifacts/cardio_pipeline.pkl")

if __name__ == '__main__':
    train_and_save_model()
