// Next
import Link from "next/link"

// Icon
import { IoChevronBackOutline } from "react-icons/io5"

export function Header(props: { title: string }) {
  return (
    <section className="flex justify-between items-center">
      <div className="prose">
        <h2 className="m-0">{props.title}</h2>
        <div className="text-gray">Data will not changed in the server</div>
      </div>

      <Link href="/products">
        <button type='button' className="btn btn-outline focus:loading">
          <IoChevronBackOutline className="text-black" /> Back
        </button>
      </Link>
    </section>
  )
}