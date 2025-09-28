"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function CTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <span className="text-accent font-semibold text-lg font-mono">CYBERZONE PROJECTS</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-6 text-balance font-sans"
        >
          Epic Learning Journey and Ongoing{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent text-glow">
            Cyber Campaigns
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto text-pretty"
        >
          Join the ultimate cybersecurity learning experience. Master cutting-edge techniques, compete in challenges,
          and become part of an elite community of cyber warriors.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary/80 hover:via-secondary/80 hover:to-accent/80 text-white font-semibold px-12 py-6 text-xl glow-purple transition-all duration-300 hover:scale-105 font-sans"
          >
            <Link href="/auth/signup">
              <Zap className="w-6 h-6 mr-3" />
              Begin Your Journey
              <ArrowRight className="w-6 h-6 ml-3" />
            </Link>
          </Button>
        </motion.div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/4 w-32 h-32 border border-primary/20 rounded-full animate-spin-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-secondary/20 rounded-lg rotate-45 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
