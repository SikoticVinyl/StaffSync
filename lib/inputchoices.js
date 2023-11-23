const { executeQuery } = require('./db');

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

module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees
  };