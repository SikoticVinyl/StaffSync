const inquirer = require('inquirer');
const { executeQuery } = require('./db');
const { viewDepartments, viewRoles, viewEmployees } = require('./inputchoices'); // Import actions


// Function to start the application
const startApp = async () => {
    try {
      let exit = false;
  
      while (!exit) {
        const choice = await inquirer.prompt([
          {
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit'
        ]
      }
    ]);

    switch (choice.action) {
      case 'View all departments':
        await viewDepartments();
        break;
      case 'View all roles':
        await viewRoles();
        break;
      case 'View all employees':
        await viewEmployees();
        break;
      case 'Add a department':
        await addDepartment();
        break;
      case 'Add a role':
        await addRole();
        break;
      case 'Add an employee':
        await addEmployee();
        break;
      case 'Update an employee role':
        await updateEmployeeRole();
        break;
      case 'Exit':
        console.log('Exiting the application');
        exit = true;
        break;
      default:
        console.log('Invalid choice');
      }
    }
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  };
  
  module.exports = {
    startApp
  };