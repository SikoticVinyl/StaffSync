require('dotenv').config();
const inquirer = require('inquirer');
const { executeQuery } = require('./db');
const { viewDepartments, viewRoles, viewEmployees, viewEmployeesByM, viewEmployeesByDepartment, promptDepartmentId, calculateTotalBudget} = require('./viewchoices'); // Import view actions
const { promptAddDepartment, addDepartment, promptAddRole, addRole, promptAddEmployee, addEmployee } = require('./addchoices'); // Import add actions
const { promptUpdateEmployeeRole, updateEmployeeRole } = require('./updatechoices'); // Import update actions

console.log('Starting the application');
// Function to start the application
const startApp = async () => {
    try {
        //console.log('Inside startApp function'); //Used for Debug
        //Console.logs to make sure .env info coming in.
        //console.log('DB_HOST:', process.env.DB_HOST);
        //console.log('DB_USER:', process.env.DB_USER);
        //console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
        //console.log('DB_DATABASE:', process.env.DB_DATABASE);
       
        let exit = false;
        
        while (!exit) {
            console.log('Before inquirer prompt');
            const choice = await inquirer.prompt([
                {
                    name: 'action',
                    type: 'list',
                    message: 'What would you like to do?',
                    choices: [
                        'View all departments',
                        'View all roles',
                        'View all employees',
                        'View employees by Manager',
                        'View employees by Department',
                        'Add a department',
                        'Add a role',
                        'Add an employee',
                        'Update an employee role',
                        //'Calculate department budget',
                        'Exit'
                    ]
                }
            ]);
            
            //console.log('After inquirer prompt'); //Used for Debug
            
            switch (choice.action) {
                case 'View all departments':
                    console.log('View all departments case selected');
                    await viewDepartments();
                    break;
                case 'View all roles':
                    console.log('View all roles case selected');
                    await viewRoles();
                    break;
                case 'View all employees':
                    console.log('View all employees case selected');
                    await viewEmployees();
                    break;  
                case 'View employees by Manager':
                    console.log('View Employees by Manager case selected');
                    await viewEmployeesByM();
                    break;
                case 'View employees by Department':
                    const departmentId = await promptDepartmentId(); // Obtain department ID from user input
                    await viewEmployeesByDepartment(departmentId); // View employees by department
                    break;
                //case 'Calculate department budget':
                    //const deptId = // obtain departmentId from user input
                    //await calculateTotalBudget(deptId);
                    //break;
                case 'Add a department':
                    console.log('Add a department case selected');
                    const departmentDetails = await promptAddDepartment();
                    const departmentName = departmentDetails.name;
                    await addDepartment(departmentName);
                    break;
                case 'Add a role':
                    console.log('Add a role case selected');
                    const roleDetails = await promptAddRole();
                    await addRole(roleDetails);
                    break;
                case 'Add an employee':
                    console.log('Add a role case selected');
                    const employeeDetails = await promptAddEmployee();
                    await addEmployee(employeeDetails);
                    break;
                case 'Update an employee role':
                    await updateEmployeeRole();
                    break;
                case 'Exit':
                    console.log('Exiting the application');
                    exit = true;
                    break;
                default:
                console.log('Invalid choice');
            }
            //console.log('Exiting startApp function'); //Used for Debug
        }
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

startApp();