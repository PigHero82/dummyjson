import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <Toaster />
      <Component {...pageProps} key={router.asPath} />;
    </AnimatePresence>
  )
}
