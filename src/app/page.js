"use client";
import { Button, Typography } from "@material-tailwind/react";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/* Banner Section */}
      <section className="bg-[#ced5db]/25">
        <div className="container py-14 lg:py-32 flex justify-between items-center">
          <div className="text-center w-full">
            <Typography variant="h1" color="green" className="text-2xl lg:text-6xl">
              Do You Know? <br /> 
              Your Blood Can <br />
              Save A Life
            </Typography>
            <Button variant="outlined" className="mt-5 tracking-widest hover:bg-black hover:text-white">Check who needs your blood</Button>
          </div>
          <div>
            <Image
              src='/headerBanner.png'
              alt="donate blood"
              height={750}
              width={1200}
              className=" hidden lg:block"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
