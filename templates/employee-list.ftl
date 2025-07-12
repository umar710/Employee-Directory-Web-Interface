<#-- employee-list.ftl -->
<#-- This template would be rendered server-side with employee data -->
<#-- For this demo, we'll use JavaScript to render the list instead -->
<#-- But here's what the template might look like: -->

<#assign employees = [
    {"id": 1, "firstName": "Alice", "lastName": "Smith", "email": "alice@example.com", "department": "HR", "role": "Manager"},
    {"id": 2, "firstName": "Bob", "lastName": "Johnson", "email": "bob@example.com", "department": "IT", "role": "Developer"},
    {"id": 3, "firstName": "Charlie", "lastName": "Lee", "email": "charlie@example.com", "department": "Finance", "role": "Analyst"}
]>

<#list employees as employee>
    <div class="employee-card">
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
    </div>
</#list>