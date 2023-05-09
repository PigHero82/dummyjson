// Next
import { useRouter, useSearchParams } from "next/navigation"

// Component
import { Layout } from "@/components"
import { Body, Cart } from "@/components/carts"

export default function Carts(): JSX.Element {
  // Hooks
  const searchParams = useSearchParams()
  const router = useRouter()

  // Variables
  const id = searchParams.get('id') ?? "1"

  return (
    <Layout>
      <div className="container">
        <div className="prose">
          <h1>Carts</h1>
        </div>

        <section className="my-2">
          <Cart value={id ?? ""} onChange={e => router.push(`/carts?id=${e.target.value}`)} />
        </section>

        <section className="my-2">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              {/* head */}
              <thead>
                <tr>
                  <th className="text-center">#</th>
                  <th className="text-center">Title</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Qty.</th>
                  <th className="text-center">Total</th>
                </tr>
              </thead>

              <tbody>
                <Body id={id} />
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </Layout>
  )
}