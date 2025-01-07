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
    "lastname": "string" // optional
  },
  "email": "string",
  "password": "string"
}
```

### Validation Rules

- **email**: Must be a valid email format.
- **firstname**: Must be at least 3 characters long.
- **password**: Must be at least 6 characters long.

### Response

- **201 Created**: Returns a JSON object containing the user and token:

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

- **400 Bad Request**: Returns validation errors if the input data is invalid:

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
````

### Validation Rules

- `email`: Must be a valid email format.
- `password`: Must be at least 6 characters long.

### Response

- **200 OK**:

  - Returns a JSON object containing the user and token:

  ````json
  {
    "user": {
      "firstname": "John",
      "lastname": "Doe",
      "email": "user@example.com",
      "password": "hashed_password"
    },
    "token": "your_auth_token"
  }
  ````

- **400 Bad Request**:
  - Returns validation errors if the input data is invalid:
  ````json
  {
    "error": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      }
    ]
  }
  ````

## `/users/profile` Endpoint

### Description

Retrieves the profile information of the authenticated user.

### Requirements

The user must be authenticated (JWT token must be provided).

### Response

- **200 OK**:

  - Returns a JSON object containing user details:

  ````json
  {
    "firstname": "John",
    "lastname": "Doe",
    "email": "user@example.com"
  }
  ````

- **400 Bad Request**:
  - Returns an error message if the user is not authenticated:
  ````json
  {
    "error": "Unauthorized"
  }
  ````

## `/users/logout` Endpoint

### Description

Logs out the authenticated user by clearing the token and blacklisting it.

### Requirements

The user must be authenticated (JWT token must be provided).

### Response

- **200 OK**:

  - Returns a success message:

  ````json
  {
    "message": "Logged out successfully"
  }
  ````

- **400 Bad Request**:
  - Returns an error message if the user is not authenticated:
  ````json
  {
    "error": "Unauthorized"
  }
  ````

## `/captains/register` Endpoint

### Description

This endpoint registers a new captain and returns a JSON response containing the captain details.

### Method

`POST`

### Request Body

````json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string" // optional
  },
  "email": "string",
  "password": "string",
  "vehicle": {
    "color": "string",
    "vehicleType": "string", // must be one of ['car', 'motorcycle', 'auto']
    "numberPlate": "string",
    "capacity": "integer" // must be at least 1
  }
}
````

### Validation Rules

- `firstname`: Must be at least 3 characters long.
- `email`: Must be a valid email format.
- `password`: Must be at least 6 characters long.
- `vehicle.color`: Must be at least 3 characters long.
- `vehicle.vehicleType`: Must be one of ['car', 'motorcycle', 'auto'].
- `vehicle.numberPlate`: Must be at least 3 characters long.
- `vehicle.capacity`: Must be an integer of at least 1.

### Response

- **200 OK**:

  - Returns a JSON object containing the captain details and token:

  ````json
  {
    "token": "your_auth_token",
    "captain": {
      "firstname": "string",
      "lastname": "string",
      "email": "string",
      "color": "string",
      "numberPlate": "string",
      "vehicleType": "string",
      "capacity": "integer"
    }
  }
  ````

- **400 Bad Request**:
  - Returns validation errors if the input data is invalid:
  ````json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "parameter_name",
        "location": "body"
      }
    ]
  }
  ````
  - Returns a message if the captain already exists:
  ````json
  {
    "message": "Captain already exist"
  }
  ````

## `/captains/profile` Endpoint

### Description

Retrieves the profile information of the authenticated captain.

### Requirements

The captain must be authenticated (JWT token must be provided).

### Response

- **200 OK**:

  - Returns a JSON object containing captain details:

  ````json
  {
    "firstname": "Your firstname",
    "lastname": "Your lastname",
    "email": "Your email",
    "color": "Vehicle color",
    "numberPlate": "Vehicle number",
    "vehicleType": "[car,motorcycle, auto]",
    "capacity": "Eg. 2,4,5 "
  }
  ````

- **400 Bad Request**:
- Returns an error message if the captain is not authenticated:

## `/captains/logout` Endpoint

### Description

Logs out the authenticated captain by clearing the token and blacklisting it.

### Requirements

The captain must be authenticated (JWT token must be provided).

### Response

- **200 OK**:

  - Returns a success message:

  ```json
  {
    "message": "Logged out successfully"
  }
  ```

- **400 Bad Request**:
  - Returns an error message if the captain is not authenticated:
  ````json
  {
    "error": "Unauthorized"
  }
  ````

## `/captains/login` Endpoint

### Description

This endpoint allows a captain to log in by providing their email and password.

### Method

`POST`

### Request Body

````json
{
  "email": "captain@example.com",
  "password": "yourpassword"
}
````

### Response

- **Success**: Returns a JSON object containing the captain's token and captain details.

````json
{
  "token": "your_jwt_token",
  "captain": {
    // captain details
  }
}
````

- **Failure**: Returns an error message indicating invalid email or password.

````json
{
  "message": "Invalid Email or Password"
}
````

## `/maps/get-coordinates` Endpoint

#### Description
Retrieves the coordinates (latitude and longitude) for a given address.

#### HTTP Method
`GET`

#### Request Parameters
- `address` (string, required): The address for which to retrieve coordinates.

#### Example Request
````
GET /maps/get-coordinates?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA
````

#### Example Response
````json
{
  "ltd": 37.4224764,
  "lng": -122.0842499
}
````

#### Error Response
- `400 Bad Request`: If the address parameter is missing or invalid.
- `404 Not Found`: If the coordinates for the given address could not be found.
````json
{
  "message": "Coordinates not found"
}
````

## `/maps/get-distance-time` Endpoint

#### Description
Retrieves the distance and estimated travel time between two locations.

#### HTTP Method
`GET`

#### Request Parameters
- `origin` (string, required): The starting address or location.
- `destination` (string, required): The destination address or location.

#### Example Request
````
GET /maps/get-distance-time?origin=New+York,NY&destination=Los+Angeles,CA
````

#### Example Response
````json
{
  "distance": {
    "text": "2,789 miles",
    "value": 4486540
  },
  "duration": {
    "text": "1 day 18 hours",
    "value": 154800
  }
}
````

#### Error Response
- `400 Bad Request`: If the origin or destination parameter is missing or invalid.
- `404 Not Found`: If the distance and time for the given locations could not be found.
````json
{
  "message": "No routes found"
}
````

## `/maps/get-suggestions` Endpoint

#### Description
Retrieves autocomplete suggestions for a given input string.

#### HTTP Method
`GET`

#### Request Parameters
- `input` (string, required): The input string for which to retrieve suggestions.

#### Example Request
````
GET /maps/get-suggestions?input=1600+Amphitheatre
````

#### Example Response
````json
[
  "1600 Amphitheatre Parkway, Mountain View, CA, USA",
  "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA"
]
````

#### Error Response
- `400 Bad Request`: If the input parameter is missing or invalid.
- `500 Internal Server Error`: If there is an error retrieving suggestions.
````json
{
  "message": "Unable to fetch suggestions"
}
````

## `/rides/create` Endpoint

#### Description
Creates a new ride with the provided information.

#### HTTP Method
`POST`

#### Authentication
Requires a valid JWT token in the Authorization header: `Authorization: Bearer <token>`

#### Request Body
The request body should be in JSON format and include the following fields:
- `pickup` (string, required): The pickup address (minimum 3 characters).
- `destination` (string, required): The destination address (minimum 3 characters).
- `vehicleType` (string, required): The type of vehicle (must be 'auto', 'car', or 'moto').

#### Example Response
````json
{
  "ride": {
    "user": "user_id",
    "pickup": "pickup_address",
    "destination": "destination_address",
    "fare": 50.0,
    "status": "pending",
    "duration": 1800,
    "distance": 5000,
    "otp": "123456"
  }
}
````

#### Error Response
- `400 Bad Request`: If any required field is missing or invalid.
- `500 Internal Server Error`: If there is an error creating the ride.
````json
{
  "message": "Error message"
}
````

## `/rides/get-fare` Endpoint

#### Description
Retrieves the fare estimate for a ride between the provided pickup and destination addresses.

#### HTTP Method
`GET`

#### Authentication
Requires a valid JWT token in the Authorization header: `Authorization: Bearer <token>`

#### Request Parameters
- `pickup` (string, required): The pickup address (minimum 3 characters).
- `destination` (string, required): The destination address (minimum 3 characters).

#### Example Request
````
GET /rides/get-fare?pickup=1600+Amphitheatre+Parkway,+Mountain+View,+CA&destination=1+Infinite+Loop,+Cupertino,+CA
````

#### Example Response
````json
{
  "auto": 50.0,
  "car": 75.0,
  "moto": 40.0
}
````

#### Error Response
- `400 Bad Request`: If any required parameter is missing or invalid.
- `500 Internal Server Error`: If there is an error calculating the fare.
````json
{
  "message": "Error message"
}
````
