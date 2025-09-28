"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Gamepad2, Target, Clock, Shield } from "lucide-react"
import Link from "next/link"
import { mockData, type Lab } from "@/lib/data"
import { motion } from "framer-motion"
import { UnityWebGLPlayer } from "@/components/unity/unity-webgl-player"

interface LabViewerProps {
  labId: string
}

export function LabViewer({ labId }: LabViewerProps) {
  const [lab, setLab] = useState<Lab | null>(null)

  useEffect(() => {
    const labs = mockData.getLabs()
    const foundLab = labs.find((l) => l.id === labId)
    if (foundLab) {
      setLab(foundLab)
    }
  }, [labId])


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
              {lab.completed && (
                <Badge className="bg-secondary text-secondary-foreground">
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
          {lab.comingSoon ? (
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 h-full flex items-center justify-center">
              <div className="text-center py-16">
                <p className="text-2xl font-semibold mb-2">{lab.title}</p>
                <p className="text-muted-foreground mb-6">This lab is coming soon. Stay tuned!</p>
                <Button asChild>
                  <Link href="/student/labs">Back to Labs</Link>
                </Button>
              </div>
            </Card>
          ) : (
            <UnityWebGLPlayer
              gameTitle={lab.title}
              buildPath={`lab-${lab.id}`}
              height="600px"
            />
          )}
        </motion.div>

        {/* Lab Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 lg:sticky lg:top-24 self-start"
        >
          {/* Overview */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Overview</CardTitle>
              <CardDescription>Key details for this lab</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {lab.estimatedTime}
                </Badge>
                <Badge variant={lab.difficulty === "Beginner" ? "secondary" : "outline"} className="flex items-center gap-1">
                  <Shield className="w-3 h-3" /> {lab.difficulty}
                </Badge>
                <Badge variant="outline">{lab.category}</Badge>
              </div>
            </CardContent>
          </Card>

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
