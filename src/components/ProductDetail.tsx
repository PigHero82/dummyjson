// Third-Party Library
// @ts-ignore
import StarRatings from "react-star-ratings"

export function ProductDetail(props: {
  data: {
    brand: string
    category: string
    description: string
    discountPercentage: number
    id: number
    price: number
    rating: number
    stock: number
    title: string
  }
}) {
  // Variables
  const discountPercentage = props.data.discountPercentage
  const isDiscounted = discountPercentage > 0
  const price = props.data.price
  const stock = props.data.stock
  const totalDiscounted = price - (price * discountPercentage / 100)

  return (
    <div className='flex flex-col'>
      <section className='flex justify-between gap-x-3'>
        <section>
          <div>{props.data.title} - <span className="font-bold">{props.data.brand}</span></div>
          <div className="mb-3">{props.data.description}</div>
        </section>

        <section className="text-end">
          {stock <= 50 && <div className="whitespace-nowrap text-red-500">{stock} remaining</div>}

          {isDiscounted && (
            <div className="whitespace-nowrap">
              <span className="line-through">${price}</span>
              <span className="text-red-500"> {discountPercentage}% off</span>
            </div>
          )}

          <div className="whitespace-nowrap text-2xl font-bold">${isDiscounted ? totalDiscounted.toFixed(2) : price}</div>
        </section>
      </section>

      <section className='mt-auto flex justify-between items-center'>
        <div className='flex'>
          <div className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            {props.data.category}
          </div>
        </div>

        <div className="flex items-center">
          <div className="z-10 -mr-2 bg-gold w-12 h-12 rounded-full p-1 flex justify-center items-center font-bold dark:text-black">
            {props.data.rating}
          </div>

          <div className="z-0 bg-black rounded-e-full pr-2 py-1 pl-3">
            <div className="-mt-1">
              <StarRatings
                rating={props.data.rating}
                starRatedColor="gold"
                numberOfStars={5}
                name='rating'
                starDimension="15px"
                starSpacing="0px"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}