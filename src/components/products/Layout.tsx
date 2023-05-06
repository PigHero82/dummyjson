// React
import { Fragment, PropsWithChildren } from "react"

// Next
import Link from "next/link"

// Third-Party Library
import { AddOutline } from "react-ionicons"

export function Layout(props: PropsWithChildren<{}>) {
  return (
    <Fragment>
      <div className='relative'>
        {props.children}

        <Link href='/products/add'>
          <div className='fixed bottom-5 right-5 h-16 w-16 btn btn-primary rounded-full focus:loading'>
            <AddOutline color='white' />
          </div>
        </Link>
      </div>
    </Fragment>
  )
}