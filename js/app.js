// EMPLOYEE MANAGEMENT SYSTEM

const API_URL = "http://localhost:3000/employees";

let employees = [];
let editingEmployeeId = null;
let deletingEmployeeId = null;

// DOM ELEMENTS

const $ = id => document.getElementById(id);

const totalEmployees = $("totalEmployees");
const activeEmployees = $("activeEmployees");
const inactiveEmployees = $("inactiveEmployees");
const departmentCount = $("departmentCount");

const searchInput = $("searchInput");
const departmentFilter = $("departmentFilter");
const sortSelect = $("sortSelect");
const clearFiltersBtn = $("clearFiltersBtn");

const employeeTableBody = $("employeeTableBody");
const employeeCount = $("employeeCount");
const loading = $("loading");
const errorMessage = $("errorMessage");
const emptyState = $("emptyState");

const addEmployeeBtn = $("addEmployeeBtn");

const employeeModal = $("employeeModal");
const modalTitle = $("modalTitle");
const closeModalBtn = $("closeModalBtn");
const cancelModalBtn = $("cancelModalBtn");
const employeeForm = $("employeeForm");

const employeeName = $("employeeName");
const employeeEmail = $("employeeEmail");
const employeeDepartment = $("employeeDepartment");
const employeeRole = $("employeeRole");
const employeeJoinDate = $("employeeJoinDate");
const employeeStatus = $("employeeStatus");

const deleteModal = $("deleteModal");
const deleteEmployeeName = $("deleteEmployeeName");
const cancelDeleteBtn = $("cancelDeleteBtn");
const confirmDeleteBtn = $("confirmDeleteBtn");

const nameError = $("nameError");
const emailError = $("emailError");
const departmentError = $("departmentError");
const roleError = $("roleError");

// START

document.addEventListener("DOMContentLoaded", fetchEmployees);

// GET EMPLOYEES

async function fetchEmployees() {
    loading.style.display = "block";
    errorMessage.textContent = "";

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch employees");
        }

        employees = await response.json();

        updateDashboard();
        applyFilters();
    } catch (error) {
        console.error("GET Error:", error);
        errorMessage.textContent =
            "Unable to load employees. Please start JSON Server.";
    } finally {
        loading.style.display = "none";
    }
}

// DASHBOARD

function updateDashboard() {
    totalEmployees.textContent = employees.length;

    activeEmployees.textContent =
        employees.filter(e => e.status === "active").length;

    inactiveEmployees.textContent =
        employees.filter(e => e.status === "inactive").length;

    departmentCount.textContent =
        new Set(employees.map(e => e.department)).size;
}

// RENDER EMPLOYEES

