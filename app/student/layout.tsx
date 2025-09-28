import type React from "react"
import { AuthGuard } from "@/components/auth/auth-guard"
import { StudentNavbar } from "@/components/student/student-navbar"

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard requiredRole="student">
      <div className="min-h-screen bg-background">
        <StudentNavbar />
        <main className="pt-16">{children}</main>
      </div>
    </AuthGuard>
  )
}
