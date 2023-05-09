// React
import { memo } from "react"

// Component
import { Select } from "@/components"

// View Model
import { useAllCart } from "@/viewModel/cart"

export const Cart = memo(function Cart(props: {
  onChange: (e: {
    target: {
      value: string | number
    }
  }) => void
  value: string
}) {
  // Hooks
  const { cart, loading } = useAllCart()

  // Variables
  const data = cart.map(val => {
    return {
      label: val,
      value: val
    }
  })

  return (
    <Select
      label="Cart ID"
      placeholder="Select Cart"
      data={data}
      loading={loading}
      value={props.value}
      onChange={props.onChange}
    />
  )
})