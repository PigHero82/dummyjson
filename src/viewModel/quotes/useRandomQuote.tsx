// React
import { useEffect, useState } from "react"

// API
import { api } from "@/services"

// Type
import { Quote } from "@/types/quotes"

export function useRandomQuote() {
  // Hooks
  const [isLoading, setLoading] = useState<boolean>(false)
  const [quote, setQuote] = useState<Quote>({
    author: "-",
    id: 0,
    quote: "-"
  })

  useEffect(() => {
    setLoading(true)

    api.get("/quotes/random").then((res) => {
      // Variables
      const data = res.data

      setQuote(data)
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  return { quote, isLoading }
}