import React, { useEffect, useState, useRef } from 'react'
import Router, { useRouter } from 'next/router'
import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { INotificationType } from '@/components/Dashboard/Notification';
import { http as axios } from '@/helpers/http';

const Layout = dynamic(import('@/components/Layouts/Dashboard')),
    Notification = dynamic(import('@/components/Dashboard/Notification')),
    ConfirmationModal = dynamic(import('@/components/Dashboard/ConfirmationModal')),
    Editor = dynamic(() => import("@/components/Dashboard/Editor"), {
        ssr: false
    });

interface IFormData {
    name?: string;
    enabled?: boolean;
    route?: string;
}

interface IEditor {
    setContent(content: string): void;
    getContent(): string;
}

export default function newPage({ }: {}) {
    const router = useRouter();
    const editorRef = useRef<IEditor>(null);
    const [modal, setModalData] = useState<any>();
    const [form, setFormData] = useState<IFormData>();
    const [notify, setNotify] = useState<INotificationType>({ open: false, type: 'info', text: 'Simple' });

    const onSubmitForm = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
        e.preventDefault();

        const content = editorRef.current?.getContent();

        if (!form ||
            form.name === '' ||
            content === '' ||
            content === undefined ||
            form.enabled === undefined ||
            form.enabled === null
        ) return setNotify({ open: true, type: 'warning', text: 'All fields are required, rejecting!' });

        setModalData({
            open: true,
            text: 'Are you sure you want to create this page?',
            type: 'create',
            button: {
                accept: 'Yes, Im sure',
                decline: 'No, cancel'
            },
            onAccept: () => {
                axios.post('/api/admin/pages/new', {
                    name: form.name,
                    enabled: form.enabled,
                    route: form.route,
                    content: content,
                }).then((res) => {
                    setModalData((prevData: any) => ({ ...prevData, open: false }));
                    if (res.data.success) {
                        setNotify({ open: true, type: 'success', text: res.data.message });

                        setTimeout(() => {
                            router.push({
                                pathname: '/admin/dashboard/pages/' + res.data.page,
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
            'enabled': false,
            'route': ''
        });
    }, []);

    return (
        <Layout title={`New Page`}>

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

            <div style={{ backgroundColor: 'hsl(0, 0%, 22%)' }} className='p-3 rounded-lg mt-3'>
                <form onSubmit={onSubmitForm} action="" className='space-y-4'>

                    <div className="space-y-2">
                        <div className='space-x-2 flex w-full'>
                            <div className='w-full'>
                                <div className='mb-2'>
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

                            <div className='w-full'>
                                <div className='mb-2'>
                                    <label className={'font-semibold'} htmlFor="route">Route</label>
                                </div>
                                <input
                                    type="text"
                                    id="route"
                                    onChange={(e) => updateFormData({ name: 'route', value: e.target.value })}
                                    className='p-2 rounded bg-[#262626] text-white w-full'
                                    required
                                />
                            </div>

                            <div className=''>
                                <div className='mb-2'>
                                    <label className={'font-semibold'} htmlFor="enabled">Enabled</label>
                                </div>
                                <input
                                    type="checkbox"
                                    id="enabled"
                                    onChange={(e) => updateFormData({ name: 'enabled', value: e.target.checked })}
                                    className='p-2 rounded cursor-pointer w-[39px] h-[39px]'
                                    
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className='space-y-2'>
                            <div>
                                <label className={'font-semibold'} htmlFor="content">Content</label>
                            </div>

                            <div id="content" className={'text-black'}>
                                <Editor editorRef={editorRef} />
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
        }
    }
}) satisfies GetServerSideProps<{}>