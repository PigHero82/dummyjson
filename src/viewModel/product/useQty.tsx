// React
import { useState } from "react"

export function useQty(props: {
  min?: number
  max?: number
}) {
  const [qty, setQty] = useState(props.min !== 0 ? props.min : 0)

  const increase = () => {
    if (props.max && props.max === qty) {
      return null
    } else {
      setQty((prev: any) => prev + 1)
    }
  }

  const decrease = () => {
    if (props.min && props.min === qty) {
      return null
    } else {
      setQty((prev: any) => prev - 1)
    }
  }

  return { qty, increase, decrease }
}