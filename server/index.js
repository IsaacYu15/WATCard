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
        const newTransaction = await pool.query("INSERT INTO transactions (date, amount) VALUES ($1, $2) RETURNING *", [date, amount]);

        res.json(newTransaction.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get a transaction

//update a transaction

app.listen(5000, () => {
    console.log("server started on port 5000");
})