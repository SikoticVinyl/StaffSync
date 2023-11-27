const { executeQuery } = require('./db');
const inquirer = require('inquirer');
require('dotenv').config();

// Function to prompt user for employee role update details
const promptUpdateEmployeeRole = async () => {
  try {
    // Fetch employee list and roles for selection
    const employees = await executeQuery('SELECT id, CONCAT(first_name, " ", last_name) AS employee_name FROM employee');
    const roles = await executeQuery('SELECT id, title FROM role');

    const employeeChoices = employees.map(employee => ({
      name: `${employee.employee_name}`,
      value: employee.id
    }));

    const roleChoices = roles.map(role => ({
      name: `${role.title}`,
      value: role.id
    }));

    const selectedEmployee = await inquirer.prompt([
      {
        name: 'empId',
        type: 'list',
        message: 'Select the employee to update:',
        choices: employeeChoices
      }
    ]);

    const selectedRole = await inquirer.prompt([
      {
        name: 'roleId',
        type: 'list',
        message: 'Select the new role for the employee:',
        choices: roleChoices
      }
    ]);

    // Fetch the selected employee's name based on the ID
    const selectedEmployeeData = employees.find(employee => employee.id === selectedEmployee.empId);
    const selectedEmployeeName = selectedEmployeeData ? selectedEmployeeData.employee_name : '';

    return {
      empId: selectedEmployee.empId,
      newRoleId: selectedRole.roleId,
      employeeName: selectedEmployeeName // Include the employee's name in the returned object
    };
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};

// Function to update an employee's role in the database
const updateEmployeeRole = async (empId, newRoleId, employeeName) => {
  try {
    const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
    await executeQuery(sql, [newRoleId, empId]);

    console.log(`Employee ${employeeName} updated with new role ID ${newRoleId}`);
  } catch (error) {
    console.error('Error:', error.message);
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