import React, { useState, useEffect } from "react";
import "./Weather.css"; // <-- IMPORTANT

export default function WeatherDashboard() {
  const [city, setCity] = useState("Phoenix");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);
    const start = performance.now();

    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      const json = await res.json();

      const end = performance.now();
      const latency = Math.round(end - start);

      setWeather(json.data);
      setLastUpdated(new Date().toLocaleTimeString());

      setHistory((prev) => [
        {
          city,
          latency,
          ts: new Date().toLocaleTimeString(),
        },
        ...prev.slice(0, 15),
      ]);
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = (score) => {
    if (score >= 8) return "#4ade80"; // green
    if (score >= 6) return "#facc15"; // yellow
    return "#fb923c"; // orange
  };

  const emojiForScore = (score) => {
    if (score >= 8) return "☀️";
    if (score >= 6) return "🌤️";
    if (score >= 4) return "⛅";
    return "🌧️";
  };

  return (
    <div className="weather-container">
      {/* Header */}
      <div className="header">
        <h1>Weather Analytics</h1>
        <p>Beautiful, fast, and powered by Kubernetes + caching.</p>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search a city…"
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
        />
        <button onClick={fetchWeather} disabled={loading}>
          {loading ? "Analyzing…" : "Analyze"}
        </button>
      </div>

      {/* Weather Card */}
      {weather ? (
        <div className="weather-card">
          <div className="weather-icon">{emojiForScore(weather.analysis.score)}</div>

          <h2 className="city-name">{city}</h2>
          <p className="updated">Last updated: {lastUpdated}</p>

          <div className="metrics-grid">
            <div className="metric-box">
              <div className="metric-title">Comfort Score</div>
              <div
                className="metric-value"
                style={{ color: scoreColor(weather.analysis.score) }}
              >
                {weather.analysis.score}/10
              </div>
            </div>

            <div className="metric-box">
              <div className="metric-title">Avg Temp</div>
              <div className="metric-value">
                {weather.analysis.avgTemp.toFixed(1)}°C
              </div>
            </div>

            <div className="metric-box">
              <div className="metric-title">Humidity</div>
              <div className="metric-value">
                {weather.analysis.avgHum.toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Raw Data */}
          <details className="raw-details">
            <summary>View Raw Response</summary>
            <pre className="raw-json">{JSON.stringify(weather, null, 2)}</pre>
          </details>
        </div>
      ) : (
        <div className="placeholder">Enter a city to begin.</div>
      )}

      {/* History Panel */}
      {history.length > 0 && (
        <div className="history-panel">
          <h2>Recent Searches</h2>
          {history.map((item, i) => (
            <div key={i} className="history-item">
              <div>
                <div className="history-city">{item.city}</div>
                <div className="history-ts">{item.ts}</div>
              </div>
              <div className="history-latency">{item.latency}ms</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
