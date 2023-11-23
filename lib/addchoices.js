const { last } = require('rxjs');
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

// Function to prompt user for employee details
const promptAddEmployee = async () => {
    try {
        const employeeDetails = await inquirer.prompt([
          {
            name: 'firstName',
            type: 'input',
            message: 'Enter the employee\'s first name:',
            validate: function (value) {
              if (value.trim() !== '') {
                return true;
              }
              return 'Please enter a valid first name.';
            },
          },
          {
            name: 'lastName',
            type: 'input',
            message: 'Enter the employee\'s last name:',
            validate: function (value) {
              if (value.trim() !== '') {
                return true;
              }
              return 'Please enter a valid last name.';
            },
          },
          {
            name: 'roleId',
            type: 'input',
            message: 'Enter the employee\'s role ID:',
            validate: function (value) {
              return !isNaN(value) && parseInt(value) >= 0 ? true : 'Please enter a valid role ID.';
            },
          },
          {
            name: 'managerId',
            type: 'input',
            message: 'Enter the employee\'s manager ID (optional, leave blank if none):',
            default: '', // Default value if user leaves it blank
            validate: function (value) {
              // Validation logic to accept a number or an empty value
              return value === '' || (!isNaN(value) && parseInt(value) >= 0)
                ? true
                : 'Please enter a valid manager ID or leave it blank.';
            },
          },
        ]);
        console.log('Employee Details: ', employeeDetails);
        return employeeDetails;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

// Function to add an employee to the database
const addEmployee = async (employeeDetails) => {
    try {
        console.log('Add Role Details: ', roleDetails);

      // Accessing properties of employeeDetails directly
      const first_name = employeeDetailsDetails.firstName;
      const last_name = employeeDetailsDetails.lastName;
      const role_id = employeeDetails.roleId;
      const manager_id = employeeDetails.managerId;
  
      // SQL query to insert a new role into the 'role' table
      const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
      
      // Executing the SQL query with employee details
      const results = await executeQuery(sql, [first_name, last_name, role_id,manager_id]);
      
      console.log(`Employee '${first_name,last_name}' added successfully.`);
      return results;
    } catch (error) {
      console.error('Error adding employee:', error.message);
      throw error;
    }
};
  
  module.exports = {
    promptAddDepartment,
    addDepartment,
    promptAddRole, 
    addRole,
    promptAddEmployee,
    addEmployee,
  };