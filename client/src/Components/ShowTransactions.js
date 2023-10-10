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
        if (rawData[i].split(" ")[0] !== rawData[i - 1].split(" ")[0]) {
          console.log(rawData[i]);
          console.log(transactionsInOneDay);
          transactionsOrganized.push(transactionsInOneDay);
          transactionsInOneDay = [];
        }
      }

      transactionsInOneDay.push(rawData[i]);
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
              var data = subItems.split(" ");
              return (
                <div>
                  <h4>
                    {data[0]} | {data[1]} {data[2]}
                  </h4>
                  <h4>
                    {data[3]} {data[4]}
                  </h4>
                </div>
              );
            })}
            <h4>-----</h4>
          </div>
        );
      })}
    </section>
  );
}

export default ShowTransactions;
