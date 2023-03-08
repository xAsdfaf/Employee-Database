const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

inquirer.prompt([
    {
        type: 'list',
        name: '',
        message: ''
    },
])