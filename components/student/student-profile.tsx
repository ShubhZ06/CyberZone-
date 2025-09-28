"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Award, Calendar, Clock, TrendingUp, Download } from "lucide-react"
import { mockAuth } from "@/lib/auth"
import { mockData } from "@/lib/data"
import { motion } from "framer-motion"

export function StudentProfile() {
  const user = mockAuth.getCurrentUser()
  const modules = mockData.getModules()
  const labs = mockData.getLabs()
  const userProgress = mockData.getUserProgress(user?.id || "1")

  const completedModules = modules.filter((m) => m.completed).length
  const completedLabs = labs.filter((l) => l.completed).length
  const totalModules = modules.length
  const totalLabs = labs.length

  const overallProgress = ((completedModules + completedLabs) / (totalModules + totalLabs)) * 100

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Your <span className="text-accent text-glow">Profile</span>
        </h1>
        <p className="text-muted-foreground text-lg">Track your progress and achievements in cybersecurity.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 glow-blue">
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">{user?.name}</CardTitle>
              <CardDescription>{user?.email}</CardDescription>
              <Badge className="bg-accent text-accent-foreground mt-2">Cyber Warrior</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  Joined
                </span>
                <span className="text-foreground">{user?.joinDate}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center text-muted-foreground">
                  <Clock className="w-4 h-4 mr-2" />
                  Time Spent
                </span>
                <span className="text-foreground">{userProgress.totalTimeSpent || 180} mins</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Overall Progress</span>
                  <span className="text-foreground">{Math.round(overallProgress)}%</span>
                </div>
                <Progress value={overallProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats and Achievements */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Progress Stats */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 glow-purple">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>Learning Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Modules Completed</span>
                    <span className="text-sm font-medium">
                      {completedModules}/{totalModules}
                    </span>
                  </div>
                  <Progress value={(completedModules / totalModules) * 100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Labs Completed</span>
                    <span className="text-sm font-medium">
                      {completedLabs}/{totalLabs}
                    </span>
                  </div>
                  <Progress value={(completedLabs / totalLabs) * 100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certificates */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 glow-pink">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-secondary" />
                  <span>Certificates</span>
                </CardTitle>
                <Badge variant="outline">{user?.progress?.certificates.length || 0} Earned</Badge>
              </div>
              <CardDescription>Your cybersecurity achievements and certifications</CardDescription>
            </CardHeader>
            <CardContent>
              {user?.progress?.certificates && user.progress.certificates.length > 0 ? (
                <div className="space-y-4">
                  {user.progress.certificates.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/30"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                          <Award className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">{cert}</h3>
                          <p className="text-sm text-muted-foreground">Earned on {user.joinDate}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No certificates earned yet.</p>
                  <p className="text-sm text-muted-foreground mt-1">Complete modules and labs to earn certificates!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
