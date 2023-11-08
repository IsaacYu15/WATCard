import React, { useEffect, useState } from "react";

import "./ShowTransactions.css";

import Headers from "./Header.js";
import LineChart from "./DataLineChart.js";

function ShowTransactions() {
  const [json, updateJSONdata] = useState([]);
  const [transactions, updateTransactions] = useState([]);
  const [fullTransactions, updateFullTransactions] = useState([]);

  const [sumTransactions, updateSumTransactions] = useState([]);
  const [sumAddToCard, updateSumAddToCard] = useState([]);
  const [startingAmount, updateStartingAmount] = useState([]);

  //ISSUE: why does this keep updating
  useEffect(() => {
    if (json.length === 0) {
      getTransactions();
    } else if (transactions.length === 0) {
      updateTransactionsByDate();
    } else if (fullTransactions.length === 0) {
      updateFullTransactions([...transactions]);
    }
  }, [json, transactions, fullTransactions, sumTransactions]);

  //ISSUE: "/r bug occuring"
  const getTransactions = async () => {
    try {
      const response = await fetch("http://localhost:5000/transactions");
      const jsonData = await response.json();

      var transactionSum = 0;
      var addToSum = 0;

      for (let i = 0; i < jsonData.length; i++) {
        if (jsonData[i].amount !== null) {
          var amount = jsonData[i].amount;
          amount = amount.replace("$", "");
          amount = amount.replace("\r", "");
          jsonData[i].amount = amount;

          try {
            if (Number(jsonData[i].amount) < 0) {
              transactionSum += Number(jsonData[i].amount);
            } else if (Number(jsonData[i].amount) > 0) {
              addToSum += Number(jsonData[i].amount);
            }
          } catch (err) {
            console.log(err);
          }
        }
      }

      transactionSum = Math.round(transactionSum * 100) / 100;
      addToSum = Math.round(addToSum * 100) / 100;

      updateSumTransactions(transactionSum);
      updateSumAddToCard(addToSum);
      updateStartingAmount(
        Number(jsonData[jsonData.length - 2].amount.replace(",", ""))
      );
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
        if (json[i].date.split(" ")[0] !== json[i - 1].date.split(" ")[0]) {
          transactionsOrganized.push(transactionsInOneDay);
          transactionsInOneDay = [];
        }
      }

      transactionsInOneDay.push(json[i].date);
      transactionsInOneDay.push(json[i].amount);
    }

    updateTransactions([...transactionsOrganized]);
  };

  const changeDateRange = () => {
    const start = document.getElementById("startDateText").value;
    const end = document.getElementById("endDateText").value;

    var inRange = false;
    var transactionsInRange = [];

    for (var i = 0; i < fullTransactions.length; i++) {
      if ((fullTransactions[i][0].split(" ")[0] === start) & !inRange) {
        inRange = true;
      } else if (fullTransactions[i][0].split(" ")[0] === end) {
        inRange = false;
        break;
      }

      if (inRange) {
        transactionsInRange.push(fullTransactions[i]);
      }
    }

    updateTransactions([...transactionsInRange]);
  };
  //ISSUE: look into keys
  return (
    <section id="transactions_container">
      <div id="header">
        <Headers
          data={[startingAmount, sumAddToCard, sumTransactions]}
        ></Headers>
      </div>

      <div id="data">
        <div id="transactions_charts">
          <LineChart>{json}</LineChart>
          <input id="startDateText" type="text" placeholder="Start Date" />
          <input id="endDateText" type="text" placeholder="End Date" />
          <button onClick={changeDateRange}>Submit</button>
        </div>

        <div id="transactions">
          <h1>TRANSACTIONS</h1>
          {transactions.map((items) => {
            return (
              //do a card component here later
              <div id="transactions_daily">
                {items.map((subItems) => {
                  return <h4>{subItems}</h4>;
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ShowTransactions;
