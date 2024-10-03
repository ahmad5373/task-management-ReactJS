# Project Management System - Frontend
This is the frontend of the Project Management System built with React.js and Bootstrap. It provides a role-based dashboard with specific functionalities for Admin, Manager, and Regular Users. Users can manage tasks, view assigned tasks, and handle user management operations based on their roles.

# Features
General Features
User Authentication: Login and registration with JWT-based authentication.
 
# Role-based Dashboards:
Admin: Manage tasks and users.
Assign users to managers.
Manager:Manage own tasks and tasks of assigned users.
Regular User:Manage personal tasks only.

# Task Management:
Create, update, delete, and view tasks.
Task filtering by status and due date.

# User Management (Admin):
Add, edit, and remove users.
Assign users to managers.

# Dynamic Navigation: Role-based navigation and sidebar.
## Tech Stack
React.js: A JavaScript library for building user interfaces.
Bootstrap: A responsive front-end framework.
Axios: HTTP client for API calls.
React Router: For handling routing in the application.
Toastify: For notifications.
Role-based Routing: Ensures proper access control for different user roles.

# Getting Started
Follow these instructions to get the project up and running on your local machine.

## Prerequisites
Before you begin, ensure you have the following installed on your system:
Node.js (version 14 or higher)
npm (Node Package Manager)
Installation

## Clone the Repository:
git clone https://github.com/ahmad5373/task-management-ReactJS.git
Navigate to the Project Directory:

cd frontend
Install Dependencies:

Run the following command to install the necessary packages:

npm install
Set up Environment Variables:

Create a .env file in the root directory and add the following environment variables:
REACT_APP_API_URL=http://localhost:5000/

## Running the Application
Start the Development Server:

npm run start
The application will start on http://localhost:3000. You can now open your browser and navigate to that URL to view the project.

# Project Structure
The folder structure of the frontend is organized as follows:

├── public
├── src
│   ├── assets              # Static assets like images, styles, etc.
│   ├── components          # Reusable components like Navbar, Sidebar, etc.
│   ├── Modals              # Reusable components for create edit popup modal, etc.
│   ├── pages               # Pages for different views (Dashboard, Login, etc.)
│   ├── utils               # Helper functions and API services
│   ├── App.js              # Main application file
│   ├── index.js            # Entry point of the application
├── .env                    # Environment variables
├── package.json            # Project dependencies and scripts

# Available Scripts
In the project directory, you can run:

npm run start: Runs the app in the development mode.
npm run build: Builds the app for production.
npm run test: Runs the test cases (if any).
npm run eject: Ejects the project from the create-react-app setup.

# API Integration
The frontend interacts with the backend via RESTful API calls using Axios. Here are the main endpoints used in the frontend:
POST /api/auth/login: User login.
POST /api/auth/register: User registration.
GET /api/users: Fetch all users (Admin only).
GET /api/tasks: Fetch tasks for the logged-in user or assigned users.
POST /api/tasks: Create a new task.
PUT /api/tasks/:id: Update a task.
DELETE /api/tasks/:id: Delete a task.

# Role-based Access
The application has role-based access control:
Admin: Full access to manage users and tasks.
Manager: Access to their tasks and tasks of assigned users.
Regular User: Access to personal tasks only.

License
This project is licensed under the MIT License.
