# CyberZone Authentication System

This document outlines the authentication system implementation for the CyberZone platform.

## 🔧 Setup Complete

Your MongoDB-backed authentication system has been successfully implemented! Here's what was set up:

### ✅ Features Implemented

1. **User Registration** - New users can sign up with email and password
2. **User Login** - Secure login with JWT token authentication
3. **Role-Based Access Control** - Separate dashboards for students and admins
4. **Password Security** - Bcrypt hashing with 12 salt rounds
5. **JWT Token Management** - Secure token storage and verification
6. **Database Integration** - MongoDB with Mongoose ODM

### 📁 Files Created/Modified

#### New Files:
- `lib/mongodb.ts` - Database connection utility
- `lib/jwt.ts` - JWT token management utilities
- `app/api/auth/signup/route.ts` - User registration endpoint
- `scripts/create-admin.js` - Script to create admin users

#### Modified Files:
- `models/User.ts` - Updated with Mongoose schema
- `app/api/auth/login/route.ts` - Real authentication implementation
- `lib/auth.ts` - Real API calls instead of mock data
- `components/auth/signup-form.tsx` - Connected to real API
- `components/auth/login-form.tsx` - Connected to real API
- `hooks/use-auth.tsx` - Updated to use JWT tokens
- `components/auth/auth-guard.tsx` - Updated authentication checks
- `.env.local` - Added JWT_SECRET

## 🚀 Usage

### Test Accounts Created

Two test accounts have been created for you:

#### Admin Account
- **Email**: `admin@cyberzone.com`
- **Password**: `admin123`
- **Role**: `admin`
- **Redirects to**: `/admin`

#### Student Account
- **Email**: `student@cyberzone.com`
- **Password**: `password123`
- **Role**: `student`
- **Redirects to**: `/student`

### User Flow

1. **Registration**: http://localhost:3000/auth/signup
   - New users register with name, email, and password
   - Default role is "student"
   - Automatic login after successful registration

2. **Login**: http://localhost:3000/auth/login
   - Users login with email and password
   - JWT token stored in localStorage
   - Redirected to role-appropriate dashboard

3. **Role-Based Routing**:
   - **Students**: Redirected to `/student` dashboard
   - **Admins**: Redirected to `/admin` dashboard
   - **Unauthorized access**: Redirected to `/auth/login`

## 🔐 Security Features

### Password Security
- Minimum 6 characters required
- Bcrypt hashing with 12 salt rounds
- Password confirmation on registration

### JWT Tokens
- 7-day expiration
- Stored in localStorage
- Automatic verification on each request
- Secure payload with user info

### Database Security
- Email uniqueness enforced
- Input validation and sanitization
- Mongoose schema validation
- Password field excluded from API responses

## 🛡️ Authentication Guards

### AuthGuard Component
- Protects routes based on authentication status
- Enforces role-based access control
- Automatic redirection for unauthorized users

### Usage Examples:
\`\`\`tsx
// Protect student routes
<AuthGuard requiredRole="student">
  <StudentDashboard />
</AuthGuard>

// Protect admin routes  
<AuthGuard requiredRole="admin">
  <AdminDashboard />
</AuthGuard>

// Just require authentication
<AuthGuard>
  <ProtectedContent />
</AuthGuard>
\`\`\`

## 🗄️ Database Schema

### User Collection
\`\`\`javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, lowercase),
  password: String (hashed),
  role: String ("student" | "admin"),
  avatar: String,
  joinDate: Date,
  progress: {
    modulesCompleted: [String],
    labsCompleted: [String], 
    certificates: [String],
    totalTimeSpent: Number,
    lastActivity: Date
  },
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

## 🔧 Environment Variables

Ensure these are set in `.env.local`:
\`\`\`
MONGODB_URI=mongodb+srv://cyberzone:Eaglesound@cyberzone.o0moxh0.mongodb.net/
JWT_SECRET=your-super-secret-jwt-key-change-in-production-123456789
\`\`\`

## 🚀 Getting Started

1. **Start your development server**:
   \`\`\`bash
   npm run dev
   \`\`\`

2. **Test the authentication**:
   - Visit http://localhost:3000/auth/login
   - Use the test accounts provided above
   - Verify role-based routing works correctly

3. **Create additional users**:
   - Use the signup form at http://localhost:3000/auth/signup
   - Or run the admin script: `node scripts/create-admin.js`

## 🔄 API Endpoints

### POST /api/auth/signup
Register a new user
\`\`\`javascript
// Request
{
  "name": "John Doe",
  "email": "john@example.com", 
  "password": "password123",
  "role": "student" // optional, defaults to "student"
}

// Response
{
  "success": true,
  "message": "Account created successfully",
  "token": "jwt_token_here",
  "user": { /* user object */ }
}
\`\`\`

### POST /api/auth/login
Authenticate existing user
\`\`\`javascript
// Request
{
  "email": "admin@cyberzone.com",
  "password": "admin123"
}

// Response  
{
  "success": true,
  "message": "Login successful", 
  "token": "jwt_token_here",
  "user": { /* user object */ }
}
\`\`\`

## 📱 Frontend Components

### Login Form
- Email/password validation
- Show/hide password toggle
- Error handling and loading states
- Automatic role-based redirection

### Signup Form  
- Full name, email, password fields
- Password confirmation
- Terms agreement checkbox
- Email format validation

### Auth Context
- Global authentication state
- Login/logout functions
- Current user information
- Loading state management

## 🎉 You're All Set!

Your CyberZone authentication system is now fully functional with:
- ✅ MongoDB database connectivity
- ✅ User registration and login
- ✅ Role-based access control
- ✅ JWT token authentication
- ✅ Secure password handling
- ✅ Test accounts ready to use

Start your dev server with `npm run dev` and test the authentication at:
- **Login**: http://localhost:3000/auth/login
- **Signup**: http://localhost:3000/auth/signup

Happy coding! 🚀
