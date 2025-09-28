import mongoose, { Document, Schema } from 'mongoose'

// User interface for TypeScript
export interface IUser extends Document {
  _id: string
  email: string
  password: string // hashed
  role: "student" | "admin"
  name: string
  avatar?: string
  joinDate: Date
  progress: {
    modulesCompleted: string[]
    labsCompleted: string[]
    certificates: string[]
    totalTimeSpent: number
    lastActivity: Date
  }
  createdAt: Date
  updatedAt: Date
}

// User interface without password (for client-side)
export interface UserModel {
  _id: string
  email: string
  role: "student" | "admin"
  name: string
  avatar?: string
  joinDate: Date
  progress: {
    modulesCompleted: string[]
    labsCompleted: string[]
    certificates: string[]
    totalTimeSpent: number
    lastActivity: Date
  }
  createdAt: Date
  updatedAt: Date
}

// Mongoose schema
const userSchema = new Schema<IUser>({
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

// Create indexes
userSchema.index({ email: 1 })

// Export the model
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema)

export default User
