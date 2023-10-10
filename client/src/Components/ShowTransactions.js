import React, { useEffect, useState } from "react";
import data from "../data.txt";

function ShowTransactions() {
  const [rawData, updateRawData] = useState([]);
  const [transactions, updateTransactions] = useState([]);

  //ISSUE: why does this keep updating
  useEffect(() => {
    if (rawData.length === 0) {
      getTransactions();
    } else if (transactions.length === 0) {
      updateTransactionsByDate();
    }
  }, [rawData, transactions]);

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
        console.log(response);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const getTransactions = async () => {
    try {
      const response = await fetch("http://localhost:5000/transactions");
      const jsonData = await response.json();

      var tempData = [];

      for (var i = 0; i < jsonData.length; i++) {
        tempData.push([jsonData[i].date] + " " + [jsonData[i].amount]);
      }

      if (tempData.length === 0) {
        fileToArr();
        console.log("GET BY DATA");
      } else {
        updateRawData(tempData);
        console.log("GET BY PERN");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  async function fileToArr() {
    const response = await fetch(data);

    var responseText = await response.text();
    var responseArray = responseText.split("\n");
    updateRawData(responseArray);
  }

  const updateTransactionsByDate = () => {
    var transactionsOrganized = [];
    var transactionsInOneDay = [];

    //ISSUE: organize by date is not working well
    for (var i = 0; i < rawData.length; i++) {
      if (i > 0) {
        if (
          i % 2 === 0 &&
          rawData[i].split(" ")[0] !== rawData[i - 2].split(" ")[0]
        ) {
          transactionsOrganized.push(transactionsInOneDay);
          transactionsInOneDay = [];
          transactionsInOneDay.push(rawData[i]);
        } else {
          transactionsInOneDay.push(rawData[i]);
        }
      } else {
        transactionsInOneDay.push(rawData[i]);
      }
    }

    updateTransactions(transactionsOrganized);
  };

  //ISSUE: look into keys
  return (
    <section id="transactions">
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
