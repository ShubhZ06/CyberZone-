export interface User {
  id: string
  email: string
  role: "student" | "admin"
  name: string
  avatar: string
  joinDate: string
  progress?: {
    modulesCompleted: number
    totalModules: number
    labsCompleted: number
    totalLabs: number
    certificates: string[]
  }
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

export interface AuthResponse {
  success: boolean
  message: string
  token?: string
  user?: User
  error?: string
}

// Real authentication functions
export const auth = {
  // Login user with email and password
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      
      if (response.ok && data.success) {
        // Store both token and user data in localStorage
        if (typeof window !== 'undefined') {
          if (data.token) {
            localStorage.setItem('cyberzone_token', data.token)
          }
          if (data.user) {
            localStorage.setItem('cyberzone_user', JSON.stringify(data.user))
          }
        }
        return data
      } else {
        return {
          success: false,
          message: data.error || 'Login failed',
          error: data.error || 'Login failed'
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      return {
        success: false,
        message: 'Network error. Please try again.',
        error: 'Network error'
      }
    }
  },

  // Register new user
  signup: async (name: string, email: string, password: string, role: 'student' | 'admin' = 'student'): Promise<AuthResponse> => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
      })

      const data = await response.json()
      
      if (response.ok && data.success) {
        // Store both token and user data in localStorage
        if (typeof window !== 'undefined') {
          if (data.token) {
            localStorage.setItem('cyberzone_token', data.token)
          }
          if (data.user) {
            localStorage.setItem('cyberzone_user', JSON.stringify(data.user))
          }
        }
        return data
      } else {
        return {
          success: false,
          message: data.error || 'Signup failed',
          error: data.error || 'Signup failed'
        }
      }
    } catch (error) {
      console.error('Signup error:', error)
      return {
        success: false,
        message: 'Network error. Please try again.',
        error: 'Network error'
      }
    }
  },

  // Get current user from stored data
  getCurrentUser: (): User | null => {
    if (typeof window === 'undefined') return null
    
    const token = localStorage.getItem('cyberzone_token')
    const userData = localStorage.getItem('cyberzone_user')
    
    if (!token || !userData) {
      // Clean up if either is missing
      localStorage.removeItem('cyberzone_token')
      localStorage.removeItem('cyberzone_user')
      return null
    }

    try {
      const user = JSON.parse(userData)
      return user
    } catch (error) {
      console.error('Error parsing user data:', error)
      localStorage.removeItem('cyberzone_token')
      localStorage.removeItem('cyberzone_user')
      return null
    }
  },

  // Get stored token
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('cyberzone_token')
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return auth.getCurrentUser() !== null
  },

  // Logout user
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cyberzone_token')
      localStorage.removeItem('cyberzone_user')
    }
  },

  // Set user data (for compatibility with existing components)
  setUser: (user: User) => {
    // This method is kept for compatibility but JWT tokens handle authentication state
    console.log('User authenticated:', user.email)
  },
}

// Keep mockAuth for backward compatibility during transition
export const mockAuth = {
  login: async (email: string, password: string): Promise<User | null> => {
    const result = await auth.login(email, password)
    return result.success && result.user ? result.user : null
  },

  getCurrentUser: auth.getCurrentUser,
  logout: auth.logout,
  setUser: auth.setUser,
}
