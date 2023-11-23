const inquirer = require('inquirer');
const { executeQuery } = require('./db');
const { viewDepartments, viewRoles, viewEmployees } = require('./inputchoices'); // Import actions


// Function to start the application
const startApp = async () => {
    try {
      let exit = false;
  
      while (!exit) {
        console.log('Before inquirer prompt');
        const choice = await inquirer.prompt([
          {
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          //'Add a department',
          //'Add a role',
          //'Add an employee',
          //'Update an employee role',
          'Exit'
        ]
      }
    ]);
    console.log('After inquirer prompt');

    switch (choice.action) {
      case 'View all departments':
        console.log('View all departments case selected');
        await viewDepartments();
        break;
      case 'View all roles':
        console.log('View all roles case selected');
        await viewRoles();
        break;
      case 'View all employees':
        console.log('View all employees case selected');
        await viewEmployees();
        break;
      //case 'Add a department':
        //await addDepartment();
        //break;
      //case 'Add a role':
        //await addRole();
        //break;
      //case 'Add an employee':
        //await addEmployee();
        //break;
      //case 'Update an employee role':
        //await updateEmployeeRole();
        //break;
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