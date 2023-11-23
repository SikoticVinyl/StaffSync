const inquirer = require('inquirer');
const { executeQuery } = require('./db');

// Function to start the application
const startApp = async () => {
    try {
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
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  };