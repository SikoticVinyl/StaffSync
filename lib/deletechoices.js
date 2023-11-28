const { executeQuery } = require('./db');
const inquirer = require('inquirer');
require('dotenv').config();

// Function to prompt user for selecting an employee to delete
const promptDeleteEmployee = async () => {
    try {
      // Fetch employee list for selection
      const employees = await executeQuery('SELECT id, CONCAT(first_name, " ", last_name) AS employee_name FROM employee');
  
      const employeeChoices = employees.map(employee => ({
        name: `${employee.employee_name}`,
        value: employee.id
      }));
  
      const selectedEmployee = await inquirer.prompt([
        {
          name: 'employeeId',
          type: 'list',
          message: 'Select the employee to delete:',
          choices: employeeChoices
        }
      ]);
  
      return selectedEmployee.employeeId;
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  };

module.exports = {
    promptDeleteEmployee,
}