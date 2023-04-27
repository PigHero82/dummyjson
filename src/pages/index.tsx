// React
import { useState } from 'react'

// Next
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

// Form
import { Field, Form, Formik } from 'formik'

// Third-Party Library
import { ArrowForwardOutline } from 'react-ionicons'
import { motion } from "framer-motion"

// Utility
import { isDiscounted } from '@/utilities'

function Home(props: {
  data: {
    limit: number
    products: {
      brand: string
      category: string
      description: string
      discountPercentage: number
      id: number
      price: number
      rating: number
      stock: number
      thumbnail: string
      title: string
    }[],
    total: number
    skip: number
  }
}) {
  // Hooks
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loadingPage, setLoadingPage] = useState<number | null>(null)

  // Variables
  const searchQuery: {
    page: string | number | null
    search: string | null
  } = {
    page: searchParams.get('page'),
    search: searchParams.get('search')
  }

  const initialValues: {
    search: any
  } = {
    search: searchQuery.search
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <main className='container mx-auto'>
        <section className='mb-5'>
          <Formik
            initialValues={initialValues}
            onSubmit={(values: {
              search?: string
            }) => {
              // @ts-ignore
              router.push({
                pathname: '/',
                query: {
                  ...searchQuery,
                  search: values.search
                }
              })
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-control">
                  <div className="input-group">
                    <Field name="search">
                      {(props: { field: any }) => <input type="text" className="input input-bordered w-full" placeholder="Search..." {...props.field} />}
                    </Field>

                    <button type='submit' title='Submit' className={`btn btn-square ${isSubmitting && "loading"}`}>
                      {!isSubmitting && <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </section>

        <div className='mx-auto flex flex-wrap justify-center gap-5'>
          {props.data.products.map((val, index) => {
            // Variables
            const discountPercentage = val.discountPercentage
            const discounted = isDiscounted(discountPercentage)
            const price = val.price

            return (
              <div key={index} className='group w-56 flex flex-col justify-stretch'>
                <section className='relative'>
                  <img src={val.thumbnail} alt={val.title} className="h-64 object-cover" />

                  <div className='group-hover:transition-all invisible group-hover:visible absolute bottom-0 w-full p-3'>
                    <Link key={index} href={`/product/${val.id}`} onClick={() => setLoadingPage(index)}>
                      <button type='button' className={`w-full btn btn-light dark:btn-dark gap-2 ${loadingPage === index && "loading"}`}>
                        Show Detail
                        <ArrowForwardOutline color={'#00000'} />
                      </button>
                    </Link>
                  </div>
                </section>

                <div className='flex justify-between gap-x-5'>
                  <h3>{val.title}</h3>

                  <section className='text-end'>
                    <h3 className={discounted ? 'text-gray-500 line-through' : ''}>${price}</h3>
                    {discounted && <h3>${(price - (price * discountPercentage / 100)).toFixed(2)}</h3>}
                  </section>
                </div>
              </div>
            )
          })}
        </div>

        <div className='text-center mt-5'>
          <div className="btn-group">
            {[...Array(props.data.total / props.data.limit)].map((_, index) => {
              // Variables
              const current = Boolean(((props.data.skip + 20) / props.data.limit) === index + 1)

              return (
                <button
                  key={index}
                  type='button'
                  className={`btn btn-sm ${current ? "btn-active" : ""}`}
                  onClick={() => {
                    if (!current) {
                      // @ts-ignore
                      router.push({
                        pathname: '/',
                        query: {
                          ...searchQuery,
                          page: index + 1
                        }
                      })
                    }
                  }}
                >
                  {index + 1}
                </button>
              )
            })}
          </div>
        </div>
      </main>
    </motion.div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query }: { query: any } = context
  // Fetch data from external API
  const res = await fetch(`https://dummyjson.com/products${query.search ? '/search' : ''}?` + new URLSearchParams({
    ...query,
    q: query.search,
    skip: query.page ? (query.page * 20) - 20 : 0,
    limit: query.limit ?? 20
  }))
  const data = await res.json()

  if (data.products.length === 0) { 
    return {
      notFound: true
    }
  }

  // Pass data to the page via props
  return { props: { data } }
}

export default Home