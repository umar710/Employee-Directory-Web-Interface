# Employee Directory Web Interface

A responsive and interactive employee directory application built with HTML, CSS, JavaScript, and Freemarker templates.

## Features

- View employee list in card or grid layout
- Add/edit employee information
- Filter employees by name, department, or role
- Sort employees by first name or department
- Search functionality
- Pagination with configurable items per page
- Responsive design for desktop, tablet, and mobile

## Setup

1. Clone this repository
2. Open `index.html` in a web browser
3. No server required - all data is stored in memory

## Project Structure

- `index.html` - Main dashboard page
- `edit-employee.html` - Add/edit employee form
- `css/style.css` - Main stylesheet
- `js/app.js` - Main application logic
- `js/form-validation.js` - Form validation logic
- `templates/employee-list.ftl` - Freemarker template for employee list

## Technologies Used

- HTML5
- CSS3 (with Flexbox and Grid)
- JavaScript (ES6)
- Freemarker (for templating)

## Implementation Notes

- All data is stored in memory (no backend required)
- Form validation is done client-side
- Responsive design works on all screen sizes
- Clean, modular code structure

## Future Improvements

- Connect to a real backend API
- Add user authentication
- Implement more advanced filtering options
- Add employee photo upload functionality
- Improve accessibility features
