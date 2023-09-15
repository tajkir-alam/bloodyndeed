"use client";
import { Typography } from "@material-tailwind/react";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/* Banner Section */}
      <section className="bg-[#ced5db]/25">
        <div className="container flex justify-between items-center">
          <div className="text-center w-full">
            <Typography variant="h1" color="green" className="text-6xl">
              Do You Know? <br /> 
              Your Blood Can <br />
              Save A Life
            </Typography>
          </div>
          <div>
            <Image
              src='/headerBanner.png'
              alt="donate blood"
              height={750}
              width={1200}
              className="py-32"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
