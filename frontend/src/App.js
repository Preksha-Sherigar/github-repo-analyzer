import React, { useState } from "react";
import axios from "axios";

function App() {
  const [repoUrl, setRepoUrl] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!repoUrl) {
      setError("⚠️ Please enter a GitHub repository URL");
      return;
    }

    try {
      setError("");
      const response = await axios.post("http://127.0.0.1:5000/analyze", {
        url: repoUrl,
      });
      setData(response.data);
    } catch (err) {
      setError("❌ Error fetching repository details");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif", background: "#f9fafc", minHeight: "100vh" }}>
      <h1 style={{ color: "#333", textAlign: "center", marginBottom: "20px" }}>
        📊 GitHub Repository Analyzer
      </h1>

      {/* Input Section */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter GitHub Repo URL (e.g. https://github.com/octocat/Hello-World)"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          style={{
            width: "450px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />
        <button
          onClick={handleAnalyze}
          style={{
            marginLeft: "12px",
            padding: "10px 18px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Analyze 🚀
        </button>
      </div>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {/* Repository Details */}
      {data && (
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            maxWidth: "600px",
            margin: "0 auto",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ borderBottom: "2px solid #eee", paddingBottom: "10px" }}>
            📄 Repository Details
          </h2>
          <p><b>Name:</b> {data.name}</p>
          <p><b>Description:</b> {data.description}</p>
          <p><b>Stars:</b> ⭐ {data.stars}</p>
          <p><b>Forks:</b> 🍴 {data.forks}</p>
          <p><b>Open Issues:</b> 🐞 {data.open_issues}</p>

          {/* Contributors */}
          <h2 style={{ marginTop: "20px", borderBottom: "2px solid #eee", paddingBottom: "10px" }}>
            👥 Contributors
          </h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {data.contributors.map((c, index) => (
              <li key={index} style={{ marginBottom: "8px" }}>
                🔗{" "}
                <a
                  href={`https://github.com/${c.login}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#2563eb", textDecoration: "none", fontWeight: "bold" }}
                >
                  {c.login}
                </a>{" "}
                — {c.contributions} contributions
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
