# User Authentication System: Blueprint & System Design

## Project Overview
This document outlines the design of a **secure, scalable** user authentication system using **Node.js** and **MySQL**. It serves as a blueprint for implementation.

## System Requirements
- User registration with email/password
- User login with email/password
- Password reset functionality
- Email verification
- JWT-based session management
- Role-based access control (basic)

## Technology Stack
- **Backend**: Node.js (Express.js framework)
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Email Service**: Nodemailer (for development, AWS SES/SendGrid in production)
- **Validation**: Joi or express-validator
- **Environment Variables**: dotenv
- **Version Control**: Git/GitHub
- **API Documentation**: Swagger/OpenAPI (optional)

## Database Schema
### Tables
#### `users`
| Column | Type | Constraints |
|--------|------|------------|
| `id` | INT | Primary Key, Auto-Increment |
| `email` | VARCHAR | Unique |
| `password_hash` | VARCHAR | - |
| `first_name` | VARCHAR | - |
| `last_name` | VARCHAR | - |
| `is_verified` | BOOLEAN | Default: false |
| `verification_token` | VARCHAR | Nullable |
| `reset_token` | VARCHAR | Nullable |
| `reset_token_expires` | DATETIME | Nullable |
| `created_at` | TIMESTAMP | Default: CURRENT_TIMESTAMP |
| `updated_at` | TIMESTAMP | Default: CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP |

#### `roles` (for role-based access)
| Column | Type | Constraints |
|--------|------|------------|
| `id` | INT | Primary Key, Auto-Increment |
| `name` | VARCHAR | Unique |

#### `user_roles` (junction table)
| Column | Type | Constraints |
|--------|------|------------|
| `user_id` | INT | Foreign Key → `users.id` |
| `role_id` | INT | Foreign Key → `roles.id` |

## API Endpoints
- `POST /api/auth/register` – User registration
- `POST /api/auth/login` – User login
- `POST /api/auth/verify-email` – Email verification
- `POST /api/auth/forgot-password` – Initiate password reset
- `POST /api/auth/reset-password` – Complete password reset
- `GET /api/auth/me` – Get current user info (protected)

## Folder Structure
```md
/auth-system/
├── .env
├── .gitignore
├── package.json
├── README.md
├── config/
│   ├── db.js
│   ├── jwt.js
│   └── mail.js
├── controllers/
│   ├── auth.controller.js
│   └── user.controller.js
├── middleware/
│   ├── auth.middleware.js
│   └── error.middleware.js
├── models/
│   ├── index.js
│   ├── user.model.js
│   └── role.model.js
├── routes/
│   ├── auth.routes.js
│   ├── user.routes.js
│   └── index.js
├── services/
│   ├── auth.service.js
│   ├── mail.service.js
│   └── user.service.js
├── utils/
│   ├── validators.js
│   └── helpers.js
├── tests/
│   ├── auth.test.js
│   └── user.test.js
└── app.js
````



## Development Workflow
### Initialize Project
- Create GitHub repository
- Set up Node.js project
- Install dependencies

### Set Up Database
- Create MySQL database
- Design and implement schema

### Implement Core Features
- User registration
- Email verification
- User login with JWT
- Password reset flow

### Add Security Measures
- Rate limiting
- Input validation
- Secure headers

### Testing
- Unit tests
- Integration tests
- Postman collection

### Documentation
- API documentation
- Setup instructions

## Step-by-Step Implementation Plan
### Project Setup
1. Initialize Git repository
2. Create Node.js project (`npm init`)
3. Install core dependencies (Express, MySQL, etc.)
4. Set up basic Express server

### Database Configuration
1. Install MySQL driver
2. Create connection pool
3. Implement database initialization script

### User Registration
4. Create user model
5. Implement password hashing
6. Add email validation
7. Generate verification token

### Email Service
8. Set up Nodemailer
9. Create email templates
10. Implement verification email sending

### Authentication
11. Implement JWT generation
12. Create login endpoint
13. Add protected route middleware

### Password Reset
14. Generate secure reset tokens
15. Implement token expiration
16. Create reset password flow

---
