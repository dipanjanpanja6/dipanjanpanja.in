import React from "react"
import { Syncopate, Libre_Barcode_39 } from "next/font/google"

const syncopate = Syncopate({ weight: "700", subsets: ["latin"] })
export default function Footer() {
  return (
    <div className="inline-flex flex-col items-center p-5 w-full">
      <p className="text-sm text-gray-400">Design & Developed by</p>
      <p className={syncopate.className}>DP</p>
    </div>
  )
}
