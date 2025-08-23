# Medicare — Fullstack Clinic/Appointment Project

This repository contains a fullstack medical/clinic project with a Node.js/Express backend, two React frontend apps (public `frontend` and admin `dashboard`), and a Python-based ML component for disease prediction and health recommendations.

## Quick summary

- Backend: `backend/` — Node.js + Express + MongoDB
- Public frontend: `frontend/` — React + Vite
- Admin dashboard: `dashboard/` — React + Vite
- ML Component: `python/` — Flask API with disease prediction

## Quick summary

- Backend: `backend/` — Node.js + Express + MongoDB
- Public frontend: `frontend/` — React + Vite
- Admin dashboard: `dashboard/` — React + Vite

## Prerequisites

- Node.js (v16 or newer) and npm
- MongoDB (local or Atlas)
- Python 3.x with pip (for ML component)
- Required Python packages: Flask, numpy, pandas, scikit-learn

## Environment variables

Create a file `backend/config/config.env` (this repo already contains a `config` folder). Typical variables the server expects (replace values):

- PORT=5000
- MONGO_URI=your_mongo_connection_string
- JWT_SECRET=some_secret
- CLOUDINARY_NAME=...
- CLOUDINARY_API_KEY=...
- CLOUDINARY_API_SECRET=...
- SMTP_HOST=...
- SMTP_PORT=...
- SMTP_USER=...
- SMTP_PASS=...

Note: I inferred common variable names above from the repository structure. If your project uses different names, adjust accordingly.

## Install & run

Open a terminal (PowerShell) and do the following for each part.

Backend

```powershell
# from repo root
cd "backend";
npm install;
# development (with nodemon)
npm run dev
# or production
npm start
```

Public frontend

```powershell
cd "frontend";
npm install;
npm run dev
# build for production
npm run build
# preview build
npm run preview
```

Admin dashboard

```powershell
cd "dashboard";
npm install;
npm run dev
# build / preview
npm run build
npm run preview
```

## API & code overview

- Server entry: `backend/server.js` (or `app.js`) — sets up Express, routes, DB connection.
- Routers: `backend/router/` — appointmentRouter, checkupRouter, messageRouter, userRouter
- Controllers: `backend/controller/` — logic for routes
- Models (Mongoose): `backend/models/` — schemas for appointments, users, messages, checkups
- Utils: `backend/utils/` — email service, JWT helpers

If you want to inspect the available routes quickly, check the router files under `backend/router/` and corresponding controllers in `backend/controller/`.

## Detailed Features

### User Management

- User registration and authentication with JWT
- Role-based access (patients, doctors, admins)
- Profile management with image upload
- Password reset via email

### Appointment System

- Book appointments with specific doctors
- View available time slots
- Manage appointment status (confirm/cancel/reschedule)
- Email notifications for appointment updates

### Medical Records

- Store and manage patient medical history
- Track checkups and consultations
- Upload and store medical documents
- View past appointments and diagnoses

### Messaging System

- Direct messaging between patients and doctors
- Notification system for new messages
- Support for medical queries and follow-ups

### Admin Dashboard

- Manage doctors and staff accounts
- Monitor appointment statistics
- Handle user management
- View system analytics and reports

### Image Management

- Profile picture upload/update
- Medical document uploads
- Cloudinary integration for storage
- Image optimization and validation

### Email Features

- Appointment confirmations
- Reminder notifications
- Password reset links
- Important updates and announcements

## ML Component (`python/`)

The Python component provides disease prediction and health recommendations using machine learning:

### Datasets (`python/datasets/`)

- `Training.csv`, `Training.csv`: Disease prediction training data
- `Symptom-severity.csv`: Symptom severity rankings
- `medications.csv`: Medicine recommendations
- `diets.csv`: Diet recommendations
- `workout_df.csv`: Exercise recommendations
- `precautions_df.csv`: Health precautions
- `description.csv`: Disease descriptions

### Features

- Disease prediction based on symptoms
- Severity assessment of symptoms
- Personalized health recommendations:
  - Diet plans
  - Exercise routines
  - Medications
  - Precautions
- Integration with main application via Flask API

## Project structure (top-level)

```
backend/       # Node.js API server
├── config/   # Environment & configuration
├── controller/ # Route controllers
├── database/ # DB connection
├── models/   # Mongoose schemas
├── router/   # Express routes
└── utils/    # Helper utilities

dashboard/     # Admin React app (Vite)
├── public/   # Static assets
└── src/      # React components

frontend/      # Public React app (Vite)
├── public/   # Static assets
└── src/      # React components

python/        # ML Component
├── main.py   # Flask API server
├── svc2.pkl  # Trained model
└── datasets/ # Training & reference data
```

## Troubleshooting

- If the backend fails to connect, verify `MONGO_URI` and that MongoDB is reachable
- For email/Cloudinary failures, confirm the provider creds in `backend/config/config.env`
- If a port is already in use, change `PORT` in `config.env` or kill the conflicting process
- For ML component issues:
  - Ensure all Python dependencies are installed
  - Check if model file (`svc2.pkl`) exists
  - Verify dataset files are present in `python/datasets/`

## Contributing

Open an issue or submit a PR. Keep changes small and include tests or manual verification steps where applicable.

## License

This project does not include an explicit license file. Add a `LICENSE` file if you want to set reuse terms.

---

If you'd like, I can also:

- add a sample `backend/config/config.env.example` with the variables above,
- create quick start scripts (PowerShell) to start all three services at once,
- or expand the API documentation with route listing and example requests.
