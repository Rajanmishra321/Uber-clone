# Backend API Documentation

## `/users/register` Endpoint
### Description
This endpoint registers a new user and returns a JSON response containing the user details and an authentication token.

### Method
`POST`

### Request Body
```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"  // optional
  },
  "email": "string",
  "password": "string"
}
```

### Validation Rules
- `email`: Must be a valid email format.
- `firstname`: Must be at least 3 characters long.
- `password`: Must be at least 6 characters long.

### Response
- **201 Created**:
  - Returns a JSON object containing the user and token:
  ```json
  {
    "user": {
      "firstname": "John",
      "lastname": "Doe",
      "email": "user@example.com",
      "password": "hashed_password"
    },
    "token": "your_auth_token"
  }
  ```

- **400 Bad Request**:
  - Returns validation errors if the input data is invalid:
  ```json
  {
    "error": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      }
    ]
  }
  ```

## `/users/login` Endpoint
### Description
This endpoint logs in a user and returns a JSON response containing an authentication token.

### Method
`POST`

### Request Body
```json
{
  "email": "string",
  "password": "string"
}
```

### Validation Rules
- `email`: Must be a valid email format.
- `password`: Must be at least 6 characters long.

### Response
- **200 OK**:
  - Returns a JSON object containing the user and token:
  ```json
  {
    "user": {
      "firstname": "John",
      "lastname": "Doe",
      "email": "user@example.com",
      "password": "hashed_password"
    },
    "token": "your_auth_token"
  }
  ```

- **400 Bad Request**:
  - Returns validation errors if the input data is invalid:
  ```json
  {
    "error": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      }
    ]
  }
  ```
