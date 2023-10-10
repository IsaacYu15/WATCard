import React, { useEffect, useState } from "react";
import data from "../data.txt";

function ShowTransactions() {
  const [rawData, updateRawData] = useState([]);
  const [transactions, updateTransactions] = useState([]);

  useEffect(() => {
    fileToArr();
  }, []);

  //"/r bug occuring"
  const submitTransactions = async (e) => {
    e.preventDefault(); //stop refresh

    try {
      for (var i = 0; i < 4; i += 2) {
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

  async function fileToArr() {
    const response = await fetch(data);

    var responseText = await response.text();
    var responseArray = responseText.split("\n");
    updateRawData(responseArray);

    var transactionsOrganized = [];
    var transactionsInOneDay = [];

    //organize by date
    for (var i = 0; i < responseArray.length; i++) {
      if (i > 0) {
        if (
          i % 2 === 0 &&
          responseArray[i].split(" ")[0] !== responseArray[i - 2].split(" ")[0]
        ) {
          transactionsOrganized.push(transactionsInOneDay);
          transactionsInOneDay = [];
          transactionsInOneDay.push(responseArray[i]);
        } else {
          transactionsInOneDay.push(responseArray[i]);
        }
      } else {
        transactionsInOneDay.push(responseArray[i]);
      }
    }

    updateTransactions(transactionsOrganized);
  }

  //look into keys
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
