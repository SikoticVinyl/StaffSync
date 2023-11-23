const { executeQuery } = require('./db');
const inquirer = require('inquirer');
require('dotenv').config();

// Function to prompt user for employee role update details
const promptUpdateEmployeeRole = async () => {
    try {
      const employeeRoleDetails = await inquirer.prompt([
        {
          name: 'employeeId',
          type: 'input',
          message: 'Enter the ID of the employee whose role you want to update:',
          validate: function (value) {
            return !isNaN(value) && parseInt(value) > 0 ? true : 'Please enter a valid employee ID.';
          },
        },
        {
          name: 'newRoleId',
          type: 'input',
          message: 'Enter the new role ID for the employee:',
          validate: function (value) {
            return !isNaN(value) && parseInt(value) > 0 ? true : 'Please enter a valid role ID.';
          },
        },
      ]);
      return employeeRoleDetails;
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  };
  
  // Function to update an employee's role in the database
  const updateEmployeeRole = async (employeeId, newRoleId) => {
    try {
      const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
      const results = await executeQuery(sql, [newRoleId, employeeId]);
      console.log(`Employee's role updated successfully!`);
      return results;
    } catch (error) {
      console.error('Error updating employee role:', error.message);
      throw error;
    }
  };

module.exports = {
    promptUpdateEmployeeRole, 
    updateEmployeeRole,
};