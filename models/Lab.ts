// MongoDB Lab model (for future implementation)
export interface LabModel {
  _id: string
  title: string
  description: string
  webglUrl: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  category: string
  estimatedTime: string
  objectives: string[]
  order: number
  isPublished: boolean
  createdBy: string // admin user ID
  createdAt: Date
  updatedAt: Date
}

// Mongoose schema would be defined here
/*
const labSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  webglUrl: { type: String, required: true },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  category: String,
  estimatedTime: String,
  objectives: [String],
  order: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })
*/
