// MongoDB Module model (for future implementation)
export interface ModuleModel {
  _id: string
  title: string
  description: string
  videoUrl: string
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  category: string
  content: string
  order: number
  isPublished: boolean
  createdBy: string // admin user ID
  createdAt: Date
  updatedAt: Date
}

// Mongoose schema would be defined here
/*
const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  duration: String,
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  category: String,
  content: { type: String, required: true },
  order: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })
*/
