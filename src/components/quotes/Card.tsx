// Next
import Link from "next/link"

// Type
import { Quote } from "@/types/quotes"

export function Card(props: Quote): JSX.Element {
  return (
    <Link href={`/quotes/${props.id}`}>
      <div className="card bg-base-100 shadow-xl image-full" style={{ width: "450px" }}>
        <figure>
          <img src={`https://picsum.photos/id/${props.id + 10}/600/400`} alt={props.quote} width={450} className="!h-60 object-cover" />
        </figure>

        <div className="card-body flex flex-col text-center">
          <div className="my-auto text-[22px]">{props.quote}</div>
          <div className="m-0 mb-3 text-[14px] uppercase">{props.author}</div>
        </div>
      </div>
    </Link>
  )
}