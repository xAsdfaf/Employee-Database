// imported modules
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password
        password: 'Haloclans123!',
        database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);

const database = function () {
    inquirer.prompt([
        {
            type: 'list',
            name: 'todo',
            message: 'What would you like to do?',
            choices: ['Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'View All Departments', 'View All Roles', 'View All Employees', 'Close Application']
        },

    ]).then((answers) => {
        if (answers.todo === 'View All Departments') {
            db.query(`SELECT * FROM department`, (err, result) => {
                if (err) throw err;
                console.log("Viewing all Departments: ");
                console.table(result);
                database();
            });

        } else if (answers.todo === 'View All Roles') {
            db.query(`SELECT * FROM role`, (err, result) => {
                if (err) throw err;
                console.log("Viewing all Roles: ");
                console.table(result);
                database();
            });

        } else if (answers.todo === 'View All Employees') {
            db.query(`SELECT * FROM employee`, (err, result) => {
                if (err) throw err;
                console.log("Viewing all Employees: ");
                console.table(result);
                database();
            });

        } else if (answers.todo === 'Add Department') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'department',
                    message: 'What is the name of this department?',
                    when: (input) => input.todo === 'Add Department',
                    validate: inputName => {
                        if (inputName) {
                            return true
                        } else {
                            console.log("Please enter the department name!")
                        }
                    }
                }
            ])
                // function to add the department to the database
                .then(inputName => {
                    const { department } = inputName;
                    db.query(`INSERT INTO department (name) VALUES (?)`, [inputName.department], (err, result) => {
                        if (err) throw err;
                        console.log(`${department} has been added to the database!`);
                        console.table(result);
                        database();
                    });
                });

        } else if (answers.todo === 'Add Role') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'job',
                    message: 'What would you like to name this role?',
                    validate: inputName => {
                        if (inputName) {
                            return true
                        } else {
                            console.log("Please enter a name for the role!")
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'role_id',
                    message: 'What is the role id?',
                    validate: inputName => {
                        if (inputName) {
                            return true
                        } else {
                            console.log("Please enter a role id!")
                        }
                    } 
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary for this role?',
                    validate: inputName => {
                        if (inputName) {
                            return true
                        } else {
                            console.log("Please enter a salary!")
                        }
                    } 
                },
                {
                    type: 'input',
                    name: 'home',
                    message: 'What department does this role belong to?',
                    validate: inputName => {
                        if (inputName) {
                            return true
                        } else {
                            console.log("Please enter a department!")
                        }
                    } 
                },
            ])
            
            .then((inputName) => {
                const { role_id, job, salary, home } = inputName;
                db.query(`INSERT INTO role (id, title, salary, department) VALUES (?,?,?,?)`, [role_id, job, salary, home], (err, result) => {
                    if (err) throw err;
                    console.log(`${job} has been added!`);
                    console.table(result);
                    database(); 
                })
            })
        } else if (answers.todo === 'Add Employee') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstname',
                    message: "What is your employee's first name?",
                    validate: inputName => {
                        if (inputName) {
                            return true
                        } else {
                            console.log("Please enter a name!")
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'lastname',
                    message: "What is your employee's last name?",
                    validate: inputName => {
                        if (inputName) {
                            return true
                        } else {
                            console.log("Please enter a name!")
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'position',
                    message: "What is your employee's job?",
                    validate: inputName => {
                        if (inputName) {
                            return true
                        } else {
                            console.log("Please enter your employee's job!")
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'manager',
                    message: "Who is your employee's manager?",
                    validate: inputName => {
                        if (inputName) {
                            return true
                        } else {
                            console.log("Please enter a name!")
                        }
                    }
                },
            ])

            .then((inputName) => {
                const { firstname, lastname, position, manager } = inputName;
                db.query(`INSERT INTO employee (first_name, last_name, role, manager) VALUES (?,?,?,?)`, [firstname, lastname, position, manager], (err, result) => {
                    if (err) throw err;
                    console.log(`${firstname} ${lastname} has been added!`);
                    console.table(result);
                    database(); 
                })
            })

        } else if (answers.todo === 'Update Employee Role') {
            
        }

    })
};

database();