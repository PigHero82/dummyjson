export function Input(props: {
  error?: string | false
  label?: string
  leftGroup?: string | JSX.Element
  placeholder?: string
  rightGroup?: string | JSX.Element
  type?: string
  value?: string
}) {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{props.label}</span>
      </label>

      <div className={(props.leftGroup || props.rightGroup) && "input-group"}>
        {props.leftGroup && (
          <span>{props.leftGroup}</span>
        )}

        {props.type === "textarea" ? (
          <textarea
            className={`textarea textarea-bordered w-full ${props.error && "input-error"}`}
            defaultValue={props.value}
            placeholder={props.placeholder}
            {...props}
          />
        ) : (
          <input
            type={props.type ?? "text"}
            className={`input input-bordered w-full ${props.error && "input-error"}`}
            defaultValue={props.value}
            placeholder={props.placeholder}
            {...props}
          />
        )}

        {props.rightGroup && (
          <span>{props.rightGroup}</span>
        )}
      </div>

      {props.error && (
        <label className="label">
          <span className="label-text-alt text-error">{props.error}</span>
        </label>
      )}
    </div>
  )
}