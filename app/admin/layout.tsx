import type React from "react"
import { AuthGuard } from "@/components/auth/auth-guard"
import { AdminNavbar } from "@/components/admin/admin-navbar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard requiredRole="admin">
      <div className="min-h-screen bg-background">
        <AdminNavbar />
        <main className="pt-16">{children}</main>
      </div>
    </AuthGuard>
  )
}
