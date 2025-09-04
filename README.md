# 🏥 Medicare – Smart Healthcare Platform  

Medicare is a **full-stack healthcare management system** that enables patients to book appointments, access medical history, and get **AI-powered disease predictions** from symptoms.  
The platform provides separate dashboards for **patients** and **admins (doctors/staff)**, with a **machine learning component** for personalized health insights.  

---

## 🌍 Live Demo  

- **Frontend (User App):** [medicare-frontend-ten.vercel.app](https://medicare-frontend-ten.vercel.app/)  
- **Admin Dashboard:** [medicare-dashboard-amber.vercel.app](https://medicare-dashboard-amber.vercel.app/)  

---

## 📋 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [Screenshots](#-screenshots)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 🎯 Overview
Medicare simplifies healthcare by combining **appointment scheduling**, **patient records**, and **machine learning–based disease prediction** into one unified system.  

- 🧑 Patients can:
  - Book appointments  
  - Access medical history and reports  
  - Use the **symptom checker** for AI-based health insights  

- 👨‍⚕️ Admins (Doctors/Staff) can:
  - Manage appointments and patient records  
  - View medical history  
  - Monitor AI disease predictions  

---

## ✨ Features

### 👨‍⚕️ Admin Panel
- Manage doctors and patients  
- Monitor appointments and medical history  
- Access AI-based disease prediction reports  

### 🧑 User Dashboard
- Register/Login with JWT authentication  
- Book & manage appointments  
- View medical history and reports  
- Symptom-based **AI disease prediction** with:  
  - Description of illness  
  - Suggested medications  
  - Diet plans  
  - Workout routines  
  - Precautions  

### 🔬 Machine Learning Component
- Trained on **4,000+ patient records**  
- Predicts diseases based on symptoms  
- Severity-based risk assessment  
- Provides diet, workout, and medication recommendations  
- Integrated with a **Flask API**  
- ECG measurement module for **BPM (heart rate)**  

### 📧 Notifications & Messaging
- Appointment confirmations via email  
- Password reset functionality  
- Messaging system between patients and doctors  

---

## 🛠 Tech Stack

**Frontend**  
- React.js (Vite)  
- TailwindCSS / ShadCN for UI  

**Backend**  
- Node.js + Express.js  
- MongoDB with Mongoose  
- JWT Authentication  

**Machine Learning Service**  
- Python + Flask API  
- Scikit-Learn, Pandas, NumPy  

**Other Integrations**  
- Cloudinary (Image storage)  
- Nodemailer (Email service)  

---

## 📁 Project Structure

```bash
medicare/
├── backend/             # Node.js + Express.js API
│   ├── config/          # Environment & configuration
│   ├── controller/      # Route controllers
│   ├── database/        # DB connection
│   ├── models/          # MongoDB schemas
│   ├── router/          # Express routes
│   └── utils/           # Helper utilities
│
├── frontend/            # React.js public app
│   ├── public/          # Static assets
│   └── src/             # React components
│
├── dashboard/           # React.js admin app
│   ├── public/          
│   └── src/             
│
├── python/              # ML Component
│   ├── app.py           # Flask API for disease prediction
│   ├── svc.pkl          # Trained ML model
│   └── datasets/        # CSV datasets (symptoms, diets, workouts, etc.)
│
└── README.md
````

---

## ⚙️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/NareshP215/MediCare.git
cd MediCare
```

### 2️⃣ Setup Backend

```bash
cd backend
npm install
npm run dev   # for development
# or
npm start     # for production
```

### 3️⃣ Setup Frontend (User App)

```bash
cd frontend
npm install
npm run dev
```

### 4️⃣ Setup Admin Dashboard

```bash
cd dashboard
npm install
npm run dev
```

### 5️⃣ Setup ML Component

```bash
cd python
pip install -r requirements.txt
python app.py
```

---

## 🎯 Usage

* Visit the **Frontend (User App)** at: `http://localhost:5173`
* Visit the **Admin Dashboard** at: `http://localhost:5174` (or port shown in terminal)
* Backend runs on `http://localhost:5000`
* ML Flask API runs on `http://localhost:5001`

Or use the **live deployed apps**:

* 🌐 [Frontend (User App)](https://medicare-frontend-ten.vercel.app/)
* 🌐 [Admin Dashboard](https://medicare-dashboard-amber.vercel.app/)

---

## 📸 Screenshots


---

## 🔮 Future Improvements

* 🩺 Video consultation with doctors
* 💊 Prescription generator in admin panel
* 📱 Integration with wearable devices (smartwatches)
* 🌍 Multi-language support
* 📊 Advanced health analytics & reports

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch (`feature-xyz`)
3. Commit changes
4. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License** – free to use and modify.

---

## 👨‍💻 Author

Developed by **Naresh Prajapati**

* 🌐 [Portfolio](https://naresh-sigma.vercel.app/)
* 💻 [GitHub](https://github.com/NareshP215)
* 🔗 [LinkedIn](https://www.linkedin.com/in/nareshprajapati03/)
