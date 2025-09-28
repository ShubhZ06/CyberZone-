"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface HexCardProps {
  children: ReactNode
  className?: string
  glowColor?: "purple" | "pink" | "blue"
  size?: "sm" | "md" | "lg"
}

export function HexCard({ children, className, glowColor = "purple", size = "md" }: HexCardProps) {
  const sizeClasses = {
    sm: "p-3 min-h-[80px]",
    md: "p-4 min-h-[100px]",
    lg: "p-5 min-h-[120px]",
  }

  const glowClasses = {
    purple: "glow-purple border-purple-500/30",
    pink: "glow-pink border-pink-500/30",
    blue: "glow-blue border-blue-500/30",
  }

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        y: -3, // Reduced hover lift for subtler effect
        boxShadow:
          glowColor === "purple"
            ? "0 15px 30px rgba(147, 51, 234, 0.25)" // Reduced shadow intensity
            : glowColor === "pink"
              ? "0 15px 30px rgba(236, 72, 153, 0.25)"
              : "0 15px 30px rgba(59, 130, 246, 0.25)",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative cursor-pointer group",
        "bg-gradient-to-br from-gray-900/90 to-gray-800/70", // Slightly more opaque for better contrast
        "backdrop-blur-xl border border-gray-700/60",
        "rounded-xl overflow-hidden", // containment
        "box-border min-w-0 max-w-full", // prevent overflow in grids/flex
        "before:absolute before:inset-0 before:bg-gradient-to-r",
        "before:from-transparent before:via-white/3 before:to-transparent", // Reduced shimmer intensity
        "before:translate-x-[-100%] hover:before:translate-x-[100%]",
        "before:transition-transform before:duration-700",
        "shadow-lg",
        sizeClasses[size],
        glowClasses[glowColor],
        className,
      )}
    >
      <div className="absolute inset-0 opacity-5 overflow-hidden">
        {" "}
        {/* ensure bg grid never overflows */}
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
            backgroundSize: "15px 15px",
          }}
        />
      </div>

      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-current opacity-40" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-current opacity-40" />

      <div className="relative z-10 h-full w-full flex items-center justify-center overflow-hidden px-2">
        {" "}
        {/* add overflow-hidden + padding for child content */}
        <div className="min-w-0 text-pretty">{children}</div> {/* min-w-0 prevents text overflow in flex/grid */}
      </div>
    </motion.div>
  )
}
