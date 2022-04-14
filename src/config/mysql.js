const mysql = require("mysql");

//create mysql connection
const CNX = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nt_v2',


})
// connect to database
CNX.connect((err,res)=>{
    if(err) throw err
    console.log("my sql is runing")
})
exports.DB = CNX;