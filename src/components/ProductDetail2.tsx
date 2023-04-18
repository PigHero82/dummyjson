export function ProductDetail2(props: {
  data: object
}) {
  return (
    <section className='flex flex-col mt-3 md:mt-0 md:text-end'>
      <div>$ {props.data.price}</div>
      <div className='mt-auto whitespace-nowrap'>Rating: {props.data.rating}</div>
    </section>
  )
}