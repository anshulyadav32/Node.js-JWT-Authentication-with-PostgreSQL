# JWT Authentication Backend

A secure Node.js backend API with JWT authentication and role-based authorization using Express.js, PostgreSQL, and Sequelize ORM.

## 🚀 Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Role-Based Access Control**: Three user roles (user, moderator, admin)
- **Database Support**: PostgreSQL for production, SQLite for development
- **Input Validation**: Comprehensive validation middleware
- **CORS Support**: Cross-origin resource sharing enabled
- **RESTful API**: Following REST conventions

## 📋 Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (for production)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/anshulyadav32/Node.js-JWT-Authentication-with-PostgreSQL.git
   cd Node.js-JWT-Authentication-with-PostgreSQL/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your database credentials and JWT secret.

4. **Database Setup**
   - For development: Uses SQLite (no setup required)
   - For production: Create PostgreSQL database and update `.env`

5. **Start the server**
   ```bash
   npm start
   ```

## 🔧 Environment Variables

Create a `.env` file in the backend directory:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_NAME=testdb

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here

# Server Configuration
PORT=8080
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:8081
```

## 📚 API Endpoints

### Authentication Routes

#### Register User
```http
POST /api/auth/signup
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "roles": ["user", "moderator"] // optional
}
```

#### Login User
```http
POST /api/auth/signin
Content-Type: application/json

{
  "username": "john_doe",
  "password": "password123"
}
```

**Response:**
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "roles": ["ROLE_USER", "ROLE_MODERATOR"],
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Protected Routes

#### Public Access
```http
GET /api/test/all
```

#### User Access (requires authentication)
```http
GET /api/test/user
Headers: x-access-token: <JWT_TOKEN>
```

#### Moderator Access (requires moderator role)
```http
GET /api/test/mod
Headers: x-access-token: <JWT_TOKEN>
```

#### Admin Access (requires admin role)
```http
GET /api/test/admin
Headers: x-access-token: <JWT_TOKEN>
```

## 🏗️ Project Structure

```
backend/
├── app/
│   ├── config/
│   │   ├── auth.config.js      # JWT configuration
│   │   └── db.config.js        # Database configuration
│   ├── controllers/
│   │   ├── auth.controller.js  # Authentication logic
│   │   └── user.controller.js  # User content controllers
│   ├── middleware/
│   │   ├── authJwt.js          # JWT verification middleware
│   │   ├── verifySignUp.js     # Signup validation middleware
│   │   └── index.js            # Middleware exports
│   ├── models/
│   │   ├── user.model.js       # User model
│   │   ├── role.model.js       # Role model
│   │   └── index.js            # Database initialization
│   └── routes/
│       ├── auth.routes.js      # Authentication routes
│       └── user.routes.js      # User routes
├── .env                        # Environment variables
├── .gitignore                  # Git ignore file
├── package.json                # Project dependencies
├── server.js                   # Main server file
└── README.md                   # This file
```

## 🔑 User Roles

The system supports three user roles:

1. **User (id: 1)**: Basic user with limited access
2. **Moderator (id: 2)**: Enhanced permissions for content moderation
3. **Admin (id: 3)**: Full system access and administration rights

## 🛡️ Security Features

- **Password Hashing**: Passwords are hashed using bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication with expiration
- **Input Validation**: Comprehensive validation for all user inputs
- **Role-Based Access**: Granular access control based on user roles
- **CORS Protection**: Configurable cross-origin resource sharing

## 🧪 Testing

Run the API tests:
```bash
npm test
```

## 📄 Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server
- `npm test` - Run API tests

## 🔄 Database Schema

### Users Table
- `id` (Primary Key)
- `username` (String, Unique)
- `email` (String, Unique)
- `password` (String, Hashed)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Roles Table
- `id` (Primary Key)
- `name` (String)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### User_Roles Table (Junction Table)
- `userId` (Foreign Key)
- `roleId` (Foreign Key)

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify PostgreSQL is running
   - Check database credentials in `.env`
   - Ensure database exists

2. **Token Verification Failed**
   - Check JWT secret in environment variables
   - Verify token format and expiration

3. **CORS Issues**
   - Update `CORS_ORIGIN` in `.env`
   - Check frontend URL configuration

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📧 Contact

For questions or support, please create an issue in the GitHub repository.
