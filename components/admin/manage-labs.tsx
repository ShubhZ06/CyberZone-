"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Gamepad2, Search, Filter, Plus, Edit, Trash2, Eye, ExternalLink } from "lucide-react"
import Link from "next/link"
import { mockData } from "@/lib/data"
import { motion } from "framer-motion"

export function ManageLabs() {
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Manage <span className="text-secondary text-glow">Labs</span>
            </h1>
            <p className="text-muted-foreground text-lg">Create, edit, and organize interactive labs.</p>
          </div>
          <Button
            asChild
            className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/80 hover:to-accent/80"
          >
            <Link href="/admin/labs/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Lab
            </Link>
          </Button>
        </div>
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

      {/* Labs Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 glow-pink">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Gamepad2 className="w-5 h-5 text-secondary" />
              <span>Interactive Labs ({filteredLabs.length})</span>
            </CardTitle>
            <CardDescription>Manage your hands-on cybersecurity simulations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-border/50">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Objectives</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLabs.map((lab) => (
                    <TableRow key={lab.id} className="hover:bg-muted/30">
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">{lab.title}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1">{lab.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {lab.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={lab.difficulty === "Beginner" ? "secondary" : "outline"} className="text-xs">
                          {lab.difficulty}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{lab.estimatedTime}</TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">{lab.objectives.length} objectives</span>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-secondary text-secondary-foreground text-xs">Published</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button size="sm" variant="ghost">
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
