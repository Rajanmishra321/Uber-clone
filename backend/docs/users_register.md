# Backend API Documentation
## `/users/register` Endpoint

## Description
This endpoint registers a new user and returns a JSON response containing the user details and an authentication token.

## Request Body
```json
{
  
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"  // optional
  },
  "email": "user@example.com",
  "password": "your password"
}
```

### Validation Rules
- `email`: Must be a valid email format.
- `fullname.firstname`: Must be at least 3 characters long.
- `password`: Must be at least 6 characters long.

## HTTP Method
This endpoint uses the `POST` HTTP method to create a new user.

### Response
- **201 Created**
  - Returns a JSON object containing the user and token:
  ```json
  {
    "user": {
      "firstname": "John",
      "lastname": "Doe",
      "email": "user@example.com"
    },
    "token": "your_auth_token"
  }
  ```

- **400 Bad Request**
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
