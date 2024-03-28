import React, { useEffect, useState, useRef } from 'react'
import Router, { useRouter } from 'next/router'
import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { INotificationType } from '@/components/Dashboard/Notification';
import axios from 'axios';
import { executeQueryReturnsJSON } from '@/lib/db';
import query from '@/utils/db';

const Layout = dynamic(import('@/components/Layouts/Dashboard')),
    Notification = dynamic(import('@/components/Dashboard/Notification')),
    ConfirmationModal = dynamic(import('@/components/Dashboard/ConfirmationModal')),
    Editor = dynamic(() => import("@/components/Dashboard/Editor"), {
        ssr: false
    });

interface IFormData {
    name?: string;
    route?: string;
    enabled?: boolean;
}

interface IPage {
    id: number;
    content: string;
    name: string;
    route: string;
    enabled: boolean;
}

interface IEditor {
    setContent(content: string): void | string | any;
    getContent(): string;
}

export default function newRole({ page  }: { page: IPage }) {
    const router = useRouter();
    const pageId = router.query.id;
    const editorRef = useRef<IEditor>(null);
    const [modal, setModalData] = useState<any>();
    const [form, setFormData] = useState<IFormData>();
    const [notify, setNotify] = useState<INotificationType>({ open: false, type: 'info', text: 'Simple' });

    const onSubmitForm = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
        e.preventDefault();

        const content = editorRef.current?.getContent();
        console.log(content)
        if (!form ||
            form.name === '' || 
            form.route === '' ||
            form.enabled === undefined ||
            form.enabled === null ||
            content === '' ||
            content === undefined
        ) return setNotify({ open: true, type: 'warning', text: 'All fields are required, rejecting!' });

        setModalData({
            open: true,
            text: 'Are you sure you want to save this page?',
            type: 'create',
            button: {
                accept: 'Yes, Im sure',
                decline: 'No, cancel'
            },
            onAccept: () => {
                axios.post('/api/admin/pages/edit', {
                    id: page.id,
                    name: form.name,
                    content: content,
                    route: form.route,
                    enabled: form.enabled
                }).then((res) => {
                    setModalData((prevData: any) => ({ ...prevData, open: false }));
                    if (res.data.success) {
                        setNotify({ open: true, type: 'success', text: res.data.message });

                        setTimeout(() => {
                            router.push({
                                pathname: '/admin/dashboard/pages/' + res.data.role,
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
            'name': page.name,
            'enabled': page.enabled,
            'route': page.route
        });
    }, []);

    return (
        <Layout title={`Page - ${pageId}`}>
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

                <div className="space-y-2">
                        <div className='space-x-2 flex w-full'>
                            <div className='w-full'>
                                <div className='mb-2'>
                                    <label className={'font-semibold'} htmlFor="name">Name</label>
                                </div>
                                <input
                                    type="text"
                                    id="name"
                                    defaultValue={form?.name}
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
                                    defaultValue={form?.route}
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
                                <Editor 
                                    editorRef={editorRef}
                                    initialValue={page.content}
                                />
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
        </Layout>
    )
}

export const getServerSideProps = (async (context) => {
    const { id } = context.query;
    const page = await executeQueryReturnsJSON({
        query: query.getPageById,
        values: [id]
    }) as IPage[];

    if (page.length <= 0) {
        return {
            redirect: {
                destination: '/admin/dashboard/pages',
                permanent: false,
            },
        };
    }

    return {
        props: {
            page: page[0]
        }
    }
}) satisfies GetServerSideProps<{ page: IPage }>