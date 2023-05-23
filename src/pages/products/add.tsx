// React
import { Fragment } from "react"

// Next
import Head from "next/head"
import { useRouter } from "next/router"

// API
import { api } from "@/services"

// Component
import { Layout } from "@/components"
import { FormSection, Header } from "@/components/products"

// Form
import { Formik } from "formik"
import * as yup from 'yup'

// Third-Party Library
import { toast } from "react-hot-toast"

export default function AddProduct() {
  // Hooks
  const router = useRouter()

  return (
    <Fragment>
      <Head>
        <title>Add Product</title>
      </Head>

      <Layout>
        <main className="container">
          <Header title="Add Product" />

          <Formik
            initialValues={{
              title: "",
              description: "asdasd",
              price: null,
              brand: "",
              category: ""
            }}
            validationSchema={yup.object().shape({
              title: yup.string().label("Title").required(),
              price: yup.number().label("Price").min(0).nullable().required(),
              brand: yup.string().label("Brand").required(),
              category: yup.string().label("Category").required()
            })}
            onSubmit={values => {
              toast.promise(
                api.post("/products/add", values),
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