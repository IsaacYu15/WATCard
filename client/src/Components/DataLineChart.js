import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";

function DataLineChart(props) {
  var [usedChart, updateChart] = useState(false);

  useEffect(() => {
    if ((props.children.length > 0) & !usedChart) {
      new Chart(document.getElementById("transactionLineChart"), {
        type: "line",
        data: {
          labels: props.children.map((item) => item.date),
          datasets: [
            {
              label: "Transaction",
              data: props.children.map((item) => item.amount),
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: false,
            },
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              ticks: {
                color: "#ffffff",
              },
            },
            y: {
              ticks: {
                color: "#ffffff",
              },
            },
          },
        },
      });

      updateChart(true);
    }
  });

  return (
    <section>
      <h1>LINE CHART</h1>
      <canvas id="transactionLineChart"></canvas>
    </section>
  );
}

export default DataLineChart;
