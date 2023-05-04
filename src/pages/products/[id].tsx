// React
import { Fragment } from "react"

// Component
import { Layout } from "@/components"

// Third-Party Library
// @ts-ignore
import StarRatings from "react-star-ratings"
import { AddOutline, RemoveOutline, CartOutline } from "react-ionicons"
import { motion } from 'framer-motion'

// Utilities
import { isDiscounted } from "@/utilities"

// View Model
import { useQty } from "@/viewModel/product"

export default function ProductDetail(props: {
  data: {
    brand: string
    category: string
    description: string
    discountPercentage: number
    id: number
    images: string[]
    price: number
    rating: number
    stock: number
    thumbnail: string
    title: string
  }
}) {
  // Variables
  const discountPercentage = props.data.discountPercentage
  const discounted = isDiscounted(discountPercentage)
  const price = props.data.price

  const Qty = (props: {
    stock?: number
  }) => {
    // Hooks
    const { qty, decrease, increase } = useQty({ max: props.stock, min: 1 })

    return (
      <Fragment>
        <div className="prose">
          <small>Stock: {props.stock}</small>
        </div>

        <section className="flex items-center gap-x-3">
          <button type="button" title="decrease">
            <RemoveOutline color={'#00000'} onClick={decrease} />
          </button>

          <h2 className="select-none m-0">{qty}</h2>

          <button type="button" title="increase">
            <AddOutline color={'#00000'} onClick={increase} />
          </button>
        </section>
      </Fragment>
    )
  }

  return (
    <Layout>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        transition={{
          delay: 0.2,
          duration: 0.5
        }}
      >
        <div className="grid grid-cols-3 items-stretch">
          <section className="grow relative">
            <div className="carousel carousel-vertical h-screen">
              {props.data.images.map((val, index) => (
                <div key={index} id={`item-${index}`} className="carousel-item">
                  <img src={val} alt={`${props.data.title}-${index}`} className="w-full h-screen object-cover" />
                </div> 
              ))}

              <div className="absolute inset-y-0 left-0 h-full brightness-50 bg-black/50 flex flex-column my-auto overflow-y-auto">
                <div className="my-auto">
                  {props.data.images.map((val, index) => (
                    <a key={index} href={`#item-${index}`}>
                      <img src={val} alt={`${props.data.title}-${index}-navigation`} className="h-16 w-16 object-cover" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="col-span-2 container px-10 mx-auto my-auto">
            <section className="flex items-center mb-3">
              <div className="z-10 -mr-2 bg-gold w-10 h-10 rounded-full p-1 flex justify-center items-center font-bold dark:text-black">
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
            </section>

            <article className="prose max-w-full">
              <h2 className="m-0">{props.data.title}</h2>
              <h3 className="m-0">{props.data.brand}</h3>
              <p>{props.data.description}</p>

              {discounted && (
                <div>
                  <span className="line-through">${price}</span>
                  <span className="text-red-500"> {discountPercentage}% off</span>
                </div>
              )}

              <h2 className="mt-0">${(price - (price * discountPercentage / 100)).toFixed(2)}</h2>
              <Qty stock={props.data.stock} />
              
              <button type="button" className="w-full mt-5 btn btn-disabled btn-primary gap-2">
                <CartOutline color="#ffffff" />
                Buy Now
              </button>
            </article>
          </section>
        </div>
      </motion.div>
    </Layout>
  )
}

// This gets called on every request
export async function getServerSideProps(context: any) {
  const { params } = context

  // Fetch data from external API
  const res = await fetch(`https://dummyjson.com/products/${params.id}`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}