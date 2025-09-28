import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import { generateToken } from '@/lib/jwt'

export async function POST(request: NextRequest) {
  try {
    console.log('🔐 Login API called')
    const body = await request.json()
    const { email, password } = body
    console.log('📧 Login attempt for email:', email)

    // Basic validation
    if (!email || !password) {
      console.log('❌ Missing email or password')
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Connect to database
    console.log('🔌 Connecting to database...')
    await connectDB()
    console.log('✅ Connected to database')

    // Find user by email
    console.log('🔍 Looking for user with email:', email.toLowerCase())
    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      console.log('❌ User not found')
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }
    console.log('✅ User found:', user.email, 'role:', user.role)

    // Verify password
    console.log('🔑 Verifying password...')
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      console.log('❌ Invalid password')
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }
    console.log('✅ Password verified')

    // Update last activity
    user.progress.lastActivity = new Date()
    await user.save()

    // Generate JWT token
    console.log('🆯 Generating JWT token...')
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      name: user.name
    })
    console.log('✅ JWT token generated')

    // Return success response with user data (password excluded by toJSON transform)
    const responseData = {
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar || '',
        joinDate: user.joinDate.toISOString(),
        progress: {
          modulesCompleted: user.progress.modulesCompleted.length,
          totalModules: 0, // This can be calculated from your modules data
          labsCompleted: user.progress.labsCompleted.length,
          totalLabs: 0, // This can be calculated from your labs data
          certificates: user.progress.certificates
        }
      }
    }
    console.log('✅ Sending successful login response')
    return NextResponse.json(responseData)

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}
