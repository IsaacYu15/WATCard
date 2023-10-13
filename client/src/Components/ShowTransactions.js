import React, { useEffect, useState } from "react";
import data from "../data.txt";
import Chart from "chart.js/auto";

function ShowTransactions() {
  const [rawData, updateRawData] = useState([]);
  const [json, updateJSONdata] = useState([]);

  const [transactions, updateTransactions] = useState([]);

  //ISSUE: why does this keep updating
  useEffect(() => {
    if (json.length === 0) {
      getTransactions();
    } else if (transactions.length === 0) {
      updateTransactionsByDate();

      //update the chart
      new Chart(document.getElementById("transactionLineChart"), {
        type: "line",
        data: {
          labels: json.map((item) => item.date),
          datasets: [
            {
              label: "Transaction",
              data: json.map((item) => item.amount),
            },
          ],
        },
      });
    }
  }, [json, rawData, transactions]);

  //ISSUE: "/r bug occuring"
  const submitTransactions = async (e) => {
    e.preventDefault(); //stop refresh

    try {
      for (var i = 0; i < rawData.length; i += 2) {
        const response = await fetch("http://localhost:5000/transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: rawData[i],
            amount: rawData[i + 1],
          }),
        });
        //console.log(response);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const getTransactions = async () => {
    try {
      const response = await fetch("http://localhost:5000/transactions");
      const jsonData = await response.json();

      for (let i = 0; i < jsonData.length; i++) {
        if (jsonData[i].amount !== null) {
          var amount = jsonData[i].amount;
          amount = amount.replace("$", "");
          amount = amount.replace("\r", "");
          jsonData[i].amount = amount;
        }
      }

      updateJSONdata(jsonData);
    } catch (err) {
      console.log(err.message);
    }
  };

  const updateTransactionsByDate = () => {
    var transactionsOrganized = [];
    var transactionsInOneDay = [];

    for (var i = 0; i < json.length; i++) {
      if (i > 0) {
        console.log(json[i].date.split(" ")[0]);
        if (json[i].date.split(" ")[0] !== json[i - 1].date.split(" ")[0]) {
          transactionsOrganized.push(transactionsInOneDay);
          transactionsInOneDay = [];
        }
      }

      transactionsInOneDay.push(json[i].date);
      transactionsInOneDay.push(json[i].amount);
    }

    updateTransactions(transactionsOrganized);
  };

  //ISSUE: look into keys
  return (
    <section id="transactions">
      <div id="charts">
        <canvas id="transactionLineChart"></canvas>
      </div>

      <button onClick={submitTransactions}>SUBMIT TRANSACTIONS</button>
      <h1>ShowTransaction</h1>

      {transactions.map((items) => {
        return (
          <div>
            {items.map((subItems) => {
              return <h4>{subItems}</h4>;
            })}
            <h4>-----</h4>
          </div>
        );
      })}
    </section>
  );
}

export default ShowTransactions;
