// Main application - app.js

// Get employee data from localStorage or initialize with default data
let employees = JSON.parse(localStorage.getItem("employees")) || [
  {
    id: 1,
    firstName: "Alice",
    lastName: "Smith",
    email: "alice@example.com",
    department: "HR",
    role: "Manager",
  },
  {
    id: 2,
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob@example.com",
    department: "IT",
    role: "Developer",
  },
  {
    id: 3,
    firstName: "Charlie",
    lastName: "Lee",
    email: "charlie@example.com",
    department: "Finance",
    role: "Analyst",
  },
];

// Save employees to localStorage
function saveEmployees() {
  localStorage.setItem("employees", JSON.stringify(employees));
}

// DOM elements
const employeeList = document.getElementById("employee-list");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const filterBtn = document.getElementById("filter-btn");
const filterSidebar = document.getElementById("filter-sidebar");
const closeFilterBtn = document.getElementById("close-filter");
const applyFilterBtn = document.getElementById("apply-filter");
const resetFilterBtn = document.getElementById("reset-filter");
const sortSelect = document.getElementById("sort");
const itemsPerPageSelect = document.getElementById("items-per-page");
const prevPageBtn = document.getElementById("prev-page");
const nextPageBtn = document.getElementById("next-page");
const pageInfo = document.getElementById("page-info");
const addEmployeeBtn = document.getElementById("add-employee-btn");

// Filter state
let currentFilters = {
  firstName: "",
  department: "",
  role: "",
};

// Pagination state
let currentPage = 1;
let itemsPerPage = 10;

// Initialize the app
function init() {
  renderEmployeeList();
  setupEventListeners();
}

// Render employee list
function renderEmployeeList() {
  // Filter and sort employees
  let filteredEmployees = filterEmployees(employees);
  filteredEmployees = sortEmployees(filteredEmployees);

  // Paginate
  const paginatedEmployees = paginateEmployees(filteredEmployees);

  // Update pagination controls
  updatePaginationControls(filteredEmployees.length);

  // Clear existing list
  employeeList.innerHTML = "";

  // Add employees to the list
  paginatedEmployees.forEach((employee) => {
    const employeeCard = createEmployeeCard(employee);
    employeeList.appendChild(employeeCard);
  });
}

// Create employee card HTML
function createEmployeeCard(employee) {
  const card = document.createElement("div");
  card.className = "employee-card";

  card.innerHTML = `
        <h3>${employee.firstName} ${employee.lastName}</h3>
        <div class="employee-details">
            <p><strong>Email:</strong> ${employee.email}</p>
            <p><strong>Department:</strong> ${employee.department}</p>
            <p><strong>Role:</strong> ${employee.role}</p>
        </div>
        <div class="employee-actions">
            <button class="edit-btn" data-id="${employee.id}">Edit</button>
            <button class="delete-btn" data-id="${employee.id}">Delete</button>
        </div>
    `;

  return card;
}

// Filter employees based on current filters
function filterEmployees(employees) {
  return employees.filter((employee) => {
    const firstNameMatch = employee.firstName
      .toLowerCase()
      .includes(currentFilters.firstName.toLowerCase());
    const departmentMatch =
      currentFilters.department === "" ||
      employee.department === currentFilters.department;
    const roleMatch =
      currentFilters.role === "" || employee.role === currentFilters.role;

    return firstNameMatch && departmentMatch && roleMatch;
  });
}

// Sort employees based on selected sort option
function sortEmployees(employees) {
  const sortBy = sortSelect.value;

  if (!sortBy) return employees;

  return [...employees].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return -1;
    if (a[sortBy] > b[sortBy]) return 1;
    return 0;
  });
}

// Paginate employees
function paginateEmployees(employees) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return employees.slice(startIndex, endIndex);
}

// Update pagination controls
function updatePaginationControls(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Update page info
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

  // Enable/disable previous button
  prevPageBtn.disabled = currentPage === 1;

  // Enable/disable next button
  nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
}

// Edit employee
function editEmployee(id) {
  window.location.href = `edit-employee.html?id=${id}`;
}

// Add new employee
function addEmployee() {
  window.location.href = "edit-employee.html";
}

// Delete employee
function deleteEmployee(id) {
  if (confirm("Are you sure you want to delete this employee?")) {
    employees = employees.filter((emp) => emp.id !== id);
    saveEmployees();
    renderEmployeeList();
  }
}

// Setup event listeners
function setupEventListeners() {
  // Search functionality
  searchBtn.addEventListener("click", () => {
    currentFilters.firstName = searchInput.value;
    currentPage = 1;
    renderEmployeeList();
  });

  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      currentFilters.firstName = searchInput.value;
      currentPage = 1;
      renderEmployeeList();
    }
  });

  // Filter sidebar
  filterBtn.addEventListener("click", () => {
    filterSidebar.classList.add("active");
  });

  closeFilterBtn.addEventListener("click", () => {
    filterSidebar.classList.remove("active");
  });

  applyFilterBtn.addEventListener("click", () => {
    currentFilters.firstName =
      document.getElementById("filter-firstName").value;
    currentFilters.department =
      document.getElementById("filter-department").value;
    currentFilters.role = document.getElementById("filter-role").value;
    currentPage = 1;
    renderEmployeeList();
    filterSidebar.classList.remove("active");
  });

  resetFilterBtn.addEventListener("click", () => {
    document.getElementById("filter-firstName").value = "";
    document.getElementById("filter-department").value = "";
    document.getElementById("filter-role").value = "";
    currentFilters = {
      firstName: "",
      department: "",
      role: "",
    };
    searchInput.value = "";
    currentPage = 1;
    renderEmployeeList();
    filterSidebar.classList.remove("active");
  });

  // Sorting
  sortSelect.addEventListener("change", () => {
    currentPage = 1;
    renderEmployeeList();
  });

  // Items per page
  itemsPerPageSelect.addEventListener("change", () => {
    itemsPerPage = parseInt(itemsPerPageSelect.value);
    currentPage = 1;
    renderEmployeeList();
  });

  // Pagination
  prevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderEmployeeList();
    }
  });

  nextPageBtn.addEventListener("click", () => {
    const totalItems = filterEmployees(employees).length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (currentPage < totalPages) {
      currentPage++;
      renderEmployeeList();
    }
  });

  // Event delegation for edit and delete buttons
  employeeList.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-btn")) {
      const employeeId = parseInt(e.target.getAttribute("data-id"));
      editEmployee(employeeId);
    }

    if (e.target.classList.contains("delete-btn")) {
      const employeeId = parseInt(e.target.getAttribute("data-id"));
      deleteEmployee(employeeId);
    }
  });

  // Add employee button
  if (addEmployeeBtn) {
    addEmployeeBtn.addEventListener("click", addEmployee);
  }

  // Check if we're returning from an edit/add operation
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("refresh")) {
    // Reload employees from localStorage
    employees = JSON.parse(localStorage.getItem("employees")) || [];
    renderEmployeeList();

    // Clean the URL
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

// Initialize the app when the DOM is loaded
document.addEventListener("DOMContentLoaded", init);
