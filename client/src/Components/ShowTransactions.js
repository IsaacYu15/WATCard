import React, { useEffect, useState } from "react";
import data from "../data.txt";

function ShowTransactions() {
  const [transactions, updateTransactions] = useState([]);

  useEffect(() => {
    fileToArr();
  }, []);

  async function fileToArr() {
    const response = await fetch(data);

    var responseText = await response.text();
    var responseArray = responseText.split("\n");

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
