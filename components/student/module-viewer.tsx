"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"
import { mockData, type Module } from "@/lib/data"
import { motion } from "framer-motion"

interface ModuleViewerProps {
  moduleId: string
}

export function ModuleViewer({ moduleId }: ModuleViewerProps) {
  const [module, setModule] = useState<Module | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    const modules = mockData.getModules()
    const foundModule = modules.find((m) => m.id === moduleId)
    if (foundModule) {
      setModule(foundModule)
      setIsCompleted(foundModule.completed)
    }
  }, [moduleId])

  if (!module) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Module not found.</p>
          <Button asChild className="mt-4">
            <Link href="/student/learning">Back to Learning</Link>
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
          <Link href="/student/learning">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Learning
          </Link>
        </Button>

        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">{module.title}</h1>
            <p className="text-muted-foreground text-lg mb-4 text-pretty">{module.description}</p>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center text-muted-foreground">
                <Clock className="w-4 h-4 mr-2" />
                {module.duration}
              </div>
              <Badge variant={module.difficulty === "Beginner" ? "secondary" : "outline"}>{module.difficulty}</Badge>
              <Badge variant="outline">{module.category}</Badge>
              {isCompleted && (
                <Badge className="bg-primary text-primary-foreground">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-8">
        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className=""
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 glow-purple">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Play className="w-5 h-5 text-primary" />
                <span>Video Tutorial</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div id="module-video" className="aspect-video bg-black rounded-lg overflow-hidden">
                <iframe src={module.videoUrl} title={module.title} className="w-full h-full" allowFullScreen />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Learning Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 glow-blue">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Learning Content</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">{module.content}</p>
              </div>
            </CardContent>
          </Card>

          {/* Complete Module Card */}
        
        </motion.div>
      </div>
    </div>
  )
}
