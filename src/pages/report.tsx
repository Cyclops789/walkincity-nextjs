import React, { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic';
import ReCAPTCHA from 'react-google-recaptcha';
import { http as axios } from '@/helpers/http';
import { INotificationType } from '@/components/Dashboard/Notification';
import { executeQueryReturnsJSON } from '@/lib/db';
import { IVideosRes } from '@/components/SideBar';
import { GetServerSideProps } from 'next';
import query from '@/utils/db';
import YouTubeVideoId from '@/helpers/youtube';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface IReportForm {
    vid?: string;
    reason?: string;
    email?: string;
}

const Layout = dynamic(import('@/components/Layouts/Main')),
    Notification = dynamic(import('@/components/Dashboard/Notification'));

export default function report({ videos }: { videos: IVideosRes[] }) {
    const ref = useRef<any>(null);
    const [form, setForm] = useState<IReportForm>();
    const [sending, setSending] = useState(false);
    const [editVideo, setEditVideo] = useState(false);
    const router = useRouter();
    const { v, type } = router.query;
    const [notify, setNotify] = useState<INotificationType>({ open: false, type: 'info', text: 'Simple' });

    const submitForm = async (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
        e.preventDefault();

        const newToken = await ref.current.executeAsync();

        sendRequest(e, newToken);
    }

    const sendRequest = (e: React.MouseEvent<HTMLFormElement, MouseEvent>, token: string) => {
        if (!form ||
            form.reason === ''
        ) return;

        if (YouTubeVideoId(form.vid as string) === 'invalid_url') {
            return setNotify({ open: true, type: 'warning', text: 'Invalid video URL or ID.' });
        }

        setSending(true);
        axios.post('/api/report/new', {
            token,
            vid: form.vid || null,
            reason: form.reason,
        }).then((res) => {
            if (res.data.success) {
                setNotify({ open: true, type: 'success', text: res.data.message });
            } else if (!res.data.success && res.data.error.message) {
                setNotify({ open: true, type: 'warning', text: res.data.error.message })
            }
        }).catch(error => {
            console.error(error);
        }).finally(() => {
            setSending(false);
        })
    }

    const updateFormData = ({ name, value }: { name: string, value: string | number }) => {
        setForm((prevData) => ({ ...prevData, [name]: value }))
    };


    useEffect(() => {
        setForm({
            'vid': `${v ? v : ''}`,
            'reason': '',
            'email': ''
        });
    }, [])

    return (
        <Layout title={'Report a bug'}>
            <Notification
                setNotify={setNotify}
                open={notify.open}
                type={notify.type}
                text={notify.text}
                duration={notify.duration}
            />
            <div style={{ backgroundColor: 'hsl(0, 0%, 8%)' }} className='flex w-screen h-screen justify-center items-center overflow-auto'>
                <div className='flex p-4 text-white justify-center items-center sm:py-4 mt-6'>
                    <form style={{ backgroundColor: 'hsl(0, 0%, 22%)' }} className='p-5 h-auto space-y-2 w-auto sm:w-[500px] rounded' onSubmit={submitForm}>
                        <div className='text-2xl uppercase text-center'>
                            report a bug
                        </div>

                        {type === 'video' && (
                        <div className='space-y-2'>
                        <label htmlFor='country'>Video <span className='text-red-600'>*</span></label>
                        <div className='flex space-x-2'>
                            <select
                                id="country"
                                onChange={(e) => updateFormData({ name: 'country', value: e.target.value })}
                                value={form?.vid}
                                className="rounded p-2 bg-[#262626] text-white disabled:text-white/40 w-full"
                                required
                                disabled={!editVideo}
                            >
                                {videos?.map((video) => (
                                    <option key={video.vid} value={video.vid}>{video.vid} - {video.country}, {video.place}</option>
                                ))}
                            </select>
                            <button disabled={editVideo} onClick={() => setEditVideo(!editVideo)} type='button' className={'disabled:bg-slate-700 bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] p-2 rounded text-1xl w-auto uppercase'}>
                                Edit
                            </button>
                            <a href={`https://www.youtube.com/watch?v=${v}`} target='_blank' className={'disabled:bg-slate-700 bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] p-2 rounded text-1xl w-auto uppercase'}>
                                Check
                            </a>
                        </div>
                    </div>
                        )}

                        <div className='space-y-2'>
                            <label htmlFor='email'>Your email <span className='font-thin text-sm mt-[-5px]'>If you want to be notified once the bug has been fixed.</span></label>
                            <input id='email' onChange={(e) => updateFormData({ name: 'email', value: e.target.value })} className='rounded p-2 bg-[#262626] text-white w-full' type="email" />
                        </div>

                        <div className='space-y-2'>
                            <label htmlFor='reason'>Reason <span className='text-red-600'>*</span> <span className='font-thin text-sm mt-[-5px]'>Please explain the bug.</span></label>
                            <textarea id='reason' onChange={(e) => updateFormData({ name: 'reason', value: e.target.value })} className='rounded p-2 bg-[#262626] text-white w-full' required />
                        </div>

                        <div className='flex justify-center pt-2'>
                            <button 
                                disabled={sending || !form || form.reason === ''} 
                                type="submit" 
                                className='bg-[var(--primary-text-color)] disabled:bg-slate-700 hover:bg-[var(--primary-text-color-hover)] p-2 rounded text-1xl w-full uppercase'
                                >
                                Submit
                            </button>
                        </div>
                        <div className='flex justify-center pt-1 text-center'>
                            <Link href="/" className='bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] p-2 rounded text-1xl w-full uppercase'>Back</Link>
                        </div>
                    </form>
                </div>

                <div className='sm:hidden pb-[100px]' />
            </div>


            <ReCAPTCHA
                ref={ref}
                size={'invisible'}
                badge={'bottomleft'}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '_invalid_key'}
            />
        </Layout>
    )
}

export const getServerSideProps = (async () => {

    const videos = await executeQueryReturnsJSON({
        query: query.getAllVerifiedVideosForProduction,
        values: [],
    }) as IVideosRes[];

    return {
        props: {
            videos: videos || []
        }
    }
}) satisfies GetServerSideProps<{ videos: IVideosRes[] }>
