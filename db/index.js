const connection = require('./connection.js');

class DB {
    constructor(connection) {
        this.connection = connection;
    }
    //view all employees.
    findAllEmployees() {
        return this.connection
            .promise()
            .query(
                "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, ' ', manager.last_name)AS manager"
            );
    }
    //view all roles
    findAllRoles() {
        return this.connection
            .promise()
            .query(
                'SELECT role.id, role.title, role.department_id, role.salary'
            );
    }
    //view all departments
    findAllDepartments() {
        return this.connection.promise().query('SELECT ');
    }
    //add employee
    const addEmployee = 
    //add role
    //add department
}
