// React
import { Fragment } from "react"

// Next
import Head from "next/head"

// Component
import { Layout } from "@/components"
import { Card } from "@/components/quotes"

// View Model
import { useQuote, useRandomQuote } from "@/viewModel/quotes"

// Third-Party Library
import { motion } from "framer-motion"

// Type
import { Quote } from "@/types/quotes"
import { BsQuote } from 'react-icons/bs'

export default function Quote(): JSX.Element {
  const Quotes = (): JSX.Element => {
    // Hooks
    const { isLoading, isRefetching, nextFetch, quote, fetchNextQuotes } = useQuote()

    return (
      <Fragment>
        <div className="my-5 flex flex-wrap justify-center items-center gap-14">
          {isLoading ? (
            <div className='animate-pulse flex justify-center space-x-3'>
              {[...Array(3)].map((_, index) => (
                <div key={index} className="h-60 card bg-slate-200" style={{ width: "450px" }} />
              ))}
            </div>
          ) : (
            <Fragment>
              {quote.map((val, index) => (
                <Card key={index} {...val} />
              ))}
            </Fragment>
          )}
        </div>

        {nextFetch && (
          <div className="mb-5 text-center">
            <button type="button" className={`btn btn-primary ${isRefetching ? "loading" : ""}`} onClick={fetchNextQuotes}>More Quotes</button>
          </div>
        )}
      </Fragment>
    )
  }

  const RandomQuote = (): JSX.Element => {
    // Hooks
    const { isLoading, quote } = useRandomQuote()

    if (isLoading) {
      return (
        <div className="animate-pulse">
          <div className="h-96 bg-slate-200" />
        </div>
      )
    } else {
      return (
        <div
          className="h-96 flex flex-col"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://picsum.photos/id/${quote.id + 10}/1280/720')`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="my-auto container text-center text-white">
            <section className="mb-8">
              <BsQuote className="mx-auto text-2xl" />
              <h1 className="text-[1.9rem]">{quote.quote}</h1>
            </section>

            <h5 className="text-[14px] uppercase">{quote?.author}</h5>
          </div>
        </div>
      )
    }
  }

  return (
    <Layout>
      <Head>
        <title>Quotes</title>
      </Head>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <section>
          <RandomQuote />
        </section>

        <section className="mx-5">
          <Quotes />
        </section>
      </motion.div>
    </Layout>
  )
}