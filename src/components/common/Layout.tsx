// React
import { Fragment, PropsWithChildren } from "react"

// Next
import Link from "next/link"

// Third-Party Library
import { EarthOutline, LogoGithub } from "react-ionicons"

function Header() {
  return (
    <header className="navbar bg-base-100">
      <div className="flex-1">
        <Link href='/' className="btn btn-ghost normal-case text-xl">
          dummy<span className="font-bold">JSON</span>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-compact menu-horizontal dropdown-content px-1">
          <li>
            <Link href='https://dummyjson.com' target="_blank" title="Documentation">
              <EarthOutline /> <span className="md:flex hidden">Documentation</span>
            </Link>
          </li>
          <li>
            <Link href='https://github.com/PigHero82/dummyjson' target="_blank" title="Github">
              <LogoGithub /> <span className="md:flex hidden">Github</span>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

export function Layout(props: PropsWithChildren<{}>) {
  return (
    <Fragment>
      <Header />
      {props.children}
    </Fragment>
  )
}