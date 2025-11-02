import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { regions as initialRegions } from "./data";
import { predictRisk } from "./utils";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function App() {
  const [regions, setRegions] = useState([...initialRegions]);
  const [insight, setInsight] = useState("Loading AI insights...");
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const enriched = regions.map(r => ({
    ...r,
    risk: predictRisk(r.complaints, r.populationDensity)
  }));

  const chartData = {
    labels: regions.map(r => r.name),
    datasets: [
      {
        label: "Unresolved Citizen Service Complaints",
        data: regions.map(r => r.complaints),
        backgroundColor: "rgba(37,99,235,0.6)"
      }
    ]
  };

  useEffect(() => {
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    async function updateInsights(updatedRegions) {
      const prompt = `You are an AI governance analyst.
      Analyze this dataset of unresolved citizen service complaints by region:
      ${JSON.stringify(updatedRegions)}.
      Identify which areas are at high risk of service backlog and suggest 2 short actionable steps.`;

      try {
        const result = await model.generateContent(prompt);
        setInsight(result.response.text());
      } catch (err) {
        console.error("Gemini error:", err);
        setInsight("⚠️ Unable to fetch AI insights (check API key or network).");
      }
    }

    updateInsights(regions);

    const interval = setInterval(() => {
      const updated = [...regions];
      const randomIndex = Math.floor(Math.random() * updated.length);
      updated[randomIndex].complaints += Math.floor(Math.random() * 3);
      setRegions(updated);
      setLastUpdate(new Date());
      updateInsights(updated);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", background: "#f3f4f6", minHeight: "100vh", padding: "2rem" }}>
      <h1 style={{ textAlign: "center", color: "#2563eb", marginBottom: "1.5rem" }}>
        SmartGov Lite – AI-Powered Citizen Service Dashboard
      </h1>

      <div style={{ background: "#fff", borderRadius: 12, padding: "1rem", marginBottom: "1.5rem" }}>
        <Bar data={chartData} />
        <p style={{ fontSize: "0.8rem", color: "gray", textAlign: "right" }}>
          🔄 Last updated: {lastUpdate.toLocaleTimeString()}
        </p>
        <p style={{ fontSize: "0.8rem", color: "gray" }}>
          Data represents active service complaints (e.g., sanitation, water, power) per ward.
        </p>
      </div>

      <div style={{ background: "#fff", borderRadius: 12, padding: "1rem", marginBottom: "1.5rem" }}>
        <h2>AI-Generated Service Insights (Gemini)</h2>
        <p style={{ color: "#374151", marginTop: ".5rem", lineHeight: "1.5" }}>{insight}</p>
      </div>

      <div style={{ background: "#fff", borderRadius: 12, padding: "1rem" }}>
        <h2>Ward-Wise Complaint & Risk Overview</h2>
        <table style={{ width: "100%", marginTop: ".5rem" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "2px solid #ccc" }}>
              <th>Ward / Zone</th>
              <th>Total Active Complaints</th>
              <th>Service Risk Level (AI Predicted)</th>
            </tr>
          </thead>
          <tbody>
            {enriched.map(r => {
              const color =
                r.risk === "High" ? "red" :
                r.risk === "Medium" ? "orange" : "green";
              return (
                <tr key={r.name}>
                  <td>{r.name}</td>
                  <td>{r.complaints}</td>
                  <td style={{ color, fontWeight: "bold" }}>{r.risk}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
