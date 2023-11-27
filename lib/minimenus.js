require('dotenv').config();
const inquirer = require('inquirer');
const { viewDepartments, viewRoles, viewEmployees, viewEmployeesByM, viewEmployeesByDepartment, promptDepartmentId, calculateTotalBudget } = require('./viewchoices'); // Import view actions
const { promptAddDepartment, addDepartment, promptAddRole, addRole, promptAddEmployee, addEmployee } = require('./addchoices'); // Import add actions
const { promptUpdateEmployeeRole, updateEmployeeRole, promptUpdateEmployeeM, updateEmployeeM } = require('./updatechoices'); // Import update actions
const {  } = require('./deletechoices'); // Import delete actions

const handleDepartmentOptions = async () => {
    const departmentChoice = await inquirer.prompt([
        {
            name: 'action',
            type: 'list',
            message: 'Department Options - Select an action:',
            loop: false,
            choices: [
                'View all departments',
                'Add a department',
                //'Delete department', 
                'Calculate department budget',
                'Go back to main menu'
            ]
        }
    ]);

    switch (departmentChoice.action) {
        // Implement logic for department options
    }
};

const handleEmployeeOptions = async () => {
    const employeeChoice = await inquirer.prompt([
        {
            name: 'action',
            type: 'list',
            message: 'Employee Options - Select an action:',
            loop: false,
            choices: [
                'View all employees',
                'View employees by Manager',
                'Update employee manager',
                'View employees by Department',
                'Add an employee',
                'Update an employee role',
                //'Delete employee',,
                'Go back to main menu'
            ]
        }
    ]);

    switch (employeeChoice.action) {
        // Implement logic for department options
    }
};

const handleRoleOptions = async () => {
    const roleChoice = await inquirer.prompt([
        {
            name: 'action',
            type: 'list',
            message: 'Role Options - Select an action:',
            loop: false,
            choices: [
                'View all departments',
                'Add a department',
                'Go back to main menu',
                new inquirer.Separator(), // Separator for visual distinction
            ]
        }
    ]);

    switch (roleChoice.action) {
        // Implement logic for department options
    }
};

module.exports = {
    handleDepartmentOptions,
    handleEmployeeOptions,
    handleRoleOptions
}