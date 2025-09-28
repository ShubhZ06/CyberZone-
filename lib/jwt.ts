import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

// Server-side only JWT functions
function getJWTSecret(): string {
  const JWT_SECRET = process.env.JWT_SECRET
  
  if (!JWT_SECRET) {
    console.error('❌ JWT_SECRET environment variable is not defined')
    console.error('Please make sure JWT_SECRET is set in your .env.local file')
    throw new Error('Please define the JWT_SECRET environment variable inside .env.local')
  }
  
  return JWT_SECRET
}

export interface JWTPayload {
  userId: string
  email: string
  role: 'student' | 'admin'
  name: string
}

// Generate JWT token (server-side only)
export function generateToken(payload: JWTPayload): string {
  const secret = getJWTSecret()
  return jwt.sign(payload, secret, {
    expiresIn: '7d', // Token expires in 7 days
  })
}

// Verify JWT token (server-side only)
export function verifyToken(token: string): JWTPayload | null {
  try {
    const secret = getJWTSecret()
    const decoded = jwt.verify(token, secret) as JWTPayload
    return decoded
  } catch (error) {
    console.error('JWT verification failed:', error)
    return null
  }
}

// Extract token from request headers
export function getTokenFromRequest(request: NextRequest): string | null {
  const authorization = request.headers.get('authorization')
  
  if (!authorization) {
    return null
  }

  // Extract token from "Bearer <token>" format
  const token = authorization.split(' ')[1]
  return token || null
}

// Middleware to verify authentication
export function verifyAuth(request: NextRequest): JWTPayload | null {
  const token = getTokenFromRequest(request)
  
  if (!token) {
    return null
  }

  return verifyToken(token)
}

// Middleware to verify role-based access
export function verifyRole(request: NextRequest, requiredRole: 'student' | 'admin'): boolean {
  const user = verifyAuth(request)
  
  if (!user) {
    return false
  }

  return user.role === requiredRole
}
