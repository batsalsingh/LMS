# LuminEd - Online Learning Management System

An advanced learning management system designed for higher education institutions, built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- **User Management**: Students, Instructors, and Admins with role-based access control
- **Course Management**: Create, edit, and manage courses with structured modules
- **Content Delivery**: Upload and manage course materials, assignments, and assessments
- **Assessment Tools**: Quizzes, assignments, and grading system
- **Communication**: Discussion forums and announcements
- **Progress Tracking**: Student progress dashboards and performance analytics
- **Reporting**: Comprehensive analytics for admins and instructors

## Tech Stack

- **Frontend**: React, React Router, Redux/Context API, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **Deployment**: TBD

## Project Structure

```
lumin/
├── server/           # Node.js + Express backend
├── client/           # React frontend
├── docs/             # Documentation
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Ashutosh4510/lumin.git
cd lumin
```

2. Install server dependencies
```bash
cd server
npm install
```

3. Install client dependencies
```bash
cd ../client
npm install
```

4. Create `.env` files (see `.env.example` files)

5. Start the project
```bash
# Terminal 1 - Server
cd lumin
npm install
npm run seed
npm run dev

# Terminal 2 - Client
cd client
npm install
npm run dev
```

### Local Environment Defaults

The project includes ready-to-run local development env files:

- `/.env`
- `/server/.env`
- `/client/.env.local`

These defaults expect:

- MongoDB at `mongodb://127.0.0.1:27017`
- Backend API at `http://localhost:5000`
- Frontend app at `http://localhost:5173`

## Contributing

Please follow the branching strategy:
- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches

## License

TBD

## Contact

For questions or issues, please contact the development team.
