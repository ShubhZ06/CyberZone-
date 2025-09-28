"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Maximize2, Play } from "lucide-react"

interface UnityWebGLPlayerProps {
  gameTitle: string
  /** Folder name under public/unity-games that contains the Unity build (e.g. "lab-1" or "lab-2") */
  buildPath: string
  /** Optional fixed height for the canvas container (e.g. "600px") */
  height?: string
  onGameLoaded?: () => void
  onGameError?: (error: unknown) => void
}

declare global {
  interface Window {
    createUnityInstance?: (
      canvas: HTMLCanvasElement,
      config: any,
      onProgress: (progress: number) => void
    ) => Promise<any>
  }
}

export function UnityWebGLPlayer({
  gameTitle,
  buildPath,
  height = "600px",
  onGameLoaded,
  onGameError,
}: UnityWebGLPlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const unityInstanceRef = useRef<any>(null)
  const scriptRef = useRef<HTMLScriptElement | null>(null)

  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const buildName = buildPath // convention: file prefix matches folder name (e.g. lab-1)
  const baseUrl = `/unity-games/${buildPath}`
  const buildUrl = `${baseUrl}/Build`
  const loaderUrl = `${buildUrl}/${buildName}.loader.js`

  const fileExists = useCallback(async (url: string) => {
    try {
      const res = await fetch(url, { method: "HEAD" })
      return res.ok
    } catch {
      return false
    }
  }, [])

  type BuildVariant = "none" | "gz" | "br"

  const detectVariant = useCallback(async (): Promise<BuildVariant> => {
    // Detect uncompressed first, then gzip, then brotli
    if (await fileExists(`${buildUrl}/${buildName}.data`)) return "none"
    if (await fileExists(`${buildUrl}/${buildName}.data.gz`)) return "gz"
    if (await fileExists(`${buildUrl}/${buildName}.data.br`)) return "br"
    throw new Error(`No Unity data file found for ${buildName} in ${buildUrl}`)
  }, [buildName, buildUrl, fileExists])

  const loadUnity = useCallback(async () => {
    if (!canvasRef.current) return

    setIsLoading(true)
    setError(null)

    try {
      // Ensure loader exists
      const hasLoader = await fileExists(loaderUrl)
      if (!hasLoader) {
        throw new Error(`Unity loader not found at ${loaderUrl}`)
      }

      const variant = await detectVariant()
      const suffix = (ext: string) => (variant === "none" ? "" : `.${ext}`)
      const config = {
        dataUrl: `${buildUrl}/${buildName}.data${suffix(variant)}`,
        frameworkUrl: `${buildUrl}/${buildName}.framework.js${suffix(variant)}`,
        codeUrl: `${buildUrl}/${buildName}.wasm${suffix(variant)}`,
        streamingAssetsUrl: "StreamingAssets",
        companyName: "DefaultCompany",
        productName: gameTitle,
        productVersion: "1.0",
      }

      // Dynamically load the Unity loader script
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement("script")
        script.src = loaderUrl
        script.async = true
        script.onload = () => resolve()
        script.onerror = () => reject(new Error("Failed to load Unity loader script"))
        document.body.appendChild(script)
        scriptRef.current = script
      })

      if (!window.createUnityInstance) {
        throw new Error("createUnityInstance is not available after loading the Unity loader")
      }

      const instance = await window.createUnityInstance(
        canvasRef.current,
        config,
        (p: number) => setProgress(Math.round(p * 100))
      )

      unityInstanceRef.current = instance
      setIsLoaded(true)
      onGameLoaded?.()
    } catch (e) {
      console.error("Unity load error:", e)
      setError(e instanceof Error ? e.message : "Failed to load Unity game")
      onGameError?.(e)
    } finally {
      setIsLoading(false)
    }
  }, [buildName, buildUrl, detectVariant, gameTitle, loaderUrl, onGameError, onGameLoaded])

  useEffect(() => {
    return () => {
      // Cleanup Unity instance on unmount
      const quit = async () => {
        try {
          await unityInstanceRef.current?.Quit?.()
        } catch {
          // ignore
        }
        if (scriptRef.current) {
          try {
            document.body.removeChild(scriptRef.current)
          } catch {
            // ignore
          }
        }
      }
      quit()
    }
  }, [])

  const enterFullscreen = () => {
    try {
      unityInstanceRef.current?.SetFullscreen?.(1)
    } catch {
      // ignore
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-base font-semibold">{gameTitle}</h2>
        {isLoaded && (
          <Button type="button" variant="outline" size="sm" onClick={enterFullscreen}>
            <Maximize2 className="w-4 h-4 mr-1" /> Fullscreen
          </Button>
        )}
      </div>

      <div
        className="relative w-full bg-muted rounded-md overflow-hidden border"
        style={{ height }}
      >
        <canvas id={`unity-canvas-${buildName}`} ref={canvasRef} className="w-full h-full block" tabIndex={-1} />

        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm">
            <div className="text-center">
              {isLoading ? (
                <>
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-1">Loading Unity WebGL…</p>
                  <p className="text-xs text-muted-foreground">{progress}%</p>
                </>
              ) : (
                <Button onClick={loadUnity} className="min-w-32">
                  <Play className="w-4 h-4 mr-2" /> Play
                </Button>
              )}

              {error && (
                <p className="mt-3 text-xs text-red-500 max-w-md">
                  {error}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}