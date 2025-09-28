import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import { generateToken } from '@/lib/jwt'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, role = 'student' } = body

    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Validate role
    if (role && !['student', 'admin'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role specified' },
        { status: 400 }
      )
    }

    // Connect to database
    await connectDB()

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 409 }
      )
    }

    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create new user
    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role,
      joinDate: new Date(),
      progress: {
        modulesCompleted: [],
        labsCompleted: [],
        certificates: [],
        totalTimeSpent: 0,
        lastActivity: new Date()
      }
    })

    // Save user to database
    const savedUser = await newUser.save()

    // Generate JWT token
    const token = generateToken({
      userId: savedUser._id.toString(),
      email: savedUser.email,
      role: savedUser.role,
      name: savedUser.name
    })

    // Return success response with user data (password excluded by toJSON transform)
    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id: savedUser._id.toString(),
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
        avatar: savedUser.avatar || '',
        joinDate: savedUser.joinDate.toISOString(),
        progress: {
          modulesCompleted: savedUser.progress.modulesCompleted.length,
          totalModules: 0, // This can be calculated from your modules data
          labsCompleted: savedUser.progress.labsCompleted.length,
          totalLabs: 0, // This can be calculated from your labs data
          certificates: savedUser.progress.certificates
        }
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Signup error:', error)
    
    // Handle MongoDB duplicate key error
    if (error instanceof Error && 'code' in error && error.code === 11000) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 409 }
      )
    }

    // Handle validation errors
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}
