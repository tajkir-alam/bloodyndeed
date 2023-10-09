import Image from 'next/image';
import React from 'react';
import SearchBlood from './SearchBlood';

const Banner = () => {
  return (
    // ---------- Banner Section 
    <section className="">
      <h1 className="bg-red-800 text-md lg:text-4xl text-center text-white whitespace-nowrap py-4">
        Do You Know
        Your Blood Can
        Save A Life?
      </h1>
      <div className="relative flex flex-col-reverse lg:grid lg:grid-cols-5 lg:items-center">
        {/* <div className="text-center w-full col-span-2 z-10 bg-[#ced5db]/50 h-full flex flex-col justify-center">
            <button variant="outlined" className="mt-5 tracking-widest hover:bg-black hover:text-white">Check who needs your blood</button>
          </div> */}
        <div className='col-span-2 z-50 hidden lg:block'>
          <SearchBlood />
        </div>

        <div className='relative lg:col-span-3 h-[calc(850px-500px)] lg:h-screen bg-no-repeat bg-center bg-cover' style={{ backgroundImage: "url(/bannerBG.png)" }}>
          <div className='absolute inset-y-[15%] lg:inset-y-1/4  lg:ml-5 px-3 lg:px-0 text-center text-white z-40 space-y-5'>
            <h3 className='text-3xl lg:text-5xl lg:leading-[58px]'>
              We do not charge any single penny for bloods.
            </h3>
            <h5 className='text-xl lg:text-3xl text-warning'>
              If any one ask you for money please inform us ASAP!
            </h5>
            <div>
              <button className="btn btn-ghost glass lg:mt-5 tracking-widest bg-red-600 hover:bg-red-800">
                Report to us
              </button>
            </div>
          </div>
        </div>

        <div className="absolute top-0 bg-black/60  w-full h-full"></div>
      </div>
    </section>
  );
};

export default Banner;