const express = require("express");
const app = express(); //run express library
const cors = require("cors");
const pool = require("./db"); //helps us run queries for postgres

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//create a transaction
app.post("/transactions", async (req, res) => {
  try {
    const { date, amount } = req.body;
    const newTransaction = await pool.query(
      "INSERT INTO transactions (date, amount) VALUES ($1, $2) RETURNING *",
      [date, amount]
    );

    res.json(newTransaction.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all transaction
app.get("/transactions", async (req, res) => {
  try {
    const allTransactions = await pool.query("SELECT * FROM transactions");
    res.json(allTransactions.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a specific transaction
app.get("/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const transactions = await pool.query(
      "SELECT * FROM transactions WHERE transaction_id = $1",
      [id]
    );

    res.json(transactions.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//update a transaction
app.put("/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { date, amount } = req.body;
    const updateTransaction = await pool.query(
      "UPDATE transactions SET amount = $1 WHERE transaction_id = $2",
      [amount, id]
    );
    res.json("updated transaction");
  } catch (err) {
    console.log(err.message);
  }
});

//delete a transaction
app.delete("/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTransaction = await pool.query(
      "DELETE FROM transactions WHERE transaction_id = $1",
      [id]
    );
    res.json("deleted transaction");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});
