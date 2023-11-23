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

//Function to view all Employee
const viewEmployees = async () => {
    try {
        const sql = 'SELECT * FROM employee';
        const employees = await executeQuery(sql);
      
        console.log('All Employees:');
        console.table(employees);
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

// Function to prompt user for department details
const promptAddDepartment = async () => {
  try {
    const departmentDetails = await inquirer.prompt([
      {
        name: 'name',
        type: 'input',
        message: 'Enter the name of the department:',
        validate: function (value) {
          if (value.trim() !== '') {
            return true;
          }
          return 'Please enter a valid department name.';
        },
      },
    ]);
    return departmentDetails;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};

// Function to add a department
const addDepartment = async (name) => {
  try {
    const sql = 'INSERT INTO department (name) VALUES (?)';
    const results = await executeQuery(sql, [name]);
    console.log(`Department ${name} added successfully!`);
    return results.insertId; // Return the ID of the newly added department
  } catch (error) {
    console.error('Error adding department:', error.message);
    throw error;
  }
};

module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    promptAddDepartment,
    addDepartment,
  };