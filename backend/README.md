# Uber WebApp - Backend

A Node.js backend service for the Uber-like ride-sharing application built with Express.js and MongoDB.

## Features

- **User Management**: Registration, login, profile management for passengers
- **Captain Management**: Registration, login, profile management for drivers
- **Ride Management**: Create, track, and manage rides
- **Real-time Communication**: Socket.io integration for live tracking
- **Authentication**: JWT-based authentication with token blacklisting
- **Maps Integration**: Google Maps API integration for location services

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time**: Socket.io
- **Security**: bcrypt for password hashing, CORS enabled

## Project Structure

```
backend/
├── controllers/     # Route controllers
├── models/         # Database models
├── routes/         # API routes
├── services/       # Business logic
├── middlewares/    # Custom middlewares
├── db/            # Database configuration
├── app.js         # Express app configuration
└── server.js      # Server entry point
```

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend root directory with the following variables:
```env
# MongoDB connection string (local or cloud)
DB_CONNECT=mongodb://localhost:27017/uber-webapp
# or for MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/uber-webapp

# JWT secret key for token signing (use a strong, random string)
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random

# Server port (default: 5000)
PORT=5000

# Google maps API key for Live tracking
GOOGLE_MAPS_API=your_google_maps_api_key
```

### Environment Variables Setup

#### MongoDB Setup Options:

**Option 1: Local MongoDB**
```env
DB_CONNECT=mongodb://localhost:27017/uber-webapp
```

**Option 2: MongoDB Atlas (Cloud)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Get your connection string
4. Replace `<username>`, `<password>`, and `<cluster>` in the connection string
```env
DB_CONNECT=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/uber-webapp?retryWrites=true&w=majority
```

