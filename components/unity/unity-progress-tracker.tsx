"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Target, Clock } from "lucide-react"

interface UnityProgressTrackerProps {
  objectives: string[]
  onComplete?: () => void
}

export function UnityProgressTracker({ objectives, onComplete }: UnityProgressTrackerProps) {
  const [completedObjectives, setCompletedObjectives] = useState<boolean[]>(new Array(objectives.length).fill(false))
  const [timeSpent, setTimeSpent] = useState(0)

  useEffect(() => {
    // Simulate progress tracking
    const interval = setInterval(() => {
      setTimeSpent((prev) => prev + 1)

      // Simulate random objective completion for demo
      if (Math.random() < 0.01) {
        // 1% chance per second
        setCompletedObjectives((prev) => {
          const newCompleted = [...prev]
          const incompleteIndex = newCompleted.findIndex((completed) => !completed)
          if (incompleteIndex !== -1) {
            newCompleted[incompleteIndex] = true
          }
          return newCompleted
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const allCompleted = completedObjectives.every((completed) => completed)
    if (allCompleted && completedObjectives.length > 0) {
      onComplete?.()
    }
  }, [completedObjectives, onComplete])

  const completedCount = completedObjectives.filter(Boolean).length
  const progressPercent = objectives.length > 0 ? (completedCount / objectives.length) * 100 : 0

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 glow-blue">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-accent" />
          <span>Lab Progress</span>
        </CardTitle>
        <CardDescription>Track your completion of lab objectives</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="text-foreground">
              {completedCount}/{objectives.length} objectives
            </span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        {/* Time Spent */}
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center text-muted-foreground">
            <Clock className="w-3 h-3 mr-1" />
            Time Spent
          </span>
          <span className="text-foreground font-mono">{formatTime(timeSpent)}</span>
        </div>

        {/* Objectives List */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Objectives:</h4>
          <ul className="space-y-2">
            {objectives.map((objective, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  {completedObjectives[index] ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <div className="w-4 h-4 border border-muted-foreground rounded-full" />
                  )}
                </div>
                <span
                  className={`text-sm leading-relaxed ${
                    completedObjectives[index] ? "text-foreground line-through" : "text-muted-foreground"
                  }`}
                >
                  {objective}
                </span>
                {completedObjectives[index] && (
                  <Badge variant="outline" className="text-xs ml-auto">
                    Complete
                  </Badge>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Completion Status */}
        {progressPercent === 100 && (
          <div className="text-center py-4 border-t border-border/50">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-foreground font-medium">All Objectives Complete!</p>
            <p className="text-sm text-muted-foreground">Great job completing this lab.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
