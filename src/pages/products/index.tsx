// React
import { Fragment } from 'react'

// Next
import Head from 'next/head'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

// API
import { api } from '@/services'

// Component
import { Layout } from '@/components'
import { Layout as ProductLayout } from '@/components/products'

// Form
import { Field, Form, Formik } from 'formik'

// Third-Party Library
import { ArrowForwardOutline, BagRemoveOutline, CheckmarkOutline, PencilOutline, TrashBinOutline } from 'react-ionicons'
import { motion } from "framer-motion"

// Utility
import { isDiscounted } from '@/utilities'
import { toast } from 'react-hot-toast'

// View Model
import { useCategory, useProduct } from '@/viewModel/product'

export default function Product() {
  // Hooks
  const router = useRouter()
  const searchParams = useSearchParams()

  // Variables
  const searchQuery: {
    category: string | null
    page: string | null
    search: string | null
  } = {
    category: searchParams.get('category'),
    page: searchParams.get('page'),
    search: searchParams.get('search')
  }

  const initialValues: {
    search: any
  } = {
    search: searchQuery.search
  }

  const Category = (): JSX.Element => {
    const { category, loading } = useCategory()

    if (loading) {
      return (
        <div className='animate-pulse flex justify-center space-x-3'>
          {[...Array(3)].map((_, index) => (
            <button disabled key={index} type='button' title='Loading' className='btn btn-outline'>
              <div className="h-2 w-20 bg-slate-200 rounded"></div>
            </button>
          ))}
        </div>
      )
    }

    return (
      <div className='flex gap-x-3 overflow-x-auto'>
        {category.map((val, index) => (
          <button
            key={index}
            type='button'
            className={`btn ${searchQuery.category !== val && "btn-outline"}`}
            onClick={() => {
              // @ts-ignore
              router.push({
                pathname: '/products',
                query: {
                  ...searchQuery,
                  category: val,
                  search: null
                }
              })
            }}
          >
            {searchQuery.category === val && <CheckmarkOutline color="#FFFFFF" />} {val}
          </button>
        ))}
      </div>
    )
  }

  const Product = (): JSX.Element => {
    // Hooks
    // @ts-ignore
    const { loading, product } = useProduct({
      ...searchQuery,
      page: parseInt(searchQuery?.page ?? "0")
    })

    if (loading) {
      return (
        <div className='animate-pulse flex justify-center space-x-3'>
          {[...Array(5)].map((_, index) => (
            <div key={index} className='w-56 flex flex-col justify-stretch'>
              <div className="h-64 bg-slate-200" />
  
              <div className='mt-3 flex justify-between gap-x-5'>
                <div className="h-5 w-20 bg-slate-200 rounded" />
                <div className="h-5 w-20 bg-slate-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      )
    }

    return (
      <Fragment>
        {product?.products.length === 0 ? (
          <div className='my-10 text-center'>
            <div className='flex justify-center'>
              <BagRemoveOutline width="100px" height="100px" />
            </div>

            <div className='text-2xl font-bold'>No Products Available</div>
          </div>
        ) : (
          <div className='mx-auto flex flex-wrap justify-center gap-5'>
            {product?.products.map((val, index) => {
              // Variables
              const discountPercentage = val.discountPercentage
              const discounted = isDiscounted(discountPercentage)
              const price = val.price

              return (
                <div key={index} className='group w-56 flex flex-col justify-stretch'>
                  <section className='relative'>
                    <img src={val.thumbnail} alt={val.title} className="h-64 object-cover" />

                    <div className='group-hover:transition-all invisible group-hover:visible absolute top-0 right-0 m-2'>
                      <div className='btn-group'>
                        <button type="button" title="Edit" className="group btn btn-sm btn-square btn-warning focus:loading">
                          <Link href={`/products/edit/${val.id}`}>
                            <div className='group-focus:hidden'>
                              <PencilOutline />
                            </div>
                          </Link>
                        </button>

                        <button
                          type="button"
                          title="Edit"
                          className="btn btn-sm btn-square btn-error"
                          onClick={() => {
                            toast((t) => (
                              <div className='flex items-center gap-x-3'>
                                <div>Are you sure?</div>

                                <div className='flex'>
                                  <button
                                    type='button'
                                    className='btn btn-sm btn-primary rounded-none'
                                    onClick={() => {
                                      toast.dismiss(t.id)

                                      toast.promise(
                                        api.delete(`/products/${val.id}`),
                                        {
                                          loading: 'Processing...',
                                          success: () => {
                                            window.location.reload()
                                            return "Success"
                                          },
                                          error: "Failed",
                                        }
                                      )
                                    }}
                                  >
                                    Confirm
                                  </button>

                                  <button type='button' className='btn btn-sm btn-red-500 rounded-none' onClick={() => toast.dismiss(t.id)}>
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ))
                          }}
                        >
                          <div className='group-focus:hidden'>
                            <TrashBinOutline />
                          </div>
                        </button>
                      </div>
                    </div>

                    <div className='group-hover:transition-all invisible group-hover:visible absolute bottom-0 w-full p-3'>
                      <Link key={index} href={`/products/detail/${val.id}`}>
                        <button type='button' className="w-full btn btn-light dark:btn-dark gap-2 focus:loading">
                          Show Detail <ArrowForwardOutline color='#00000' />
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
        )}

        {product?.products.length > 0 && (
          <div className='text-center mt-5'>
            <div className="btn-group">
              {[...Array(product?.total / product?.limit ?? 0)].map((_, index) => {
                // Variables
                const current = Boolean(((product?.skip + 20) / product?.limit) === index + 1)

                return (
                  <button
                    key={index}
                    type='button'
                    className={`btn btn-sm ${current ? "btn-active" : ""}`}
                    onClick={() => {
                      if (!current) {
                        // @ts-ignore
                        router.push({
                          pathname: '/products',
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
        )}
      </Fragment>
    )
  }

  return (
    <Fragment>
      <Head>
        <title>Product</title>
      </Head>

      <Layout>
        <ProductLayout>
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
                      pathname: '/products',
                      query: {
                        ...searchQuery,
                        category: null,
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

              <section className='mb-5'>
                <Category />
              </section>

              <section>
                <Product />
              </section>
            </main>
          </motion.div>
        </ProductLayout>
      </Layout>
    </Fragment>
  )
}