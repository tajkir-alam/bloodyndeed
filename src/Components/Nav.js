"use client"
import Link from 'next/link';
import React from 'react';
import { FaAddressBook, FaBookReader, FaHome, FaSignInAlt } from 'react-icons/fa';


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
            icon: FaAddressBook,
        },
        {
            name: "Blog",
            href: "/",
            icon: FaBookReader,
        },
        {
            name: "Log In",
            href: "/login",
            icon: FaSignInAlt,
        },
    ]

    return (
        <nav className='fixed w-full bottom-0'>
            <div className='bg-red-400 w-full lg:w-5/12 mx-auto rounded-t-xl'>
                <ul className='text-white grid grid-cols-4 px-1 py-3'>
                    {
                        navList.map((navItem, i) =>
                            <li key={i} className='px-10 cursor-pointer group'>
                                <Link href={navItem.href} className='flex flex-col gap-1 items-center relative'>
                                    <span className='group-hover:-mt-10 text-black duration-700'>
                                        {<navItem.icon className='text-2xl text-white group-hover:text-red-500 duration-700' />}
                                    </span>
                                    <span className='absolute top-10 opacity-0 group-hover:opacity-100 group-hover:top-0 duration-700 whitespace-nowrap'>
                                        {navItem.name}
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