"use client"
import Link from 'next/link';
import React from 'react';
import { FaHome } from 'react-icons/fa';


const Nav = () => {
    const navList = [
        {
            name: "Home",
            href: "/",
            icon: FaHome,
        },
        {
            name: "Donor List",
            href: "/",
            icon: FaHome,
        },
        {
            name: "Blog",
            href: "/",
            icon: FaHome,
        },
        {
            name: "Login",
            href: "/login",
            icon: FaHome,
        },
    ]

    return (
        <nav className='fixed w-full bottom-5'>
            <div className='bg-blue-900 w-full lg:w-4/12 mx-auto rounded-xl'>
                <ul className='text-white flex justify-between px-1 py-2'>
                    {
                        navList.map((navItem, i) =>
                            <li key={i} className='px-3 cursor-pointer group'>
                                <Link href={navItem.href} className='flex flex-col gap-1 relative'>
                                    <span className='group-hover:-mt-6 text-black duration-500'>
                                        {navItem.name}
                                    </span>
                                    <span className='flex justify-center'>
                                        {<navItem.icon className='absolute top-10 opacity-0  group-hover:opacity-100 group-hover:top-2 duration-500' />}
                                    </span>
                                </Link>
                            </li>
                        )
                    }
                </ul>
            </div>
        </nav>
    );
};

export default Nav;