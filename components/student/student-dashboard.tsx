"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Play, Gamepad2, Award, TrendingUp, Clock, Target } from "lucide-react"
import Link from "next/link"
import { mockAuth } from "@/lib/auth"
import { mockData } from "@/lib/data"
import { motion } from "framer-motion"
import { HexCard } from "@/components/HexCard"

export function StudentDashboard() {
  const user = mockAuth.getCurrentUser()
  const modules = mockData.getModules()
  const labs = mockData.getLabs()
  const userProgress = mockData.getUserProgress(user?.id || "1")

  const completedModules = modules.filter((m) => m.completed).length
  const completedLabs = labs.filter((l) => l.completed).length
  const totalModules = modules.length
  const totalLabs = labs.length

  const moduleProgress = (completedModules / totalModules) * 100
  const labProgress = (completedLabs / totalLabs) * 100

  const stats = [
    {
      title: "Learning Progress",
      value: `${completedModules}/${totalModules}`,
      progress: moduleProgress,
      icon: Play,
      color: "text-primary",
      glow: "purple",
    },
    {
      title: "Labs Completed",
      value: `${completedLabs}/${totalLabs}`,
      progress: labProgress,
      icon: Gamepad2,
      color: "text-secondary",
      glow: "pink",
    },
    {
      title: "Certificates Earned",
      value: user?.progress?.certificates.length || 3,
      progress: 100,
      icon: Award,
      color: "text-accent",
      glow: "blue",
    },
  ]

  const recentModules = modules.slice(0, 3)
  const recentLabs = labs.slice(0, 3)

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 font-sans">
          Welcome back, <span className="text-primary text-glow font-mono">{user?.name}</span>
        </h1>
        <p className="text-muted-foreground text-lg">Continue your cybersecurity journey and master new skills.</p>
      </motion.div>

      {/* Stats Grid with HexCards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="glass-dark border-border/50 hover:border-primary/50 transition-all duration-300 group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground font-sans">{stat.title}</CardTitle>
                <HexCard size="sm" glowColor={stat.glow as any}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </HexCard>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-2 font-mono">{stat.value}</div>
                {typeof stat.progress === "number" && <Progress value={stat.progress} className="h-2" />}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Continue Learning */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="glass-dark border-border/50 glow-purple">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2 font-sans">
                    <Play className="w-5 h-5 text-primary" />
                    <span>Continue Learning</span>
                  </CardTitle>
                  <CardDescription>Pick up where you left off</CardDescription>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href="/student/learning">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentModules.map((module) => (
                <div
                  key={module.id}
                  className="flex items-center justify-between p-4 glass rounded-lg border border-border/30 hover:border-primary/30 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-1 font-sans">{module.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {module.duration}
                      </span>
                      <Badge variant={module.difficulty === "Beginner" ? "secondary" : "outline"} className="text-xs">
                        {module.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {module.completed && <Badge className="bg-primary text-primary-foreground">Completed</Badge>}
                    <Button asChild size="sm" variant={module.completed ? "outline" : "default"}>
                      <Link href={`/student/learning/${module.id}`}>{module.completed ? "Review" : "Continue"}</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Practice Labs */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="glass-dark border-border/50 glow-pink">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2 font-sans">
                    <Gamepad2 className="w-5 h-5 text-secondary" />
                    <span>Practice Labs</span>
                  </CardTitle>
                  <CardDescription>Hands-on cybersecurity challenges</CardDescription>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href="/student/labs">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentLabs.map((lab) => (
                <div
                  key={lab.id}
                  className="flex items-center justify-between p-4 glass rounded-lg border border-border/30 hover:border-secondary/30 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-1 font-sans">{lab.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Target className="w-3 h-3 mr-1" />
                        {lab.estimatedTime}
                      </span>
                      <Badge variant={lab.difficulty === "Beginner" ? "secondary" : "outline"} className="text-xs">
                        {lab.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {lab.completed && <Badge className="bg-secondary text-secondary-foreground">Completed</Badge>}
                    <Button asChild size="sm" variant={lab.completed ? "outline" : "default"}>
                      <Link href={`/student/labs/${lab.id}`}>{lab.completed ? "Replay" : "Start"}</Link>
                    </Button>
                  </div>
                </div>
              ))}
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
        <Card className="glass-dark border-border/50 glow-blue">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 font-sans">
              <TrendingUp className="w-5 h-5 text-accent" />
              <span>Quick Actions</span>
            </CardTitle>
            <CardDescription>Jump into your learning journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80"
              >
                <Link href="/student/learning">
                  <Play className="w-4 h-4 mr-2" />
                  Start Learning
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/student/labs">
                  <Gamepad2 className="w-4 h-4 mr-2" />
                  Practice Labs
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/student/profile">
                  <Award className="w-4 h-4 mr-2" />
                  View Certificates
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
