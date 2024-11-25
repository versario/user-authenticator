
# User Authentication and Management API

This repository provides a Node.js API with user management (CRUD) and authentication functionality built using JWT (JSON Web Tokens). It follows hexagonal architecture and clean code principles, and includes features such as user registration, login, token verification, and protected CRUD operations on user data.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Environment Variables](#environment-variables)
  - [Running the API](#running-the-api)
  - [Testing with Postman](#testing-with-postman)
- [API Endpoints](#api-endpoints)
  - [Authentication Routes](#authentication-routes)
  - [User Routes](#user-routes)
- [License](#license)

## Features

- User registration with hashed password storage.
- User login with JWT-based authentication.
- JWT token verification and protected routes.
- Full CRUD operations for individual user data, accessible only with valid authentication.
- Modular codebase following hexagonal architecture for scalability and maintainability.

## Architecture

This project is structured using hexagonal architecture, also known as ports and adapters architecture, which promotes separation of concerns and modularity. The code is organized into the following layers:

- **Domain**: Contains core business logic, entities, and repository interfaces.
- **Application**: Houses use cases for business rules.
- **Infrastructure**: Contains repositories, controllers, routes, middleware, and services, which act as the interface between the application layer and external systems.
- **Config**: Contains the database configuration (`mongodb.js`) to establish a MongoDB connection.

Each feature (like user management and authentication) is almost entirely self-contained within its own directory, following the vertical slicing approach. **An exception is the `registerUser` function in the authentication domain, which uses the `createUser` functionality from the user management domain.** This enables the authentication domain to leverage user creation logic without duplicating functionality, ensuring consistent user creation practices.

## Technologies Used

- **Node.js** and **Express**: For building the server and handling requests.
- **MongoDB** with **Mongoose**: For database management.
- **jsonwebtoken**: For secure authentication.
- **bcrypt**: For hashing user passwords.
- **dotenv**: For managing environment variables.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (either locally installed or a MongoDB Atlas account)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/versario/user-authenticator.git
   cd user-authenticator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root of your project and add the following variables:

     ```plaintext
     MONGODB_URI=mongodb://localhost:27017/your_database
     PORT=3000
     JWT_SECRET=your_jwt_secret
     ```

4. **Database Configuration**: MongoDB should be running locally, or you can replace `MONGODB_URI` with your MongoDB Atlas connection string.

## Usage

### Environment Variables

Make sure the following environment variables are set in the `.env` file:

- `MONGODB_URI`: MongoDB connection URI.
- `PORT`: Port where the server will run.
- `JWT_SECRET`: Secret key for signing JWTs.

### Running the API

```bash
npm start
```

The API should now be running at `http://localhost:3000`.

### Testing with Postman

To test the API, you can use [Postman](https://www.postman.com/) or any other API client. Configure the Authorization header with the JWT token after logging in.

## API Endpoints

### Authentication Routes

- **POST /auth/register**: Register a new user.
  - Body: `{ "name": "string", "email": "string", "password": "string" }`
- **POST /auth/login**: Authenticate an existing user.
  - Body: `{ "email": "string", "password": "string" }`

### User Routes

- **POST /users**: Create a new user (requires authentication).
  - Body: `{ "name": "string", "email": "string", "password": "string" }`
- **GET /users/:id**: Get a single user by ID (requires authentication).
- **PUT /users/:id**: Update a user by ID (requires authentication).
  - Body: `{ "name": "string", "email": "string", "password": "string" }`
- **DELETE /users/:id**: Delete a user by ID (requires authentication).

**Note**: Include a valid JWT token in the Authorization header as `Bearer <token>` to access the user routes.

## License

This project is open-source and available under the MIT License.
