// Form validation - form-validation.js

// DOM elements
const employeeForm = document.getElementById("employee-form");
const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const emailInput = document.getElementById("email");
const departmentSelect = document.getElementById("department");
const roleInput = document.getElementById("role");
const cancelBtn = document.getElementById("cancel-btn");
const formTitle = document.getElementById("form-title");
const employeeIdInput = document.getElementById("employee-id");

// Initialize the form
function initForm() {
  populateFormIfEditing();
  setupEventListeners();
}

// Populate form if editing an existing employee
function populateFormIfEditing() {
  const urlParams = new URLSearchParams(window.location.search);
  const employeeId = parseInt(urlParams.get("id"));

  if (employeeId) {
    formTitle.textContent = "Edit Employee";
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const employee = employees.find((emp) => emp.id === employeeId);

    if (employee) {
      employeeIdInput.value = employee.id;
      firstNameInput.value = employee.firstName;
      lastNameInput.value = employee.lastName;
      emailInput.value = employee.email;
      departmentSelect.value = employee.department;
      roleInput.value = employee.role;
    }
  }
}

// Setup event listeners
function setupEventListeners() {
  employeeForm.addEventListener("submit", handleFormSubmit);
  cancelBtn.addEventListener("click", handleCancel);

  // Input validation on blur
  firstNameInput.addEventListener("blur", () =>
    validateRequiredField(firstNameInput, "first-name-error")
  );
  lastNameInput.addEventListener("blur", () =>
    validateRequiredField(lastNameInput, "last-name-error")
  );
  emailInput.addEventListener("blur", validateEmail);
  departmentSelect.addEventListener("blur", () =>
    validateRequiredField(departmentSelect, "department-error")
  );
  roleInput.addEventListener("blur", () =>
    validateRequiredField(roleInput, "role-error")
  );
}

// Handle form submission
function handleFormSubmit(e) {
  e.preventDefault();

  // Validate all fields
  const isFirstNameValid = validateRequiredField(
    firstNameInput,
    "first-name-error"
  );
  const isLastNameValid = validateRequiredField(
    lastNameInput,
    "last-name-error"
  );
  const isEmailValid = validateEmail();
  const isDepartmentValid = validateRequiredField(
    departmentSelect,
    "department-error"
  );
  const isRoleValid = validateRequiredField(roleInput, "role-error");

  if (
    isFirstNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isDepartmentValid &&
    isRoleValid
  ) {
    saveEmployee();
  }
}

// Save employee data
function saveEmployee() {
  const employees = JSON.parse(localStorage.getItem("employees")) || [];
  const employeeData = {
    id: employeeIdInput.value ? parseInt(employeeIdInput.value) : Date.now(),
    firstName: firstNameInput.value.trim(),
    lastName: lastNameInput.value.trim(),
    email: emailInput.value.trim(),
    department: departmentSelect.value,
    role: roleInput.value.trim(),
  };

  // Update or add the employee
  const existingIndex = employees.findIndex(
    (emp) => emp.id === employeeData.id
  );
  if (existingIndex >= 0) {
    // Update existing employee
    employees[existingIndex] = employeeData;
  } else {
    // Add new employee
    employees.push(employeeData);
  }

  // Save to localStorage
  localStorage.setItem("employees", JSON.stringify(employees));

  // Redirect back to the employee list with refresh flag
  window.location.href = "index.html?refresh=true";
}

// Handle cancel button
function handleCancel() {
  if (
    confirm(
      "Are you sure you want to cancel? Any unsaved changes will be lost."
    )
  ) {
    window.location.href = "index.html";
  }
}

// Validate required field
function validateRequiredField(input, errorId) {
  const errorElement = document.getElementById(errorId);

  if (input.value.trim() === "") {
    errorElement.textContent = "This field is required";
    errorElement.style.display = "block";
    input.classList.add("error");
    return false;
  } else {
    errorElement.style.display = "none";
    input.classList.remove("error");
    return true;
  }
}

// Validate email field
function validateEmail() {
  const email = emailInput.value.trim();
  const errorElement = document.getElementById("email-error");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    errorElement.textContent = "This field is required";
    errorElement.style.display = "block";
    emailInput.classList.add("error");
    return false;
  } else if (!emailRegex.test(email)) {
    errorElement.textContent = "Please enter a valid email address";
    errorElement.style.display = "block";
    emailInput.classList.add("error");
    return false;
  } else {
    errorElement.style.display = "none";
    emailInput.classList.remove("error");
    return true;
  }
}

// Initialize the form when the DOM is loaded
document.addEventListener("DOMContentLoaded", initForm);
