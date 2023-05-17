// React
import { useEffect, useState } from "react"

// API
import { api } from "@/services"

// Type
import { Quote } from "@/types/quotes"

export function useQuote() {
  // Hooks
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isRefetching, setRefetching] = useState<boolean>(false)
  const [nextFetch, setNextFetch] = useState<number | null>(null)
  const [quote, setQuote] = useState<Quote[]>([])

  const nextFetchHandler = (skip: number, limit: number, total: number) => {
    if (skip + limit < total) {
      setNextFetch(skip + limit)
    } else {
      setNextFetch(null)
    }
  }

  useEffect(() => {
    setLoading(true)

    api.get("/quotes").then((res) => {
      // Variables
      const data = res.data

      setQuote(data.quotes)
      nextFetchHandler(data.skip, data.limit, data.total)
    }).catch(() => {
      setNextFetch(null)
      setQuote([])
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  const fetchNextQuotes = () => {
    setRefetching(true)

    api.get("/quotes", {
      params: {
        skip: nextFetch
      }
    }).then((res) => {
      // Variables
      const data = res.data
      const dataQuote = [...quote]

      dataQuote.push(...data.quotes)
      setQuote(dataQuote)
      nextFetchHandler(data.skip, data.limit, data.total)
    }).finally(() => {
      setRefetching(false)
    })
  }

  return { quote, isLoading, isRefetching, nextFetch, fetchNextQuotes }
}