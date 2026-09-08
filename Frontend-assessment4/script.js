const employees = [
    {
        id: 101,
        name: "Karthik",
        age: 28,
        email: "karthik@techcorp.com",
        department: "IT",
        salary: 45000,
        employmentType: "Full Time",
        status: "Active"
    },
    {
        id: 102,
        name: "Ananya",
        age: 25,
        email: "ananya@techcorp.com",
        department: "HR",
        salary: 35000,
        employmentType: "Full Time",
        status: "Active"
    },
    {
        id: 103,
        name: "Rohit",
        age: 32,
        email: "rohit@techcorp.com",
        department: "Finance",
        salary: 70000,
        employmentType: "Full Time",
        status: "Active"
    },
    {
        id: 104,
        name: "Pooja",
        age: 29,
        email: "pooja@techcorp.com",
        department: "Marketing",
        salary: 28000,
        employmentType: "Part Time",
        status: "Inactive"
    },
    {
        id: 105,
        name: "Nithin",
        age: 35,
        email: "nithin@techcorp.com",
        department: "IT",
        salary: 85000,
        employmentType: "Full Time",
        status: "Active"
    },
    {
        id: 106,
        name: "Kavya",
        age: 31,
        email: "kavya@techcorp.com",
        department: "Sales",
        salary: 50000,
        employmentType: "Contract",
        status: "On Leave"
    },
    {
        id: 107,
        name: "Varun",
        age: 30,
        email: "varun@techcorp.com",
        department: "Finance",
        salary: 65000,
        employmentType: "Full Time",
        status: "Active"
    },
    {
        id: 108,
        name: "Divya",
        age: 22,
        email: "divya@techcorp.com",
        department: "HR",
        salary: 25000,
        employmentType: "Intern",
        status: "Inactive"
    }
];

console.log("========== TASK 8: DASHBOARD CALCULATIONS ==========");

function getTotalEmployees() {
    return employees.length;
}

console.log("Total Employees:", getTotalEmployees());


function getActiveEmployees() {
    let activeCount = 0;

    for (let i = 0; i < employees.length; i++) {
        if (employees[i].status === "Active") {
            activeCount++;
        }
    }

    return activeCount;
}

console.log("Active Employees:", getActiveEmployees());


function getInactiveEmployees() {
    let inactiveCount = 0;

    for (let i = 0; i < employees.length; i++) {
        if (employees[i].status === "Inactive") {
            inactiveCount++;
        }
    }

    return inactiveCount;
}
console.log("Inactive Employees:", getInactiveEmployees());


function getAverageSalary() {
    let totalSalary = 0;

    for (let i = 0; i < employees.length; i++) {
        totalSalary = totalSalary + employees[i].salary;
    }

    return totalSalary / employees.length;
}
console.log("Average Salary:", getAverageSalary());



console.log("========== TASK 9: EMPLOYEE CLASSIFICATION ==========");

function getSalaryCategory(salary) {

    if (salary < 30000) {
        return "Junior";
    } 
    else if (salary >= 30000 && salary <= 50000) {
        return "Mid Level";
    } 
    else if (salary >= 50001 && salary <= 80000) {
        return "Senior";
    } 
    else {
        return "Lead";
    }
}

for (let i = 0; i < employees.length; i++) {

    const employee = employees[i];

    const category = getSalaryCategory(employee.salary);

    console.log(
        employee.name + " | Salary: ₹" + employee.salary + " | Category: " + category
    );
}



console.log("========== TASK 10: EMPLOYEE ELIGIBILITY ==========");
console.log("Concepts Used: Comparison Operators, Logical AND Operator, if-else");

function checkEligibility(employee) {

    if (employee.age >= 18 && employee.status === "Active") {
        return "Eligible";
    } 
    else {
        return "Not Eligible";
    }
}

for (let i = 0; i < employees.length; i++) {

    const employee = employees[i];

    const eligibility = checkEligibility(employee);

    console.log(
        employee.name +
        " | Age: " + employee.age +
        " | Status: " + employee.status +
        " | " + eligibility
    );
}


console.log("========== TASK 11: SALARY CALCULATION ==========");
console.log("Concepts Used: Functions, if-else, Comparison Operators, Arithmetic Operators");

function calculateAnnualSalary(monthlySalary) {
    return monthlySalary * 12;
}

function getIncrementPercentage(salary) {

    if (salary < 30000) {
        return 10;
    } 
    else if (salary >= 30000 && salary <= 50000) {
        return 8;
    } 
    else if (salary >= 50001 && salary <= 80000) {
        return 6;
    } 
    else {
        return 5;
    }
}

function calculateIncrement(salary) {

    const incrementPercentage = getIncrementPercentage(salary);

    return salary * incrementPercentage / 100;
}

function calculateSalaryAfterIncrement(salary) {

    const increment = calculateIncrement(salary);

    return salary + increment;
}

for (let i = 0; i < employees.length; i++) {

    const employee = employees[i];

    const monthlySalary = employee.salary;
    const annualSalary = calculateAnnualSalary(monthlySalary);
    const incrementPercentage = getIncrementPercentage(monthlySalary);
    const incrementAmount = calculateIncrement(monthlySalary);
    const salaryAfterIncrement = calculateSalaryAfterIncrement(monthlySalary);

    console.log(
        employee.name +
        " | Monthly: ₹" + monthlySalary +
        " | Annual: ₹" + annualSalary +
        " | Increment: " + incrementPercentage + "%" +
        " | Increment Amount: ₹" + incrementAmount +
        " | New Salary: ₹" + salaryAfterIncrement
    );
}


console.log("========== TASK 12: HIGHER-ORDER FUNCTION ==========");
console.log("Concepts Used: Higher-Order Function, Callback Function, Functions");

function processEmployee(employee, callback) {
    return callback(employee);
}

function getEmployeeSummary(employee) {
    return (
        employee.name +
        " | Department: " + employee.department +
        " | Salary: ₹" + employee.salary
    );
}

function checkEmployeeEligibility(employee) {
    if (employee.age >= 18 && employee.status === "Active") {
        return employee.name + " | Eligible";
    } 
    else {
        return employee.name + " | Not Eligible";
    }
}

for (let i = 0; i < employees.length; i++) {

    const employee = employees[i];

    const summary = processEmployee(employee, getEmployeeSummary);

    console.log(summary);
}

console.log("========== ELIGIBILITY USING CALLBACK ==========");

for (let i = 0; i < employees.length; i++) {

    const employee = employees[i];

    const eligibility = processEmployee(employee, checkEmployeeEligibility);

    console.log(eligibility);
}