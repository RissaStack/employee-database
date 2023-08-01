const inquirer = require('inquirer');

const mysql = require('mysql2');

const db = require('./connection');

inquirer
    .prompt([
        {
            name: 'question',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Quit',
                'Add Employee',
            ],
        },
    ])
    .then((answer) => {
        switch (answer.question) {
            case 'View Employee Role':
                console.log('view employee role');
                break;
            case 'Add Employee':
                console.log('add employee');
                break;
            case 'View All Roles':
                console.log('view all roles');
                break;
            case 'Add Role':
                console.log('add role');
                break;
            case 'View All Departments':
                console.log('view all departments');
                break;
            case 'Add Department':
                consolelog('ad department');
                break;
            case 'Quit':
                console.log('quit');
                break;
        }
    });

//Function to view all employees
function viewAllEmployees() {
    db.query('SELECT * FROM employee', (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log(results);
    });
}
//Function to view all roles
function viewAllRoles() {
    db.query('SELECT * FROM role', (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log(results);
    });
}
//Function to view all departments
function viewAllDepartments() {
    db.query('SELECT * FROM department', (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log(results);
    });
}
