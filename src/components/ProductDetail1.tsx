export function ProductDetail1(props: {
  data: object
}) {
  return (
    <section className='flex flex-col'>
      <div>{props.data.title} - {props.data.brand}</div>
      <div className="mb-3">{props.data.description}</div>
      <div className='mt-auto flex'>
        <div className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
          {props.data.category}
        </div>
      </div>
    </section>
  )
}