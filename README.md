# CRUD REST API with User Registration and Authentication

## Overview

This Node.js project is a CRUD (Create, Read, Update, Delete) REST API for managing user data securely. It includes features like user registration, login, user details updates, and user deletion. User passwords are stored securely as hashed values, and user data is persisted in JSON format using the `fs` module. Authentication is implemented using Passport middleware and JSON Web Tokens (JWT) for session management.

## Features

- **User Registration**: Users can register by sending a POST request to `/register`. Their password is securely hashed using the bcrypt middleware before storing it in the JSON data file.

- **User Login**: To authenticate, users send a POST request to `/login`. The API validates the user's email and password, comparing the hashed password with the stored value. If successful, a JWT is generated for session authentication.

- **User Updates**: Users can update their details with a PUT request to `/update`. Authentication is required and is handled by Passport middleware.

- **User Deletion**: Deleting a user is possible with a DELETE request to `/delete`. Authorization is checked to ensure the request is legitimate.

- **Get All User Details**: To retrieve all user details, a GET request to `/users` is used. Proper authorization is enforced to protect user data.

## Installation

1. Clone this repository: `git clone https://github.com/yourusername/yourproject.git`
2. Navigate to the project directory: `cd yourproject`
3. Install dependencies: `npm install`

## Usage

1. Start the server: `npm start`
2. Access the API endpoints using a tool like Postman or cURL.

## API Endpoints

- **User Registration**: `POST /register`
  - Request Body: `{ "email": "user@example.com", "password": "securepassword" }`
  - Response: `{ "message": "Registration successful" }`

- **User Login**: `POST /login`
  - Request Body: `{ "email": "user@example.com", "password": "securepassword" }`
  - Response: `{ "token": "yourjsonwebtoken" }`

- **User Updates**: `PUT /updateUser/:id`
  - Authorization Header: `Bearer yourjsonwebtoken`
  - Request Body: `{ "email": "newemail@example.com" }`
  - Response: `{ "message": "User updated successfully" }`

- **User Deletion**: `DELETE /deleteUser/:id`
  - Authorization Header: `Bearer yourjsonwebtoken`
  - Response: `{ "message": "User deleted successfully" }`

- **Get All User Details**: `GET /listAllUsers`
  - Authorization Header: `Bearer yourjsonwebtoken`
  - Response: `[{"email": "user1@example.com"}, {"email": "user2@example.com"}, ...]`

## Security

- Passwords are securely hashed before storage.
- Authentication is implemented with Passport middleware.
- JWTs are used for session authentication.
- Proper error handling is in place for all scenarios.

## API Access

The API can be accessed at the following URL:

- User Registration: `POST http://localhost:4000/register`

To generate a user ID during user registration, a random function is used.

### JSON API Data for Registration

```json
{
  "fullname": "Prateek Bajpai",
  "username": "pkuser",
  "email": "prateek.cse.uiet@gmail.com",
  "phoneno": "9953368874",
  "gender": "male",
  "password": "PK@125368745"
}
