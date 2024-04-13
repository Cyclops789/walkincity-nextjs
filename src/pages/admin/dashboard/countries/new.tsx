import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import dynamic from 'next/dynamic';
import query from '@/utils/db';
import { executeQueryReturnsJSON } from '@/lib/db';
import { GetServerSideProps } from 'next';
import { http as axios } from '@/helpers/http';

export interface IContinentsRes {
    id: number;
    continent_color: string;
    continent_icon: string;
    continent_name: string;
}

const Layout = dynamic(import('@/components/Layouts/Dashboard')),
    Notification = dynamic(import('@/components/Dashboard/Notification')),
    ConfirmationModal = dynamic(import('@/components/Dashboard/ConfirmationModal'));

interface IFormData {
    short_name?: string;
    long_name?: string;
    border_color?: string;
    continent?: string;
}

export default function newCountry({ continents }: { continents: IContinentsRes[] }) {
    const router = useRouter();

    const [createAnOther, setCreateAnOther] = useState(false);
    const [form, setFormData] = useState<IFormData>();
    const [notify, setNotify] = useState<any>();
    const [modal, setModalData] = useState<any>();

    const onSubmitForm = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
        e.preventDefault();

        if (!form ||
            form.short_name === '' ||
            form.long_name === '' ||
            form.border_color === '' ||
            form.continent === ''
        ) return setNotify({ open: true, type: 'warning', text: 'All fields are required, rejecting!' });

        console.log(form)

        setModalData({
            open: true,
            text: 'Are you sure you want to create this country?',
            type: 'delete',
            button: {
                accept: 'Yes, Im sure',
                decline: 'No, cancel'
            },
            onAccept: () => {
                axios.post('/api/admin/countries/new', {
                    short_name: form.short_name,
                    long_name: form.long_name,
                    border_color: form.border_color,
                    continent: form.continent
                }).then((res) => {
                    setModalData((prevData: any) => ({ ...prevData, open: false }));
                    if (res.data.success) {
                        setNotify({ open: true, type: 'success', text: res.data.message });

                        if (createAnOther) {
                            setTimeout(() => {
                                window.location.reload();
                            }, 5000);
                        } else {
                            setTimeout(() => {
                                router.push({
                                    pathname: '/admin/dashboard/countries/' + res.data.user,
                                });
                            }, 5000);
                        }
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

    const updateFormData = ({ name, value }: { name: string, value: string | number }) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    useEffect(() => {
        setFormData({
            'short_name': '',
            'long_name': '',
            'border_color': '#a51d2d',
            'continent': continents[0].continent_name,
        });
    }, []);

    return (
        <Layout title={`New Country`}>
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

                    <div style={{ backgroundColor: 'hsl(0, 0%, 22%)' }} className='p-3 rounded-lg mt-3'>
                        <form onSubmit={onSubmitForm} action="" className='space-y-4'>
                            <div className='space-y-2'>

                                <div className='space-y-2'>
                                    <div>
                                        <label className={'font-semibold'} htmlFor="short_name">Short name</label>
                                    </div>
                                    <input
                                        type="text"
                                        id="short_name"
                                        onChange={(e) => updateFormData({ name: 'short_name', value: e.target.value })}
                                        defaultValue={form.short_name}
                                        className='p-2 rounded bg-[#262626] text-white w-full'
                                        required
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <div>
                                        <label className={'font-semibold'} htmlFor="long_name">Long name</label>
                                    </div>
                                    <input
                                        type="text"
                                        onChange={(e) => updateFormData({ name: 'long_name', value: e.target.value })}
                                        defaultValue={form.long_name}
                                        className='p-2 rounded bg-[#262626] text-white w-full'
                                        id='long_name'
                                        min={1}
                                        required
                                    />
                                </div>


                                <div className='space-y-2'>
                                    <div>
                                        <label className={'font-semibold'} htmlFor="border_color">Border color</label>
                                    </div>
                                    <input
                                        type="color"
                                        onChange={(e) => updateFormData({ name: 'border_color', value: e.target.value })}
                                        defaultValue={form.border_color}
                                        className='p-2 rounded bg-[#262626] text-white w-full'
                                        id='border_color'
                                        min={1}
                                        required
                                    />
                                    <div>
                                        <label className='font-thin text-sm mt-[-5px]' htmlFor="border_color">Click to pick a color</label>
                                    </div>
                                </div>
                                <div className='space-y-2'>
                                    <div>
                                        <label className={'font-semibold'} htmlFor="continent">Continent</label>
                                    </div>
                                    <select
                                        id="continent"
                                        onChange={(e) => updateFormData({ name: 'continent', value: e.target.value })}
                                        defaultValue={form.continent}
                                        className="p-2 bg-[#262626] text-white rounded w-full"
                                        required
                                    >
                                        {continents?.map((continent) => (
                                            <option key={continent.continent_name} value={continent.continent_name}>{continent.continent_name}</option>
                                        ))}
                                    </select>
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
    const continents = await executeQueryReturnsJSON({
        query: query.getAllContinents,
        values: []
    }) as IContinentsRes[];

    return {
        props: {
            continents: continents || []
        }
    }
}) satisfies GetServerSideProps<{ continents: IContinentsRes[] }>  