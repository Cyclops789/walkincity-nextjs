import React, { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import { INotificationType } from '@/components/Dashboard/Notification';
import { executeQueryReturnsJSON } from '@/lib/db';
import { ICountryRes } from '@/components/SideBar';
import { GetServerSideProps } from 'next';
import query from '@/utils/db';
import { useRouter } from 'next/router';
import YouTubeVideoId from '@/helpers/youtube';
import YouTube, { YouTubeProps, YouTubePlayer, YouTubeEvent } from 'react-youtube';
import Link from 'next/link';

interface INewVideoForm {
    vid?: string;
    country?: string;
    place?: string;
    type?: string;
    weather?: string;
    seekTo?: number;
    email?: string;
}

const Layout = dynamic(import('@/components/Layouts/Main')),
    Notification = dynamic(import('@/components/Dashboard/Notification'));

export default function request({ countries }: { countries: ICountryRes[] }) {
    const router = useRouter();
    const ref = useRef<any>(null);
    const [form, setForm] = useState<INewVideoForm>();
    const [tested, setTested] = useState('');
    const [videoError, setVideoError] = useState('');
    const [videoState, setVideoState] = useState('unReady');
    const [playing, setPlaying] = useState(false);
    const [sending, setSending] = useState(false);
    const [notify, setNotify] = useState<INotificationType>({ open: false, type: 'info', text: 'Simple' });

    const submitForm = async (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
        e.preventDefault();

        const newToken = await ref.current.executeAsync();

        sendRequest(e, newToken);
    }

    const sendRequest = (e: React.MouseEvent<HTMLFormElement, MouseEvent>, token: string) => {
        if (!form ||
            form.vid === '' ||
            form.country === '' ||
            form.place === '' ||
            form.type === '' ||
            form.weather === '' ||
            form.email === '' ||
            form.seekTo === undefined ||
            form.seekTo === null
        ) return;

        if (YouTubeVideoId(form.vid as string) === 'invalid_url') {
            return setNotify({ open: true, type: 'warning', text: 'Invalid video URL or ID.' });
        }

        if (!tested) {
            return setNotify({ open: true, type: 'warning', text: 'Please test the video before sending.' });
        }

        if (!playing) {
            return setNotify({ open: true, type: 'warning', text: 'Please verify the video before sending.' });
        }

        setSending(true);
        axios.post('/api/request/new', {
            token,
            vid: form.vid,
            country: form.country,
            place: form.place,
            type: form.type,
            weather: form.weather,
            continent: countries.filter((country) => country.long_name.toLowerCase() === form.country?.toLowerCase())[0].continent,
            seekTo: form.seekTo,
            by_email: form.email
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

    const testVideo = () => {
        if (!form?.vid) {
            return setNotify({ open: true, type: 'warning', text: 'Please fill out the video input.' });
        }
        if (tested !== '' && tested) {
            setTested('');
            updateFormData({ name: 'vid', value: '' })
        } else {
            setTested(form.vid);
        }
    }

    const onReady: YouTubeProps['onReady'] = (e) => {
        setVideoState('Ready');
    }

    const onError: YouTubeProps['onError'] = (e) => {
        switch (e.data) {
            /**
             * The request contains an invalid parameter value. 
             * For example, this error occurs if you specify a video ID that does not 
             * have 11 characters, or if the video ID contains invalid characters, 
             * such as exclamation points or asterisks.
             */
            case 2:
                setVideoError('Invalid url or videoID.')
                break;
            /**
             * The requested content cannot be played in 
             * an HTML5 player or another error related 
             * to the HTML5 player has occurred.
             */
            case 5:
                setVideoError('Error with HTML5 rendering, please restart or change the browser.')
                break;
            /**
             * The video requested was not found. 
             * This error occurs when a video has been removed 
             * (for any reason) or has been marked as private.
             */
            case 100:
                setVideoError('Video private or doesnt exist.')
                break;

            /**
             * The owner of the requested video does not allow it 
             * to be played in embedded players.
             */
            case 101:
                setVideoError('The owner of the requested video does not allow it to be played in embedded players.')
                break;
            /**
             * This error is the same as 101. 
             * It's just a 101 error in disguise!
             */
            case 150:
                setVideoError('Video private or doesnt exist.')
                break;
        }
    }
    
    const onStateChange: YouTubeProps['onStateChange'] = (e) => {
        switch (e.target.getPlayerState()) {
            case -1: // unstarted
                setVideoState('Video is ready but unstarted, play to verfiy.')
                break;
            case 0: // ended
                setVideoState('Video ended, play to verify.')
                break;
            case 1: // playing
                if(e.target.getDuration() < 900 ) {
                    setVideoError('Video should be at least 15min.')
                    setPlaying(false)
                } else if (e.target.getDuration() >= 900) {
                    setPlaying(true)
                    setVideoState('Video is playing.')
                }
                break;
            case 2: // paused
                setVideoState('Video is paused.')
                break;
            case 3: // buffering
                setVideoState('Video is buffering, play to verify.')
                break;
        }
    }

    useEffect(() => {
        if (form?.vid === '' || !form?.vid) {
            setTested('');
            setPlaying(false)
        }
    }, [form]);

    useEffect(() => {
        if (playing) {
            setVideoError('')
        }
    }, [playing])

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
                <div className='flex p-4 sm:p-0 sm:pl-4 text-white justify-center items-center sm:py-4 mt-6'>
                    <div style={{ backgroundColor: 'hsl(0, 0%, 32.5%)' }} className='p-5 h-full sm:h-[650px] space-y-2 sm:w-[500px] rounded sm:rounded-s sm:rounded-none'>
                        <div className="font-semibold text-[#fc002a] text-center uppercase text-2xl underline">
                            Important
                        </div>
                        <div className="font-semibold text-[#ff284b]">
                            - If you can't find the country that you want to add then please send us a request at: <a href="mailto:country@walkin.city" className='text-[#fc002a]'>country@walkin.city</a>
                        </div>

                        <div className="font-semibold text-[#ff284b]">
                            - Make sure that the youtube field is like one of those:
                        </div>
                        <ul className=' text-sm'>
                            <li><span className='text-red-600 font-bold'>*</span> https://www.youtube.com/watch?v=KBeCMiUPuic</li>
                            <li><span className='text-red-600 font-bold'>*</span> https://www.youtube.com/watch?v=KBeCMiUPuic&feature=youtu.be</li>
                            <li><span className='text-red-600 font-bold'>*</span> https://youtu.be/KBeCMiUPuic</li>
                            <li><span className='text-red-600 font-bold'>*</span> https://youtu.be/KBeCMiUPuic?t=1s</li>
                            <li><span className='text-red-600 font-bold'>*</span> KBeCMiUPuic</li>
                        </ul>

                        <div className="font-semibold text-[#ff284b]">
                            - The video must be 15min or more otherwise it will be rejected.
                        </div>
                        <div className="font-semibold text-[#fc002a] text-center uppercase text-2xl underline">
                            Video
                        </div>
                        <span className={'font-semibold text-[#ff284b]'}>Status:</span> {(videoError && !playing) ? videoError : (videoState && !playing) ? videoState : playing && (<span className='text-green-400'>Verified</span>)}
                        <div className='bg-black p-3 w-full h-[170px] sm:w-[460px] sm:h-[226px] justify-center items-center flex rounded'>
                            {(sending || !tested || form?.vid === '') && (
                                <div className="custom-loader"></div>
                            )}
                            <YouTube
                                iframeClassName={`w-full h-[170px] sm:w-[460px] sm:h-[226px] ${(!tested) && 'hidden'}`}
                                opts={{
                                    playerVars: {
                                        autoplay: 0
                                    },
                                }}
                                onReady={onReady}
                                onError={onError}
                                onStateChange={onStateChange}
                                videoId={YouTubeVideoId(tested)}
                            />
                        </div>
                    </div>
                </div>

                <div className='flex p-4 sm:pr-4 sm:p-0 text-white justify-center items-center sm:py-4 mt-6'>
                    <form style={{ backgroundColor: 'hsl(0, 0%, 22%)' }} className='p-5 h-full sm:h-[650px] space-y-2 sm:w-[500px] rounded sm:rounded-e sm:rounded-none' onSubmit={submitForm}>
                        <div className='text-2xl uppercase text-center'>
                            video request
                        </div>

                        <div className='space-y-2'>
                            <label htmlFor='vid'>Video <span className='text-red-600'>*</span> <span className='font-thin text-sm mt-[-5px]'>You can test the video before sending.</span></label>
                            <div className="flex space-x-2">
                                <input disabled={tested !== ''} id='vid' value={form?.vid} onChange={(e) => updateFormData({ name: 'vid', value: e.target.value })} className='rounded p-2 bg-[#262626] text-white w-full' type="text" required />
                                <button onClick={testVideo} type='button' className={'bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] p-2 rounded text-1xl w-auto uppercase'}>
                                    {!tested ? 'test' : 'clear'}
                                </button>
                            </div>
                        </div>

                        <div className='space-y-2'>
                            <label htmlFor='country'>Country <span className='text-red-600'>*</span></label>
                            <select
                                id="country"
                                onChange={(e) => updateFormData({ name: 'country', value: e.target.value })}
                                value={form?.country}
                                className="rounded p-2 bg-[#262626] text-white w-full"
                                required
                            >
                                {countries?.map((country) => (
                                    <option key={country.short_name} value={country.long_name}>{country.long_name}</option>
                                ))}
                            </select>
                        </div>

                        <div className='space-y-2'>
                            <label htmlFor='place'>Place <span className='text-red-600'>*</span> <span className='font-thin text-sm mt-[-5px]'>It can be the city / village or both.</span></label>
                            <input id='place' onChange={(e) => updateFormData({ name: 'place', value: e.target.value })} className='rounded p-2 bg-[#262626] text-white w-full' type="text" required />
                        </div>

                        <div className='space-y-2'>
                            <label htmlFor='weather'>Weather <span className='text-red-600'>*</span> <span className='font-thin text-sm mt-[-5px]'>Choose the closest one.</span></label>
                            <select
                                id="weather"
                                onChange={(e) => updateFormData({ name: 'weather', value: e.target.value })}
                                value={form?.weather}
                                className="rounded p-2 bg-[#262626] text-white w-full"
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
                            <label htmlFor='seekTo'>Seek the video to (in seconds) <span className='text-red-600'>*</span> <span className='font-thin text-sm mt-[-5px]'>When the walk starts.</span></label>
                            <input id='seekTo' onChange={(e) => updateFormData({ name: 'seekTo', value: e.target.valueAsNumber })} className='rounded p-2 bg-[#262626] text-white w-full' type="number" required />
                        </div>

                        <div className='space-y-2'>
                            <label htmlFor='email'>Your email <span className='text-red-600'>*</span> <span className='font-thin text-sm mt-[-5px]'>We will use this email to verify the request.</span></label>
                            <input id='email' onChange={(e) => updateFormData({ name: 'email', value: e.target.value })} className='rounded p-2 bg-[#262626] text-white w-full' type="email" required />
                        </div>

                        <div className='flex justify-center pt-2'>
                            <button disabled={sending || !tested || !form || form.vid === '' || form.country === '' || form.place === '' || form.type === '' || form.weather === '' || form.email === '' || form.seekTo === undefined || form.seekTo === null} type="submit" className='bg-[var(--primary-text-color)] disabled:bg-slate-700 hover:bg-[var(--primary-text-color-hover)] p-2 rounded text-1xl w-full uppercase'>Submit</button>
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

    const countries = await executeQueryReturnsJSON({
        query: query.getAllCountries,
        values: [],
    }) as ICountryRes[];

    return {
        props: {
            countries: countries
        }
    }
}) satisfies GetServerSideProps<{ countries: ICountryRes[] }>
