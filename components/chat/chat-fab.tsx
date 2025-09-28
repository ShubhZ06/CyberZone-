"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, Loader2 } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function ChatFab() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    const prompt = input.trim()
    if (!prompt) return

    setMessages((prev) => [...prev, { role: "user", content: prompt }])
    setInput("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      })
      const data = await res.json()

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply ?? "I couldn't generate a response." },
      ])
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Network error. Please try again." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className="shadow-lg glow-purple bg-gradient-to-r from-primary to-secondary hover:from-primary/85 hover:to-secondary/85"
            size="lg"
          >
            <MessageSquare className="h-5 w-5" />
            <span className="ml-2 font-sans">Talk to AI</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="glass-dark border-border/50 sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-sans">Cyber Assistant</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <ScrollArea className="h-64 rounded-lg border border-border/50 p-3 bg-background/50">
              <div className="space-y-3">
                {messages.length === 0 && (
                  <p className="text-sm text-muted-foreground">Ask anything about modules, labs, or cybersecurity concepts.</p>
                )}
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={
                      m.role === "user"
                        ? "ml-auto max-w-[80%] rounded-lg bg-primary text-primary-foreground px-3 py-2"
                        : "mr-auto max-w-[80%] rounded-lg glass border border-border/50 px-3 py-2"
                    }
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
                  </div>
                ))}
                {isLoading && (
                  <div className="mr-auto inline-flex items-center gap-2 rounded-lg glass border border-border/50 px-3 py-2 text-sm">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Thinking...
                  </div>
                )}
              </div>
            </ScrollArea>
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="min-h-[44px]"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
              />
              <Button onClick={sendMessage} disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              This uses a server API. You can connect your Gemini API key via the backend later.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
