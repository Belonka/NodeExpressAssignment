### Overview
This program is a back-end application to manage users, incomes and expenses. Built with Node.js, Express and Firebase as database.

## Features

- **Frontend:** Uses HTML to display the list of options.
- **Backend:** Node.js with Express, providing a  RESTful API for managing users, incomes and expenses.
- **Database:** Firebase used for persistent data storage.

## Getting started

### Prerequisites

- Node.js and npm installed on your machine.
- Firebase account and project set up.
- Git installed


# Routing

The Express framework handles routing for API endpoints, processing HTTP requests from the frontend and sending back responses.

# Database Interaction:

The backend connects to Firebase using firebaseConfig. It performs CRUD (Create, Read, Update, Delete) operations and  stored in the database.

## Istallation

1. Clone the repository:

https://github.com/Belonka/NodeExpressAssignment.git

2.Install dependencies:

- npm install

### Start the development server:
cd npx nodemon main.js


### To start the browser:
cd express
npm start
Running the Application
The application will be accessible at http://localhost:4002 in your web browser.


### API Endpoints

## User Endpoints

- GET /users → Retrieve all users
- POST /users → Add a new user
- PUT /users/:id → Update an existing user by ID
- DELETE /users/:id → Delete a user by ID


## Expenses Endpoints

- GET /expenses → Retrieve all expenses
- POST /expenses → Add a new expense
- PUT /expenses/:id → Update an existing expense by ID
- DELETE /expenses/:id → Delete an expense by ID


## Income Endpoints

- GET /income → Retrieve all income
- POST /income → Add new income
- PUT /income/:id → Update an existing income by ID
- DELETE /income/:id → Delete an income by ID

# Routing

The Express framework handles routing for API endpoints, processing HTTP requests from the frontend and sending back responses.

# Database Interaction:

The backend connects to Firebase using firebaseConfig. It performs CRUD (Create, Read, Update, Delete) operations and  stored in the database.

## API Requests

The admin sends HTTP requests to the Express backend, depending on the user action (e.g., adding a new user, update user).
The backend processes these requests, interacts with the Firebase database to perform the required operation, and sends back a response.

## Data Management

This backend app uses Node.js and Express.js to manage users, incomes, and expenses in a Firebase database. The backend operations rely on async/await to handle asynchronous requests efficiently, preventing the main execution thread from blocking.

## Error Handling
The program includes basic error handling using async/await. If an API request fails (e.g., due to a network issue or server error), the application catches the error inside a try/catch block. The error is logged to the console for debugging, and an appropriate error message may be displayed to the user.

Using async/await, the error handling becomes cleaner and more readable compared to traditional .then().catch() methods.

## Summary

Finance API is a RESTful API built with Node.js, Express, and Firebase to manage users, income, and expenses. It allows users to track financial transactions through secure CRUD operations while ensuring data organization and scalability. This API serves as a backend solution for finance management applications, enabling efficient budgeting and expense tracking.