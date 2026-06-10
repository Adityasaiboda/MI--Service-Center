const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Aditya@123",
    database: "mi_service_center"
});

db.connect((err) => {
    if(err){
        console.log(err);
    }else{
        console.log("Database Connected");
    }
});

module.exports = db;