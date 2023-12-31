"use client"
import BloodGroup from '@/Components/BloodGroup';
import { AuthContext } from '@/Providers/AuthProvider';
// import { Button, Input } from '@material-tailwind/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form"
import { FaEye, FaEyeSlash, FaHandHoldingHeart } from 'react-icons/fa';
import Swal from 'sweetalert2';
import SearchBlood from '../home/SearchBlood';

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
        <div className="relative h-screen flex justify-center items-center bg-no-repeat bg-contain bg-center lg:bg-bottom" style={{ backgroundImage: "url(/AuthenticationBG.png)" }}>
            <div className='w-full lg:w-[600px] py-16 shadow-inner hover:shadow-lg rounded-xl bg-white/5 z-30'>
                <div className='text-center'>
                    <h1 className='text-xl md:text-4xl text-white capitalize title-shadow glass inline px-8 py-1 rounded-md'>Let&apos;s start giving blood</h1>
                    <p className='text-sm text-white mt-4'>
                        Use your email for registration
                    </p>
                </div>
                <div className='mt-6'>
                    <form onSubmit={handleSubmit(onSubmit)} className='w-full px-2 lg:px-28 mt-10'>
                        <div className='relative'>
                            <input
                                id='name'
                                className='bg-transparent text-white border-b-2 outline-none w-full peer focus:border-b-black/60 duration-700 ease-in-out'
                                placeholder=' '
                                type='text'
                                {...register("name", { required: true })}
                            />
                            <label htmlFor="name" className='absolute left-0 -top-6 cursor-text text-white/80 peer-placeholder-shown:text-md peer-focus:text-sm peer-focus:-top-6 peer-placeholder-shown:-top-2 duration-300 ease-in-out'>
                                Name
                            </label>
                            {errors.name &&
                                <p className='text-black/75 mt-4 text-center text-xs tracking-widest font-semibold capitalize '>
                                    Name field is required
                                </p>
                            }
                        </div>
                        <div className='relative my-8'>
                            <input
                                id='email'
                                className='bg-transparent text-white border-b-2 outline-none w-full peer focus:border-b-black/60 duration-700 ease-in-out'
                                placeholder=' '
                                type='email'
                                {...register("email", { required: true })}
                            />
                            <label htmlFor="email" className='absolute left-0 -top-6 cursor-text text-white/80 peer-placeholder-shown:text-md peer-focus:text-sm peer-focus:-top-6 peer-placeholder-shown:-top-2 duration-300 ease-in-out'>
                                Email
                            </label>
                            {errors.email &&
                                <p className='text-black/75 mt-4 text-center text-xs tracking-widest font-semibold capitalize '>
                                    Email field is required
                                </p>
                            }
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-8 mb-3">
                            <div className='relative'>
                                <input
                                    id='contactNumber'
                                    className='bg-transparent text-white border-b-2 outline-none w-full peer focus:border-b-black/60 duration-700 ease-in-out'
                                    placeholder=' '
                                    type='number'
                                    {...register("contactNumber", { required: true })}
                                />
                                <label htmlFor="contactNumber" className='absolute left-0 -top-6 cursor-text text-white/80 peer-placeholder-shown:text-md peer-focus:text-sm peer-focus:-top-6 peer-placeholder-shown:-top-2 duration-300 ease-in-out'>
                                    Contact Number
                                </label>
                                {errors.contactNumber &&
                                    <p className='text-black/75 mt-4 text-center text-xs tracking-widest font-semibold capitalize '>
                                        Contact Number field is required
                                    </p>
                                }
                            </div>
                            <div className='relative'>
                                <select
                                    name="bloodGroup"
                                    id='bloodGroup'
                                    placeholder=' '
                                    {...register("bloodGroup", { required: true })}
                                    // onChange={handleBloodGroup}
                                    className='appearance-none bg-transparent border-b-2 text-white outline-none w-full peer focus:border-b-black/60 duration-700 ease-in-out'
                                >
                                    <option value="" className='text-black'>Blood Group</option>
                                    <BloodGroup
                                        className='text-black'
                                    />
                                </select>
                                {errors.bloodGroup &&
                                    <p className='text-black/75 mt-4 text-center text-xs tracking-widest font-semibold capitalize '>
                                        Blood Group field is required
                                    </p>
                                }
                            </div>
                        </div>
                        <div className='relative mb-8'>
                            <label htmlFor="donationArea" className='cursor-text text-white/80 peer-placeholder-shown:text-md peer-focus:text-sm peer-focus:-top-6 peer-placeholder-shown:-top-2 duration-300 ease-in-out'>
                                Priority Donation Area
                            </label>
                            <div className='grid grid-cols-3 gap-2 mt-1'>
                                <SearchBlood
                                    className='appearance-none bg-transparent border-b-2 text-white outline-none w-full peer focus:border-b-black/60 duration-700 ease-in-out'
                                />
                            </div>
                            {errors.donationArea &&
                                <p className='text-black/75 mt-4 text-center text-xs tracking-widest font-semibold capitalize '>
                                    Donation Area field is required
                                </p>
                            }
                        </div>
                        <div className="relative">
                            <div className='relative'>
                                <input
                                    id='password'
                                    className='bg-transparent text-white border-b-2 outline-none w-full peer focus:border-b-black/60 duration-700 ease-in-out'
                                    placeholder=' '
                                    type={!showPass ? 'password' : 'text'}
                                    {...register("password", { required: true })}
                                />
                                <label htmlFor="password" className='absolute left-0 -top-6 cursor-text text-white/80 peer-placeholder-shown:text-md peer-focus:text-sm peer-focus:-top-6 peer-placeholder-shown:-top-2 duration-300 ease-in-out'>
                                    Password
                                </label>
                                {errors.password &&
                                    <p className='text-black/75 my-5 text-center tracking-widest font-semibold capitalize '>
                                        Password have to be more than 6 characters.
                                    </p>
                                }
                            </div>
                            {!showPass ?
                                <FaEye
                                    onClick={handleShowPass}
                                    className='absolute right-0 inset-y-0 text-white mr-2 cursor-pointer'
                                />
                                :
                                <FaEyeSlash
                                    onClick={handleShowPass}
                                    className='absolute right-0 inset-y-0 text-white mr-2 cursor-pointer'
                                />
                            }
                        </div>
                        <p className='text-black/75 my-5 text-center tracking-widest font-semibold capitalize '>
                            {Error}
                        </p>
                        {loader &&
                            <p className='text-black/75 my-5 text-center tracking-widest font-semibold capitalize '>
                                <span className="loading loading-bars loading-lg"></span>
                            </p>
                        }
                        <button type='submit' className='btn bg-red-400 hover:bg-red-400/80 text-white w-full tracking-widest my-5'>Sign up</button>
                        <div className="flex justify-end mt-2 capitalize text-blue-700 text-sm underline underline-offset-2 font-semibold">
                            <Link href='/login' className='flex gap-2 items-center glass px-3 py-1 rounded-md'>
                                <FaHandHoldingHeart className='text-xl text-red-600' />
                                already have an account? sign in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            <div className="absolute top-0 bg-black/40  w-full h-full"></div>
        </div>
    );
};

export default Page;