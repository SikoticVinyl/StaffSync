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

// Function to prompt user to choose the employee and the new manager for the employee
const promptUpdateEmployeeM = async () => {
  try {
    // Retrieve employee list for selection
    const employees = await executeQuery('SELECT id, CONCAT(first_name, " ", last_name) AS employee_name FROM employee');

    const employeeChoices = employees.map(employee => ({
      name: `${employee.employee_name}`,
      value: employee.id
    }));

    const managers = await executeQuery('SELECT id, CONCAT(first_name, " ", last_name) AS manager_name FROM employee');

    const managerChoices = managers.map(manager => ({
      name: `${manager.manager_name}`,
      value: manager.id
    }));

    const selectedEmployee = await inquirer.prompt([
      {
        name: 'employeeId',
        type: 'list',
        message: 'Select the employee to update:',
        choices: employeeChoices
      }
    ]);

    const selectedManager = await inquirer.prompt([
      {
        name: 'managerId',
        type: 'list',
        message: 'Select the new manager for the employee:',
        choices: managerChoices
      }
    ]);

    return {
      employeeId: selectedEmployee.employeeId,
      newManagerId: selectedManager.managerId
    };
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};

// Function to update an employee's manager
const updateEmployeeM = async (employeeId, newManagerId) => {
  try {
    const sql = 'UPDATE employee SET manager_id = ? WHERE id = ?';
    await executeQuery(sql, [newManagerId, employeeId]);

    console.log(`Employee with ID ${employeeId} updated with new manager ID ${newManagerId}`);
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};

module.exports = {
    promptUpdateEmployeeRole, 
    updateEmployeeRole,
    promptUpdateEmployeeM,
    updateEmployeeM,
};