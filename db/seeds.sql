-- Insert seed data for departments
INSERT INTO department (name) VALUES
('Engineering'),
('Human Resources'),
('Marketing'),
('Sales');

-- Insert seed data for roles
INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 85000.00, 1),
('HR Manager', 75000.00, 2),
('Marketing Specialist', 60000.00, 3),
('Sales Representative', 70000.00, 4);

-- Insert seed data for employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Mike', 'Johnson', 3, NULL),
('Emily', 'Williams', 4, 3);