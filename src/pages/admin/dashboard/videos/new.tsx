import React, { useEffect, useState, useRef } from 'react'
import Router, { useRouter } from 'next/router'
import dynamic from 'next/dynamic';
import query from '@/utils/db';
import { executeQueryReturnsJSON } from '@/lib/db';
import { IVideosRes } from '@/pages/admin/dashboard/videos';
import { ICountryRes } from '@/components/SideBar';
import { GetServerSideProps } from 'next';
import { http as axios } from '@/helpers/http';
import YouTube, { YouTubeProps, YouTubePlayer, YouTubeEvent } from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassEnd, faHourglassStart } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@material-tailwind/react';

const Layout = dynamic(import('@/components/Layouts/Dashboard')),
    Notification = dynamic(import('@/components/Dashboard/Notification')),
    ConfirmationModal = dynamic(import('@/components/Dashboard/ConfirmationModal'));

interface IVideo {
    currentVideo: IVideosRes;
    countries: ICountryRes[];
}


interface IFormData {
    vid?: string;
    country?: string;
    place?: string;
    weather?: string;
    type?: string;
    seekTo?: string | number;
    endsat?: string | number;
    verified?: string | number;
    latitude?: number;
    longitude?: number;
}

export default function newVideo({ countries }: IVideo) {
    const router = useRouter();
    const { country, place, weather, type, seekTo, verified }: IFormData = router.query;

    const playerRef = useRef<YouTubePlayer>(null);
    const [createAnOther, setCreateAnOther] = useState(false);
    const [form, setFormData] = useState<IFormData>();
    const [notify, setNotify] = useState<any>();
    const [modal, setModalData] = useState<any>();

    const onReady: YouTubeProps['onReady'] = (e) => {
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
                break;
            /**
             * The requested content cannot be played in 
             * an HTML5 player or another error related 
             * to the HTML5 player has occurred.
             */
            case 5:
                break;
            /**
             * The video requested was not found. 
             * This error occurs when a video has been removed 
             * (for any reason) or has been marked as private.
             */
            case 100:
                break;

            /**
             * The owner of the requested video does not allow it 
             * to be played in embedded players.
             */
            case 101:
                break;
            /**
             * This error is the same as 101. 
             * It's just a 101 error in disguise!
             */
            case 150:
                break;
        }
    }
    
    const onStateChange: YouTubeProps['onStateChange'] = (e) => {
        playerRef.current = e.target;
        switch (e.target.getPlayerState()) {
            case -1: // unstarted
                break;
            case 0: // ended
                break;
            case 1: // playing
                break;
            case 2: // paused
                break;
            case 3: // buffering
                break;
        }
    }

    const setTimerFromVideo = (pos: 'start' | 'end') => {

        if(playerRef.current == null) {
            return setNotify({ open: true, type: 'warning', text: 'Please start the video first!' });
        } else {
            if (playerRef.current.getPlayerState() != 2) { 
                // unstarted
                return setNotify({ open: true, type: 'warning', text: 'Please pause the video first!' });
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

    const onSubmitForm = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
        e.preventDefault();

        if (!form ||
            form.vid === '' ||
            form.country === '' ||
            form.place === '' ||
            form.weather === '' ||
            form.type === '' ||
            form.seekTo === 0 ||

            form.verified == undefined ||
            form.verified == '' ||
            !form.latitude || form.latitude === 0 ||
            !form.longitude || form.longitude === 0
        ) return setNotify({ open: true, type: 'warning', text: 'All fields are required, rejecting!' });;

        setModalData({
            open: true,
            text: 'Are you sure you want to create this video?',
            type: 'create',
            button: {
                accept: 'Yes, Im sure',
                decline: 'No, cancel'
            },
            onAccept: () => {
                axios.post('/api/admin/videos/new', {
                    vid: form.vid,
                    country: form.country,
                    place: form.place,
                    weather: form.weather,
                    type: form.type,
                    continent: countries.filter((country) => country.long_name.toLowerCase() === form.country?.toLowerCase())[0].continent,
                    seekTo: form.seekTo,
                    verified: form.verified,
                    latitude: form.latitude,
                    longitude: form.longitude
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
                                    pathname: '/admin/dashboard/videos/' + res.data.video.id,
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
            'vid': '',
            'country': country || '',
            'place': place || '',
            'weather': weather || '',
            'type': type || '',
            'seekTo': seekTo || '',
            'verified': verified || 0,
            'latitude': 0,
            'longitude': 0
        });
    }, []);

    return (
        <Layout title={`New Video`}>
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
                                <div className={'flex justify-between space-x-2'}>
                                    <div className={'w-[50%]'}>
                                        <div className='space-y-2'>
                                            <div>
                                                <label className={'font-semibold'} htmlFor="vid">Video id or link:</label>
                                            </div>
                                            <input
                                                type="text"
                                                onChange={(e) => updateFormData({ name: 'vid', value: e.target.value })}
                                                defaultValue={form.vid}
                                                className='p-2 rounded bg-[#262626] text-white w-full'
                                                id='vid'
                                                required
                                            />
                                        </div>

                                        <div className="flex justify-between space-x-2">
                                            <div className='space-y-2 '>
                                                <div>
                                                    <label className={'font-semibold'} htmlFor="seekto">Start at:</label>
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

                                            <div className='space-y-2 '>
                                                <div>
                                                    <label className={'font-semibold'} htmlFor="endsat">Ends at:</label>
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
                                        </div>

                                        <div className='space-y-2'>
                                            <div>
                                                <label className={'font-semibold'} htmlFor="place">Place:</label>
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
                                
                                        <div className='space-y-2'>
                                            <div>
                                                <label className={'font-semibold'} htmlFor="country">Select a country:</label>
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
                                    </div>

                                    {/* Youtube Iframe */}
                                    <div className={'w-[50%] pt-[10px] overflow-hidden rounded-lg'}>
                                        {form.vid == '' && (
                                            <div className={'w-full rounded-lg h-[288px] bg-black flex justify-center items-center'}>
                                                <div className="custom-loader"></div>
                                            </div>
                                        )}
                                        <YouTube
                                            iframeClassName={`w-full rounded-lg h-[288px] ${form.vid == '' && 'hidden'}`}
                                            opts={{
                                                playerVars: {
                                                    autoplay: 0
                                                },
                                            }}
                                            onReady={onReady}
                                            onError={onError}
                                            onStateChange={onStateChange}
                                            videoId={form.vid}
                                        />
                                    </div>
                                </div>

                                <div className='space-y-2'>
                                    <div>
                                        <label className={'font-semibold'} htmlFor="weather">Weather:</label>
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

                                <div className='space-y-2'>
                                    <div>
                                        <label className={'font-semibold'} htmlFor="verified">Verified:</label>
                                    </div>
                                    <select
                                        id="verified"
                                        onChange={(e) => updateFormData({ name: 'verified', value: e.target.value })}
                                        value={form.verified}
                                        className="p-2 bg-[#262626] text-white rounded w-full"
                                        required
                                    >
                                        <option value={0}>No</option>
                                        <option value={1}>Yes</option>
                                    </select>
                                </div>

                                <div className={'flex justify-between space-x-3'}>
                                    <div className='space-y-2 w-full'>
                                        <div>
                                            <label className={'font-semibold'} htmlFor="latitude">Latitude:</label>
                                        </div>
                                        <input
                                            type="number"
                                            onChange={(e) => updateFormData({ name: 'latitude', value: e.target.value })}
                                            className='p-2 rounded bg-[#262626] text-white w-full'
                                            defaultValue={form.place}
                                            id='latitude'
                                            required
                                        />
                                    </div>
                                    <div className='space-y-2 w-full'>
                                        <div>
                                            <label className={'font-semibold'} htmlFor="longitude">Longitude:</label>
                                        </div>
                                        <input
                                            type="number"
                                            onChange={(e) => updateFormData({ name: 'longitude', value: e.target.value })}
                                            className='p-2 rounded bg-[#262626] text-white w-full'
                                            defaultValue={form.place}
                                            id='longitude'
                                            required
                                        />
                                    </div>
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
    const countries = await executeQueryReturnsJSON({
        query: query.getAllCountries,
        values: [],
    }) as ICountryRes[];


    return {
        props: {
            countries: countries || [],
        }
    }
}) satisfies GetServerSideProps<{ countries: ICountryRes[] }>