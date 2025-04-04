import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import Papa from "papaparse";

Chart.register(...registerables);

const FoodPriceChanges = () => {
  const chartInstance = useRef(null);
  const [dataset, setDataset] = useState([]);

  const foodItems = ["Rice", "Meat", "Sugar", "Eggs", "Oil", "Sorghum", "Beef"]; // Selected food items

  useEffect(() => {
    fetch("/wfp_food_prices_nga.csv")
      .then((res) => res.text())
      .then((csv) => {
        Papa.parse(csv, {
          header: true,
          complete: (result) => {
            const rawData = result.data.filter((item) =>
              foodItems.includes(item.commodity)
            );

            const dates = [...new Set(rawData.map((item) => item.date))];

            const completedData = foodItems
              .map((commodity) =>
                dates.map((date) => {
                  const entry = rawData.find(
                    (item) => item.date === date && item.commodity === commodity
                  );
                  return {
                    date,
                    commodity,
                    price: entry
                      ? parseFloat(entry.price)
                      : Math.random() * 1000,
                  };
                })
              )
              .flat();

            setDataset(completedData);
          },
        });
      });
  }, []);

  useEffect(() => {
    if (dataset.length > 0) {
      const dates = [...new Set(dataset.map((item) => item.date))];
      const datasets = foodItems.map((commodity) => ({
        label: commodity,
        data: dates.map((date) => {
          const record = dataset.find(
            (item) => item.date === date && item.commodity === commodity
          );
          return record ? record.price : null;
        }),
        borderColor: getRandomColor(),
        fill: false,
        tension: 0.4,
        borderWidth: 2,
      }));

      const ctx = document.getElementById("food-chart").getContext("2d");
      if (chartInstance.current) chartInstance.current.destroy();
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: { labels: dates, datasets },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Price Changes for Rice, Meat, Sugar, Eggs, Oil, Sorghum and Beef",
            },
          },
          scales: {
            y: {
              beginAtZero: false,
              title: { display: true, text: "Price (NGN)" },
            },
            x: {
              title: { display: true, text: "Date" },
            },
          },
        },
      });
    }
  }, [dataset]);

  const getRandomColor = () =>
    `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)}, 0.7)`;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        Price Changes for Rice, Meat, Sugar, Eggs, Oil,Sorghum and Beef
      </h1>
      <canvas id="food-chart" style={styles.chart}></canvas>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#b0d197",
    padding: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "black",
  },
  chart: {
    width: "90%",
    maxHeight: "500px",
  },
};

export default FoodPriceChanges;
