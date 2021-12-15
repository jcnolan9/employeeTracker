const express = require('express')
const mysql = require('mysql2')
const inq = require('inquirer');
const inquirer = require('inquirer');
const cTable = require('console.table')

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
         choices: ["View All Employees", "Add Employee", "Update Employee Role", "View all Roles", "Add Role", "View All Departments", "Add Department"],
         name: "pickTask"   
        }
    ])
    .then((response) => {
        if(response.pickTask[0] == "View All Employees") {
            viewTable("employee")
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

function addEmployee()  {

}

init()