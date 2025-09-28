"use client"

import { useRef, useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Gamepad2, ExternalLink, AlertTriangle, Loader2, RotateCcw } from "lucide-react"

interface UnityWebGLPlayerProps {
  gameTitle: string
  buildPath: string
  width?: string
  height?: string
  onGameLoaded?: () => void
  onGameError?: (error: string) => void
}

declare global {
  interface Window {
    createUnityInstance: any
  }
}

export function UnityWebGLPlayer({
  gameTitle,
  buildPath,
  width = "100%",
  height = "600px",
  onGameLoaded,
  onGameError,
}: UnityWebGLPlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [unityInstance, setUnityInstance] = useState<any>(null)
  const [progress, setProgress] = useState(0)
  const [loadingStage, setLoadingStage] = useState("")
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const detectUnityFiles = async (gameUrl: string) => {
    console.log(`[v0] Checking Unity files at: ${gameUrl}`)
    const commonNames = [buildPath, "game2", "game", "index", "build"]

    for (const name of commonNames) {
      try {
        const extensions = [".js", ".js.br", ".js.gz"]
        for (const ext of extensions) {
          const testUrl = `${gameUrl}/Build/${name}.loader${ext}`
          console.log(`[v0] Trying to load: ${testUrl}`)
          const response = await fetch(testUrl)
          console.log(`[v0] Response status for ${name}: ${response.status}`)
          if (response.ok) {
            console.log(`[v0] Found Unity files with name: ${name}`)
            return { name, compressed: ext.includes(".br") ? "br" : ext.includes(".gz") ? "gz" : "none" }
          }
        }
      } catch (e) {
        console.log(`[v0] Failed to load ${name}:`, e)
      }
    }

    console.log(`[v0] No Unity files found. Checked names: ${commonNames.join(", ")}`)
    throw new Error(
      `Unity build files not found. Please place your Unity WebGL build in public/unity-games/${buildPath}/. Checked for: ${commonNames.join(", ")}.loader.js`,
    )
  }

  const loadUnityGame = async () => {
    if (!canvasRef.current || !containerRef.current) return

    setIsLoading(true)
    setError(null)
    setProgress(0)
    setLoadingStage("Initializing...")

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    const newTimeoutId = setTimeout(() => {
      console.log("[v0] Unity loading timeout - stuck at", progress + "%")
      setError(
        `Loading timeout: Game stuck at ${progress}%. This usually indicates memory issues or corrupted Unity build files. Try rebuilding your Unity project with smaller assets or different compression settings.`,
      )
      setIsLoading(false)
    }, 120000) // 2 minutes timeout

    setTimeoutId(newTimeoutId)

    try {
      const gameUrl = `/unity-games/${buildPath}`
      console.log(`[v0] Loading Unity game from: ${gameUrl}`)
      setLoadingStage("Detecting Unity files...")

      const buildInfo = await detectUnityFiles(gameUrl)
      const buildName = buildInfo.name
      const compressionType = buildInfo.compressed
      console.log(`[v0] Using build name: ${buildName}, compressed: ${compressionType}`)
      setLoadingStage("Loading Unity loader...")

      // Load Unity loader script
      const script = document.createElement("script")
      script.src = `${gameUrl}/Build/${buildName}.loader.js${compressionType === "gz" ? ".gz" : compressionType === "br" ? ".br" : ""}`

      script.onload = async () => {
        try {
          setLoadingStage("Configuring Unity...")

          const config = {
            dataUrl: `${gameUrl}/Build/${buildName}.data${compressionType === "gz" ? ".gz" : compressionType === "br" ? ".br" : ""}`,
            frameworkUrl: `${gameUrl}/Build/${buildName}.framework.js${compressionType === "gz" ? ".gz" : compressionType === "br" ? ".br" : ""}`,
            codeUrl: `${gameUrl}/Build/${buildName}.wasm${compressionType === "gz" ? ".gz" : compressionType === "br" ? ".br" : ""}`,
            streamingAssetsUrl: "StreamingAssets",
            companyName: "CyberZone",
            productName: gameTitle,
            productVersion: "1.0",
            showBanner: false,
            matchWebGLToCanvasSize: false,
            devicePixelRatio: 1,
            memorySize: 268435456, // 256MB
            enableDebugging: false,
            powerPreference: "high-performance",
          }

          const progressCallback = (progress: number) => {
            const progressPercent = Math.round(progress * 100)
            setProgress(progressPercent)

            // Update loading stage based on progress
            if (progressPercent < 30) {
              setLoadingStage("Loading framework...")
            } else if (progressPercent < 60) {
              setLoadingStage("Loading game data...")
            } else if (progressPercent < 90) {
              setLoadingStage("Loading assets...")
            } else if (progressPercent < 100) {
              setLoadingStage("Initializing game...")
            }

            console.log(`[v0] Unity loading progress: ${progressPercent}%`)
          }

          setLoadingStage("Creating Unity instance...")

          // Create Unity instance
          if (window.createUnityInstance && canvasRef.current) {
            console.log("[v0] Starting Unity instance creation...")
            const instance = await window.createUnityInstance(canvasRef.current, config, progressCallback)

            if (timeoutId) {
              clearTimeout(timeoutId)
              setTimeoutId(null)
            }

            console.log("[v0] Unity instance created successfully")
            setUnityInstance(instance)
            setIsLoaded(true)
            setIsLoading(false)
            setLoadingStage("")
            onGameLoaded?.()
          } else {
            throw new Error("Unity WebGL loader not available")
          }
        } catch (err) {
          console.error("[v0] Unity initialization error:", err)
          const errorMessage = err instanceof Error ? err.message : "Failed to initialize Unity game"
          setError(errorMessage)
          setIsLoading(false)
          setLoadingStage("")

          if (timeoutId) {
            clearTimeout(timeoutId)
            setTimeoutId(null)
          }
        }
      }

      script.onerror = () => {
        console.error("[v0] Failed to load Unity loader script")
        setError("Failed to load Unity WebGL loader script")
        setIsLoading(false)
        setLoadingStage("")

        if (timeoutId) {
          clearTimeout(timeoutId)
          setTimeoutId(null)
        }
      }

      document.head.appendChild(script)
    } catch (err) {
      console.error("[v0] Unity loading error:", err)
      const errorMessage = err instanceof Error ? err.message : "Failed to load Unity game"
      setError(errorMessage)
      setIsLoading(false)
      setLoadingStage("")
      onGameError?.(errorMessage)

      if (timeoutId) {
        clearTimeout(timeoutId)
        setTimeoutId(null)
      }
    }
  }

  const restartGame = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }

    if (unityInstance) {
      unityInstance.Quit().then(() => {
        setIsLoaded(false)
        setUnityInstance(null)
        setProgress(0)
        setLoadingStage("")
        loadUnityGame()
      })
    } else {
      loadUnityGame()
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      if (unityInstance) {
        unityInstance.Quit()
      }
    }
  }, [unityInstance, timeoutId])

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 glow-pink">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Gamepad2 className="w-5 h-5 text-secondary" />
          <span>Unity WebGL Lab: {gameTitle}</span>
        </CardTitle>
        <CardDescription>Interactive cybersecurity simulation</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          ref={containerRef}
          className="relative rounded-lg overflow-hidden border border-border/50 bg-black"
          style={{ width, height }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
            style={{
              display: isLoaded ? "block" : "none",
              background: "#231F20",
            }}
          />

          {!isLoaded && !isLoading && !error && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-background to-muted">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center glow-pink mx-auto mb-4">
                  <Gamepad2 className="w-8 h-8 text-white" />
                </div>
                <p className="text-foreground font-medium mb-2">Ready to Launch</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Click below to start the interactive Unity WebGL simulation
                </p>
                <Button onClick={loadUnityGame} className="bg-gradient-to-r from-secondary to-accent">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Launch Game
                </Button>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-background to-muted">
              <div className="text-center">
                <Loader2 className="w-12 h-12 text-secondary animate-spin mx-auto mb-4" />
                <p className="text-foreground font-medium mb-2">Loading Unity Game...</p>
                <p className="text-sm text-muted-foreground mb-2">{loadingStage}</p>
                {progress > 0 && (
                  <div className="w-64 bg-muted rounded-full h-2 mx-auto">
                    <div
                      className="bg-gradient-to-r from-secondary to-accent h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
                {progress > 0 && <p className="text-xs text-muted-foreground mt-2">{progress}%</p>}
                {progress >= 90 && (
                  <p className="text-xs text-yellow-400 mt-2">
                    If stuck here, try restarting or check console for errors
                  </p>
                )}
              </div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-background to-muted p-6">
              <div className="text-center max-w-md">
                <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
                <p className="text-foreground font-medium mb-2">Failed to Load Game</p>
                <p className="text-sm text-muted-foreground mb-4">{error}</p>
                <Button onClick={restartGame} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {isLoaded && (
            <div className="absolute top-4 right-4 flex gap-2">
              <Badge className="bg-secondary text-secondary-foreground">Game Active</Badge>
              <Button onClick={restartGame} size="sm" variant="outline">
                <RotateCcw className="w-3 h-3 mr-1" />
                Restart
              </Button>
            </div>
          )}
        </div>

        <Alert className="mt-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>File Structure:</strong> Place your Unity WebGL export in{" "}
            <code>public/unity-games/{buildPath}/</code>. Include the <strong>Build</strong> folder,
            <strong>TemplateData</strong> folder, and <strong>index.html</strong> from your Unity export.
            <br />
            <strong>Note:</strong> The system will auto-detect your Unity build files (game2.loader.js, etc.).
            <br />
            <strong>Compression Issues?</strong> If you get "Invalid token" errors, export your Unity project without
            Brotli compression. In Unity's WebGL Player Settings, set "Compression Format" to "Gzip" or "Disabled".
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}
