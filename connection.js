const mysql = require('mysql2');

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'MyEmma16!',
        database: 'employee_db',
    },
    console.log('connected to employee_db')
);

module.exports = connection;
