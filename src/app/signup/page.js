"use client"
import { AuthContext } from '@/Providers/AuthProvider';
// import { Button, Input } from '@material-tailwind/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form"
import { FaEye, FaEyeSlash, FaHandHoldingHeart } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Page = () => {
    const [Error, setError] = useState('');
    const [showPass, setShowPass] = useState(false);
    const router = useRouter();
    const { emailSignup, logOut, loader, setLoader } = useContext(AuthContext)

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const handleShowPass = () => {
        setShowPass(!showPass);
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const onSubmit = (data) => {
        setError('');
        setLoader(true);
        const name = data.name;
        const email = data.email;
        const password = data.password;
        const userInfo = { name, email, role: 'donor' }
        emailSignup(name, email, password)
            .then(result => {
                const user = result.user;
                if (user) {
                    fetch('/api/users', {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(userInfo),
                    })
                        .then(res => res.json())
                        .then(() => {
                            router.push('/login');
                            Toast.fire({
                                icon: 'success',
                                title: 'Signed in successfully'
                            });
                            reset();
                        })
                }
                setLoader(false);
                logOut();
            })
            .catch(error => {
                setError(error.message.split('(')[1].split(')')[0].split('/')[1])
                console.log(error.message);
                setLoader(false)
            })
    }

    return (
        <div className="mx-4 lg:mx-44 h-screen flex justify-center items-center">
            <div className='w-full lg:w-[600px]'>
                <div>
                    <div className='text-center'>
                        <h1 className='text-xl md:text-4xl capitalize title-shadow'>Let&apos;s start giving blood</h1>
                        <p className='text-sm mt-4'>
                            Use your email for registration
                        </p>
                    </div>
                    <div className='mt-6'>
                        <form onSubmit={handleSubmit(onSubmit)} className='w-full px-2 lg:px-28 mt-10'>
                            <div className='flex flex-col gap-12'>
                                <div className='relative'>
                                    <input
                                        id='name'
                                        className='border-b-2 outline-none w-full peer focus:border-b-black/60 duration-700 ease-in-out'
                                        placeholder=' '
                                        {...register("name", { required: true })}
                                    />
                                    <label htmlFor="name" className='absolute left-0 -top-6 cursor-text text-slate-500 peer-placeholder-shown:text-md peer-focus:text-sm peer-focus:-top-6 peer-placeholder-shown:-top-2 duration-300 ease-in-out'>
                                        Name
                                    </label>
                                </div>
                                <div className='relative'>
                                    <input
                                        id='email'
                                        className='border-b-2 outline-none w-full peer focus:border-b-black/60 duration-700 ease-in-out'
                                        placeholder=' '
                                        {...register("email", { required: true })}
                                    />
                                    <label htmlFor="email" className='absolute left-0 -top-6 cursor-text text-slate-500 peer-placeholder-shown:text-md peer-focus:text-sm peer-focus:-top-6 peer-placeholder-shown:-top-2 duration-300 ease-in-out'>
                                        Email
                                    </label>
                                </div>
                                <div className="relative">
                                    <div className='relative'>
                                        <input
                                            id='password'
                                            className='border-b-2 outline-none w-full peer focus:border-b-black/60 duration-700 ease-in-out'
                                            placeholder=' '
                                            type={!showPass ? 'password' : 'text'}
                                            {...register("password", { required: true })}
                                        />
                                        <label htmlFor="password" className='absolute left-0 -top-6 cursor-text text-slate-500 peer-placeholder-shown:text-md peer-focus:text-sm peer-focus:-top-6 peer-placeholder-shown:-top-2 duration-300 ease-in-out'>
                                            Password
                                        </label>
                                    </div>
                                    {!showPass ?
                                        <FaEye
                                            onClick={handleShowPass}
                                            className='absolute right-0 inset-y-0 mr-2 cursor-pointer'
                                        />
                                        :
                                        <FaEyeSlash
                                            onClick={handleShowPass}
                                            className='absolute right-0 inset-y-0 mr-2 cursor-pointer'
                                        />
                                    }
                                </div>
                            </div>
                            {errors.password &&
                                <p className='text-black/75 my-5 text-center tracking-widest font-semibold capitalize '>
                                    Password have to be more than 6 characters.
                                </p>
                            }
                            <p className='text-black/75 my-5 text-center tracking-widest font-semibold capitalize '>
                                {Error}
                            </p>
                            {loader &&
                                <p className='text-black/75 my-5 text-center tracking-widest font-semibold capitalize '>
                                    <span className="loading loading-bars loading-lg"></span>
                                </p>
                            }
                            <button type='submit' className='btn bg-red-400 hover:bg-red-400/80 text-white w-full tracking-widest my-5'>Sign up</button>
                            <div className="flex justify-end mt-3 capitalize text-blue-700 text-sm underline underline-offset-2">
                                <Link href='/login' className='flex gap-2 items-center'>
                                    already have an account? sign in
                                    <FaHandHoldingHeart className='text-xl text-red-500' />
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;