const express = require('express')
const mysql = require('mysql2')
const inq = require('inquirer');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { exit } = require('process');

const PORT = process.env.PORT || 3001
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'bLackhole99&',
        database: 'employeeTracker_db'
    },
    console.log("Connected to the employeeTracker database")
)

function init() {
    inq.prompt([
        {
         type: 'checkbox',
         message: "What would you like to do?",
         choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
         name: "pickTask"   
        }
    ])
    .then((response) => {
        if(response.pickTask[0] == "View All Employees") {
            viewTable("employee")
            init()
        }
        else if(response.pickTask[0] == "Add Employee") {
            addEmployeePrompt()
        }
        else if(response.pickTask[0] == "Update Employee Role") {
            updateEmployeePrompt()
        }
        else if(response.pickTask[0] == "View All Roles") {
            viewTable("role")
            init()
        }
        else if(response.pickTask[0] == "Add Role") {
            addRolePrompt()
        }
        else if(response.pickTask[0] == "View All Departments") {
            viewTable("department")
            init()
        }
        else if(response.pickTask[0] == "Add Department") {
            addDepartmentPrompt()
        }
        else {
            console.log("Quitting application")
            exit()
        }           
    })
    .catch((err) => {
        console.log(err)
    })
}

function viewTable(table) {
    db.query(`SELECT * from ${table}`, (err, results) => {
        console.table(results)
        // console.log(results)
    })
}

function addDepartment(dept)  {
    db.query(`INSERT INTO department(name) VALUES (${JSON.stringify(dept)});`)
}

function addRole(role, salary, dept_id) {
    db.query(`INSERT INTO role(title, salary, department_id) VALUES (${JSON.stringify(role)}, ${JSON.stringify(salary)}, ${JSON.stringify(dept_id)});`)
}

function addEmployee(firstName, lastName, roleID, managerID) {
    db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (${JSON.stringify(firstName)}, ${JSON.stringify(lastName)}, 
    ${JSON.stringify(roleID)}, ${managerID});`)
}

function updateEmployee(employeeID, newRoleID) {
    db.query(`UPDATE employee SET role_id = ${JSON.stringify(newRoleID)} WHERE id = ${JSON.stringify(employeeID)};`)
}

function addDepartmentPrompt() {
    inq.prompt([
        {
            type: 'input',
            message: 'Enter the name of the new department:',
            name: 'new_dept'
        }
    ])
    .then((response) => {
        // console.log(response.new_dept)
        addDepartment(response.new_dept)
        console.log('New department, ' + response.new_dept + ', added to the database')
        init()
    })
    .catch((err) => {
        console.log(err)
    })
}

function addRolePrompt() {
    inq.prompt([
        {
            type: 'input',
            message: "Enter the name of the role:",
            name: 'role' 
        },
        {
            type: 'input',
            message: 'Enter the salary of the role:',
            name: 'salary'
        },
        {
            type: 'input',
            message: 'Enter the department ID of the role',
            name: 'department'
        }
    ])
    .then((response) => {
        addRole(response.role, response.salary, response.department)
        console.log('New role, ' + response.role + ', added to the database')
        init()
    })
    .catch((err) => {
        console.log(err)
    }) 
}

function addEmployeePrompt () {
    inq.prompt([
        {
            type: 'input',
            message: "Enter the first name of the employee:",
            name: 'first_name' 
        },
        {
            type: 'input',
            message: 'Enter the last name of the employee:',
            name: 'last_name'
        },
        {
            type: 'input',
            message: 'Enter the role ID of the employee',
            name: 'roleID'
        },
        {
            type: 'input',
            message: 'Enter the ID of the employee\'s manager if the employee has a manager. If not enter "null"',
            name: 'managerID'
        }
    ])
    .then((response) => {
        addEmployee(response.first_name, response.last_name, response.roleID, response.managerID)
        console.log('New employee, ' + response.first_name + ' ' + response.last_name + ', added to the database')
        init()
    })
    .catch((err) => {
        console.log(err)
    }) 
}

function updateEmployeePrompt() {
    inq.prompt([
        {
            type: 'input',
            message: 'Enter the employee ID of the employee you wish to update:',
            name: 'employeeID'
        },
        {
            type: 'input',
            message: 'Enter the role ID of the employee\'s new role:',
            name: 'newRoleID'
        }
    ])
    .then((response) => {
        // console.log(response.new_dept)
        updateEmployee(response.employeeID, response.newRoleID)
        console.log('Employee, ' + response.employeeID + ', has had their role updated in the database')
        init()
    })
    .catch((err) => {
        console.log(err)
    })
}


init()