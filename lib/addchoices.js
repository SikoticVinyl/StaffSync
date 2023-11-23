const { executeQuery } = require('./db');
const inquirer = require('inquirer');
require('dotenv').config();

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
  
  // Function to prompt user for role details
  const promptAddRole = async () => {
    try {
      const roleDetails = await inquirer.prompt([
        {
          name: 'title',
          type: 'input',
          message: 'Enter the title of the role:',
          validate: function (value) {
            if (value.trim() !== '') {
              return true;
            }
            return 'Please enter a valid role title.';
          },
        },
        {
          name: 'salary',
          type: 'input',
          message: 'Enter the salary for the role:',
          validate: function (value) {
            // Assuming the salary input should be a valid number
            if (!isNaN(value) && parseFloat(value) >= 0) {
              return true;
            }
            return 'Please enter a valid salary (a positive number).';
          },
        },
        {
          name: 'department_id',
          type: 'input',
          message: 'Enter the department ID for the role:',
          validate: function (value) {
            // Assuming department_id should be a valid number
            if (!isNaN(value) && parseInt(value) >= 0) {
              return true;
            }
            return 'Please enter a valid department ID (a positive number).';
          },
        },
      ]);
      console.log('Role Details: ', roleDetails);
      return roleDetails;
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  };

// Function to add a role to the database
const addRole = async (roleDetails) => {
    try {
        console.log('Add Role Details: ', roleDetails);

      // Accessing properties of roleDetails directly
      const title = roleDetails.title;
      const salary = roleDetails.salary;
      const department_id = roleDetails.department_id;
  
      // SQL query to insert a new role into the 'role' table
      const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
      
      // Executing the SQL query with role details
      const results = await executeQuery(sql, [title, salary, department_id]);
      
      console.log(`Role '${title}' added successfully with ID ${results.insertId}`);
      return results;
    } catch (error) {
      console.error('Error adding role:', error.message);
      throw error;
    }
};
  
  module.exports = {
    promptAddDepartment,
    addDepartment,
    promptAddRole, 
    addRole,
  };