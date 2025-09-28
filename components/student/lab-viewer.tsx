"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Gamepad2, CheckCircle, Target, Award } from "lucide-react"
import Link from "next/link"
import { mockData, type Lab } from "@/lib/data"
import { mockAuth } from "@/lib/auth"
import { motion } from "framer-motion"
import { UnityWebGLPlayer } from "@/components/unity/unity-webgl-player"

interface LabViewerProps {
  labId: string
}

export function LabViewer({ labId }: LabViewerProps) {
  const [lab, setLab] = useState<Lab | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isLabLoaded, setIsLabLoaded] = useState(false)

  useEffect(() => {
    const labs = mockData.getLabs()
    const foundLab = labs.find((l) => l.id === labId)
    if (foundLab) {
      setLab(foundLab)
      setIsCompleted(foundLab.completed)
    }
  }, [labId])

  const handleMarkComplete = () => {
    const user = mockAuth.getCurrentUser()
    if (user && lab) {
      mockData.updateLabProgress(user.id, lab.id)
      setIsCompleted(true)
    }
  }

  const handleLabLoad = () => {
    setIsLabLoaded(true)
  }

  if (!lab) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Lab not found.</p>
          <Button asChild className="mt-4">
            <Link href="/student/labs">Back to Labs</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/student/labs">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Labs
          </Link>
        </Button>

        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">{lab.title}</h1>
            <p className="text-muted-foreground text-lg mb-4 text-pretty">{lab.description}</p>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center text-muted-foreground">
                <Target className="w-4 h-4 mr-2" />
                {lab.estimatedTime}
              </div>
              <Badge variant={lab.difficulty === "Beginner" ? "secondary" : "outline"}>{lab.difficulty}</Badge>
              <Badge variant="outline">{lab.category}</Badge>
              {isCompleted && (
                <Badge className="bg-secondary text-secondary-foreground">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Unity WebGL Lab */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <UnityWebGLPlayer
            gameTitle={lab.title}
            buildPath={`lab-${lab.id}`}
            height="600px"
            onGameLoaded={() => setIsLabLoaded(true)}
            onGameError={(error) => {
              console.log("[v0] Unity game load error:", error)
              setIsLabLoaded(false)
            }}
          />
        </motion.div>

        {/* Lab Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Objectives */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 glow-blue">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-accent" />
                <span>Lab Objectives</span>
              </CardTitle>
              <CardDescription>Complete these tasks to master the concepts</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {lab.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-accent">{index + 1}</span>
                    </div>
                    <span className="text-sm text-muted-foreground leading-relaxed">{objective}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Completion */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 glow-purple">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-primary" />
                <span>Complete Lab</span>
              </CardTitle>
              <CardDescription>Mark this lab as completed when you finish all objectives</CardDescription>
            </CardHeader>
            <CardContent>
              {!isCompleted ? (
                <Button
                  onClick={handleMarkComplete}
                  className="w-full bg-gradient-to-r from-secondary to-accent hover:from-secondary/80 hover:to-accent/80"
                  disabled={!isLabLoaded}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark as Complete
                </Button>
              ) : (
                <div className="text-center py-4">
                  <CheckCircle className="w-12 h-12 text-secondary mx-auto mb-2" />
                  <p className="text-foreground font-medium">Lab Completed!</p>
                  <p className="text-sm text-muted-foreground">Excellent work on this cybersecurity challenge.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Link href="/student/labs">
                  <Gamepad2 className="w-3 h-3 mr-2" />
                  Try More Labs
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Link href="/student/learning">
                  <Target className="w-3 h-3 mr-2" />
                  Continue Learning
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
