// React
import { useEffect, useState } from "react"

// Third-Party Library
import axios from "axios"

export function useProduct() {
  // Hooks
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    axios.get('https://dummyjson.com/products').then(res => {
      setData(res.data.products)
    }).finally(() => {
      setLoading(false)
    })

    return () => {
      setData([])
      setLoading(false)
    }
  }, [])

  return { data, loading }
}