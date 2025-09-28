import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { About } from "@/components/landing/about"
import { CTA } from "@/components/landing/cta"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Features />
      <About />
      <CTA />
    </main>
  )
}
