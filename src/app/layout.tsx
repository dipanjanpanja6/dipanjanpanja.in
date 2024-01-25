"use client"
import Console from "../components/Console"
import "./globals.css"
import { Inter } from "next/font/google"
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion"
import Navbar from "../components/Navbar"

const inter = Inter({ subsets: ["latin"] })

const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LazyMotion features={domAnimation}>
          <Navbar />
          {children}
        </LazyMotion>
      </body>
      <Console />
    </html>
  )
}
