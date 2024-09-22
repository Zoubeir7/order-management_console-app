const mysql = require("mysql2/promise");

const connPool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "orders_management",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});



module.exports = { connPool };
