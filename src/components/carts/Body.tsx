// React
import { Fragment, memo } from "react"

// View Model
import { useCart } from "@/viewModel/cart"

export const Body = memo(function Body(props: {
  id: string
}): JSX.Element {
  const { cart, loading } = useCart({
    defaultValue: props.id
  })

  if (loading) {
    return (
      <Fragment>
        {([...Array(6)]).map((_, index) => (
          <tr key={`blank-${index}`} className="animate-pulse">
            <th />
            <th />
            <th />
            <th />
            <th />
          </tr>
        ))}
      </Fragment>
    )
  }

  return (
    <Fragment>
      {cart?.products?.map((val, index) => (
        <tr key={index}>
          <th>{index + 1}</th>
          <th>{val.title}</th>
          <th className="text-right">${val.price}</th>
          <th className="text-right">{val.quantity}</th>
          <th className="text-right">${val.total}</th>
        </tr>
      ))}
    </Fragment>
  )
})