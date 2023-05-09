// React
import { useEffect, useState } from "react"

// API
import { api } from "@/services"

// 
import { CartType } from "./CartType"

export function useCart(props?: {
  defaultValue: string
}) {
  // Hooks
  const [cart, setCart] = useState<null | CartType>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)

    api.get(`/carts/${props?.defaultValue ?? 1}`).then((res) => {
      // Variables
      const data: CartType = res.data

      setCart({
        products: data.products,
        total: data.total,
        totalProducts: data.totalProducts,
      })
    }).catch(() => {
      setCart(null)
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  return { cart, loading }
}