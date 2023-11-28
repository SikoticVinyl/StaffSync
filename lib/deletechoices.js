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
  
    // Fetch employees in the department
    const employees = await executeQuery('SELECT id, first_name, last_name FROM employee WHERE role_id IN (SELECT id FROM role WHERE department_id = ?)', [departmentId]);
  
    // If there are employees in the department, prompt to remove them first
    if (employees.length > 0) {
      console.log(`Cannot delete department. Employees exist in the department (${employees.length} employee(s)):`);
      employees.forEach(employee => {
        console.log(`- Employee ID: ${employee.id}, Name: ${employee.first_name} ${employee.last_name}`);
      });
      console.log('Please reassign or remove the employees before deleting the department.');
      return; // Stop further execution
    }
  
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
    // Fetch employees associated with the role being deleted
    const employees = await executeQuery('SELECT id, first_name, last_name FROM employee WHERE role_id = ?', [roleId]);

    // If there are employees in the role, prompt to remove them first
    if (employees.length > 0) {
      console.log(`Cannot delete role. Employees exist in the role (${employees.length} employee(s)):`);
      employees.forEach(employee => {
        console.log(`- Employee ID: ${employee.id}, Name: ${employee.first_name} ${employee.last_name}`);
      });
      console.log('Please reassign or remove the employees before deleting the role.');
      return; // Stop further execution
    }

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