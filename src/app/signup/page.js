"use client"
import { AuthContext } from '@/Providers/AuthProvider';
import { Button, Input } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form"
import { FaRegEnvelope, FaRegUser } from 'react-icons/fa';
import { HiOutlineLockClosed } from "react-icons/hi2";
import Swal from 'sweetalert2';

const Page = () => {
    const [Error, setError] = useState('');
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

    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const onSubmit = (data) => {
        setError('');
        setLoader(true);
        const name = data.name;
        const email = data.email;
        const password = data.password;
        const userInfo = { name, email, role: 'viewer' }
        emailSignup(name, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
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
        <div className='relative'>
            <div className="mx-4 lg:mx-44 py-20 h-screen flex justify-center items-center">
                <div className='w-full lg:w-[600px]'>
                    <div>
                        <div className='text-center'>
                            <h1 className='text-4xl lg:text-5xl'>Create An Account</h1>
                            <p className='text-sm mt-3'>
                                Use your email for registration
                            </p>
                        </div>
                        <div className='mt-6'>
                            <form onSubmit={handleSubmit(onSubmit)} className='w-full px-6 lg:px-28'>
                                <div className='flex flex-col gap-6'>
                                    <Input
                                        variant="standard"
                                        label="Name"
                                        {...register("name", { required: true })}
                                    />
                                    <Input
                                        variant="standard"
                                        label="Email"
                                        {...register("email", { required: true })}
                                    />
                                    <Input
                                        variant="standard"
                                        label="Password"
                                        {...register("password", { required: true, minLength: 5 })}
                                    />
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
                                <span className='flex justify-center items-center'>
                                    {/* <input type="submit" className='btn bg-[#319DFF] rounded-3xl text-white border-0 px-12 hover:bg-[#319DFF]' /> */}
                                    <Button type='submit' variant='gradient' fullWidth className='tracking-widest'>Sign up</Button>
                                </span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;