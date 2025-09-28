"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export function About() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <span className="text-primary font-semibold text-lg font-mono">KNOW ABOUT US</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance font-sans">
              Where Cyber Warriors Unite and{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent text-glow">
                Legends Are Born
              </span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-secondary to-accent mb-8 rounded-full" />

            <p className="text-muted-foreground text-lg leading-relaxed mb-8 text-pretty">
              CyberZone is the ultimate cybersecurity learning platform where aspiring security professionals transform
              into skilled cyber warriors. Through our cutting-edge video modules and immersive Unity WebGL labs, you'll
              master the art of digital defense and ethical hacking.
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8 text-pretty">
              Our platform combines theoretical knowledge with hands-on practice, ensuring you're ready to face
              real-world cyber threats. Join thousands of learners who have already started their journey to becoming
              cybersecurity experts.
            </p>

            <Button
              size="lg"
              className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/80 hover:to-accent/80 text-white font-semibold px-8 py-6 text-lg glow-pink transition-all duration-300 hover:scale-105 font-sans"
            >
              Discover More
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>

          {/* Visual Elements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-6">
              {/* Lab Preview Cards */}
              <div className="space-y-6">
                <div className="glass-dark p-6 rounded-xl border border-primary/30 glow-purple">
                  <div className="w-full h-32 bg-gradient-to-br from-background to-muted rounded-lg mb-4 flex items-center justify-center">
                    <Image
                      src="/hacker-terminal-interface.jpg"
                      alt="Terminal Interface"
                      width={80}
                      height={80}
                      className="opacity-70"
                    />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 font-sans">SQL Injection Lab</h3>
                  <p className="text-sm text-muted-foreground">Interactive database security testing</p>
                </div>

                <div className="glass-dark p-6 rounded-xl border border-secondary/30 glow-pink">
                  <div className="w-full h-32 bg-gradient-to-br from-background to-muted rounded-lg mb-4 flex items-center justify-center">
                    <Image
                      src="/network-security-concept.jpg"
                      alt="Network Security"
                      width={80}
                      height={80}
                      className="opacity-70"
                    />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 font-sans">Network Penetration</h3>
                  <p className="text-sm text-muted-foreground">Advanced network security testing</p>
                </div>
              </div>

              <div className="space-y-6 mt-12">
                <div className="glass-dark p-6 rounded-xl border border-accent/30 glow-blue">
                  <div className="w-full h-32 bg-gradient-to-br from-background to-muted rounded-lg mb-4 flex items-center justify-center">
                    <Image
                      src="/cryptography-lock.jpg"
                      alt="Cryptography"
                      width={80}
                      height={80}
                      className="opacity-70"
                    />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 font-sans">Cryptography Challenge</h3>
                  <p className="text-sm text-muted-foreground">Master encryption and decryption</p>
                </div>

                <div className="glass-dark p-6 rounded-xl border border-primary/30 glow-purple">
                  <div className="w-full h-32 bg-gradient-to-br from-background to-muted rounded-lg mb-4 flex items-center justify-center">
                    <Image
                      src="/web-security-shield.jpg"
                      alt="Web Security"
                      width={80}
                      height={80}
                      className="opacity-70"
                    />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 font-sans">XSS Attack Simulation</h3>
                  <p className="text-sm text-muted-foreground">Learn web application security</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
