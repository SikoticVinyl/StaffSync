const { executeQuery } = require('./db');
const inquirer = require('inquirer');
require('dotenv').config();

// Function to view all departments
const viewDepartments = async () => {
    try {
      const sql = 'SELECT * FROM department';
      const departments = await executeQuery(sql);
  
      console.log('All Departments:');
      console.table(departments);
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
};

// Function to view all roles
const viewRoles = async () => {
    try {
      const sql = 'SELECT * FROM role';
      const roles = await executeQuery(sql);
  
      console.log('All Roles:');
      console.table(roles);
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

const viewEmployees = async () => {
  try {
    const sql = `
      SELECT 
        e.id AS employee_id,
        e.first_name,
        e.last_name,
        r.title AS job_title,
        d.name AS department,
        r.salary,
        CONCAT(m.first_name, ' ', m.last_name) AS manager
      FROM 
        employee e
      LEFT JOIN role r ON e.role_id = r.id
      LEFT JOIN department d ON r.department_id = d.id
      LEFT JOIN employee m ON e.manager_id = m.id`;

    const employees = await executeQuery(sql);

    console.log('All Employees with Details:');
    console.table(employees);
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};

const promptEmployeesByM = async () => {
  try {
    const managerDetails = await inquirer.prompt([
      {
        name: 'manager',
        type: 'input',
        message: 'Enter the Manager ID to view employees:',
        validate: function (value) {
          const isValid = !isNaN(value) && parseInt(value) >= 0;
          return isValid ? true : 'Please enter a valid Manager ID.';
        },
      }
    ]);

    // Convert the manager ID to an integer before returning
    return {
      manager: parseInt(managerDetails.manager)
    };
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};


// Function to view employees by Manager
const viewEmployeesByM = async () => {
  try {
    // Prompt user to enter the manager ID
    const managerDetails = await promptEmployeesByM();

    // Retrieve the manager ID from user input
    const managerId = parseInt(managerDetails.manager);

    // SQL query to select employees managed by the specified manager
    const sql = `
      SELECT 
        e.id AS employee_id,
        e.first_name,
        e.last_name,
        r.title AS job_title,
        d.name AS department,
        r.salary,
        CONCAT(m.first_name, ' ', m.last_name) AS manager
      FROM 
        employee e
      LEFT JOIN role r ON e.role_id = r.id
      LEFT JOIN department d ON r.department_id = d.id
      LEFT JOIN employee m ON e.manager_id = m.id
      WHERE e.manager_id = ?`;

    const employees = await executeQuery(sql, [managerId]);

    console.log(`Employees managed by Manager ID ${managerId}:`);
    console.table(employees);
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};
// Function to view employees by department
const viewEmployeesByDepartment = async (departmentId) => {
};

// Function to calculate total utilized budget of a department
const calculateTotalBudget = async (departmentId) => {
};

module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    viewEmployeesByDepartment,
    promptEmployeesByM,
    viewEmployeesByM,
    calculateTotalBudget
  };