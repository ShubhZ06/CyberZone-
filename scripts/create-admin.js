const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://cyberzone:Eaglesound@cyberzone.o0moxh0.mongodb.net/'

// User schema (same as in your model)
const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  role: { 
    type: String, 
    enum: ['student', 'admin'], 
    default: 'student' 
  },
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true
  },
  avatar: {
    type: String,
    default: ''
  },
  joinDate: { 
    type: Date, 
    default: Date.now 
  },
  progress: {
    modulesCompleted: { type: [String], default: [] },
    labsCompleted: { type: [String], default: [] },
    certificates: { type: [String], default: [] },
    totalTimeSpent: { type: Number, default: 0 },
    lastActivity: { type: Date, default: Date.now }
  }
}, { 
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password
      return ret
    }
  }
})

const User = mongoose.model('User', userSchema)

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@cyberzone.com' })
    if (existingAdmin) {
      console.log('❌ Admin user already exists!')
      process.exit(0)
    }

    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash('admin123', saltRounds)

    // Create admin user
    const admin = new User({
      name: 'System Administrator',
      email: 'admin@cyberzone.com',
      password: hashedPassword,
      role: 'admin',
      joinDate: new Date(),
      progress: {
        modulesCompleted: [],
        labsCompleted: [],
        certificates: [],
        totalTimeSpent: 0,
        lastActivity: new Date()
      }
    })

    await admin.save()
    console.log('✅ Admin user created successfully!')
    console.log('📧 Email: admin@cyberzone.com')
    console.log('🔐 Password: admin123')
    console.log('👤 Role: admin')

    // Also create a test student
    const existingStudent = await User.findOne({ email: 'student@cyberzone.com' })
    if (!existingStudent) {
      const hashedStudentPassword = await bcrypt.hash('password123', saltRounds)
      
      const student = new User({
        name: 'Test Student',
        email: 'student@cyberzone.com',
        password: hashedStudentPassword,
        role: 'student',
        joinDate: new Date(),
        progress: {
          modulesCompleted: [],
          labsCompleted: [],
          certificates: [],
          totalTimeSpent: 0,
          lastActivity: new Date()
        }
      })

      await student.save()
      console.log('✅ Test student created successfully!')
      console.log('📧 Email: student@cyberzone.com')
      console.log('🔐 Password: password123')
      console.log('👤 Role: student')
    }

  } catch (error) {
    console.error('❌ Error creating admin:', error)
    if (error.code === 11000) {
      console.log('Admin user already exists!')
    }
  } finally {
    await mongoose.disconnect()
    console.log('✅ Disconnected from MongoDB')
    process.exit(0)
  }
}

createAdmin()
