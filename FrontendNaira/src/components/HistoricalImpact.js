import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { useNavigate } from "react-router-dom";

Chart.register(...registerables);

const HistoricalImpact = () => {
  const chartInstance = useRef(null); // Reference to Chart instance
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login page if not authenticated
      navigate("/login");
      return; // Exit effect if token is missing
    }

    // Fetch historical CPI data from World Bank API
    const fetchCPIData = async () => {
      try {
        const response = await fetch(
          "https://api.worldbank.org/v2/country/NGA/indicator/FP.CPI.TOTL?format=json"
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    };

    // Prepare chart data
    const prepareChartData = async () => {
      const rawData = await fetchCPIData();
      if (!rawData) return null;

      const cpiData = rawData[1].reverse(); // Earliest dates first
      const years = cpiData.map((entry) => entry.date);
      const prices = cpiData.map((entry) => entry.value);

      return { years, prices };
    };

    // Render the chart
    const renderChart = async () => {
      const chartData = await prepareChartData();

      if (chartData) {
        const ctx = document.getElementById("price-chart").getContext("2d");

        // Destroy existing chart instance if it exists
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        // Create new chart instance and store it in the reference
        chartInstance.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: chartData.years,
            datasets: [
              {
                label: "CPI Increase (Consumer Prices)",
                data: chartData.prices,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true,
                lineTension: 0.2,
                borderWidth: 2,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: false,
              },
            },
          },
        });
      } else {
        alert("Failed to load historical data.");
      }
    };

    renderChart();

    // Cleanup function to destroy the chart when component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [navigate]);

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.title}>Historical Impact of Inflation</h1>
        <p style={styles.description}>
          Nigeria's economic history has been shaped by various factors,
          including inflation. This graph shows the change in consumer prices
          (CPI) over time, sourced from the World Bank.
        </p>

        <canvas id="price-chart" style={styles.chart}></canvas>
      </div>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#D4E7BE",
    margin: 0,
    padding: 0,
  },
  nav: {
    backgroundColor: "#b0d197",
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  navLinks: {
    listStyleType: "none",
    margin: 0,
    padding: 0,
    display: "flex",
  },
  navLink: {
    textDecoration: "none",
    color: "black",
    fontSize: "18px",
    padding: "5px 10px",
    borderRadius: "5px",
    marginLeft: "15px",
    transition: "background-color 0.3s ease",
  },
  container: {
    padding: "20px",
  },
  title: {
    fontSize: "36px",
    color: "#354823",
  },
  description: {
    fontSize: "18px",
    color: "#5a6e43",
    maxWidth: "800px",
  },
  chart: {
    width: "100%", // Adjusted to fit width fully
    height: "350px", // Reduced height for the chart
    maxHeight: "520px", // Optional max height for flexibility
    margin: "20px auto", // Adjusted margin to center with less height
  },
};

export default HistoricalImpact;
