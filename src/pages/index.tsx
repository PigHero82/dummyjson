// React
import { Fragment } from "react"

// Next
import Head from "next/head"
import Link from "next/link"

// Component
import { Layout } from "@/components"

// Third-Party Library
import { motion } from "framer-motion"

export default function Home() {
  // Variables
  const menu: {
    label: string
    link: string
  }[] = [
    {
      label: "Products + Carts",
      link: "/products"
    },
    {
      label: "Quotes",
      link: "/quotes"
    }
  ]

  return (
    <Fragment>
      <Head>
        <title>dummyJSON</title>
      </Head>

      <Layout>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container h-[90vh] flex flex-col">
            <div className="my-auto">
              <div className="text-center md:text-8xl sm:text-7xl text-5xl">
                dummyJSON
              </div>
            </div>

            <div className="my-5 flex flex-wrap justify-center items-stretch gap-5">
              {menu.map((val, index) => (
                <Link key={index} href={val.link}>
                  <button type='button' className="btn focus:loading">
                    {val.label}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </Layout>
    </Fragment>
  )
}