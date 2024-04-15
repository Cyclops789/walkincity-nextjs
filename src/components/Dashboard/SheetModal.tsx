import { useEffect, useState, useRef } from 'react'
import React from 'react'
import { CurrentEditVideo } from '@/pages/admin/dashboard/requests';
import YouTube, { YouTubeProps, YouTubePlayer } from 'react-youtube';
import { ICountryRes } from '../SideBar';
import { http as axios } from '@/helpers/http';
import dynamic from 'next/dynamic';
import { INotificationType } from '../Notification';
import { refreshRouteSilenced } from '@/helpers/routes';
import { useRouter } from 'next/router';
import useClickOutside from './useClickOutside';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faHourglassStart, faHourglassEnd, faArrowTurnDown, faArrowTurnUp } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@material-tailwind/react';

const Notification = dynamic(import('@/components/Dashboard/Notification'));

export default function SheetModal({
    setCurrentEditVideo,
    currentEditVideo,
    countries,
    checkButtonRef
}: {
    setCurrentEditVideo: React.Dispatch<React.SetStateAction<CurrentEditVideo | null | undefined>>,
    currentEditVideo: CurrentEditVideo | null | undefined,
    countries: ICountryRes[],
    checkButtonRef: React.MutableRefObject<null>
}) {
    const router = useRouter();
    const playerRef = useRef<YouTubePlayer>(null);
    const wrapperRef = useRef(null);
    const [notify, setNotify] = useState<INotificationType>({ open: false, type: 'info', text: 'Simple' });
    const [validVideo, setValidVideo] = useState(false);
    const [form, setFormData] = useState({ id: 0, country: '', place: '', weather: '', seekTo: '', reason: '', endsat: '' });

    const sendAction = (action: 'accept' | 'reject') => {
        if (!form ||
            form.country == '' ||
            form.place == '' ||
            form.seekTo == '' ||
            form.seekTo == undefined ||
            form.endsat == '' ||
            form.endsat == undefined ||
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
            endsat: form.endsat,
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
        playerRef.current = e.target;

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

    const setTimerFromVideo = (pos: 'start' | 'end') => {
        if(playerRef.current == null) {
            return setNotify({ open: true, type: 'warning', text: 'Please enable the video first!' });
        } else {
            if (playerRef.current.getPlayerState() != 1 && playerRef.current.getPlayerState() != 2) { 
                // unstarted
                return setNotify({ open: true, type: 'warning', text: 'Please start the video first!' });
            }

            const currentTime = parseInt(playerRef.current.getCurrentTime());

            if(pos == 'start') {
                updateFormData({ name: 'seekTo', value: currentTime });
            }

            if(pos == 'end') {
                updateFormData({ name: 'endsat', value: currentTime });
            }
        }
    }

    const videoJumpTo = (seconds: string) => {
        const sec = parseInt(seconds);

        playerRef.current.seekTo(sec, false);
    }

    const updateFormData = ({ name, value }: { name: string, value: string | number }) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }



    useEffect(() => {
        setFormData({
            id: currentEditVideo?.video?.id || 0,
            country: currentEditVideo?.video?.country || '',
            place: currentEditVideo?.video?.place || '',
            weather: currentEditVideo?.video?.weather || '',
            seekTo: currentEditVideo?.video?.seekTo || '',
            endsat: currentEditVideo?.video?.endsat || '',
            reason: '',
        })
    }, [currentEditVideo?.video]);

    useClickOutside(wrapperRef, () => setCurrentEditVideo({ video: undefined, open: false }), checkButtonRef);

    return (
        <>
            <Notification
                setNotify={setNotify}
                open={notify.open}
                type={notify.type}
                text={notify.text}
            />

            <div
                style={{
                    zIndex: 100
                }}
                className={`${currentEditVideo?.open ? 'fixed' : 'hidden'} inset-0 flex justify-center items-center w-full h-full bg-black bg-opacity-50`}
            >
                <div  className={"relative p-4 w-full max-w-md max-h-full"}>
                    <div ref={wrapperRef} className={"relative rounded-lg shadow bg-[rgb(56,56,56)]"}>
                        <button
                            onClick={() => setCurrentEditVideo({ video: undefined, open: false })}
                            className={"absolute top-3 end-2.5 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"}
                        >
                            <FontAwesomeIcon className={"w-3 h-3"} icon={faX} />
                        </button>
                        <div className={"p-3"}>
                            <div className='pt-[40px] pb-4 space-y-2'>
                                <div className='bg-black sm:w-[395px] sm:h-[226px] justify-center items-center flex rounded-md overflow-hidden'>
                                    {!currentEditVideo?.video?.vid && (
                                        <div className="custom-loader"></div>
                                    )}

                                    <YouTube
                                        iframeClassName={`sm:w-[395px] sm:h-[226px] ${(!validVideo || !currentEditVideo?.video?.vid) && 'hidden'}`}
                                        videoId={currentEditVideo?.video?.vid}
                                        onStateChange={onStateChange}
                                    />
                                </div>

                                {/* Weather */}
                                <div className='space-y-2'>
                                    <div>
                                        <label className={'font-semibold'} htmlFor="weather">Weather</label>
                                    </div>
                                    <select
                                        id="weather"
                                        onChange={(e) => updateFormData({ name: 'weather', value: e.target.value })}
                                        value={form.weather}
                                        className="p-2 bg-[#262626] text-white rounded w-full"
                                        required
                                    >
                                        <option value={'weather-normal-morning'}>Normal Morning</option>
                                        <option value={'weather-normal-night'}>Normal Night</option>
                                        <option value={'weather-rain-'}>Raining</option>
                                        <option value={'weather-cloud-morning'}>Cloudy</option>
                                        <option value={'weather-snow-'}>Snowing</option>
                                    </select>
                                </div>

                                {/* Country */}
                                <div className='space-y-2'>
                                    <div>
                                        <label className={'font-semibold'} htmlFor="country">Country</label>
                                    </div>
                                    <select
                                        id="country"
                                        onChange={(e) => updateFormData({ name: 'country', value: e.target.value })}
                                        value={form.country}
                                        className="p-2 bg-[#262626] text-white rounded w-full"
                                        required
                                    >
                                        {countries?.map((country) => (
                                            <option key={country.short_name} value={country.long_name}>{country.long_name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Place */}
                                <div className='space-y-2'>
                                    <div>
                                        <label className={'font-semibold'} htmlFor="place">Place</label>
                                    </div>
                                    <input
                                        type="text"
                                        onChange={(e) => updateFormData({ name: 'place', value: e.target.value })}
                                        className='p-2 rounded bg-[#262626] text-white w-full'
                                        defaultValue={form.place}
                                        id='place'
                                        required
                                    />
                                </div>

                                {/* Starts / Ends */}
                                <div className="flex justify-between space-x-2">
                                    <div className='space-y-2 '>
                                        <div>
                                            <label className={'font-semibold'} htmlFor="seekto">Start at</label>
                                        </div>
                                        <input
                                            type="number"
                                            onChange={(e) => updateFormData({ name: 'seekTo', value: e.target.valueAsNumber })}
                                            value={form.seekTo}
                                            className='p-2 rounded bg-[#262626] text-white w-full'
                                            id='seekto'
                                            min={1}
                                            required
                                        />
                                    </div>

                                    <div className='space-y-2 mt-auto'>
                                        <Tooltip content="Set the start time from the video" placement="top">
                                            <button onClick={() => setTimerFromVideo('start')} type='button' className='py-[8px] px-5 text-center bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] rounded'>
                                                <FontAwesomeIcon icon={faHourglassStart} />
                                            </button>
                                        </Tooltip>
                                    </div>
                                    <div className='space-y-2 mt-auto'>
                                        <Tooltip content="Jump to this part of the video" placement="top">
                                            <button onClick={() => videoJumpTo(form.seekTo)} type='button' className='py-[8px] px-5 text-center bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] rounded'>
                                                <FontAwesomeIcon icon={faArrowTurnUp} />
                                            </button>
                                        </Tooltip>
                                    </div>

                                    <div className='space-y-2 '>
                                        <div>
                                            <label className={'font-semibold'} htmlFor="endsat">Ends at</label>
                                        </div>
                                        <input
                                            type="number"
                                            onChange={(e) => updateFormData({ name: 'endsat', value: e.target.valueAsNumber })}
                                            value={form.endsat}
                                            className='p-2 rounded bg-[#262626] text-white w-full'
                                            id='endsat'
                                            min={1}
                                            required
                                        />
                                    </div>
                                    <div className='space-y-2 mt-auto'>
                                        <Tooltip content="Set the end time from the video" placement="top">
                                            <button onClick={() => setTimerFromVideo('end')} type='button' className='py-[8px] px-5 text-center bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] rounded'>
                                                <FontAwesomeIcon icon={faHourglassEnd} />
                                            </button>
                                        </Tooltip>
                                    </div>
                                    <div className='space-y-2 mt-auto'>
                                        <Tooltip content="Jump to this part of the video" placement="top">
                                            <button onClick={() => videoJumpTo(form.endsat)} type='button' className='py-[8px] px-5 text-center bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] rounded'>
                                                <FontAwesomeIcon icon={faArrowTurnDown} />
                                            </button>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>

                            <div className={'flex justify-center'}>
                                <button onClick={() => sendAction('accept')} className={`text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2`}>
                                    Accept
                                </button>
                                <button onClick={() => sendAction('reject')} className={"text-white bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] rounded-lg text-sm font-medium px-5 py-2.5"}>
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};