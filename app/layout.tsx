
import { Footer, Navbar } from '@/components'
import './globals.css'
import type { Metadata } from 'next'
import { Provider } from 'react-redux'
import store from "../redux/store"
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import CarProvider from './CarProvider'

// let persistor = persistStore(store);

export const metadata: Metadata = {
  title: 'Car Hub',
  description: 'Discover the best cars in the world.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="relative">
        <CarProvider>
          {/* <PersistGate loading={null} persistor={persistor}> */}
          <Navbar />
          {children}
          {/* <Footer /> */}
          {/* </PersistGate> */}
        </CarProvider>
      </body>
    </html>
  )
}
