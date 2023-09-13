"use client"
import { AuthContext } from '@/Providers/AuthProvider';
import { Button, Input } from '@material-tailwind/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Page = () => {
    const [Error, setError] = useState('');
    const [showPass, setShowPass] = useState(false);
    const router = useRouter();
    const { emailLogin, setLoader, loader } = useContext(AuthContext);

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
        const email = data.email;
        const password = data.password;

        setLoader(true);
        emailLogin(email, password)
            .then(result => {
                const user = result.user;
                router.push('/')
                Toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully'
                });
                setLoader(false);
                reset();
            })
            .catch(error => {
                setError(error.message.split('(')[1].split(')')[0].split('/')[1]);
                setLoader(false);
            })
    }

    return (
        <div className="mx-4 lg:mx-44 py-20 h-screen flex justify-center items-center">
            <div className='w-full lg:w-[600px]'>
                <div>
                    <div className='text-center'>
                        <h1 className='text-xl md:text-4xl capitalize title-shadow'>login to save life</h1>
                        <p className='text-sm mt-3'>
                            Use your email for registration
                        </p>
                    </div>
                    <div className='mt-6'>
                        <form onSubmit={handleSubmit(onSubmit)} className='w-full px-6 lg:px-28'>
                            <div className='flex flex-col gap-6'>
                                <Input
                                    variant="standard"
                                    label="Email"
                                    {...register("email", { required: true })}
                                />
                                <div className="relative">
                                    <Input
                                        variant="standard"
                                        label="Password"
                                        type={!showPass ? 'password' : 'text'}
                                        {...register("password", { required: true, minLength: 5 })}
                                    />
                                    {!showPass ?
                                        <FaEye
                                            onClick={handleShowPass}
                                            className='absolute end-0 inset-y-1/2 mr-2 cursor-pointer'
                                        />
                                        :
                                        <FaEyeSlash
                                            onClick={handleShowPass}
                                            className='absolute end-0 inset-y-1/2 mr-2 cursor-pointer'
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
                            <div className='flex justify-center items-center'>
                                <Button type='submit' variant='gradient' fullWidth className='tracking-widest'>Sign up</Button>
                            </div>
                            <div className="flex justify-between mt-3 text-blue-700 text-sm underline">
                                <Link href={'/forget-password'}>
                                    Forgot Password?
                                </Link>
                                <Link href='/signup' className='capitalize'>
                                    don&apos;t have an account? sign up
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