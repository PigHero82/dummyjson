// React
import { Fragment } from "react"

// Next
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"

// API
import { api } from "@/services"

// Component
import { Layout } from "@/components"
import { FormSection } from "@/components/products"

// Form
import { Formik } from "formik"
import * as yup from 'yup'

// Third-Party Library
import { ChevronBackOutline } from "react-ionicons"
import { toast } from "react-hot-toast"

export default function EditProduct(props: {
  data: {
    brand: string
    category: string
    description: string
    id: number
    price: number
    title: string
  }
}) {
  // Hooks
  const router = useRouter()

  return (
    <Fragment>
      <Head>
        <title>{props.data.title} | Edit Product</title>
      </Head>

      <Layout>
        <main className="container mx-auto">
          <section className="flex justify-between items-center">
            <div className="prose">
              <h2 className="m-0">Edit Product</h2>
              <div className="text-gray">Data will not changed in the server</div>
            </div>

            <Link href="/products">
              <button type='button' className="btn btn-outline focus:loading">
                <ChevronBackOutline color='#00000' /> Back
              </button>
            </Link>
          </section>

          <Formik
            initialValues={{
              title: props.data.title,
              description: props.data.description,
              price: props.data.price,
              brand: props.data.brand,
              category: props.data.category
            }}
            validationSchema={yup.object().shape({
              title: yup.string().label("Title").required(),
              price: yup.number().label("Price").min(0).nullable().required(),
              brand: yup.string().label("Brand").required(),
              category: yup.string().label("Category").required()
            })}
            onSubmit={values => {
              toast.promise(
                api.put(`/products/${props.data.id}`, values),
                {
                  loading: 'Processing...',
                  success: () => {
                    router.push('/products')
                    return "Success"
                  },
                  error: "Failed",
                }
              )
            }}
          >
            <FormSection />
          </Formik>
        </main>
      </Layout>
    </Fragment>
  )
}

export async function getServerSideProps(context: any) {
  const { params } = context

  const res = await fetch(`${process.env.API_URL}/products/${params.id}`)
  const data = await res.json()

  return { props: { data } }
}