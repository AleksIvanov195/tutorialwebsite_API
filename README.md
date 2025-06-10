# Interactive Learning Platform - Backend API (Final Year Project)

This repository contains the backend API for my Final Year Project, an interactive e-learning platform. This API is built with Node.js and Express.js and provides all the necessary data and functionality for the frontend application.

**Note:** This is the backend API and is designed to work with the corresponding [**Frontend Application (https://github.com/AleksIvanov195/tutorialwebsite)**].

## Description

This is a RESTful API that handles all business logic, data processing, and authentication for the e-learning platform. It uses JSON Web Tokens (JWT) for secure, stateless authentication and has role-based access control to differentiate between "Learner" and "Content Creator" user types. Middleware is used to manage authentication checks, request validation, and error handling.

## Key Features

* **Secure Authentication:** Full JWT-based authentication system with endpoints for user registration, login, logout, and token refresh.
* **Role-Based Access Control:** Middleware ensures that users can only access endpoints appropriate for their role (Learner vs. Content Creator).
* **CRUD Operations:** Provides full Create, Read, Update, and Delete functionality for core resources like Courses, Lessons, and Quizzes.
* **Data Management:** Interacts with a MariaDB database to store and retrieve all application data.

## Technologies Used

* **Backend:** Node.js, Express.js
* **Database:** MariaDB
* **Authentication:** JSON Web Tokens (JWT)
* **Password Hashing:** bcrypt
* **Testing:** Postman

## API Endpoints

* **Authentication (`/api/users`)**: Handles user registration, login, token refresh, logout, and authentication status checks.
* **Courses (`/api/courses`)**: Full CRUD functionality for courses. Includes specialised endpoints for fetching courses by publication status, courses created by a user, and courses with user-specific statuses.
* **Lessons (`/api/lessons`) & Quizzes (`/api/quizzes`)**: Full CRUD functionality, including endpoints for fetching content created by a specific user.
* **Questions (`/api/questions`) & Answers (`/api/answers`)**: Full CRUD functionality to build out the quiz system.
* **User Progress (`/api/usercourses`, `/api/userlessons`, `/api/userquizzes`)**: Endpoints dedicated to managing user enrolment and tracking completion of content.
* **Supporting Resources (`/api/coursecategories`, etc.)**: CRUD endpoints for managing supplementary data like categories.
* 
**For a complete list of all available endpoints and their structures, please see the `routes/defaultRouter.js` file or the routing files.**

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
* A running instance of MariaDB

### Installation & Setup

1.  Clone the repository.
2.  Navigate to the project directory.
3.  Install NPM packages:
    ```
    npm install
    ```
4.  Create a `.env` file in the root of the project and add the necessary environment variables:
    ```
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=your_db_name
    ALLOWED_DOMAINS=http://localhost:5173
    ACCESS_TOKEN_SECRET=your_super_secret_key_for_access_tokens
    REFRESH_TOKEN_SECRET=your_other_super_secret_key_for_refresh_tokens
    ```
5.  Start the server:
    ```
    npm run devStart
    ```
The API should now be running locally.
