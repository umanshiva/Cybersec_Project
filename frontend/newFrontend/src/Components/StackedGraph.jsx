import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const StackedBarGraph = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
      const fetchStats = async () => {
          try {
          const token =  localStorage.getItem("access_token");
        const response = await fetch("http://127.0.0.1:8000/get-pos-log-stats/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        // Prepare data for the bar chart
        const labels = data.map((item) => item.date);
        const anomalousData = data.map((item) => item.anomalous);
        const normalData = data.map((item) => item.normal);

        setChartData({
          labels,
          datasets: [
            {
              label: "Anomalous",
              data: anomalousData,
              backgroundColor: "rgba(255, 99, 132, 0.8)",
            },
            {
              label: "Normal",
              data: normalData,
              backgroundColor: "rgba(75, 192, 192, 0.8)",
            },
          ],
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Transactions by Date</h2>
      {chartData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default StackedBarGraph;
