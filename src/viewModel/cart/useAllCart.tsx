// React
import { useEffect, useState } from "react"

// API
import { api } from "@/services"

export function useAllCart() {
  // Hooks
  const [cart, setCart] = useState<number[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)

    api.get("/carts").then((res) => {
      // Variables
      const data: { id: number }[] = res.data.carts

      setCart(data.map((val: { id: number }) => {
        return val.id
      }))
    }).catch(() => {
      setCart([])
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  return { cart, loading }
}