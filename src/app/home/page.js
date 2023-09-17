"use client";
import { Button, Typography } from "@material-tailwind/react";
import Image from "next/image";
import SearchBlood from "./SearchBlood";

export default function Home() {
    
    return (
        <main>
            {/* Banner Section */}

            {/* 1st Demo */}
            {/* <section className="bg-[#ced5db]/25">
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
      </section> */}

            {/* 2nd Demo */}
            {/* <section className="relative z-0 bg-contain bg-no-repeat" style={{ backgroundImage: 'url(/headerBanner.png)' }}>
        <div className="py-[170px] text-center">
          <Typography variant="h1" className="text-2xl lg:text-6xl text-white/90 title-shadow">
            Do You Know? <br />
            Your Blood Can <br />
            Save A Life
          </Typography>
          <Button variant="outlined" color="white" className="mt-5 tracking-widest hover:bg-black hover:text-white shadow-white">Check who needs your blood</Button>
        </div>
        <div className="absolute top-0 bg-black/80 -z-10 w-full h-full"></div>
      </section> */}

            {/* 3rd Demo & making this as final */}
            <section className="relative flex flex-col justify-center items-center">
                <Image
                    src='/headerBanner.png'
                    alt="donate blood"
                    height={750}
                    width={1200}
                    className="-z-20 h-auto w-auto"
                />
                <div className="absolute z-20 text-center">
                    <Typography variant="h1" className="text-md lg:text-6xl text-white/90 title-shadow">
                        Do You Know? <br />
                        Your Blood Can <br />
                        Save A Life
                    </Typography>
                    <Button variant="outlined" color="white" className="mt-2 text-[8px] lg:text-xs px-3 py-2 lg:px-6 lg:py-3 lg:mt-8 tracking-widest hover:bg-black hover:text-white ">Need Blood?</Button>
                </div>
                <div className="absolute top-0 bg-black/80 z-10 w-full h-full"></div>
            </section>

            <SearchBlood />
        </main>
    )
}
