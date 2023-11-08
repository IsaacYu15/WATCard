import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";

function CumulativeLineChart(props) {
  var [usedChart, updateChart] = useState(false);

  useEffect(() => {
    if ((props.children.length > 0) & !usedChart) {
      var cumulation = [];
      var sum = 0;

      for (var i = 0; i < props.children.length; i++) {
        sum += parseInt(props.children[i].amount) * -1;
        cumulation.push(sum);
      }

      new Chart(document.getElementById("cumulativeLineChart"), {
        type: "line",
        data: {
          labels: props.children.map((item) => item.date),
          datasets: [
            {
              label: "Transaction",
              data: cumulation.map((item) => item),
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
      <h1>CUMULATIVE LINE CHART</h1>
      <canvas id="cumulativeLineChart"></canvas>
    </section>
  );
}

export default CumulativeLineChart;
