// Next
import Head from "next/head"

// Component
import { Layout } from "@/components"
import { Card } from "@/components/quotes"

// Third-Party Library
import { motion } from "framer-motion"
import { Typewriter } from "react-simple-typewriter"

// Type
import { Quote } from "@/types/quotes"

// View Model
import { useRandomQuote } from "@/viewModel/quotes"

export default function QuoteDetail(props: {
  data: Quote
}): JSX.Element {
  const AnotherQuote = (): JSX.Element => {
    // Hooks
    const { isLoading, quote } = useRandomQuote()

    if (isLoading) {
      return <div className="h-60 card bg-slate-200" style={{ width: "450px" }} />
    } else {
      return <Card {...quote} />
    }
  }

  return (
    <Layout>
      <Head>
        <title>{props.data.quote} | Quotes</title>
      </Head>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{
          delay: 0.2,
          duration: 0.5
        }}
      >
        <section>
          <div
            className="h-[50vh] flex flex-col"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://picsum.photos/id/${props.data.id + 10}/1280/720')`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="my-auto container text-center text-white">
              <h1 className="mb-5 text-[1.9rem]">
                <Typewriter
                  delaySpeed={1000}
                  deleteSpeed={25}
                  loop={1}
                  typeSpeed={75}
                  words={[props.data.quote]}
                />
              </h1>

              <h5 className="text-[14px] uppercase">{props.data.author}</h5>
            </div>
          </div>
        </section>

        <section className="m-5">
          <div className="my-5 flex flex-wrap justify-center items-center gap-14">
            {[...Array(5)].map((_, index) => (
              <AnotherQuote key={index} />
            ))}
          </div>
        </section>
      </motion.div>
    </Layout>
  )
}

export async function getServerSideProps(context: any) {
  const { params } = context

  const res = await fetch(`${process.env.API_URL}/quotes/${params.id}`)
  const data = await res.json()

  return { props: { data } }
}