const { executeQuery } = require('./db');
const inquirer = require('inquirer');
require('dotenv').config();

const promptDeleteDepartment = async () => {
    try {
      const departments = await executeQuery('SELECT id, name FROM department');
  
      const departmentChoices = departments.map(department => ({
        name: department.name,
        value: department.id
      }));
  
      const selectedDepartment = await inquirer.prompt([
        {
          name: 'departmentId',
          type: 'list',
          message: 'Select the department to delete:',
          choices: departmentChoices
        }
      ]);
  
      return selectedDepartment.departmentId;
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  };

  const deleteDepartment = async (departmentId) => {
    try {
      // Fetch roles associated with the department being deleted
      const roles = await executeQuery('SELECT id, title FROM role WHERE department_id = ?', [departmentId]);
  
      // Log the roles before deletion
      console.log(`Roles associated with Department ID ${departmentId} being deleted:`);
      roles.forEach(role => {
        console.log(`- Role ID: ${role.id}, Title: ${role.title}`);
      });
  
      // Perform the delete operation (which will trigger the cascading delete)
      const sql = 'DELETE FROM department WHERE id = ?';
      await executeQuery(sql, [departmentId]);
  
      console.log(`Department with ID ${departmentId} deleted successfully`);
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  };

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

  // Function to delete an employee from the database
const deleteEmployee = async (employeeId) => {
    try {
      const sql = 'DELETE FROM employee WHERE id = ?';
      await executeQuery(sql, [employeeId]);
  
      console.log(`Employee with ID ${employeeId} has been deleted from the database.`);
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  };

const promptDeleteRole = async () => {
  try {
    const roles = await executeQuery('SELECT id, title FROM role');

    const roleChoices = roles.map(role => ({
      name: role.title,
      value: role.id
    }));

    const selectedRoleId = await inquirer.prompt([
      {
        name: 'roleId',
        type: 'list',
        message: 'Select the role to delete:',
        choices: roleChoices
      }
    ]);

    return selectedRoleId.roleId;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};

const deleteRole = async (roleId) => {
    try {
      const sql = 'DELETE FROM role WHERE id = ?';
      await executeQuery(sql, [roleId]);
  
      console.log(`Role with ID ${roleId} deleted successfully`);
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  };

module.exports = {
    promptDeleteEmployee,
    deleteEmployee,
    promptDeleteDepartment,
    deleteDepartment,
    promptDeleteRole,
    deleteRole

}