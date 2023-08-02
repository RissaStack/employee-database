const inquirer = require('inquirer');

const mysql = require('mysql2');

const db = require('./db/connection');

inquirer
    .prompt([
        {
            name: 'question',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View Employee Role',
                'Add Employee',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Quit',
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
                addRole();
                console.log('add role');
                break;
            case 'View All Departments':
                viewAllDepartments();
                console.log('view all departments');
                break;
            case 'Add Department':
                addDepartment();
                console.log('add department');
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

//function to find managers
async function findManagers() {
    const [rows, fields] = await db
        .promise()
        .query('SELECT * FROM employee WHERE manager_id IS NULL');
    let managerChoices = rows.map((manager) => {
        return {
            name: `${manager.first_name} ${manager.last_name}`,
            value: manager.id,
        };
    });
    return managerChoices;
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
            let managerChoices = findManagers();
            console.log('manager choices', managerChoices);
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
                    // {
                    //     name: 'manager_name',
                    //     type: 'list',
                    //     message: 'Who is the employees manager?',
                    //     choices: managerChoices,
                    // },
                ])
                .then((employee) => {
                    return this.connection
                        .promise()
                        .query('INSERT INTO employee SET ?', employee);
                });
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

//Function to add a role
function addRole() {
    db.promise()
        .query('SELECT * FROM department')
        .then(([rows, fields]) => {
            console.log(rows);
            const departmentChoices = rows.map((row) => {
                return {
                    name: row.name,
                    value: row.id,
                };
            });
            console.log(departmentChoices);
            return departmentChoices;
        })
        .then((departmentChoices) => {
            inquirer
                .prompt([
                    {
                        name: 'title',
                        type: 'input',
                        message: 'What is the title of the role?',
                    },
                    {
                        name: 'salary',
                        type: 'input',
                        message: 'What is the salary of the role?',
                    },
                    {
                        name: 'department_id',
                        type: 'list',
                        message: 'What is the department of the role?',
                        choices: departmentChoices,
                    },
                ])
                .then((answer) => {
                    console.log(answer);
                    db.query('INSERT INTO role SET ?', (err, results) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log(results);
                    });
                });
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

//Function to add a department
function addDepartment() {
    db.query('INSERT INTO department SET ?', (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log(results);
    });
}
