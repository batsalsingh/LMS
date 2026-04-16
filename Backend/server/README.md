# LuminEd Server - Backend API

Node.js + Express backend for the LuminEd Learning Management System with MongoDB.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT + bcryptjs
- **Validation**: express-validator

## Project Structure

```
server/
├── src/
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API route definitions
│   ├── controllers/      # Route controllers (business logic)
│   ├── middleware/       # Custom middleware (auth, validation, error handling)
│   ├── config/           # Configuration (database, constants)
│   └── app.js            # Express app setup
├── server.js             # Entry point
├── .env.example          # Environment variables template
├── package.json
└── README.md
```

## Installation

```bash
cd server
npm install
```

## Environment Setup

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` with your values:

```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
CORS_ORIGIN=http://localhost:5173
```

## Development

Start the server with nodemon (auto-reload on file changes):

```bash
npm run dev
```

Server will run on `http://localhost:5000`

## Production

Start the server:

```bash
npm start
```

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Health Check
```
GET /health
Response: { status: "Server is running" }
```

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user
- `POST /auth/refresh-token` - Refresh JWT token

### Users
- `GET /users/:id` - Get user profile
- `PUT /users/:id` - Update user profile
- `DELETE /users/:id` - Delete user account

### Courses
- `GET /courses` - List all courses
- `POST /courses` - Create new course (instructor only)
- `GET /courses/:id` - Get course details
- `PUT /courses/:id` - Update course
- `DELETE /courses/:id` - Delete course
- `POST /courses/:id/enroll` - Enroll in course
- `POST /courses/:id/drop` - Drop from course
- `GET /enrollments` - Get user's enrolled courses

### Assignments
- `GET /courses/:courseId/assignments` - List assignments
- `POST /courses/:courseId/assignments` - Create assignment
- `POST /assignments/:id/submit` - Submit assignment

### Grades
- `GET /grades` - Get user grades
- `POST /grades` - Record grade

## Database Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: "student" | "instructor" | "admin",
  profile: {
    bio: String,
    avatar: String,
    phone: String
  },
  enrolledCourses: [ObjectId],
  timestamps
}
```

### Course
```javascript
{
  title: String,
  description: String,
  instructor: ObjectId (User),
  category: String,
  level: "Beginner" | "Intermediate" | "Advanced",
  duration: Number (hours),
  price: Number,
  thumbnail: String,
  syllabus: [{
    title: String,
    lessons: [{
      title: String,
      duration: Number,
      content: String
    }]
  }],
  students: [ObjectId],
  rating: Number,
  reviews: [{...}],
  isActive: Boolean,
  timestamps
}
```

## Middleware

### Authentication Middleware
- Validates JWT token
- Extracts user information
- Protects routes

### Error Handling
- Centralized error response format
- HTTP status codes

### Validation
- Input validation using express-validator
- Request body validation

## Development Notes

- All database operations use Mongoose
- JWT tokens expire after 7 days (configurable)
- Passwords are hashed with bcryptjs
- CORS enabled for frontend at localhost:5173

## Testing

```bash
npm test
```

## Troubleshooting

### Port already in use
```bash
# Change PORT in .env or use a different port
PORT=5001 npm run dev
```

### MongoDB connection failed
- Ensure MongoDB is running locally
- Check MONGODB_URI in .env
- Default: `mongodb://localhost:27017/lumined`

### CORS errors
- Check CORS_ORIGIN in .env
- Should match your frontend URL

## Next Steps for Implementation

1. Implement authentication controllers (register, login, logout)
2. Create user controller and routes
3. Build course controller with full CRUD operations
4. Implement enrollment logic
5. Create assignment and submission handlers
6. Add grading system
7. Build discussion forum endpoints
8. Add file upload handling
9. Implement notification system
10. Add testing (Jest/Mocha)

## Frontend Integration

The client connects to this API at:
```
http://localhost:5000/api
```

See `../client/README.md` for frontend setup.
