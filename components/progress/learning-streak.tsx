"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame, Calendar, TrendingUp } from "lucide-react"

interface LearningStreakProps {
  currentStreak: number
  longestStreak: number
  weeklyGoal: number
  weeklyProgress: number
}

export function LearningStreak({ currentStreak, longestStreak, weeklyGoal, weeklyProgress }: LearningStreakProps) {
  const weeklyPercent = (weeklyProgress / weeklyGoal) * 100

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return "from-orange-500 to-red-500"
    if (streak >= 14) return "from-yellow-500 to-orange-500"
    if (streak >= 7) return "from-blue-500 to-purple-500"
    return "from-gray-500 to-gray-600"
  }

  const getStreakMessage = (streak: number) => {
    if (streak >= 30) return "LEGENDARY STREAK! 🔥"
    if (streak >= 14) return "AMAZING STREAK! ⭐"
    if (streak >= 7) return "GREAT STREAK! 💪"
    if (streak >= 3) return "BUILDING MOMENTUM! 📈"
    return "KEEP GOING! 🚀"
  }

  return (
    <Card className="glass-dark border-border/50 glow-purple">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 font-sans">
          <Flame className="w-5 h-5 text-orange-500" />
          <span>Learning Streak</span>
        </CardTitle>
        <CardDescription>Keep your momentum going with daily learning</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Streak */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className={`w-24 h-24 rounded-full bg-gradient-to-br ${getStreakColor(currentStreak)} flex items-center justify-center mx-auto mb-4 glow-purple`}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white font-mono">{currentStreak}</div>
              <div className="text-xs text-white/80 font-mono">DAYS</div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg font-semibold text-foreground mb-2 font-mono"
          >
            {getStreakMessage(currentStreak)}
          </motion.p>

          <Badge className="bg-gradient-to-r from-primary to-secondary text-white font-mono">CURRENT STREAK</Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 glass rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-4 h-4 text-accent mr-1" />
              <span className="text-sm text-muted-foreground font-sans">Longest</span>
            </div>
            <div className="text-xl font-bold text-foreground font-mono">{longestStreak}</div>
            <div className="text-xs text-muted-foreground font-mono">DAYS</div>
          </div>

          <div className="text-center p-3 glass rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="w-4 h-4 text-secondary mr-1" />
              <span className="text-sm text-muted-foreground font-sans">This Week</span>
            </div>
            <div className="text-xl font-bold text-foreground font-mono">{weeklyProgress}</div>
            <div className="text-xs text-muted-foreground font-mono">OF {weeklyGoal} GOAL</div>
          </div>
        </div>

        {/* Weekly Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground font-sans">Weekly Goal Progress</span>
            <span className="text-foreground font-mono">{Math.round(weeklyPercent)}%</span>
          </div>
          <div className="w-full bg-muted/30 rounded-full h-2">
            <motion.div
              className="h-2 rounded-full bg-gradient-to-r from-secondary to-accent"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(weeklyPercent, 100)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Week Calendar */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground font-sans">This Week</h4>
          <div className="grid grid-cols-7 gap-1">
            {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => {
              const isCompleted = index < weeklyProgress
              const isToday = index === 2 // Mock today as Wednesday

              return (
                <motion.div
                  key={day}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-all duration-200 font-mono ${
                    isCompleted
                      ? "bg-gradient-to-br from-primary to-secondary text-white glow-purple"
                      : isToday
                        ? "bg-accent/20 text-accent border border-accent/50"
                        : "bg-muted/30 text-muted-foreground"
                  }`}
                >
                  {day}
                </motion.div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
