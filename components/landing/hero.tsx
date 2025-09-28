"use client"

import { Button } from "@/components/ui/button"
import { Shield, Zap, Target } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ThreeHero } from "@/components/ThreeHero"
import { HexCard } from "@/components/HexCard"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ThreeHero />

      {/* Background with animated grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />
      </div>

      <div className="absolute top-20 left-20">
        <HexCard size="sm" glowColor="purple">
          <Shield className="w-6 h-6 text-primary" />
        </HexCard>
      </div>
      <div className="absolute bottom-32 right-32">
        <HexCard size="sm" glowColor="pink">
          <Zap className="w-6 h-6 text-secondary" />
        </HexCard>
      </div>
      <div className="absolute top-1/2 right-20">
        <HexCard size="sm" glowColor="blue">
          <Target className="w-6 h-6 text-accent" />
        </HexCard>
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center mb-8"
        >
          <div className="flex items-center space-x-4">
            <HexCard size="md" glowColor="purple">
              <Shield className="w-8 h-8 text-white" />
            </HexCard>
            <h1 className="text-4xl md:text-6xl font-bold text-glow font-mono">
              CYBER<span className="text-primary">ZONE</span>
            </h1>
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 text-balance font-sans"
        >
          Where Cyber{" "}
          <span
            className="text-primary text-glow font-bold"
            style={{ textShadow: "0 0 20px rgba(139, 92, 246, 0.8), 0 0 40px rgba(139, 92, 246, 0.4)" }}
          >
            Champions
          </span>{" "}
          Rise!
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty"
        >
          Master cybersecurity through immersive learning modules and hands-on Unity WebGL labs. Defend against threats,
          learn ethical hacking, and become a cyber warrior.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white font-semibold px-8 py-6 text-lg glow-purple transition-all duration-300 hover:scale-105"
          >
            <Link href="/auth/login">
              <Zap className="w-5 h-5 mr-2" />
              Start Learning
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold px-8 py-6 text-lg glow-blue transition-all duration-300 hover:scale-105 bg-transparent"
          >
            <Link href="/auth/signup">
              <Target className="w-5 h-5 mr-2" />
              Join CyberZone
            </Link>
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-primary text-glow font-mono">15+</div>
            <div className="text-muted-foreground">Learning Modules</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary text-glow font-mono">12+</div>
            <div className="text-muted-foreground">Interactive Labs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent text-glow font-mono">1000+</div>
            <div className="text-muted-foreground">Cyber Warriors</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
