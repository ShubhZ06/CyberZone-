"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Gamepad2, Users, TrendingUp, Plus, Eye, Edit } from "lucide-react"
import Link from "next/link"
import { auth } from "@/lib/auth"
import useSWR from "swr"
import { motion } from "framer-motion"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function AdminDashboard() {
  const currentUser = auth.getCurrentUser()
  const { data: modulesList = [], isLoading: modulesLoading, error: modulesError } = useSWR("/api/modules", fetcher)
  const { data: labsList = [], isLoading: labsLoading, error: labsError } = useSWR("/api/labs", fetcher)

  const statsCards = [
    {
      title: "Total Modules",
      value: Array.isArray(modulesList) ? modulesList.length : 0,
      icon: Play,
      color: "text-primary",
      glow: "glow-purple",
      href: "/admin/modules",
    },
    {
      title: "Total Labs",
      value: Array.isArray(labsList) ? labsList.length : 0,
      icon: Gamepad2,
      color: "text-secondary",
      glow: "glow-pink",
      href: "/admin/labs",
    },
    {
      title: "Active Users",
      value: "—", // placeholder until real data is wired
      icon: Users,
      color: "text-accent",
      glow: "glow-blue",
      href: "/admin/users",
    },
  ]

  const recentModules = Array.isArray(modulesList) ? modulesList.slice(0, 3) : []
  const recentLabs = Array.isArray(labsList) ? labsList.slice(0, 3) : []

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Admin <span className="text-primary text-glow">Dashboard</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Welcome back, <span className="text-foreground font-medium">{currentUser?.name ?? "Admin"}</span>. Manage your
          cybersecurity platform.
        </p>
      </motion.div>

      {/* Error States */}
      {(modulesError || labsError) && (
        <div className="mb-6 text-sm text-destructive-foreground bg-destructive/20 border border-destructive/40 rounded-md px-3 py-2">
          Failed to load {modulesError ? "modules" : ""} {modulesError && labsError ? "and" : ""}{" "}
          {labsError ? "labs" : ""}. Please try again.
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="min-w-0"
          >
            <Card
              className={`bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 ${stat.glow} group cursor-pointer`}
            >
              <Link href={stat.href}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <stat.icon
                    className={`h-4 w-4 ${stat.color} group-hover:scale-110 transition-transform duration-300`}
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {modulesLoading || labsLoading ? "…" : stat.value}
                  </div>
                </CardContent>
              </Link>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Modules */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 glow-purple">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Play className="w-5 h-5 text-primary" />
                    <span>Recent Modules</span>
                  </CardTitle>
                  <CardDescription>Latest learning content</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href="/admin/modules">
                      <Eye className="w-3 h-3 mr-1" />
                      View All
                    </Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/admin/modules/new">
                      <Plus className="w-3 h-3 mr-1" />
                      Add Module
                    </Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {modulesLoading ? (
                <div className="text-sm text-muted-foreground">Loading modules…</div>
              ) : recentModules.length === 0 ? (
                <div className="text-sm text-muted-foreground">No modules yet.</div>
              ) : (
                recentModules.map((module: any) => (
                  <div
                    key={module.id}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/30 hover:border-primary/30 transition-colors min-w-0"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground mb-1 truncate">{module.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                        <span className="truncate">{module.duration}</span>
                        <Badge variant="outline" className="text-xs">
                          {module.difficulty}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {module.category}
                        </Badge>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Edit className="w-3 h-3" />
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Labs */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 glow-pink">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Gamepad2 className="w-5 h-5 text-secondary" />
                    <span>Recent Labs</span>
                  </CardTitle>
                  <CardDescription>Interactive learning experiences</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href="/admin/labs">
                      <Eye className="w-3 h-3 mr-1" />
                      View All
                    </Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/admin/labs/new">
                      <Plus className="w-3 h-3 mr-1" />
                      Add Lab
                    </Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {labsLoading ? (
                <div className="text-sm text-muted-foreground">Loading labs…</div>
              ) : recentLabs.length === 0 ? (
                <div className="text-sm text-muted-foreground">No labs yet.</div>
              ) : (
                recentLabs.map((lab: any) => (
                  <div
                    key={lab.id}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/30 hover:border-secondary/30 transition-colors min-w-0"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground mb-1 truncate">{lab.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                        <span className="truncate">{lab.estimatedTime}</span>
                        <Badge variant="outline" className="text-xs">
                          {lab.difficulty}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {lab.category}
                        </Badge>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Edit className="w-3 h-3" />
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-8"
      >
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 glow-blue">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              <span>Quick Actions</span>
            </CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80"
              >
                <Link href="/admin/modules/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Module
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/admin/labs/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Lab
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/admin/users">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
