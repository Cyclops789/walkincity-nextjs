import { useEffect, useState, useRef } from 'react'
import React from 'react'
import { CurrentEditVideo } from '@/pages/admin/dashboard/requests';
import YouTube, { YouTubeProps, YouTubePlayer, YouTubeEvent } from 'react-youtube';
import { ICountryRes } from '../SideBar';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { INotificationType } from '../Notification';
import { refreshRouteSilenced } from '@/helpers/routes';
import { useRouter } from 'next/router';

const Notification = dynamic(import('@/components/Dashboard/Notification'));

export default function SheetModal({
    setCurrentEditVideo,
    currentEditVideo,
    countries
}: {
    setCurrentEditVideo: React.Dispatch<React.SetStateAction<CurrentEditVideo | null | undefined>>,
    currentEditVideo: CurrentEditVideo | null | undefined,
    countries: ICountryRes[]
}) {
    const router = useRouter()
    const wrapperRef = useRef(null);
    const [notify, setNotify] = useState<INotificationType>({ open: false, type: 'info', text: 'Simple' });
    const [validVideo, setValidVideo] = useState(false);
    const [form, setFormData] = useState({ id: 0, country: '', place: '', weather: '', seekTo: '', reason: '' });

    const sendAction = (action: 'accept' | 'reject') => {
        if (!form ||
            form.country == '' ||
            form.place == '' ||
            form.seekTo == '' ||
            form.seekTo == undefined ||
            form.weather == '' ||
            form.id <= 0 ||
            form.id == undefined
        ) return setNotify({ open: true, text: 'All fields are required!', type: 'warning' })

        axios.post('/api/admin/requests/action', {
            id: form.id,
            action: action,
            country: form.country,
            place: form.place,
            seekTo: form.seekTo,
            weather: form.weather,
            reason: form.reason || ''
        }).then((res) => {
            if (res.data.success) {
                setNotify({ open: true, text: res.data.message, type: 'success' });
                
                setCurrentEditVideo({
                    video: undefined,
                    open: false
                });

                refreshRouteSilenced(router);
            } else if (res.data.error.message) {
                setNotify({ open: true, text: res.data.error.message, type: 'warning' });
            }
        })
    }

    const onStateChange: YouTubeProps['onStateChange'] = (e) => {
        switch (e.target.getPlayerState()) {
            case -1: // unstarted
                setValidVideo(true);
                break;
            case 0: // ended
                setValidVideo(true);
                break;
            case 1: // playing
                setValidVideo(true);
                break;
            case 2: // paused
                setValidVideo(true);
                break;
            case 3: // buffering
                setValidVideo(true);
                break;
        }
    }

    const updateFormData = ({ name, value }: { name: string, value: string | number }) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    useEffect(() => {
        function handleClickOutside(event: any) {
            // @ts-ignore
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setCurrentEditVideo({
                    video: undefined,
                    open: false
                });
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    useEffect(() => {
        setFormData({
            id: currentEditVideo?.video?.id || 0,
            country: currentEditVideo?.video?.country || '',
            place: currentEditVideo?.video?.place || '',
            weather: currentEditVideo?.video?.weather || '',
            seekTo: currentEditVideo?.video?.seekTo || '',
            reason: '',
        })
    }, [currentEditVideo?.video]);
    return (
        <>
            <Notification
                setNotify={setNotify}
                open={notify.open}
                type={notify.type}
                text={notify.text}
            />
            <div
                ref={wrapperRef}
                className={`fixed right-0 top-0 ${currentEditVideo?.open ? 'overflow-auto' : ''} h-screen w-[300px] sm:w-[420px] border-l border-[var(--primary-text-color-hover)] flex shadow-xl`}
                style={{
                    transition: 'all 0.4s ease',
                    zIndex: 1,
                    backgroundColor: 'rgb(72, 72, 72)',
                    transform: currentEditVideo?.open ? 'translate(0)' : 'translate(100%)',
                }}
            >
                <div className='px-3'>
                    <div className='text-center'>
                        <div className="flex justify-start">
                            <button onClick={() => setCurrentEditVideo({ video: undefined, open: false })} className='my-2 px-3 py-1 text-center bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] rounded'>
                                Back
                            </button>
                        </div>
                        <div className='bg-black p-3 w-[395px] h-[226px] justify-center items-center flex rounded-md overflow-hidden'>
                            {!validVideo || !currentEditVideo?.video?.vid && (
                                <div className="custom-loader"></div>
                            )}

                            <YouTube
                                iframeClassName={`w-[395px] h-[226px] ${(!validVideo || !currentEditVideo?.video?.vid) && 'hidden'}`}
                                opts={{
                                    playerVars: {
                                        autoplay: 0
                                    },
                                }}
                                videoId={currentEditVideo?.video?.vid}
                                onStateChange={onStateChange}
                            />

                        </div>
                    </div>

                    <div className="flex justify-between mt-3">
                        <div>
                            <div className='mb-2'>
                                Country
                            </div>
                            <select
                                onChange={(e) => updateFormData({ name: 'country', value: e.target.value })}
                                value={form.country}
                                className={`bg-[#262626] w-[150px] h-[50px] rounded flex text-center justify-center items-center`}
                                required
                            >
                                {countries?.map((country) => (
                                    <option key={country.short_name} value={country.long_name}>{country.long_name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <div className='mb-2'>
                                Place
                            </div>
                            <input
                                id={"place"}
                                onChange={(e) => updateFormData({ name: 'place', value: e.target.value })}
                                value={form.place}
                                className={`bg-[#262626] w-[150px] h-[50px] rounded flex ${currentEditVideo?.video?.place !== form.place ? 'pl-2' : 'text-center'} justify-center items-center`}
                            />
                        </div>
                    </div>

                    <div className="flex justify-between mt-3">
                        <div>
                            <div className='mb-2'>
                                Weather
                            </div>
                            <select
                                onChange={(e) => updateFormData({ name: 'weather', value: e.target.value })}
                                value={form.weather}
                                className={`bg-[#262626] w-[150px] h-[50px] rounded flex pl-2 justify-center items-center`}
                                required
                            >
                                <option value={'weather-normal-morning'}>Normal Morning</option>
                                <option value={'weather-normal-night'}>Normal Night</option>
                                <option value={'weather-rain-'}>Raining</option>
                                <option value={'weather-cloud-morning'}>Cloudy</option>
                                <option value={'weather-snow-'}>Snowing</option>
                            </select>
                        </div>

                        <div>
                            <div className='mb-2'>
                                Seek the video to
                            </div>
                            <div className='flex'>
                                <div
                                    style={{ borderColor: 'rgb(72, 72, 72)' }}
                                    className={`bg-[#262626] w-[75px] h-[50px] rounded-l flex text-center justify-center items-center border-r`}
                                >
                                    Second
                                </div>
                                <input
                                    id={"seekTo"}
                                    style={{ MozAppearance: 'textfield' }}
                                    type='number'
                                    onChange={(e) => updateFormData({ name: 'seekTo', value: e.target.value })}
                                    value={form.seekTo}
                                    className={`bg-[#262626] w-[75px] h-[50px] rounded-r flex text-center justify-center items-center`}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-center mt-4'>
                        <select 
                            onChange={(e) => updateFormData({ name: 'reason', value: e.target.value })}
                            className={`bg-[#262626] ${form.reason == '' && 'text-[#656b78]'} text-center w-full h-[50px] pl-3 rounded flex justify-center items-center`}
                        >
                            <option value={''}>Specify a reason if you are going to reject</option>
                            <option value={"Invalid Video"}>Invalid Video</option>
                            <option value={"Country in the video is not available"}>Country in the video is not available</option>
                            <option value={"It's not a valid walking video"}>It's not a valid walking video</option>
                            <option value={"Invalid place or place doesnt exist"}>Invalid place or place doesnt exist</option>
                            <option value={"Duplicated video"}>Duplicated video</option>
                            <option value={"Video is a spam"}>Video is a spam</option>
                            <option value={"Video must be at least 15min"}>Video must be at least 15min</option>
                        </select>
                    </div>

                    <div className='flex justify-between m-auto font-semibold mt-[20px]'>
                        <button onClick={() => sendAction('accept')} className='px-16 py-6 text-center bg-green-500 hover:bg-green-600 rounded'>
                            ACCEPT
                        </button>
                        <button onClick={() => sendAction('reject')} className='px-16 py-6 text-center bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] rounded'>
                            REJECT
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
};