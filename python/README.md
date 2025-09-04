# 🩺 Disease Prediction Web App

A **Flask-based web application** that predicts diseases based on user symptoms using a machine learning model (SVC).  
It also provides **detailed information** including precautions, medications, diets, workouts, and ECG measurement.

---

## **Features**

- Predict diseases based on symptoms input.
- Display **description**, **precautions**, **recommended medications**, **diet plan**, and **workouts** for the predicted disease.
- Measure **ECG data** from a serial device and calculate **heart rate**.
- REST API endpoints for easy integration with frontend apps.

---

## **Project Structure**

```

medicare-python-backend/
│
├── main.py                 # Flask application
├── requirements.txt        # Project dependencies
├── .gitignore
├── svc.pkl                 # Trained SVC model
├── datasets/               # CSV datasets
│   ├── symtoms\_df.csv
│   ├── precautions\_df.csv
│   ├── workout\_df.csv
│   ├── description.csv
│   ├── medications copy.csv
│   └── diets copy.csv
└── README.md

```

---

## **Installation**

1. Clone the repository:

```bash
git clone https://github.com/NareshP215/DiseasePredictionApp.git
cd DiseasePredictionApp
```

2. Create a virtual environment and activate it:

```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

---

## **Usage**

1. Run the Flask server:

```bash
python main.py
```

2. The API will be available at `http://localhost:5000`.

---

### **API Endpoints**

#### **Predict Disease**

- **URL:** `/predict-json`
- **Method:** POST
- **Payload:**

```json
{
  "symptoms": "headache, nausea, fatigue"
}
```

- **Response:**

```json
{
  "disease": "Migraine",
  "description": "Description of Migraine...",
  "precautions": ["Take rest", "Avoid bright light", ...],
  "medications": ["Med1", "Med2", ...],
  "diet": ["Diet1", "Diet2", ...],
  "workout": ["Workout1", "Workout2", ...]
}
```

#### **Measure ECG**

- **URL:** `/measure-ecg`
- **Method:** POST
- **Response:**

```json
{
  "samples_collected": 120,
  "average_ecg_value": 512,
  "estimated_bpm": 72,
  "status": "Normal",
  "all_values": [500, 510, 520, ...]
}
```

---

## **License**

This project is **for educational purposes** and can be freely used and modified.

---

## **Author**

Naresh Prajapati
[GitHub](https://github.com/NareshP215)
