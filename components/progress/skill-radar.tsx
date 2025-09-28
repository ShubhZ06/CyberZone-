"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"

interface SkillData {
  skill: string
  level: number
  maxLevel: number
  color: string
}

interface SkillRadarProps {
  skills: SkillData[]
  title?: string
}

export function SkillRadar({ skills, title = "Skill Progress" }: SkillRadarProps) {
  return (
    <Card className="glass-dark border-border/50 glow-blue">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 font-sans">
          <TrendingUp className="w-5 h-5 text-accent" />
          <span>{title}</span>
        </CardTitle>
        <CardDescription>Track your cybersecurity expertise across different domains</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {skills.map((skill, index) => {
          const progressPercent = (skill.level / skill.maxLevel) * 100

          return (
            <motion.div
              key={skill.skill}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground font-sans">{skill.skill}</span>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs font-mono">
                    LVL {skill.level}
                  </Badge>
                  <span className="text-xs text-muted-foreground font-mono">
                    {skill.level}/{skill.maxLevel}
                  </span>
                </div>
              </div>

              <div className="relative">
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full ${skill.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                  />
                </div>

                {/* Skill level markers */}
                <div className="absolute top-0 left-0 w-full h-2 flex justify-between">
                  {Array.from({ length: skill.maxLevel }, (_, i) => (
                    <div
                      key={i}
                      className={`w-0.5 h-2 ${i < skill.level ? "bg-white/50" : "bg-muted-foreground/30"}`}
                      style={{ marginLeft: i === 0 ? 0 : -1 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )
        })}

        {/* Overall Progress */}
        <div className="pt-4 border-t border-border/50">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground font-sans">Overall Progress</span>
            <span className="text-foreground font-mono">
              {Math.round(
                (skills.reduce((acc, skill) => acc + skill.level, 0) /
                  skills.reduce((acc, skill) => acc + skill.maxLevel, 0)) *
                  100,
              )}
              %
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
