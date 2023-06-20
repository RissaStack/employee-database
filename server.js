const inquirer = require('inquirer');

// const db = require('./connection');

const db = require('./db/connection');

inquirer
    .prompt([
        {
            name: 'question',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'Update Employee Role',
                    value: 'UPDATE_EMPLOYEE_ROLE',
                },
                {
                    name: 'View All Roles',
                    value: 'VIEW_ALL_ROLES',
                },
            ],
        },
    ])
    .then((answer) => {
        console.log(answer);
    });
