export async function chatCompletion(prompt: string): Promise<string> {
  const text = (prompt || "").trim()
  if (!text) return "Please provide a question or topic."

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return "AI is not configured yet. Set GEMINI_API_KEY in .env.local and restart the server."
  }

  const model = process.env.GEMINI_MODEL || "gemini-1.5-flash"

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text }],
          },
        ],
        generationConfig: {
          temperature: 0.3,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 512,
        },
      }),
    })

    if (!res.ok) {
      // Log minimal details server-side for debugging
      const errText = await res.text().catch(() => "")
      console.error("Gemini non-OK response:", res.status, errText?.slice(0, 300))
      return "AI request failed (non-OK response). Please try again later."
    }

    const data: any = await res.json()
    const parts = data?.candidates?.[0]?.content?.parts
    const reply = Array.isArray(parts)
      ? parts.map((p: any) => p?.text ?? "").join("")
      : data?.candidates?.[0]?.content?.parts?.[0]?.text ?? ""

    return (reply || "No response from model.").trim()
  } catch (err) {
    return "AI request failed due to a network or server error. Please try again later."
  }
}
