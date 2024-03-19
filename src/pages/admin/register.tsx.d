import React, { useState } from 'react'
import Layout from '@/components/layout'
import axios from 'axios';

function register() {
    const [form, setForm]   = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');

    const onSubmitForm = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
        e.preventDefault();

        if(form.email === '' || form.password === '' || form.username == '') return;

        axios.post('/api/admin/register', {
            email: form.email,
            password: form.password,
            username: form.username,
        }).then((res) => {
            if(res.data.success) {
                window.location.assign('/admin/login')
            } else {
                setError(res.data.error.message)
            }
        }) 
    }

    return (
        <Layout title='Admin Register'>
            <div className='flex text-white w-screen h-screen bg-gray-800 justify-center items-center'>
                <form action="" className='bg-gray-900 p-5 rounded space-y-2 w-[300px]' onSubmit={onSubmitForm}>
                    {error && (
                        <div className='text-red-700 p-3 text-center'>
                            {error}
                        </div>
                    )}
                    <div className='space-y-2'>
                        <div>Username</div>
                        <input onChange={(e) => setForm({ username: e.target.value, password: form.password, email: form.email })} className='rounded p-3 text-black w-full' type="text" required/>
                    </div>
                    <div className='space-y-2'>
                        <div>Email</div>
                        <input onChange={(e) => setForm({ email: e.target.value, password: form.password, username: form.username })} className='rounded p-3 text-black w-full' type="email" required/>
                    </div>
                    <div className='space-y-2'>
                        <div>Password</div>
                        <input onChange={(e) => setForm({ password: e.target.value, email: form.email, username: form.username })} className='rounded p-3 text-black w-full' type="password"  required/>
                    </div>

                    <div className='flex justify-center pt-5'>
                        <button type="submit" className='bg-blue-500 p-3 rounded text-2xl'>Register</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default register