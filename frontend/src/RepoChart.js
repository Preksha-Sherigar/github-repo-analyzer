import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function RepoChart({ data }) {
  const chartData = {
    labels: ["Stars", "Forks", "Commits", "Issues", "PRs"],
    datasets: [
      {
        label: "Repository Stats",
        data: [
          data.stars,
          data.forks,
          data.commits,
          data.issues,
          data.pull_requests,
        ],
        backgroundColor: [
          "#4caf50",
          "#2196f3",
          "#ff9800",
          "#e91e63",
          "#9c27b0",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ height: "300px", width: "100%", marginTop: "20px" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default RepoChart;
