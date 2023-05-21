import { Fragment } from "react"

export function Follow(props: {
  isLoading?: boolean
  label?: string
  value?: number
}) {
  return (
    <section className="border-y-2 p-5">
      {props.isLoading ? (
        <Fragment>
          <div className="h-6 w-40 mb-2 mx-auto bg-slate-200 rounded" />
          <div className="h-6 w-28 mx-auto bg-slate-200 rounded" />
        </Fragment>
      ) : (
        <Fragment>
          <h3 className="m-0 font-normal">{props.label}</h3>
          <h3 className="m-0">{props.value}</h3>
        </Fragment>
      )}
    </section>
  )
}