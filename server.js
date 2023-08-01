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
                viewAllEmployees();
                console.log('view employee role');
                break;
            case 'Add Employee':
                addEmployee();
                console.log('add employee');
                break;
            case 'View All Roles':
                viewAllRoles();
                console.log('view all roles');
                break;
            case 'Add Role':
                console.log('add role');
                break;
            case 'View All Departments':
                viewAllDepartments();
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

//function to find managers
function findManagers() {
    db.promise()
        .query('SELECT * FROM employee WHERE manager_id IS NULL')
        .then(([rows, fields]) => {
            console.log(rows);
            const managerChoices = rows.map((row) => {
                return {
                    name: `${row.first_name} ${row.last_name}`,
                    value: row.id,
                };
            });
            // console.log(managerChoices);
            return managerChoices;
        });
}

//Function to add employee
function addEmployee() {
    db.promise()
        .query('SELECT * FROM role')
        .then(([rows, fields]) => {
            console.log(rows);
            const roleChoices = rows.map((row) => {
                return {
                    name: row.title,
                    value: row.id,
                };
            });
            console.log(roleChoices);
            return roleChoices;
        })
        .then((roleChoices) => {
            db.promise();
            inquirer
                .prompt([
                    {
                        name: 'first_name',
                        type: 'input',
                        message: 'What is the employees first name?',
                    },
                    {
                        name: 'last_name',
                        type: 'input',
                        message: 'What is the employees last name?',
                    },
                    {
                        name: 'role_id',
                        type: 'list',
                        message: 'What is the employees role?',
                        choices: roleChoices,
                    },
                    {
                        name: 'manager_name',
                        type: 'list',
                        message: 'Who is the employees manager?',
                        choices: managerChoices,
                    },
                ])
                .then((answer) => {
                    console.log(answer);
                    // db.query('INSERT INTO employee SET ?', (err, results) => {
                    //     if (err) {
                    //         console.log(err);
                    //     }
                    //     console.log(results);
                    // });
                });
        });
}

//Function to add role
// function addRole() {
