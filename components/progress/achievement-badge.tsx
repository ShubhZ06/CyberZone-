"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Award, Star, Trophy, Shield } from "lucide-react"
import { HexCard } from "@/components/HexCard"

interface AchievementBadgeProps {
  title: string
  description: string
  type: "module" | "lab" | "streak" | "mastery"
  isUnlocked: boolean
  progress?: number
  maxProgress?: number
}

const badgeIcons = {
  module: Award,
  lab: Trophy,
  streak: Star,
  mastery: Shield,
}

const badgeColors = {
  module: "purple" as const,
  lab: "pink" as const,
  streak: "blue" as const,
  mastery: "purple" as const,
}

const gradientColors = {
  module: "from-primary to-secondary",
  lab: "from-secondary to-accent",
  streak: "from-accent to-primary",
  mastery: "from-primary via-secondary to-accent",
}

export function AchievementBadge({
  title,
  description,
  type,
  isUnlocked,
  progress = 0,
  maxProgress = 1,
}: AchievementBadgeProps) {
  const Icon = badgeIcons[type]
  const hexColor = badgeColors[type]
  const colorGradient = gradientColors[type]
  const progressPercent = maxProgress > 0 ? (progress / maxProgress) * 100 : 0

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative p-4 rounded-xl border transition-all duration-300 glass-dark ${
        isUnlocked ? "border-primary/50 glow-purple" : "border-border/30 grayscale"
      }`}
    >
      {/* Badge Icon using HexCard */}
      <div className="flex justify-center mb-3">
        <HexCard
          size="md"
          glowColor={isUnlocked ? hexColor : "purple"}
          className={isUnlocked ? "" : "grayscale opacity-50"}
        >
          <Icon className={`w-6 h-6 ${isUnlocked ? "text-white" : "text-muted-foreground"}`} />
        </HexCard>
      </div>

      {/* Badge Info */}
      <div className="text-center">
        <h3 className={`font-semibold mb-1 font-sans ${isUnlocked ? "text-foreground" : "text-muted-foreground"}`}>
          {title}
        </h3>
        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{description}</p>

        {/* Progress */}
        {!isUnlocked && maxProgress > 1 && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-foreground font-mono">
                {progress}/{maxProgress}
              </span>
            </div>
            <div className="w-full bg-muted/30 rounded-full h-1">
              <motion.div
                className={`h-1 rounded-full bg-gradient-to-r ${colorGradient}`}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        )}

        {/* Status Badge */}
        <Badge
          variant={isUnlocked ? "default" : "secondary"}
          className={`mt-2 text-xs font-mono ${
            isUnlocked ? `bg-gradient-to-r ${colorGradient} text-white` : "bg-muted text-muted-foreground"
          }`}
        >
          {isUnlocked ? "UNLOCKED" : "LOCKED"}
        </Badge>
      </div>

      {/* Unlock Animation */}
      {isUnlocked && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="absolute -top-2 -right-2"
        >
          <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <Star className="w-3 h-3 text-white" />
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
