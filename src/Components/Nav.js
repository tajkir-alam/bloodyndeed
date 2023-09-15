"use client";
import React, { useEffect, useState } from 'react';
import {
    Navbar,
    Typography,
    Button,
    IconButton,
    MobileNav,
    Collapse,
} from "@material-tailwind/react";
import Link from 'next/link';
import Image from 'next/image';

const Nav = () => {
    const [openNav, setOpenNav] = useState(true);
    const toggleOpen = () => setOpenNav((cur) => !cur);

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link href="/" className="flex items-center">
                    Home
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link href="#" className="flex items-center">
                    Account
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link href="#" className="flex items-center">
                    Blocks
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link href="#" className="flex items-center">
                    Docs
                </Link>
            </Typography>
        </ul>
    );

    return (
        <Navbar className="h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
            <div className="flex items-center justify-between text-blue-gray-900 container">
                <Link href='/' className="flex items-center">
                    <Image
                        src='/logo.png'
                        alt='logo'
                        width={50}
                        height={50}
                    />
                    <Typography
                        variant='h3'
                        className="mr-4 cursor-pointer py-1.5 font-medium italic"
                    >
                        Bloodyndeed
                    </Typography>
                </Link>
                <div className="flex items-center gap-4">
                    <div className="mr-4 hidden lg:block">{navList}</div>
                    <Link href='/login'>
                        <Button
                            variant="gradient"
                            size="sm"
                            className="hidden lg:inline-block"
                        >
                            Login
                        </Button>
                    </Link>
                    <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent block lg:hidden"
                        ripple={false}
                        // onClick={() => setOpenNav(!openNav)}
                        onClick={toggleOpen}
                    >
                        {openNav ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </IconButton>
                </div>
            </div>
            <Collapse open={openNav}>
                {navList}
                <Link href='/login'>
                    <Button variant="gradient" size="sm" fullWidth className="mb-2">
                        Login
                    </Button>
                </Link>
            </Collapse>
        </Navbar>
    );
};

export default Nav;