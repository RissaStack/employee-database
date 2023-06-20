const mysql = require('mysql2');

const connection = mysql.createConnection(
    {
        host: 'local host',
        user: 'root',
        password: 'MyEmma16!',
        database: 'emplyee_db',
    },
    console.log('connected to employee_db')
);

module.exports = connection;
