import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Model() {
  const [tab, setTab] = useState("symptom");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [symptoms, setSymptoms] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [allValues, setAllValues] = useState([]);
  const [estimatedBpm, setEstimatedBpm] = useState(null);
  const [avgEcgValue, setAvgEcgValue] = useState(null);
  const [samplesCollected, setSamplesCollected] = useState(0);
  const [status, setStatus] = useState("");
  const [ecgLoading, setEcgLoading] = useState(false);

  const handleCheckupAndPredict = async (e) => {
    e.preventDefault();

    if (!fullName || !gender || !age || !phone || !email || !symptoms) {
      toast.error("Please fill all fields.");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      toast.error("Enter a valid 10-digit phone number.");
      return;
    }
    if (!symptoms.trim()) {
      toast.error("Please enter at least one symptom.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      // First get AI prediction
      const res = await fetch(
        "https://diseasepredictionapp1.onrender.com/predict-json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ symptoms }),
        }
      );

      const aiData = await res.json();
      setResult(aiData);

      // Then send checkup form with AI prediction data
      await axios.post(
        "https://medicare-r4rk.onrender.com/api/v1/checkup/send",
        { fullName, gender, age, phone, email, symptoms, aiPrediction: aiData },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(
        "Form submitted successfully! Check your email for detailed results."
      );

      setFullName("");
      setGender("");
      setAge("");
      setPhone("");
      setEmail("");
      setSymptoms("");
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
      setError("Something went wrong while processing your request.");
    } finally {
      setLoading(false);
    }
  };

  const handleStartEcg = async () => {
    setEcgLoading(true);
    setAllValues([]);
    setEstimatedBpm(null);
    setAvgEcgValue(null);
    setSamplesCollected(0);
    setStatus("");

    try {
      const res = await fetch(
        "https://diseasepredictionapp1.onrender.com/measure-ecg",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();

      setAllValues(data.all_values || []);
      setEstimatedBpm(data.estimated_bpm || null);
      setAvgEcgValue(data.average_ecg_value || null);
      setSamplesCollected(data.samples_collected || 0);
      setStatus(data.status || "");
      console.error(data);
      toast.success("ECG data received!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch ECG data.");
      setStatus("ECG not connected");
    } finally {
      setEcgLoading(false);
    }
  };

  return (
    <div className="container form-component message-form">
      {/* ---------------- Tab Switch ---------------- */}
      <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
        <button
          onClick={() => setTab("symptom")}
          style={{
            cursor: "pointer",
            background: tab === "symptom" ? "#2CA58D" : "#ccc",
          }}
        >
          Symptom Check
        </button>
        <button
          onClick={() => setTab("ecg")}
          style={{
            cursor: "pointer",
            background: tab === "ecg" ? "#2CA58D" : "#ccc",
          }}
        >
          ECG Check
        </button>
      </div>

      {tab === "symptom" && (
        <>
          <div className="container form-component message-form">
            <h2>Symptom Check Up</h2>

            <form onSubmit={handleCheckupAndPredict}>
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <input
                  type="text"
                  placeholder="Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <textarea
                rows={3}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Enter symptoms separated by commas"
              />
              <div style={{ justifyContent: "center", alignItems: "center" }}>
                <button
                  // onClick={handlePredict}
                  type="submit"
                  style={{ cursor: "pointer", background: "#2CA58D" }}
                >
                  {loading ? "Checking..." : "CheckUp"}
                </button>
              </div>
            </form>

            {result && (
              <div className="result-container">
                <h2 className="result-title">Prediction Result</h2>

                <p className="result-item" style={{ color: "black" }}>
                  <strong>Disease:</strong> {result.disease}
                </p>

                <p className="result-item" style={{ color: "black" }}>
                  <strong>Description:</strong> {result.description}
                </p>

                <div className="result-section">
                  <strong>Precautions:</strong>
                  <ul>
                    {result.precautions?.map((p, i) => (
                      <li key={i}>● {p}</li>
                    ))}
                  </ul>
                </div>

                <div className="result-section">
                  <strong>Medications:</strong>
                  <ul>
                    {result.medications?.map((m, i) => (
                      <li key={i}>● {m}</li>
                    ))}
                  </ul>
                </div>

                <div className="result-section">
                  <strong>Diet:</strong>
                  <ul>
                    {result.diet?.map((d, i) => (
                      <li key={i}>● {d}</li>
                    ))}
                  </ul>
                </div>

                <div className="result-section">
                  <strong>Workout:</strong>
                  <ul>
                    {result.workout?.map((w, i) => (
                      <li key={i}>●{w}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {tab === "ecg" && (
        <>
          <h2>ECG Heart Check</h2>
          <div
            className="ecg"
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <button
              onClick={handleStartEcg}
              style={{
                cursor: "pointer",
                background: "#2CA58D",
                marginBottom: "20px",
              }}
            >
              {ecgLoading ? "Measuring..." : "Start ECG"}
            </button>
          </div>
          {(estimatedBpm || avgEcgValue || samplesCollected > 0) && (
            <div className="result-container">
              <p style={{ color: "black" }}>
                <strong>Estimated BPM:</strong> {estimatedBpm}
              </p>
              <p style={{ color: "black" }}>
                <strong>Average ECG Value:</strong> {avgEcgValue}
              </p>
              <p style={{ color: "black" }}>
                <strong>Samples Collected:</strong> {samplesCollected}
              </p>
              <p style={{ color: "black" }}>
                <strong>Status:</strong> {status}
              </p>
            </div>
          )}

          {allValues.length > 0 && (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={allValues.map((v, i) => ({ time: i, value: v }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#2CA58D" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </>
      )}
    </div>
  );
}
