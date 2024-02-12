import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import dynamic from 'next/dynamic';
import query from '@/utils/db';
import { executeQueryReturnsJSON } from '@/lib/db';
import { IUserReturns, IRoleReturns } from '@/pages/admin/dashboard/users';
import { GetServerSideProps } from 'next';
import { INotificationType } from '@/components/Dashboard/Notification';
import axios from 'axios';

const Layout = dynamic(import('@/components/Layouts/Dashboard')),
    Notification = dynamic(import('@/components/Dashboard/Notification'));

interface IFormData {
    username?: string;
    email?: string;
    role?: string | number;
    password?: string;
}

export default function editUser({ user, roles }: { user: IUserReturns, roles: IRoleReturns[] }) {
    const router = useRouter();
    const userId = router.query.id;

    const [lastSavedPassword, setLastSavedPassword] = useState<string>('');
    const [getUser, setUser] = useState<IUserReturns>(user);
    const [form, setFormData] = useState<IFormData>();
    const [notify, setNotify] = useState<INotificationType>({ open: false, type: 'info', text: 'Simple' });

    const onSubmitForm = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
        e.preventDefault();

        if (!form ||
            form.username === '' ||
            form.email === '' ||
            form.role === ''
        ) return setNotify({ open: true, type: 'warning', text: 'All fields except password are required, rejecting!' });

        // Check if the user did actually changed something in the data
        if (getUser.username  == form.username &&
            getUser.email     == form.email    &&
            getUser.role      == form.role     &&
            lastSavedPassword == form.password
        ) return setNotify({ open: true, type: 'warning', text: 'No data has been edited, rejecting!' });

        axios.post('/api/admin/users/edit', {
            id: userId,
            username: form.username,
            email: form.email,
            role: form.role,
            password: form.password || ''
        }).then((res) => {
            if (res.data.success) {
                setLastSavedPassword(form.password || '');
                setNotify({ open: true, type: 'success', text: res.data.message });
                
                // Ignore form type, this is valid because we already doing a check for form fields up
                setUser((prevData) => ({ ...form as any, id: prevData.id, created_at: prevData.created_at }));
            } else if (res.data.error?.message) {
                setNotify({ open: true, type: 'warning', text: res.data.error.message });
            }
        })
    }

    const updateFormData = ({ name, value }: { name: string, value: string | number }) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    };

    useEffect(() => {
        setFormData({
            'username': getUser.username,
            'email': getUser.email,
            'role': getUser.role,
            'password': ''
        });
    }, []);

    return (
        <Layout title={`User - ${userId}`}>
            {form && (
                <>
                    <Notification
                        setNotify={setNotify}
                        open={notify.open}
                        type={notify.type}
                        text={notify.text}
                        duration={notify.duration}
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
                            <div className="flex justify-center mt-3">
                                <button type='submit' className='px-8 py-3 text-center bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] rounded'>
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </Layout>
    )
}

export const getServerSideProps = (async (context) => {
    const { id } = context.query;

    const user = await executeQueryReturnsJSON({
        query: query.getUserByID,
        values: [id],
    }) as IUserReturns[];

    const roles = await executeQueryReturnsJSON({
        query: query.getAllRoles,
        values: [],
    }) as IRoleReturns[];

    if (user.length <= 0) {
        return {
            redirect: {
                destination: '/admin/dashboard/users',
                permanent: false,
            },
        };
    }

    return {
        props: {
            user: user[0] || [],
            roles: roles || []
        }
    }
}) satisfies GetServerSideProps<{ user: IUserReturns, roles: IRoleReturns[] }>