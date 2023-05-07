// React
import { useEffect, useState } from "react"

// API
import { api } from "@/services"

export function useCategory() {
  const [category, setCategory] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)

    api.get("/products/categories").then(res => {
      setCategory(res.data)
    }).catch(() => {
      setCategory([])
    }).finally(() => {
      setLoading(false)
    })
    
    return () => {
      setCategory([])
      setLoading(false)
    }
  }, [])

  return { category, loading }
}