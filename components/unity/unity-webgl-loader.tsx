"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Gamepad2, Loader2, AlertTriangle, ExternalLink } from "lucide-react"

interface UnityWebGLLoaderProps {
  gameUrl: string
  title: string
  description?: string
  onGameLoad?: () => void
  onGameComplete?: () => void
}

export function UnityWebGLLoader({ gameUrl, title, description, onGameLoad, onGameComplete }: UnityWebGLLoaderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const loadUnityGame = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // In a real implementation, this would load the Unity WebGL build
      // For now, we'll simulate the loading process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate successful load
      setIsLoaded(true)
      onGameLoad?.()
    } catch (err) {
      setError("Failed to load Unity WebGL game. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Cleanup function for Unity instance
    return () => {
      // In a real implementation, you'd destroy the Unity instance here
      console.log("Cleaning up Unity instance")
    }
  }, [])

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 glow-pink">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Gamepad2 className="w-5 h-5 text-secondary" />
          <span>{title}</span>
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div
          ref={containerRef}
          className="aspect-video bg-gradient-to-br from-background to-muted rounded-lg overflow-hidden border border-border/50 relative"
        >
          {!isLoaded && !isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center glow-pink mx-auto mb-4">
                  <Gamepad2 className="w-8 h-8 text-white" />
                </div>
                <p className="text-foreground font-medium mb-2">Ready to Launch</p>
                <p className="text-sm text-muted-foreground mb-4">Click below to start the interactive lab</p>
                <Button onClick={loadUnityGame} className="bg-gradient-to-r from-secondary to-accent">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Launch Lab
                </Button>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Loader2 className="w-8 h-8 text-secondary animate-spin mx-auto mb-4" />
                <p className="text-foreground font-medium mb-2">Loading Unity WebGL...</p>
                <p className="text-sm text-muted-foreground">Please wait while the lab initializes</p>
              </div>
            </div>
          )}

          {isLoaded && (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary/10 to-accent/10">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center glow-pink mx-auto mb-4 animate-pulse">
                  <Gamepad2 className="w-10 h-10 text-white" />
                </div>
                <p className="text-foreground font-medium mb-2">Unity WebGL Lab Active</p>
                <p className="text-sm text-muted-foreground mb-4">Interactive cybersecurity simulation running</p>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-green-500 font-medium">Connected</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isLoaded && (
          <Alert className="mt-4">
            <Gamepad2 className="h-4 w-4" />
            <AlertDescription>
              Unity WebGL lab is now active. In a production environment, this would load the actual game from:{" "}
              {gameUrl}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
