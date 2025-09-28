"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { auth, type User } from "@/lib/auth"

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: "student" | "admin"
  redirectTo?: string
}

export function AuthGuard({ children, requiredRole, redirectTo = "/auth/login" }: AuthGuardProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const currentUser = auth.getCurrentUser()

    if (!currentUser) {
      router.push(redirectTo)
      return
    }

    if (requiredRole && currentUser.role !== requiredRole) {
      // Redirect to appropriate dashboard based on role
      const dashboardPath = currentUser.role === "admin" ? "/admin" : "/student"
      router.push(dashboardPath)
      return
    }

    setUser(currentUser)
    setIsLoading(false)
  }, [router, requiredRole, redirectTo])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
