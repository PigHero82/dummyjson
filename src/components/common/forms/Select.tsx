export function Select(props: {
  data: {
    value: string | number
    label: string | number
  }[]
  error?: string | false
  label?: string
  loading?: boolean
  onChange: (e : {
    target: {
      value: number | string
    }
  }) => void
  placeholder?: string
  value?: string
}) {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{props.label}</span>
      </label>

      {props.loading ? (
        <select title="Loading" className="select w-full" disabled>
          <option>Loading...</option>
        </select>
      ) : (
        <select className="select select-bordered w-full" defaultValue={props.value} {...props} onChange={props.onChange}>
          <option value="" hidden>{props.placeholder ?? "Select..."}</option>
          {props.data.map((val, index) => <option key={index} value={val.value}>{val.label}</option>)}
        </select>
      )}

      {props.error && (
        <label className="label">
          <span className="label-text-alt text-error">{props.error}</span>
        </label>
      )}
    </div>
  )
}