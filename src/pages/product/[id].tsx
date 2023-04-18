// Component
import { ProductDetail1, ProductDetail2 } from "@/components"

function Product({ data }) {
  console.log(data)

  return (
    <main>
      <img src={data.thumbnail} alt={data.title} className="object-cover w-screen h-96" />

      <div className="container">
        <div className="my-5 flex flex-col md:flex-row justify-between">
          <ProductDetail1 data={data} />
          <ProductDetail2 data={data} />
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {data.images.map((val, index) => (
            <img key={index} src={val} alt={`${data.title}-${index}`} className="object-cover w-full md:h-48" />
          ))}
        </div>
      </div>
    </main>
  )
}

// This gets called on every request
export async function getServerSideProps(context) {
  const { params } = context
  // Fetch data from external API
  const res = await fetch(`https://dummyjson.com/products/${params.id}`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

export default Product