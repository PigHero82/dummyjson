// React
import { useEffect, useState } from "react"

// API
import { api } from "@/services"

export function useProduct(props: {
  category?: string
  limit?: number
  page?: number
  search?: string
}) {
  const defaultValue = {
    limit: 0,
    products: [],
    total: 0,
    skip: 0
  }

  // Hooks
  const [product, setProduct] = useState<{
    limit: number
    products: {
      brand: string
      category: string
      description: string
      discountPercentage: number
      id: number
      price: number
      rating: number
      stock: number
      thumbnail: string
      title: string
    }[],
    total: number
    skip: number
  }>(defaultValue)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)

    api.get(`/products${props?.search ? '/search' : props?.category ? `/category/${props?.category}` : ""}`, {
      params: {
        limit: props?.limit ?? 20,
        select: "discountPercentage,id,price,thumbnail,title",
        skip: props?.page ? (props?.page * 20) - 20 : 0,
        q: props?.search
      }
    }).then(res => {
      setProduct(res.data)
    }).catch(() => {
      setProduct(defaultValue)
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  return { loading, product }
}