// React
import { Fragment, PropsWithChildren, useState } from "react"

// Next
import Link from "next/link"

// Drawer
import Drawer from "react-modern-drawer"
import 'react-modern-drawer/dist/index.css'

// Third-Party Library
import { AddOutline, CartOutline, CloseOutline } from "react-ionicons"

// View Model
import { useCart } from "@/viewModel/cart"

export function Layout(props: PropsWithChildren<{}>) {
  const DrawerSection = (): JSX.Element => {
    // Hooks
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const toggleDrawer = () => {
      setIsOpen((prevState) => !prevState)
    }

    const CartList = (): JSX.Element => {
      // Hooks
      const { cart, loading } = useCart()

      if (loading) {
        return (
          <div className='animate-pulse overflow-y-auto flex flex-col gap-y-2'>
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-stretch space-x-2">
                <div className="grow">
                  <div className="h-20 w-16 bg-slate-200" />
                </div>
      
                <section className="w-full flex flex-col gap-y-1">
                  <div className="h-5 w-full mb-auto bg-slate-200 rounded" />
                  <div className="h-5 w-full bg-slate-200 rounded" />
                  <div className="h-5 w-full bg-slate-200 rounded" />
                </section>
              </div>
            ))}
          </div>
        )
      }
      
      return (
        <Fragment>
          <div className='flex flex-col gap-y-2'>
            {cart?.products?.filter((_, index) => index < 3).map((val, index) => (
              <section key={index} className="flex flex-col">
                <div className="text-sm font-bold mb-auto">{val.title}</div>
                <div className="text-sm">{val.quantity} x ${val.price.toLocaleString('en-US')}</div>
                <div className="text-sm">${val.total.toLocaleString('en-US')}</div>
              </section>
            ))}
          </div>

          {(cart?.products?.length ?? 0) - 3 > 0 && <div className="font-bold mt-2">+ {(cart?.products?.length ?? 0) - 3} more products</div>}
          <div>Total: <span className="font-bold">${cart?.total.toLocaleString('en-US')}</span></div>
        </Fragment>
      )
    }

    return (
      <Fragment>
        <button type="button" title="Cart" className="h-12 w-12 btn btn-success rounded-full" onClick={toggleDrawer}>
          <CartOutline color='white' />
        </button>

        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction='right'
          className='p-5 w-64'
        >
          <section className="mb-5 flex justify-between items-center">
            <div className="text-lg font-bold">Your Cart</div>

            <button type="button" title="Close" onClick={toggleDrawer}>
              <CloseOutline />
            </button>
          </section>

          <CartList />

          <Link href='/carts'>
            <button type="button" className="mt-3 w-full btn btn-success text-white">
              See Details
            </button>
          </Link>
        </Drawer>
      </Fragment>
    )
  }
  return (
    <Fragment>
      <div className='relative'>
        {props.children}

        <div className='fixed bottom-5 right-5 flex flex-col space-y-1'>
          <DrawerSection />

          <Link href='/products/add'>
            <div className="h-12 w-12 btn btn-primary rounded-full focus:loading">
              <AddOutline color='white' />
            </div>
          </Link>
        </div>
      </div>

    </Fragment>
  )
}