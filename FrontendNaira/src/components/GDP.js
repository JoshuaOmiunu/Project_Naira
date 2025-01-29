import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js";
import { useNavigate } from "react-router-dom";

const GDP = () => {
  const chartRef = useRef(null);
  const navigate = useNavigate();

  const gdpData = {
    2000: 5.5,
    2001: 6.7,
    2002: 14.6,
    2003: 9.5,
    2004: 10.4,
    2005: 7,
    2006: 6.7,
    2007: 7.3,
    2008: 7.2,
    2009: 8.4,
    2010: 11.3,
    2011: 4.9,
    2012: 4.3,
    2013: 5.4,
    2014: 6.3,
    2015: 2.7,
    2016: -1.6,
    2017: 0.8,
    2018: 1.9,
    2019: 2.2,
    2020: -1.8,
    2021: 3.6,
    2022: 3.3,
    2023: 2.9,
    2024: 2.9,
  };

  const labels = Object.keys(gdpData);
  const values = Object.values(gdpData);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login page if not authenticated
      navigate("/login");
      return; // Exit effect if token is missing
    }

    // Create a new chart instance
    chartRef.current = new Chart("gdpChart", {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "GDP Growth Rate (%)",
            data: values,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 2,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Growth Rate (%)",
            },
          },
          x: {
            title: {
              display: true,
              text: "Year",
            },
          },
        },
      },
    });

    // Cleanup function to destroy the chart on unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [navigate]); // Added navigate as a dependency

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>GDP Growth Rate</h2>
      <canvas id="gdpChart" style={styles.chart}></canvas>
      <div style={styles.description}>
        <h3 style={styles.subTitle}>Understanding GDP Growth Rate</h3>
        <p>
          The Gross Domestic Product (GDP) growth rate is an important indicator
          of a country's economic health. It represents the rate at which a
          country's economy is expanding or contracting over time. A positive
          GDP growth rate indicates that the economy is in good shape, while a
          negative growth rate signifies economic challenges.
        </p>
        <p>
          This chart illustrates the GDP growth rate in percentage from the year
          2000 to 2024. It reflects various economic events, policies, and
          external factors that have influenced Nigeria's economic performance.
          Monitoring GDP growth helps policymakers and economists understand
          trends and make informed decisions for future growth.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#e3f2c1",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  title: {
    fontSize: "28px",
    color: "#354823",
    marginBottom: "20px",
  },
  chart: {
    width: "70%",
    height: "100px", // Further reduced height here
  },
  description: {
    marginTop: "20px",
    padding: "15px",
    border: "1px solid #b0d197",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
  },
  subTitle: {
    fontSize: "22px",
    color: "#5a6e43",
    marginBottom: "10px",
  },
};

export default GDP;
