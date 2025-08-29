# User Registration Endpoint Documentation

## Endpoint

`POST /users/register`

## Description

Registers a new user in the Uber-WebApp system.  
This endpoint validates the input, hashes the password, and returns a JWT token upon successful registration.

## Request Body

Send a JSON object with the following structure:

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

### Field Requirements

- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, optional): Minimum 3 characters if provided.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

## Responses

| Status Code | Description                                 | Response Body Example                      |
|-------------|---------------------------------------------|--------------------------------------------|
| 201         | User registered successfully                | `{ "token": "<jwt_token>", "user": { ... } }` |
| 400         | Validation error or missing fields          | `{ "errors": [ ... ] }` or `{ "error": "First name, email and password are required" }` |
| 500         | Internal server error                       | `{ "error": "Internal server error" }`     |

## Example Request

```http
POST /users/register
Content-Type: application/json

{
  "fullname": {
    "firstname": "Alice",
    "lastname": "Smith"
  },
  "email": "alice@example.com",
  "password": "securepassword"
}
```

## Example Successful Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f8c2e1b6a4d9e3f0b5a7c2",
    "fullname": {
      "firstname": "Alice",
      "lastname": "Smith"
    },
    "email": "alice@example.com"
  }
}
```

---

# User Login Endpoint Documentation

## Endpoint

`POST /users/login`

## Description

Authenticates a user with email and password.  
Returns a JWT token and user data if credentials are valid.

## Request Body

Send a JSON object with the following structure:

```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

## Responses

| Status Code | Description                                 | Response Body Example                      |
|-------------|---------------------------------------------|--------------------------------------------|
| 200         | Login successful                            | `{ "token": "<jwt_token>", "user": { ... } }` |
| 400         | Validation error or missing fields          | `{ "errors": [ ... ] }`                   |
| 401         | Invalid email or password                   | `{ "error": "Invalid email or password" }` |
| 500         | Internal server error                       | `{ "error": "Internal server error" }`     |

## Example Request

```http
POST /users/login
Content-Type: application/json

{
  "email": "alice@example.com",
  "password": "securepassword"
}
```

## Example Successful Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f8c2e1b6a4d9e3f0b5a7c2",
    "fullname": {
      "firstname": "Alice",
      "lastname": "Smith"
    },
    "email": "alice@example.com"
  }
}
```

---

# User Profile Endpoint Documentation

## Endpoint

`GET /users/profile`

## Description

Returns the authenticated user's profile information.  
Requires a valid JWT token in the `Authorization` header or as a cookie.

## Authentication

- **Header:** `Authorization: Bearer <token>`
- **Cookie:** `token=<jwt_token>`

## Responses

| Status Code | Description                      | Response Body Example                |
|-------------|----------------------------------|--------------------------------------|
| 200         | Success                          | `{ "user": { ... } }`                |
| 401         | Unauthorized or token missing    | `{ "error": "Access denied. Unauthorized." }` |
| 400         | Invalid or expired token         | `{ "error": "Unauthorized" }`        |

## Example Request

```http
GET /users/profile
Authorization: Bearer <jwt_token>
```

## Example Successful Response

```json
{
  "user": {
    "_id": "64f8c2e1b6a4d9e3f0b5a7c2",
    "fullname": {
      "firstname": "Alice",
      "lastname": "Smith"
    },
    "email": "alice@example.com"
  }
}
```

---

# User Logout Endpoint Documentation

## Endpoint

`GET /users/logout`

## Description

Logs out the authenticated user by blacklisting the current JWT token and clearing the authentication cookie.  
Requires a valid JWT token in the `Authorization` header or as a cookie.

## Authentication

- **Header:** `Authorization: Bearer <token>`
- **Cookie:** `token=<jwt_token>`

## Responses

| Status Code | Description                      | Response Body Example                |
|-------------|----------------------------------|--------------------------------------|
| 200         | Logout successful                | `{ "message": "Logged out successfully" }` |
| 401         | Unauthorized or token missing    | `{ "error": "Access denied. Unauthorized." }` |
| 400         | Invalid or expired token         | `{ "error": "Unauthorized" }`        |

## Example Request

```http
GET /users/logout
Authorization: Bearer <jwt_token>
```

## Example Successful Response

```json
{
  "message": "Logged out successfully"
}
```

---

# Captain Registration Endpoint Documentation

## Endpoint

`POST /captain/register`

## Description

Registers a new captain (driver) in the Uber-WebApp system.  
This endpoint validates the input, hashes the password, and returns a JWT token upon successful registration.

## Request Body

Send a JSON object with the following structure:

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

### Field Requirements

- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, optional): Minimum 3 characters if provided.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.
- `vehicle.plate` (string, required): Minimum 3 characters.
- `vehicle.colour` (string, required)
- `vehicle.capacity` (integer, required): Minimum 1.
- `vehicle.vehicleType` (string, required): Must be one of `bike`, `car`, or `auto`.

## Responses

| Status Code | Description                                 | Response Body Example                      |
|-------------|---------------------------------------------|--------------------------------------------|
| 201         | Captain registered successfully             | `{ "token": "<jwt_token>", "captain": { ... } }` |
| 400         | Validation error or missing fields          | `{ "errors": [ ... ] }`                   |
| 500         | Internal server error                       | `{ "error": "Internal server error" }`     |

## Example Request

```http
POST /captain/register
Content-Type: application/json

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

## Example Successful Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "65f8c2e1b6a4d9e3f0b5a7c2",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.captain@example.com",
    "vehicle": {
      "plate": "ABC123",
      "colour": "Red",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```