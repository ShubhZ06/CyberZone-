"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Gamepad2, Award, Users, Shield, Code } from "lucide-react"
import { motion } from "framer-motion"
import { HexCard } from "@/components/HexCard"

const features = [
  {
    icon: Play,
    title: "Video Learning Modules",
    description: "Comprehensive video tutorials covering all aspects of cybersecurity from basics to advanced topics.",
    color: "text-primary",
    glow: "glow-purple",
  },
  {
    icon: Gamepad2,
    title: "Unity WebGL Labs",
    description: "Interactive browser-based labs where you can practice hacking and defense techniques safely.",
    color: "text-secondary",
    glow: "glow-pink",
  },
  {
    icon: Award,
    title: "Certification System",
    description: "Earn certificates as you complete modules and labs to showcase your cybersecurity expertise.",
    color: "text-accent",
    glow: "glow-blue",
  },
  {
    icon: Users,
    title: "Community Learning",
    description: "Connect with fellow cyber warriors, share knowledge, and learn from experienced professionals.",
    color: "text-primary",
    glow: "glow-purple",
  },
  {
    icon: Shield,
    title: "Real-World Scenarios",
    description: "Practice with realistic attack scenarios and learn to defend against actual cyber threats.",
    color: "text-secondary",
    glow: "glow-pink",
  },
  {
    icon: Code,
    title: "Hands-On Coding",
    description: "Write secure code, analyze vulnerabilities, and implement security measures in real applications.",
    color: "text-accent",
    glow: "glow-blue",
  },
]

export function Features() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance font-sans">
            All Services are Made{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary text-glow">
              Specifically for Cyber Warriors
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                className={`h-full glass-dark border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 ${feature.glow} group`}
              >
                <CardHeader>
                  <div className="mb-4 flex justify-center">
                    <HexCard
                      size="sm"
                      glowColor={
                        feature.glow.includes("purple") ? "purple" : feature.glow.includes("pink") ? "pink" : "blue"
                      }
                    >
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </HexCard>
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground font-sans">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
