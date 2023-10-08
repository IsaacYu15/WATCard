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
    updateTransactions(responseText.split("\n"));
  }

  return (
    <section id="transactions">
      <h1>ShowTransaction</h1>

      {transactions.map((item) => (
        <h4>{item}</h4>
      ))}
    </section>
  );
}

export default ShowTransactions;
