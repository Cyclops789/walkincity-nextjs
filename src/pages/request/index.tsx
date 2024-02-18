import React, { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic';
import Reaptcha from 'reaptcha';
import axios from 'axios';
import { INotificationType } from '@/components/Dashboard/Notification';
import { executeQueryReturnsJSON } from '@/lib/db';
import { IVideosRes } from '@/components/SideBar';
import { ICountryRes } from '@/components/SideBar';
import { GetServerSideProps } from 'next';
import query from '@/utils/db';
import { useRouter } from 'next/router';
import YouTubeVideoId from '@/helpers/youtube';

interface INewVideoForm {
    vid?: string;
    country?: string;
    place?: string;
    type?: string;
    weather?: string;
    seekTo?: number;
}

const Layout = dynamic(import('@/components/Layouts/Main')),
    Notification = dynamic(import('@/components/Dashboard/Notification'));

export default function request({ videos, countries }: { videos: IVideosRes[], countries: ICountryRes[] }) {
    const router = useRouter();
    const ref = useRef<Reaptcha>(null);
    const [form, setForm] = useState<INewVideoForm>();
    const [token, setToken] = useState('');
    const [sending, setSending] = useState(false);
    const [notify, setNotify] = useState<INotificationType>({ open: false, type: 'info', text: 'Simple' });

    const submitForm = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
        setSending(true);

        // Check if there is a token, 
        // if its there send the request. 
        // if not, execute recaptcha and send request anyways 

        // ez, https://github.com/pterodactyl/panel/blob/develop/resources/scripts/components/auth/LoginContainer.tsx#L39
        if (!token) {
            ref.current!.execute().catch(error => {
                console.error(error);
            }).finally(() => {
                sendRequest(e);
            });

            return;
        }

        sendRequest(e);
    }

    const sendRequest = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
        e.preventDefault();

        if (!form ||
            form.vid === '' ||
            form.country === '' ||
            form.place === '' ||
            form.type === '' ||
            form.weather === '' ||
            form.seekTo === undefined ||
            form.seekTo === null
        ) return;

        if (YouTubeVideoId(form.vid as string) === 'invalid_url') {
            console.log('Invalid video URL or ID.');
            return setNotify({ open: true, type: 'warning', text: 'Invalid video URL or ID.' });
        }

        axios.post('/api/request/new', {
            token,
            vid: form.vid,
            country: form.country,
            place: form.place,
            type: form.type,
            weather: form.weather,
            continent: countries.filter((country) => country.long_name.toLowerCase() === form.country?.toLowerCase())[0].continent,
            seekTo: form.seekTo,
        }).then((res) => {
            if (res.data.success) {
                setNotify({ open: true, type: 'success', text: res.data.message });

                setTimeout(() => {
                    router.push('/request/success');
                }, 5000);
            } else if (!res.data.success && res.data.error.message) {
                setNotify({ open: true, type: 'warning', text: res.data.error.message })
            }
        }).catch(error => {
            console.error(error);

            setToken('');
            if (ref.current) ref.current.reset();
        }).finally(() => {
            setSending(false);
        })
    }

    const updateFormData = ({ name, value }: { name: string, value: string | number }) => {
        setForm((prevData) => ({ ...prevData, [name]: value }))
    };

    useEffect(() => {
        setForm({
            'vid': '',
            'country': countries[0].long_name,
            'place': '',
            'weather': 'weather-normal-morning',
            'type': 'walk',
            'seekTo': 0,
        });
    }, [])

    return (
        <Layout title={'Request a new walk'}>
            <Notification
                setNotify={setNotify}
                open={notify.open}
                type={notify.type}
                text={notify.text}
                duration={notify.duration}
            />
            <div style={{ backgroundColor: 'hsl(0, 0%, 8%)' }} className='sm:flex w-screen h-screen justify-center items-center overflow-auto'>
                <div className='flex p-4 sm:p-0 sm:pl-4 text-white justify-center items-center'>
                    <div style={{ backgroundColor: 'hsl(0, 0%, 32.5%)' }} className='p-5 h-[582px] space-y-2 sm:w-[500px] rounded-s'>
                        <div className="font-semibold text-[#ff284b]">
                            Make sure that the youtube field is like one of those:
                        </div>
                        <ul className=' text-sm'>
                            <li><span className='text-red-600 font-bold'>*</span> https://www.youtube.com/watch?v=KBeCMiUPuic</li>
                            <li><span className='text-red-600 font-bold'>*</span> https://www.youtube.com/watch?v=KBeCMiUPuic&feature=youtu.be</li>
                            <li><span className='text-red-600 font-bold'>*</span> https://youtu.be/KBeCMiUPuic</li>
                            <li><span className='text-red-600 font-bold'>*</span> https://youtu.be/KBeCMiUPuic?t=1s</li>
                            <li><span className='text-red-600 font-bold'>*</span> KBeCMiUPuic</li>
                        </ul>
                    </div>
                </div>
                <div className='flex sm:pr-4 text-white justify-center items-center'>
                    <form style={{ backgroundColor: 'hsl(0, 0%, 22%)' }} className='p-5 h-[582px] space-y-2 sm:w-[500px] rounded-e' onSubmit={submitForm}>
                        <div className='text-2xl uppercase text-center'>
                            video request
                        </div>

                        <div className='space-y-2'>
                            <label htmlFor='vid'>Video <span className='text-red-600'>*</span></label>
                            <input id='vid' onChange={(e) => updateFormData({ name: 'vid', value: e.target.value })} className='rounded p-3 text-black w-full' type="text" required />
                        </div>

                        <div className='space-y-2'>
                            <label htmlFor='country'>Country <span className='text-red-600'>*</span></label>
                            <select
                                id="country"
                                onChange={(e) => updateFormData({ name: 'country', value: e.target.value })}
                                value={form?.country}
                                className="rounded p-3 text-black w-full"
                                required
                            >
                                {countries?.map((country) => (
                                    <option key={country.short_name} value={country.long_name}>{country.long_name}</option>
                                ))}
                            </select>
                        </div>

                        <div className='space-y-2'>
                            <label htmlFor='place'>Place <span className='text-red-600'>*</span></label>
                            <input id='place' onChange={(e) => updateFormData({ name: 'place', value: e.target.value })} className='rounded p-3 text-black w-full' type="text" required />
                        </div>

                        <div className='space-y-2'>
                            <label htmlFor='weather'>Weather <span className='text-red-600'>*</span></label>
                            <select
                                id="weather"
                                onChange={(e) => updateFormData({ name: 'weather', value: e.target.value })}
                                value={form?.weather}
                                className="rounded p-3 text-black w-full"
                                required
                            >
                                <option value={'weather-normal-morning'}>Normal Morning</option>
                                <option value={'weather-normal-night'}>Normal Night</option>
                                <option value={'weather-rain-'}>Raining</option>
                                <option value={'weather-cloud-morning'}>Cloudy</option>
                                <option value={'weather-snow-'}>Snowing</option>
                            </select>
                        </div>

                        <div className='space-y-2'>
                            <label htmlFor='seekTo'>Seek the video to <span className='text-red-600'>*</span></label>
                            <input id='seekTo' onChange={(e) => updateFormData({ name: 'seekTo', value: e.target.valueAsNumber })} className='rounded p-3 text-black w-full' type="number" required />
                        </div>

                        <div className='flex justify-center pt-5'>
                            <button disabled={sending} type="submit" className='bg-[var(--primary-text-color)] disabled:bg-slate-700 disabled:hover:bg-slate-800 hover:bg-[var(--primary-text-color-hover)] p-3 rounded text-1xl w-full uppercase'>Submit</button>
                        </div>
                    </form>
                </div>

                <div className='sm:hidden pb-[100px]' />
            </div>


            <Reaptcha
                ref={ref}
                size={'invisible'}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '_invalid_key'}
                onVerify={response => {
                    console.log(response);
                    setToken(response);
                }}
                onExpire={() => {
                    setToken('');
                }}
            />
        </Layout>
    )
}

export const getServerSideProps = (async () => {
    const videos = await executeQueryReturnsJSON({
        query: query.getAllVideos,
        values: [],
    }) as IVideosRes[];

    const countries = await executeQueryReturnsJSON({
        query: query.getAllCountries,
        values: [],
    }) as ICountryRes[];

    return {
        props: {
            videos: videos,
            countries: countries
        }
    }
}) satisfies GetServerSideProps<{ videos: IVideosRes[], countries: ICountryRes[] }>
