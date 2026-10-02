# Health-Track API

Health-Track is a backend API for managing personal health routines, reminders, completion records, and progress.

The API provides secure authentication and protected endpoints for users to create, manage, and monitor their health routines.

## Features

* User registration and login
* JWT-based authentication
* Protected API routes
* Health routine creation
* View all user routines
* View individual routines
* Update routines
* Delete routines
* Routine categories
* Routine frequency and scheduling
* Routine status tracking
* Search and pagination
* Input validation
* Error handling
* Notification support
* MongoDB database integration

## Health Routine Types

The application supports different types of health routines:

* Medication
* Exercise
* Hydration
* Sleep
* Nutrition
* Health check
* Appointment
* Other

## User Flow

Register
   ↓
Login
   ↓
Receive JWT
   ↓
Create Health Routine
   ↓
Set Schedule
   ↓
Track Routine
   ↓
Completed / Missed
   ↓
View Progress


## Technology Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token
* Joi
* bcrypt
* dotenv
* node-cron

### Development Tools

* Postman
* Git
* GitHub
* Nodemon

## Project Structure

health-track-api/
│
├── config/
│   └── database configuration
│
├── controllers/
│   ├── authControllers.js
│   ├── routineControllers.js
│   └── notificationControllers.js
│
├── middlewares/
│   ├── authMiddleware.js
│   └── errorHandler.js
│
├── models/
│   ├── UserModel.js
│   └── routineModel.js
│
├── routes/
│   ├── authRoutes.js
│   ├── routineRoutes.js
│   └── notificationRoutes.js
│
├── services/
│   ├── routineService.js
│   └── notificationService.js
│
├── validators/
│   ├── authValidator.js
│   └── routineValidator.js
│
├── utils/
│
├── app.js
├── server.js
├── package.json
├── package-lock.json
├── .env.example
└── .gitignore


## Installation

Clone the repository:

```bash
git clone git@github.com:Jaylukmann/Health-Track-API.git
```

Move into the project directory:

```bash
cd Health-Track-API
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root.

Example:

PORT=5050
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


Do not commit `.env` to GitHub.

Your `.gitignore` should contain:

node_modules/
.env

## Running the Application

For development:

```bash
npm run dev
```

For production:

```bash
npm start
```

The API runs locally on:

```text
http://localhost:5050
```

## Health Check

Endpoint:

```http
GET /health
```

Example response:

```json
{
  "message": "Health Track API is running successfully",
  "status": "OK"
}
```

## Authentication

### Register

```http
POST /api/auth/register
```

Example request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login

```http
POST /api/auth/login
```

Example request:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

After successful authentication, the API returns a JWT.

Send the token with protected requests:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

## Routine API

Protected routine endpoints require authentication.

### Create a Routine

```http
POST /api/routines
```

Example:

```json
{
  "title": "Morning Run",
  "type": "exercise",
  "description": "30 minute morning run",
  "frequency": "daily",
  "time": "2026-09-27T07:00:00Z",
  "startDate": "2026-09-27",
  "endDate": "2026-12-27",
  "routineStatus": true
}
```

### Get Routines

```http
GET /api/routine/getAllRoutines
```

The endpoint supports searching and pagination where configured.

Example:

```text
GET /api/routines?page=1&limit=10
```

### Get a Single Routine

```http
GET /api/routine//getRoutineById/:id
```

### Update a Routine

```http
PUT /api/routine/editRoutine/:id
```

Example:

```json
{
  "title": "Evening Run",
  "frequency": "daily"
}
```

### Delete a Routine

```http
DELETE /api/routine/deleteroutine/:id
```

## Routine Data

A routine contains information such as:

title
type
description
frequency
time
startDate
endDate
routineStatus
user
createdAt
updatedAt

Each routine belongs to the authenticated user.

## Notifications

The notification system supports health routine reminders.

The notification workflow is designed to:

Routine
   ↓
Scheduled Time
   ↓
Notification Service
   ↓
Reminder
   ↓
User

Notification functionality is intended to help users remember scheduled medication, exercise, hydration, appointments, and other health activities.

## Security

The API uses:

* JWT authentication
* Password hashing with bcrypt
* Protected routes
* Request validation
* Environment variables for sensitive configuration
* User-specific routine access

Sensitive credentials should remain inside `.env` and should never be committed to the repository.

## API Testing

Postman is recommended for testing the API.

Create a Postman collection containing:

```text
Authentication
├── Register
└── Login

Routines
├── Create Routine
├── Get Routines
├── Get Routine
├── Update Routine
└── Delete Routine

Notifications
└── Notification endpoints
```

For protected requests, add:

```text
Authorization: Bearer <JWT_TOKEN>
```

## Error Handling

The API returns appropriate HTTP status codes for common situations.

Examples:
200 OK
201 Created
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
500 Internal Server Error

Error responses should provide a message describing the problem.

## Deployment

The backend is suitable for deployment on platforms such as Render.

Before deployment:

1. Push the project to GitHub.
2. Configure the production environment variables.
3. Set the correct build and start commands.
4. Configure the MongoDB connection.
5. Add the frontend URL to the CORS configuration.
6. Test the deployed API using Postman.
7. Update the frontend API base URL.

Example production environment:

```env
PORT=5050
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
```

## Frontend Integration

The frontend should use the deployed API URL as its base URL.

const API_URL = "https://health-track-api-j0m5.onrender.com/";

For authentication requests:

POST /api/auth/register
POST /api/auth/login


For authenticated requests, include the JWT in the Authorization header.

## Project Goals

Health-Track is designed to provide a simple system for users to:

* Organize health routines
* Schedule recurring activities
* Receive reminders
* Track completed routines
* Monitor missed routines
* Review routine history
* Monitor personal progress

## Future Improvements

Potential improvements include:

* Email notifications
* Push notifications
* SMS reminders
* Routine completion history
* Progress analytics
* Health statistics
* Calendar integration
* Recurring notification scheduling
* User profile management
* Password reset
* Refresh tokens
* Role-based administration
* API documentation with Swagger

## Published postman documentation link
https://documenter.getpostman.com/view/10807850/2sBYB4LSVq#ff4e1209-0502-44fe-9582-1fef28002821

## Author

Jimoh Lukman Adeyemi

Backend Developer | Blockchain Developer | Data Analyst

GitHub:

https://github.com/Jaylukmann/Health-Track-API

## License

This project is available for educational and development purposes.
