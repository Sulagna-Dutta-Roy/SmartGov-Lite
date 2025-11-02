# 🏛️ SmartGov Lite – AI-Powered Citizen Service Governance Dashboard

> **Transforming Governance with Real-Time Data and AI Insights**

SmartGov Lite is a lightweight **React.js web dashboard** that empowers local governments to monitor, predict, and improve citizen service delivery using **Google Gemini AI**.  
It visualizes real-time complaint trends, highlights high-risk service areas, and generates AI-driven recommendations for proactive governance.

---

## 🚀 Features

- 📊 **Live Data Visualization:**  
  Displays ward-wise unresolved citizen service complaints (e.g., sanitation, water, power).

- 🧠 **Gemini AI Insights:**  
  Integrates with Google’s **Gemini 2.5 Flash** model to analyze complaint data and generate actionable policy suggestions.

- 🔄 **Real-Time Updates:**  
  Simulated live complaint growth to demonstrate dynamic, real-time monitoring.

- 🔐 **Privacy First:**  
  Uses open or anonymized data only — compliant with public data standards.

- ⚡ **Frontend Only:**  
  Entirely built in **React + Vite**, deployable instantly on **Netlify** or **Vercel**. No backend setup required.

---

## 🧩 Tech Stack

| Category | Technologies Used |
|-----------|-------------------|
| Frontend | React.js (Vite) |
| AI Integration | Google Generative AI (Gemini) |
| Data Visualization | Chart.js |
| Styling | TailwindCSS / Inline CSS |
| Hosting | Netlify / Vercel |
| Dataset | Open Government Data / Simulated Data |

---

## 🧠 How It Works

1. Loads real or sample citizen complaint data (per ward/zone).  
2. Gemini AI analyzes the dataset and generates insights like:
   - “Ward 2 is at high risk due to complaint backlog.”
   - “Increase sanitation staff allocation in Ward 3.”
3. Dashboard updates in real-time to simulate live complaint monitoring.  

---

## ⚙️ Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/smartgov-lite.git
   cd smartgov-lite
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. Create an Environment File
Create a .env file in the root directory:
```bash
VITE_GEMINI_API_KEY=your_google_gemini_api_key
```
4. Run the App Locally
```bash
npm run dev
```
5.Build for Production
```bash
npm run build
```

### Unique Selling Proposition (USP)
SmartGov Lite converts open government data into AI-powered, real-time insights, enabling administrators to make predictive and proactive governance decisions — all through a lightweight, frontend-only solution.

💡 Future Enhancements

Integrate live data from data.gov.in
Add authentication for civic officials
Introduce GIS-based map visualization
Automate trend reports and service-level predictions

```Author:
MIT License 2025
```
