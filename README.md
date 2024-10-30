# User-Management-System
## Objective
The objective of this project is to develop a scalable, secure, and robust RESTful API for managing users in an application. Designed with industry best practices, this API provides essential functionality for user registration, authentication, authorization, and management, ensuring secure access and role-based permissions.

## Functionality
This User Management System performs the following core operations:

#### 1.  User Registration: Users can register by providing basic details, with validation for essential fields like email and password.
#### 2. Authentication: Users can log in with a secure authentication mechanism using JWT (JSON Web Token).
#### 3. Authorization: Implements role-based access control (RBAC), where certain routes and actions are accessible only to users with specific roles (e.g., admin).
#### 4. User Management: Admins can view, update, and delete (soft delete) user accounts.
#### 5. Token Refresh: Provides functionality for refreshing JWT tokens, enhancing security and user experience.
#### 6. Error Handling and Logging: Standardized error handling and logging for system stability and ease of debugging.

## Tech Stack 
#### Backend : Node.js, Express.js
#### Database: MongoDB with Mongoose for data modeling
#### Language: TypeScript for type safety and improved code quality
### Third-Party Libraries
#### Express.js - For building RESTful APIs.
#### TypeScript - Enhances code quality with static typing.
#### Mongoose - Provides a schema-based solution for MongoDB.
#### JWT (jsonwebtoken) - For managing authentication and secure session tokens.
#### bcrypt - Used to securely hash and verify user passwords.
#### dotenv - Loads environment variables for secure and flexible configurations.
#### Joi - Used for data validation, ensuring correct and secure input data for each API endpoint.
#### Winston - Logger for tracking API requests and errors, aiding in monitoring and troubleshooting.
#### morgan - Logs HTTP requests, useful during development.
#### Nodemailer - Handles email notifications, such as verification emails for new users.
#### Swagger - Auto-generates interactive API documentation, making it easier for developers to understand and test endpoints.


## Additional Features Implemented

### 1. Modern JavaScript (ES6) Features:
#### Arrow Functions: Streamlined syntax and improved readability across all functions.
#### Destructuring: Utilized destructuring for cleaner and more maintainable code when handling objects and arrays.
#### Template Literals: Improved string handling, especially for dynamic content in responses and error messages.
#### Async/Await: Used async/await syntax for asynchronous operations, resulting in better readability and flow control in asynchronous code.

### 2. MVC Architecture:

#### Structured the project following the Model-View-Controller (MVC) architecture to ensure separation of concerns and modularity.
#### Organized the code into distinct folders for Models, Views (primarily for API responses and error handling), and Controllers to handle the core application logic.
#### This architecture enhances maintainability, scalability, and makes future feature expansion easier.

### 3. Best Coding Practices:

#### Linting and Formatting: Integrated ESLint and Prettier to enforce consistent code style and eliminate common errors.
#### Error Handling: Used centralized error handling middleware, enabling structured and uniform error responses.
#### Environment-Based Configuration: Implemented configuration management using environment variables to support different environments (development, production) securely.


## Setup Instructions

Step 1: Prerequisites
#### Node.js (v14+)
#### MongoDB (running locally or a MongoDB Compass connection string)
#### Git (for cloning the project)

Step 2: Clone the Repository
Clone the repository to your local machine using:

```bash
git clone https://github.com/arpit-288/User-Management-System
cd your-repo-name
```

Step 3: Install Dependencies
Navigate to the project directory and install the required packages:

```bash
npm install
```

Step 4: Set Up Environment Variables
Create a .env file in the root of the project with the following contents:

```painText
MONGO_URI = 'mongodb://localhost:27017/'
PORT = 3000

JWT_SECRET_KEY = "KEY101HASHDATA"

ACCESS_TOKEN_SECRET='ACCESS_TOK_101_HASH_DATA'
REFRESH_TOKEN_SECRET='REFRESH_TOK_101_HASH_DATA'

NODE_ENV = 'development'

EMAIL_USER = 'abc@gmail.com'
EMAIL_PASS = 'password'
```

Step 5: Start the Server
To start the development server, run:

```bash
npm start
```

The server will run on http://localhost:3000 by default. You can modify the port in the .env file.


This User Management System is designed to be a comprehensive, secure, and scalable solution for managing user accounts, with best practices integrated into every aspect of the code. By leveraging a range of technologies and libraries, it provides a reliable foundation for applications requiring robust user authentication, authorization, and management features. We welcome contributions and suggestions from the developer community to continually improve and adapt this project. Thank you giving me the Opportunity to design this system—happy coding!

