import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import dynamic from 'next/dynamic';
import query from '@/utils/db';
import { executeQueryReturnsJSON } from '@/lib/db';
import { IRoleReturns } from '@/pages/admin/dashboard/users';
import { GetServerSideProps } from 'next';
import axios from 'axios';

const Layout = dynamic(import('@/components/Layouts/Dashboard')),
    Notification = dynamic(import('@/components/Dashboard/Notification')),
    ConfirmationModal = dynamic(import('@/components/Dashboard/ConfirmationModal'));

interface IFormData {
    username?: string;
    email?: string;
    role?: string | number;
    password?: string;
}

export default function newUser({ roles }: { roles: IRoleReturns[] }) {
    const router = useRouter();

    const [createAnOther, setCreateAnOther] = useState(false);
    const [form, setFormData] = useState<IFormData>();
    const [notify, setNotify] = useState<any>();
    const [modal, setModalData] = useState<any>();

    const onSubmitForm = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
        e.preventDefault();

        if (!form ||
            form.username === '' ||
            form.email    === '' ||
            form.role     === '' ||
            form.password === ''
        ) return setNotify({ open: true, type: 'warning', text: 'All fields are required, rejecting!' });;

        setModalData({
            open: true,
            text: 'Are you sure you want to create this user?',
            type: 'create',
            button: {
                accept: 'Yes, Im sure',
                decline: 'No, cancel'
            },
            onAccept: () => {
                axios.post('/api/admin/users/new', {
                    username: form.username,
                    email: form.email,
                    role: form.role,
                    password: form.password
                }).then((res) => {
                    setModalData((prevData: any) => ({ ...prevData, open: false }));
                    if(res.data.success) {
                        setNotify({ open: true, type: 'success', text: res.data.message });
                        
                        if(createAnOther) {
                            setTimeout(() => {
                                window.location.reload();
                            }, 5000);
                        } else {
                            setTimeout(() => {
                                router.push({
                                    pathname: '/admin/dashboard/users/'+res.data.user,
                                }); 
                            }, 5000);
                        }
                    } else if(res.data.error?.message) {
                        setNotify({ open: true, type: 'warning', text: res.data.error.message });
                    }
                });
            },
            onDecline: () => {
                setModalData((prevData: any) => ({ ...prevData, open: false }));
            }
        });
    }

    const updateFormData = ({ name, value }: { name: string, value: string | number }) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    useEffect(() => {
        setFormData({
            'username' : '',
            'email'    : '',
            'role'     : 0 ,
            'password' : ''
        });
    }, []);

    return (
        <Layout title={`New User`}>
            {form && (
                <>
                    <Notification
                        setNotify={setNotify}
                        open={notify?.open}
                        type={notify?.type}
                        text={notify?.text}
                        duration={notify?.duration}
                    />

                    <ConfirmationModal
                        setModalData={setModalData}
                        modal={modal}
                    />

                    <div className={'flex justify-start'}>
                        <button onClick={() => Router.back()} className={'bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] p-3 rounded font-bold'}>
                            Back
                        </button>
                    </div>

                    <div style={{ backgroundColor: 'hsl(0, 0%, 22%)'}} className='p-3 rounded-lg mt-3'>
                        <form onSubmit={onSubmitForm} action="" className='space-y-4'>
                            <div className='flex justify-around'>
                                <div className="space-y-2 grid">
                                    <div className='space-y-2'>
                                        <div>
                                            <label className={'font-semibold'} htmlFor="username">Username:</label>
                                        </div>
                                        <input
                                            type="text"
                                            id="username"
                                            onChange={(e) => updateFormData({ name: 'username', value: e.target.value })}
                                            defaultValue={form.username}
                                            className='p-2 rounded text-black w-full'
                                            required
                                        />
                                    </div>
                                    <div className='space-y-2'>
                                        <div>
                                            <label className={'font-semibold'} htmlFor="email">Email:</label>
                                        </div>
                                        <input
                                            type="email"
                                            onChange={(e) => updateFormData({ name: 'email', value: e.target.value })}
                                            defaultValue={form.email}
                                            className='p-2 rounded text-black w-full'
                                            id='email'
                                            min={1}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className='space-y-2'>
                                        <div>
                                            <label className={'font-semibold'} htmlFor="password">Password:</label>
                                        </div>
                                        <input
                                            type="password"
                                            onChange={(e) => updateFormData({ name: 'password', value: e.target.value })}
                                            className='p-2 rounded text-black w-full'
                                            id='password'
                                        />
                                        <div>
                                            <label className='font-thin text-sm mt-[-5px]' htmlFor="password">Leave blank to not change</label>
                                        </div>
                                    </div>
                                    <div className='space-y-2'>
                                        <div>
                                            <label className={'font-semibold'} htmlFor="role">Role:</label>
                                        </div>
                                        <select
                                            id="role"
                                            onChange={(e) => updateFormData({ name: 'role', value: e.target.value })}
                                            value={form.role}
                                            className="p-2 text-black rounded w-full"
                                            required
                                        >
                                            {roles?.map((role) => (
                                                <option key={role.id} value={role.id}>{role.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center mt-3 space-x-2">
                                <button type='submit' className='px-8 py-3 text-center bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] rounded'>
                                    Create
                                </button>

                                <button type='submit' onClick={() => setCreateAnOther(true)} className='px-8 py-3 text-center bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] rounded'>
                                    Create & create another
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </Layout>
    )
}

export const getServerSideProps = (async () => {
    const roles = await executeQueryReturnsJSON({
        query: query.getAllRoles,
        values: [],
    }) as IRoleReturns[];

    return {
        props: {
            roles: roles || []
        }
    }
}) satisfies GetServerSideProps<{ roles: IRoleReturns[] }>