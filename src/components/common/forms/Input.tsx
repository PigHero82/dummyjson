export function Input(props: {
  className?: string
  error?: string | false
  label?: string
  leftGroup?: string | JSX.Element
  placeholder?: string
  rightGroup?: string | JSX.Element
  type?: 'number' | 'text' | 'textarea'
  value?: string
}) {
  return (
    <div className="form-control w-full">
      {props.label && (
        <label className="label">
          <span className="label-text">{props.label}</span>
        </label>
      )}

      <div className={(props.leftGroup || props.rightGroup) && "input-group"}>
        {props.leftGroup && (
          <span>{props.leftGroup}</span>
        )}

        {props.type === "textarea" ? (
          <textarea
            defaultValue={props.value}
            placeholder={props.placeholder}
            {...props}
            className={`textarea textarea-bordered w-full ${props.error && "input-error"} ${props.className}`}
          />
        ) : (
          <input
            type={props.type ?? "text"}
            defaultValue={props.value}
            placeholder={props.placeholder}
            {...props}
            className={`input input-bordered w-full ${props.error && "input-error"} ${props.className}`}
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