# 🛡️ ShieldGig AI

### AI-Powered Parametric Insurance for Gig Workers

---

## 📌 Problem Statement

India’s gig delivery workers (Swiggy, Zomato, etc.) rely on daily earnings. However, external disruptions such as:

* Heavy rain 🌧
* Extreme heat 🔥
* Floods 🌊
* Curfews 🚫
* Platform outages

can significantly reduce their working hours, leading to **20–30% income loss**.

Currently, there is **no insurance system that protects their income** from such uncontrollable events.

---

## 💡 Our Solution

**ShieldGig AI** is an AI-powered parametric insurance platform that automatically protects gig workers against income loss.

Instead of manual claims, our system:

* Detects disruptions in real-time
* Verifies worker inactivity
* Automatically triggers claims
* Instantly processes payouts

This ensures **zero paperwork and instant financial support**.

---

## 🎯 Target Persona

* Food delivery workers (Swiggy / Zomato)
* Age: 20–35
* Daily income: ₹700–₹1200

### Example

Ramesh, a Swiggy delivery partner, cannot work during heavy rainfall.
ShieldGig AI automatically compensates his lost earnings.

---

## ⚙️ How It Works

1. Worker registers on the platform
2. AI calculates a **weekly premium** based on risk
3. System monitors disruptions (weather, APIs)
4. If disruption occurs:

   * Claim is automatically triggered
   * Worker activity is verified
   * Instant payout is credited

---

## 🤖 AI Features

* **Dynamic Premium Calculation** (based on location & risk)
* **Fraud Detection** (location & activity validation)
* **Predictive Risk Modeling** (weather & disruption patterns)

---

## 🔔 Parametric Triggers

| Disruption    | Condition          | Payout |
| ------------- | ------------------ | ------ |
| Heavy Rain 🌧 | Rainfall > 50mm    | ₹300   |
| Heatwave 🔥   | Temperature > 42°C | ₹250   |
| Flood 🌊      | Government alert   | ₹400   |
| Curfew 🚫     | Zone shutdown      | ₹350   |

---

## 🖥️ Prototype Features

This prototype demonstrates the core workflow:

* Worker registration (Login Page)
* Dashboard showing premium & coverage
* Disruption simulation (trigger buttons)
* Automatic claim + payout display

---

## 🛠️ Tech Stack

* **Frontend:** React.js
* **Backend (Planned):** FastAPI (Python)
* **Database (Planned):** PostgreSQL
* **AI Models:** Python (Scikit-learn)
* **APIs (Planned):** OpenWeatherMap
* **Payments (Planned):** Razorpay Sandbox

---

## 🏗️ System Architecture

```
Frontend (React)
        ↓
Backend (FastAPI)
        ↓
-------------------------
| AI Engine | Database |
-------------------------
        ↓
External APIs (Weather)
        ↓
Payment Gateway (Razorpay)
```

---

## ▶️ How to Run the Project

```bash
cd frontend
npm install
npm run dev
```

---

## 🎥 Demo Video

(Add your video link here)

---

## 🚀 Future Enhancements

* Real-time API integration
* AI-based fraud detection
* Dynamic payout calculation
* Mobile application for gig workers
* Expansion to other gig sectors

---

## 👥 Team

**Team Name:** Cloud Aegis

Members:

* MEDISETTI VENKATA ATCHUTAMBA REVATHI
* PASUPULETI REVATHI MEENAKSHI
* ABBURU YASASRI
* BUGATHA HARISH

---

## 📌 Project Status

🚧 Phase 1 Prototype Completed
(MVP demonstrating core workflow)