#### JWT Secret Key
Generate a strong secret key for JWT token signing:
```bash
# Using Node.js crypto
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Or use any long, random string (minimum 32 characters recommended).

4. Start the server:
```bash
node server.js
```

## API Endpoints

### User Routes (`/users`)
- `POST /register` - User registration
- `POST /login` - User login
- `GET /profile` - Get user profile
- `GET /logout` - User logout

### Captain Routes (`/captain`)
- `POST /register` - Captain registration
- `POST /login` - Captain login
- `POST /profile` - Get captain profile
- `GET /logout` - Captain logout

### Maps Routes (`/maps`)
- Location and mapping related endpoints

### Ride Routes (`/rides`)
- Ride creation, tracking, and management endpoints

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB object modeling
- **socket.io**: Real-time communication
- **jsonwebtoken**: JWT authentication
- **bcryptjs**: Password hashing
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management

## Development

The backend runs on port 5000 by default. Make sure MongoDB is running and accessible via the connection string in your `.env` file.

---

## API Documentation

### User Registration Endpoint

**Endpoint:** `POST /users/register`

**Description:** Registers a new user in the Uber-WebApp system. Validates the input, hashes the password, and returns a JWT token upon successful registration.

**Request Body:**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Field Requirements:**
- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, optional): Minimum 3 characters if provided.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

**Responses:**
| Status Code | Description | Response Body Example |
|-------------|-------------|----------------------|
| 201 | User registered successfully | `{ "token": "<jwt_token>", "user": { ... } }` |
| 400 | Validation error or missing fields | `{ "errors": [ ... ] }` |
| 500 | Internal server error | `{ "error": "Internal server error" }` |

### User Login Endpoint

**Endpoint:** `POST /users/login`

**Description:** Authenticates a user with email and password. Returns a JWT token and user data if credentials are valid.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Responses:**
| Status Code | Description | Response Body Example |
|-------------|-------------|----------------------|
| 200 | Login successful | `{ "token": "<jwt_token>", "user": { ... } }` |
| 400 | Validation error or missing fields | `{ "errors": [ ... ] }` |
| 401 | Invalid email or password | `{ "error": "Invalid email or password" }` |
| 500 | Internal server error | `{ "error": "Internal server error" }` |

### User Profile Endpoint

**Endpoint:** `GET /users/profile`

**Description:** Returns the authenticated user's profile information. Requires a valid JWT token in the `Authorization` header or as a cookie.

**Authentication:**
- **Header:** `Authorization: Bearer <token>`
- **Cookie:** `token=<jwt_token>`

**Responses:**
| Status Code | Description | Response Body Example |
|-------------|-------------|----------------------|
| 200 | Success | `{ "user": { ... } }` |
| 401 | Unauthorized or token missing | `{ "error": "Access denied. Unauthorized." }` |
| 400 | Invalid or expired token | `{ "error": "Unauthorized" }` |

### User Logout Endpoint

**Endpoint:** `GET /users/logout`

**Description:** Logs out the authenticated user by blacklisting the current JWT token and clearing the authentication cookie.

**Authentication:**
- **Header:** `Authorization: Bearer <token>`
- **Cookie:** `token=<jwt_token>`

**Responses:**
| Status Code | Description | Response Body Example |
|-------------|-------------|----------------------|
| 200 | Logout successful | `{ "message": "Logged out successfully" }` |
| 401 | Unauthorized or token missing | `{ "error": "Access denied. Unauthorized." }` |
| 400 | Invalid or expired token | `{ "error": "Unauthorized" }` |

---

## Captain Routes Documentation

### Captain Registration

**Endpoint:** `POST /captain/register`

**Description:** Registers a new captain (driver) in the Uber-WebApp system. Validates input, hashes the password, and returns a JWT token upon successful registration.

**Request Body:**
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.captain@example.com",
  "password": "securepassword",
  "vehicle": {
    "plate": "ABC123",
    "colour": "Red",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

**Field Requirements:**
- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, optional): Minimum 3 characters if provided.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.
- `vehicle.plate` (string, required): Minimum 3 characters.
- `vehicle.colour` (string, required)
- `vehicle.capacity` (integer, required): Minimum 1.
- `vehicle.vehicleType` (string, required): Must be one of `bike`, `car`, or `auto`.

**Responses:**
| Status Code | Description | Response Body Example |
|-------------|-------------|----------------------|
| 201 | Captain registered successfully | `{ "token": "<jwt_token>", "captain": { ... } }` |
| 400 | Validation error or missing fields | `{ "errors": [ ... ] }` |
| 500 | Internal server error | `{ "error": "Internal server error" }` |

### Captain Login

**Endpoint:** `POST /captain/login`

**Description:** Authenticates a captain with email and password. Returns a JWT token and captain data if credentials are valid.

**Request Body:**
```json
{
  "email": "jane.captain@example.com",
  "password": "securepassword"
}
```

**Responses:**
| Status Code | Description | Response Body Example |
|-------------|-------------|----------------------|
| 200 | Login successful | `{ "token": "<jwt_token>", "captain": { ... } }` |
| 400 | Validation error or missing fields | `{ "errors": [ ... ] }` |
| 401 | Invalid email or password | `{ "error": "Invalid email or password" }` |
| 500 | Internal server error | `{ "error": "Internal server error" }` |

### Captain Profile

**Endpoint:** `POST /captain/profile`

**Description:** Returns the authenticated captain's profile information. Requires a valid JWT token in the `Authorization` header or as a cookie.

**Authentication:**
- **Header:** `Authorization: Bearer <token>`
- **Cookie:** `token=<jwt_token>`

**Responses:**
| Status Code | Description | Response Body Example |
|-------------|-------------|----------------------|
| 200 | Success | `{ "captain": { ... } }` |
| 401 | Unauthorized or token missing | `{ "error": "Access denied. Unauthorized." }` |
| 400 | Invalid or expired token | `{ "error": "Unauthorized" }` |

### Captain Logout

**Endpoint:** `GET /captain/logout`

**Description:** Logs out the authenticated captain by blacklisting the current JWT token and clearing the authentication cookie.

**Authentication:**
- **Header:** `Authorization: Bearer <token>`
- **Cookie:** `token=<jwt_token>`

**Responses:**
| Status Code | Description | Response Body Example |
|-------------|-------------|----------------------|
| 200 | Logout successful | `{ "message": "Logged out successfully" }` |
| 401 | Unauthorized or token missing | `{ "error": "Access denied. Unauthorized." }` |
| 400 | Invalid or expired token | `{ "error": "Unauthorized" }` |