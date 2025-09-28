"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Target, CheckCircle, Search, Filter, ExternalLink } from "lucide-react"
import Link from "next/link"
import { mockData } from "@/lib/data"
import { motion } from "framer-motion"

export function LabsSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const labs = mockData.getLabs()

  const filteredLabs = labs.filter((lab) => {
    const matchesSearch =
      lab.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lab.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = difficultyFilter === "all" || lab.difficulty === difficultyFilter
    const matchesCategory = categoryFilter === "all" || lab.category === categoryFilter

    return matchesSearch && matchesDifficulty && matchesCategory
  })

  const categories = [...new Set(labs.map((l) => l.category))]
  const difficulties = [...new Set(labs.map((l) => l.difficulty))]

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Interactive <span className="text-secondary text-glow">Labs</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Practice cybersecurity skills with hands-on Unity WebGL simulations.
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-8"
      >
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-secondary" />
              <span>Filter Labs</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search labs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Labs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLabs.map((lab, index) => (
          <motion.div
            key={lab.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-secondary/50 transition-all duration-300 glow-pink group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">
                      {lab.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                      {lab.description}
                    </CardDescription>
                  </div>
                  {lab.completed && <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 ml-2" />}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Target className="w-3 h-3 mr-1" />
                    {lab.estimatedTime}
                  </div>
                  <Badge variant={lab.difficulty === "Beginner" ? "secondary" : "outline"}>{lab.difficulty}</Badge>
                </div>

                {/* Objectives */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Objectives:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {lab.objectives.slice(0, 2).map((objective, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-1 h-1 bg-secondary rounded-full mt-2 mr-2 flex-shrink-0" />
                        {objective}
                      </li>
                    ))}
                    {lab.objectives.length > 2 && (
                      <li className="text-muted-foreground/70">+{lab.objectives.length - 2} more...</li>
                    )}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {lab.category}
                  </Badge>
                  <Button
                    asChild
                    size="sm"
                    className={
                      lab.completed
                        ? "bg-muted text-muted-foreground hover:bg-muted/80"
                        : "bg-gradient-to-r from-secondary to-accent hover:from-secondary/80 hover:to-accent/80 text-white"
                    }
                  >
                    <Link href={`/student/labs/${lab.id}`}>
                      <ExternalLink className="w-3 h-3 mr-1" />
                      {lab.completed ? "Replay" : "Start Lab"}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredLabs.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center py-12"
        >
          <p className="text-muted-foreground text-lg">No labs found matching your criteria.</p>
        </motion.div>
      )}
    </div>
  )
}
