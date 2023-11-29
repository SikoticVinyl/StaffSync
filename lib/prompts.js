require('dotenv').config();
const inquirer = require('inquirer');
const { viewDepartments, viewRoles, viewEmployees, viewEmployeesByM, viewEmployeesByDepartment, promptDepartmentId, calculateTotalBudget } = require('./viewchoices'); // Import view actions
const { promptAddDepartment, addDepartment, promptAddRole, addRole, promptAddEmployee, addEmployee } = require('./addchoices'); // Import add actions
const { promptUpdateEmployeeRole, updateEmployeeRole, promptUpdateEmployeeM, updateEmployeeM } = require('./updatechoices'); // Import update actions
const { promptDeleteEmployee, deleteEmployee, promptDeleteDepartment, deleteDepartment, promptDeleteRole, deleteRole  } = require('./deletechoices'); // Import delete actions
//const { handleDepartmentOptions, handleEmployeeOptions, handleRoleOptions } = require('./minimenus'); //Import small menu options for inquire

const showHomeScreen = () => {
    console.log('------------------------------\n');
    console.log("Welcome to the employee Tracker!\n");
    console.log('------------------------------\n');
};

console.log('Starting the application');
// Function to start the application
const startApp = async () => {
    showHomeScreen();
    try {
        //console.log('Inside startApp function'); //Used for Debug
        //Console.logs to make sure .env info coming in.
        //console.log('DB_HOST:', process.env.DB_HOST);
        //console.log('DB_USER:', process.env.DB_USER);
        //console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
        //console.log('DB_DATABASE:', process.env.DB_DATABASE);
       
        let exit = false;
        
        while (!exit) {
            //console.log('Before inquirer prompt'); //console log for debugging
            const choice = await inquirer.prompt([
                {
                    name: 'action',
                    type: 'list',
                    message: 'What would you like to do?',
                    loop: false, //set list to not loop.
                    choices: [
                        'Department Options',
                        'View all departments',
                        'Add a department',
                        'Delete department', 
                        'Calculate department budget',
                        new inquirer.Separator(), // Separator for visual distinction
                        'Employee Options',
                        'View all employees',
                        'View employees by Manager',
                        'Update employee manager',
                        'View employees by Department',
                        'Add an employee',
                        'Update an employee role',
                        'Delete an employee',
                        new inquirer.Separator(), // Separator for visual distinction
                        'Role Options',
                        'View all roles',
                        'Add a role',
                        'Delete role',
                        new inquirer.Separator(), // Separator for visual distinction 
                        'Exit'
                    ]
                }
            ]);
            
            //console.log('After inquirer prompt'); //Used for Debug
            
            switch (choice.action) {
                //These top three case options are psudo coded for aditional mini menu functionallity I intend to re-visit once bonus actions completed.
                case 'Department Options':
                    console.log("Mini-menu not yet available.")
                    //await handleDepartmentOptions(); // Function to access deparment options only menu
                    break;
                case 'Employee Options':
                    console.log("Mini-menu not yet available.")
                    //await handleEmployeeOptions(); // Function to access employee options only menu
                    break;
                case 'Role Options':
                    console.log("Mini-menu not yet available.")
                    //await handleRoleOptions(); // Function to access role options only menu
                    break;
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
                    console.log('View Employees by Department case selected');
                    const departmentId = await promptDepartmentId(); // Obtain department ID from user input
                    await viewEmployeesByDepartment(departmentId); // View employees by department
                    break;
                case 'Calculate department budget':
                    console.log('View Deparment Budget by Deparment case selected');
                    const depId = await promptDepartmentId(); // Obtain department ID from user input
                    await calculateTotalBudget(depId); // Calculate department budget
                    break;
                case 'Add a department':
                    console.log('Add a department case selected');
                    try {
                        const departmentDetails = await promptAddDepartment();
                        const departmentName = departmentDetails.name;
                        await addDepartment(departmentName);
                    } catch (error) {
                        console.error('Error adding department: ', error.message);
                        await startApp();
                    }
                    break;
                case 'Add a role':
                    console.log('Add a role case selected');
                    try{
                        const roleDetails = await promptAddRole();
                        await addRole(roleDetails);
                        console.log('Role added.');
                    } catch (error) {
                        console.error('Error adding role: ', error.message);
                        await startApp();
                    }
                    break;
                case 'Add an employee':
                    console.log('Add an employee case selected');
                    try {
                        const employeeDetails = await promptAddEmployee();
                        await addEmployee(employeeDetails);
                        console.log('Employee added.');
                    } catch (error) {
                        console.error('Error adding employee: ', error.message);
                        await startApp();
                    }
                    break;
                case 'Update an employee role':
                    console.log('Update an employee role case selected');
                    try {
                        const { empId, newRoleId, employeeName } = await promptUpdateEmployeeRole(); // Prompt user to select employee and new role
                        await updateEmployeeRole(empId, newRoleId, employeeName); // Update employee's role
                    } catch (error) {
                        console.error('Error updating employee role: ', error.message);
                        await startApp();
                    }
                    break;
                case 'Update employee manager':
                    console.log('Update an employee manager case selected');
                    try {
                        const { employeeId, newManagerId } = await promptUpdateEmployeeM(); // Prompt user to select employee and new manager
                        await updateEmployeeM(employeeId, newManagerId); // Update employee's manager
                        console.log('Employee manager updated successfully.');
                    } catch (error) {
                        console.error('Error updating employee manager: ', error.message);
                        await startApp();
                    }
                    break;
                case 'Delete department':
                    console.log('Delete department case selected');
                    try {
                        const departmentIdToDelete = await promptDeleteDepartment();
                        await deleteDepartment(departmentIdToDelete);
                    } catch (error) {
                        console.error('Error deleting department: ', error.message);
                        await startApp();
                    }
                    break;
                case 'Delete role':
                    console.log('Delete role case selected');
                    try {
                        const roleIdToDelete = await promptDeleteRole();
                        await deleteRole(roleIdToDelete); 
                    } catch (error) {
                        console.error('Error deleting role: ', error.message);
                        await startApp();
                    }
                    break;
                case 'Delete an employee':
                    console.log('Delete an employee case selected');
                    try {
                        const employeeIdToDelete = await promptDeleteEmployee(); // Prompt user to select employee to delete
                        await deleteEmployee(employeeIdToDelete); // Delete the selected employee
                    } catch (error) {
                        console.error('Error deleting department: ', error.message);
                        await startApp();
                    }
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