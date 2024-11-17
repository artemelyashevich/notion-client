import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AuthDto, IError } from '../../types';
import { AuthService } from '../../service/auth.service';
import { useNavigate } from 'react-router-dom';
import { PAGES } from '../../constants';
import { AxiosError } from 'axios';

const SignUpSchema = z.object({
    email: z.string()
        .min(4, {
            message: 'Email must not be null'
        })
        .email({
            message: 'Invalid email format'
        }),
    password: z.string()
        .min(8, {
            message: 'Password must contain at least 8 characters'
        })
        .refine(value => /[A-Z]/.test(value), {
            message: 'Password must contain at least one uppercase letter'
        })
        .refine(value => /[a-z]/.test(value), {
            message: 'Password must contain at least one lowercase letter'
        })
        .refine(value => /[0-9]/.test(value), {
            message: 'Password must contain at least one digit'
        })
})

type SignUpSchemaType = z.infer<typeof SignUpSchema>

const AuthForm: React.FC = () => {
    const [isRegister, setIsRegister] = useState<boolean>(true)
    const [apiErrors, setApiErrors] = useState<string[]>([])

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) })

    const handleChangeStatus = () => {
        setIsRegister(prev => !prev)
    }

    const { mutate } = useMutation({
        mutationKey: [isRegister ? "register" : "login"],
        mutationFn: (data: AuthDto) => isRegister ? AuthService.register(data) : AuthService.login(data),
        onSuccess: () => {
            reset()
            toast.success("Welcome to Notion!")
            navigate(PAGES.ABOUT)
        },
        onError: (err: AxiosError) => {
            const e = err.response?.data as IError
            setApiErrors(Object.keys(e.errors).length !== 0 ? Object.values(e.errors) : [e.message])
            toast.error("An error occurred.")
        }
    })

    const onSubmit: SubmitHandler<SignUpSchemaType> = (data) => {
        mutate(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-2/5 p-5 border flex flex-col justify-center items-center'>
            <h1 className='text-center font-bold text-xl'>
                {!isRegister ? 'Login' : 'Register'}
            </h1>
            <div className='flex flex-col gap-1 mb-3 w-full'>
                <label>Email</label>
                <input {...register('email')} className='border p-2' />
                {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
            </div>
            <div className='flex flex-col gap-1 mb-3 w-full'>
                <label>Password</label>
                <input {...register('password')} className='border p-2' type='password' />

            </div>
            <div className='p-1'>
                {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
                {apiErrors.map((err, index) => (
                    <p key={index} className='text-sm text-red-500'>{err}</p>
                ))}
            </div>
            <span onClick={handleChangeStatus} className='underline m-2 cursor-pointer'>
                {isRegister ? 'Login' : 'Register'} here
            </span>
            <button className='border px-5 py-2 text-center hover:bg-black hover:text-white' type='submit'>
                {!isRegister ? 'Login' : 'Register'}
            </button>
        </form>
    )
}

export default React.memo(AuthForm)