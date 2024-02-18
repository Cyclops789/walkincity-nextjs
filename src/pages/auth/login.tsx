import React, { useEffect, useState } from 'react'
import Layout from '@/components/Layouts/Main'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

function login() {
    const router = useRouter();
    const { error } : { error?: string } = router.query;
    const [form, setForm] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmitForm = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
        e.preventDefault();

        if(form.email === '' || form.password === '') return;

        signIn('credentials', {
            callbackUrl: '/admin/dashboard', 
            email: form.email, 
            password: form.password
        }).then((res) => {
            if(res?.error) {
                setErrorMessage(res?.error)
            }
        }).catch((e) => {
            setErrorMessage(String(e))
        })
    };

    useEffect(() => {
        if(error && error == "CredentialsSignin") {
            setErrorMessage("Invalid email or password!")
        }
    }, [error])

    return (
        <Layout title='Admin Login'>
            <div style={{ backgroundColor: 'hsl(0, 0%, 8%)' }} className='flex text-white w-screen h-screen justify-center items-center'>
                <form style={{ backgroundColor: 'hsl(0, 0%, 22%)' }} className='p-5 rounded space-y-2 w-[500px]' onSubmit={onSubmitForm}>
                    <div className='text-2xl uppercase text-center'>
                        login
                    </div>
                    {errorMessage && (
                        <div className='text-red-500 p-3 text-center'>
                            {errorMessage}
                        </div>
                    )}
                    <div className='space-y-2'>
                        <div>Email</div>
                        <input onChange={(e) => setForm({ email: e.target.value, password: form.password })} className='rounded p-3 text-black w-full' type="email" required/>
                    </div>
                    <div className='space-y-2'>
                        <div>Password</div>
                        <input onChange={(e) => setForm({ password: e.target.value, email: form.email })} className='rounded p-3 text-black w-full' type="password"  required/>
                    </div>

                    <div className='flex justify-center pt-5'>
                        <button type="submit" className='bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] p-3 rounded text-1xl w-full'>Login</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default login