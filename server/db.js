const Pool = require("pg").Pool;

const pool = new Pool ({
    user: "postgres",
    password: "riaz{lazer92}",
    host: "localhost",
    port: 5432,
    database: "watcard"
})

module.exports = pool;