import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import dynamic from 'next/dynamic';
import permissions from '@/helpers/permissions';
import { IPermissionsReturns } from '@/pages/admin/dashboard/roles';
import { GetServerSideProps } from 'next';
import { INotificationType } from '@/components/Dashboard/Notification';
import { http as axios } from '@/helpers/http';
import Select from 'react-select'

const Layout = dynamic(import('@/components/Layouts/Dashboard')),
    Notification = dynamic(import('@/components/Dashboard/Notification')),
    ConfirmationModal = dynamic(import('@/components/Dashboard/ConfirmationModal'));

interface IFormData {
    name?: string;
    permissions?: IPermissionsReturns[];
}

export default function newRole({ permissions }: { permissions: IPermissionsReturns[] }) {
    const router = useRouter();

    const [modal, setModalData] = useState<any>();
    const [form, setFormData] = useState<IFormData>();
    const [notify, setNotify] = useState<INotificationType>({ open: false, type: 'info', text: 'Simple' });

    const onSubmitForm = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
        e.preventDefault();

        if (!form ||
            form.name === ''
        ) return setNotify({ open: true, type: 'warning', text: 'All fields are required, rejecting!' });

        if (!form || !form.permissions || form.permissions?.length <= 0
        ) return setNotify({ open: true, type: 'warning', text: 'At least one permission should be selected, rejecting!' });

        setModalData({
            open: true,
            text: 'Are you sure you want to create this role?',
            type: 'create',
            button: {
                accept: 'Yes, Im sure',
                decline: 'No, cancel'
            },
            onAccept: () => {
                axios.post('/api/admin/roles/new', {
                    name: form.name,
                    permissions: form.permissions,
                }).then((res) => {
                    setModalData((prevData: any) => ({ ...prevData, open: false }));
                    if (res.data.success) {
                        setNotify({ open: true, type: 'success', text: res.data.message });

                        setTimeout(() => {
                            router.push({
                                pathname: '/admin/dashboard/roles/' + res.data.role,
                            });
                        }, 5000);

                    } else if (res.data.error?.message) {
                        setNotify({ open: true, type: 'warning', text: res.data.error.message });
                    }
                });
            },
            onDecline: () => {
                setModalData((prevData: any) => ({ ...prevData, open: false }));
            }
        });
    }

    const updateFormData = ({ name, value }: { name: string, value: string | number | any | any[] }) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    };

    useEffect(() => {
        setFormData({
            'name': '',
            'permissions': [],
        });
    }, []);
    return (
        <Layout title={`New Role`}>

            <Notification
                setNotify={setNotify}
                open={notify.open}
                type={notify.type}
                text={notify.text}
                duration={notify.duration}
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

                    <div className="space-y-2 grid">
                        <div className='space-y-2'>
                            <div>
                                <label className={'font-semibold'} htmlFor="name">Name</label>
                            </div>
                            <input
                                type="text"
                                id="name"
                                onChange={(e) => updateFormData({ name: 'name', value: e.target.value })}
                                className='p-2 rounded bg-[#262626] text-white w-full'
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className='space-y-2'>
                            <div>
                                <label className={'font-semibold'} htmlFor="permissions">Roles</label>
                            </div>

                            <div id="permissions" className={'text-black'}>
                                <Select
                                    isMulti
                                    options={permissions}
                                    className='capitalize z-0'
                                    getOptionLabel={(option) => `${option.name.replace('_', ' ')}`}
                                    getOptionValue={(option) => `${option.id}`}
                                    onChange={(selection) => updateFormData({ name: 'permissions', value: selection })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-3">
                        <button type='submit' className='px-8 py-3 text-center bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] rounded'>
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export const getServerSideProps = (async () => {
    return {
        props: {
            permissions: permissions || []
        }
    }
}) satisfies GetServerSideProps<{ permissions: IPermissionsReturns[] }>