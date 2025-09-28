import modulesData from "../mock-data/modules.json"
import labsData from "../mock-data/labs.json"
import progressData from "../mock-data/progress.json"

export interface Module {
  id: string
  title: string
  description: string
  videoUrl: string
  duration: string
  difficulty: string
  category: string
  content: string
  completed: boolean
}

export interface Lab {
  id: string
  title: string
  description: string
  webglUrl: string
  difficulty: string
  category: string
  estimatedTime: string
  objectives: string[]
  completed: boolean
  comingSoon?: boolean
}

const { modules } = modulesData as { modules: Module[] }
const { labs } = labsData as { labs: Lab[] }
const { userProgress } = progressData as { userProgress: Record<string, any> }

export const mockData = {
  getModules: (): Module[] => modules,

  getLabs: (): Lab[] => labs,

  getUserProgress: (userId: string) => {
    return (
      userProgress[userId as keyof typeof userProgress] || {
        modulesCompleted: [],
        labsCompleted: [],
        certificates: [],
        totalTimeSpent: 0,
        lastActivity: new Date().toISOString(),
      }
    )
  },

  updateModuleProgress: (userId: string, moduleId: string) => {
    // In a real app, this would update the database
    console.log(`Module ${moduleId} completed by user ${userId}`)
  },

  updateLabProgress: (userId: string, labId: string) => {
    // In a real app, this would update the database
    console.log(`Lab ${labId} completed by user ${userId}`)
  },
}
