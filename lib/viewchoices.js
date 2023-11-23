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

module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees
  };