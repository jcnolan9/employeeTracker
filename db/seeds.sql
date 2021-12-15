USE employeeTracker_db;

INSERT INTO department (name)
VALUES
    ("Accounting"),
    ("Finance"),
    ("Marketing"),
    ("Sales"),
    ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES
    ("Accountant", 90000, 1),
    ("Accounting Manager", 110000, 1),
    ("Financial Analyst", 100000, 2),
    ("Finance Manager", 120000, 2),
    ("Marketing Coordinator", 95000, 3),
    ("Marketing Manager", 115000, 3),
    ("Salesperson", 70000, 4),
    ("Sales Manager", 90000, 4),
    ("Engineer", 110000, 5),
    ("Engineering Manager", 130000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  
    ("Sarah", "Kim", 2, null),
    ("James", "Stein", 1, 1),
    ("Josephine", "Baker", 4, null),
    ("Thomas", "DeCanne", 3, 3),
    ("Tim", "Drake", 6, null),
    ("Alexis", "Drew", 5, 5),
    ("Bobby", "Portis", 8, null),
    ("Zach", "Gregorson", 7, 7),
    ("Phil", "Heath", 10, null),
    ("Jane", "Austen", 9, 9);