function renderEmployees(list) {
    employeeTableBody.innerHTML = "";
    employeeCount.textContent = `${list.length} employees found`;

    emptyState.style.display =
        list.length ? "none" : "block";

    list.forEach(employee => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${escapeHTML(employee.name)}</td>
            <td>${escapeHTML(employee.email)}</td>
            <td>${escapeHTML(employee.department)}</td>
            <td>${escapeHTML(employee.role)}</td>
            <td>${formatDate(employee.joinDate)}</td>
            <td>
                <span class="status ${employee.status}">
                    ${capitalize(employee.status)}
                </span>
            </td>
            <td>
                <button
                    type="button"
                    class="btn btn-secondary edit-btn"
                    data-id="${employee.id}">
                    Edit
                </button>

                <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    data-id="${employee.id}">
                    Delete
                </button>

                <button
                    type="button"
                    class="btn btn-secondary toggle-btn"
                    data-id="${employee.id}">
                    Toggle
                </button>
            </td>
        `;

        employeeTableBody.appendChild(row);
    });
}

// TABLE BUTTONS

employeeTableBody.addEventListener("click", event => {
    const button = event.target.closest("button");

    if (!button) return;

    const id = button.dataset.id;

    if (button.classList.contains("edit-btn")) {
        openEditModal(id);
    } else if (button.classList.contains("delete-btn")) {
        openDeleteModal(id);
    } else if (button.classList.contains("toggle-btn")) {
        toggleStatus(id);
    }
});

// ADD EMPLOYEE MODAL

addEmployeeBtn.addEventListener("click", () => {
    editingEmployeeId = null;

    modalTitle.textContent = "Add Employee";
    employeeForm.reset();
    clearErrors();

    employeeStatus.value = "active";
    employeeModal.style.display = "flex";
});

// EDIT EMPLOYEE

function openEditModal(id) {
    const employee = employees.find(
        e => String(e.id) === String(id)
    );

    if (!employee) return;

    editingEmployeeId = employee.id;

    modalTitle.textContent = "Edit Employee";

    employeeName.value = employee.name;
    employeeEmail.value = employee.email;
    employeeDepartment.value = employee.department;
    employeeRole.value = employee.role;
    employeeJoinDate.value = employee.joinDate;
    employeeStatus.value = employee.status;

    clearErrors();
    employeeModal.style.display = "flex";
}

// CLOSE EMPLOYEE MODAL

function closeEmployeeModal() {
    employeeModal.style.display = "none";
    editingEmployeeId = null;
    employeeForm.reset();
    clearErrors();
}

closeModalBtn.addEventListener("click", closeEmployeeModal);
cancelModalBtn.addEventListener("click", closeEmployeeModal);

// FORM SUBMIT

employeeForm.addEventListener("submit", async event => {
    event.preventDefault();

    if (!validateForm()) return;

    const data = {
        name: employeeName.value.trim(),
        email: employeeEmail.value.trim(),
        department: employeeDepartment.value,
        role: employeeRole.value.trim(),
        joinDate: employeeJoinDate.value,
        status: employeeStatus.value
    };

    if (editingEmployeeId === null) {
        await addEmployee(data);
    } else {
        await updateEmployee(data);
    }
});

// POST

async function addEmployee(data) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error();

        closeEmployeeModal();
        await fetchEmployees();

        alert("Employee added successfully!");
    } catch (error) {
        console.error("POST Error:", error);
        alert("Failed to add employee.");
    }
}

// PUT

async function updateEmployee(data) {
    try {
        const response = await fetch(
            `${API_URL}/${editingEmployeeId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        if (!response.ok) throw new Error();

        closeEmployeeModal();
        await fetchEmployees();

        alert("Employee updated successfully!");
    } catch (error) {
        console.error("PUT Error:", error);
        alert("Failed to update employee.");
    }
}

// DELETE MODAL

function openDeleteModal(id) {
    const employee = employees.find(
        e => String(e.id) === String(id)
    );

    if (!employee) return;

    deletingEmployeeId = employee.id;
    deleteEmployeeName.textContent = employee.name;

    deleteModal.style.display = "flex";
}

function closeDeleteModal() {
    deleteModal.style.display = "none";
    deletingEmployeeId = null;
}

cancelDeleteBtn.addEventListener(
    "click",
    closeDeleteModal
);

// DELETE

confirmDeleteBtn.addEventListener("click", async () => {
    if (deletingEmployeeId === null) return;

    try {
        const response = await fetch(
            `${API_URL}/${deletingEmployeeId}`,
            { method: "DELETE" }
        );

        if (!response.ok) throw new Error();

        closeDeleteModal();
        await fetchEmployees();

        alert("Employee deleted successfully!");
    } catch (error) {
        console.error("DELETE Error:", error);
        alert("Failed to delete employee.");
    }
});

// TOGGLE STATUS

async function toggleStatus(id) {
    const employee = employees.find(
        e => String(e.id) === String(id)
    );

    if (!employee) return;

    const data = {
        ...employee,
        status: employee.status === "active"
            ? "inactive"
            : "active"
    };

    try {
        const response = await fetch(
            `${API_URL}/${employee.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        if (!response.ok) throw new Error();

        await fetchEmployees();
    } catch (error) {
        console.error("Toggle Error:", error);
        alert("Failed to change employee status.");
    }
}

// SEARCH / FILTER / SORT

searchInput.addEventListener("input", applyFilters);
departmentFilter.addEventListener("change", applyFilters);
sortSelect.addEventListener("change", applyFilters);

function applyFilters() {
    let list = [...employees];

    const search = searchInput.value
        .trim()
        .toLowerCase();

    if (search) {
        list = list.filter(e =>
            e.name.toLowerCase().includes(search) ||
            e.email.toLowerCase().includes(search)
        );
    }

    const department = departmentFilter.value;

    if (department) {
        list = list.filter(
            e => e.department === department
        );
    }

    const sort = sortSelect.value;

    if (sort === "name") {
        list.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    if (sort === "department") {
        list.sort((a, b) =>
            a.department.localeCompare(b.department)
        );
    }

    if (sort === "joinDate") {
        list.sort(
            (a, b) =>
                new Date(a.joinDate) -
                new Date(b.joinDate)
        );
    }

    renderEmployees(list);
}

// CLEAR FILTERS

clearFiltersBtn.addEventListener("click", () => {
    searchInput.value = "";
    departmentFilter.value = "";
    sortSelect.value = "";

    applyFilters();
});

// VALIDATION

function validateForm() {
    clearErrors();

    let valid = true;

    if (!employeeName.value.trim()) {
        nameError.textContent = "Full name is required.";
        valid = false;
    }

    const email = employeeEmail.value.trim();

    if (!email) {
        emailError.textContent = "Email is required.";
        valid = false;
    } else if (!isValidEmail(email)) {
        emailError.textContent =
            "Enter a valid email address.";
        valid = false;
    }

    if (!employeeDepartment.value) {
        departmentError.textContent =
            "Please select a department.";
        valid = false;
    }

    if (!employeeRole.value.trim()) {
        roleError.textContent = "Role is required.";
        valid = false;
    }

    return valid;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clearErrors() {
    nameError.textContent = "";
    emailError.textContent = "";
    departmentError.textContent = "";
    roleError.textContent = "";
}

// HELPERS

function formatDate(date) {
    if (!date) return "";

    const result = new Date(date);

    return isNaN(result)
        ? date
        : result.toLocaleDateString("en-IN");
}

function capitalize(value) {
    return value
        ? value.charAt(0).toUpperCase() + value.slice(1)
        : "";
}

function escapeHTML(value) {
    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// CLOSE MODALS

window.addEventListener("click", event => {
    if (event.target === employeeModal) {
        closeEmployeeModal();
    }

    if (event.target === deleteModal) {
        closeDeleteModal();
    }
});

// ESCAPE KEY

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeEmployeeModal();
        closeDeleteModal();
    }
});