"use client"

import type React from "react"

import { Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Back to home */}
          <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground">
            <Link href="/landing">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center glow-purple">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold ml-3">
                CYBER<span className="text-primary">ZONE</span>
              </h1>
            </div>
          </motion.div>

          {/* Title and subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center space-y-2"
          >
            <h2 className="text-3xl font-bold text-foreground text-balance">{title}</h2>
            <p className="text-muted-foreground text-pretty">{subtitle}</p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {children}
          </motion.div>
        </div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 items-center justify-center p-8 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />

        {/* Floating elements */}
        <div className="absolute top-20 left-20 w-16 h-16 border border-primary/30 rounded-lg rotate-45 animate-spin-slow glow-purple" />
        <div className="absolute bottom-32 right-32 w-12 h-12 border border-secondary/30 rounded-full animate-bounce glow-pink" />
        <div className="absolute top-1/2 right-20 w-10 h-10 border border-accent/30 rounded-lg animate-pulse glow-blue" />

        {/* Main visual content */}
        <div className="relative z-10 text-center max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-primary via-secondary to-accent rounded-full flex items-center justify-center glow-purple mx-auto mb-6">
              <Shield className="w-16 h-16 text-white" />
            </div>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl font-bold text-foreground mb-4 text-balance"
          >
            Defend. Hack. Learn.
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-muted-foreground text-lg text-pretty"
          >
            Master cybersecurity through immersive learning and hands-on practice in our advanced training environment.
          </motion.p>
        </div>
      </div>
    </div>
  )
}
