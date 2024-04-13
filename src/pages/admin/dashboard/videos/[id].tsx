import React, { useEffect, useRef, useState } from 'react'
import Router, { useRouter } from 'next/router'
import dynamic from 'next/dynamic';
import query from '@/utils/db';
import { executeQueryReturnsJSON } from '@/lib/db';
import { IVideosRes } from '@/pages/admin/dashboard/videos';
import { ICountryRes } from '@/components/SideBar';
import { GetServerSideProps } from 'next';
import { INotificationType } from '@/components/Dashboard/Notification';
import axios from 'axios';
import YouTube, { YouTubeProps, YouTubePlayer, YouTubeEvent } from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassEnd, faHourglassStart } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@material-tailwind/react';

const Layout = dynamic(import('@/components/Layouts/Dashboard')),
    Notification = dynamic(import('@/components/Dashboard/Notification'));

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

export default function editVideo({ currentVideo, countries }: IVideo) {
    const router = useRouter();
    const videoID = router.query.id;

    const playerRef = useRef<YouTubePlayer>(null);
    const [video, setVideo] = useState<IVideosRes>(currentVideo);
    const [form, setFormData] = useState<IFormData>();
    const [notify, setNotify] = useState<INotificationType>({open:false,type:'info',text:'Simple'});

    const onReady: YouTubeProps['onReady'] = (e) => {}

    const onError: YouTubeProps['onError'] = (e) => {}
    
    const onStateChange: YouTubeProps['onStateChange'] = (e) => {
        playerRef.current = e.target;

        /*switch (e.target.getPlayerState()) {
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
        }*/
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
            form.verified === undefined ||
            form.verified === '' ||
            !form.latitude || form.latitude === 0 ||
            !form.longitude || form.longitude === 0 ||
            !form.endsat || form.endsat === 0
        ) return setNotify({ open: true, type: 'warning', text: 'All fields are required, rejecting!' });

        // Check if the user did actually changed something in the form
        if (form.vid == video.vid &&
            form.country == video.country &&
            form.place == video.place &&
            form.weather == video.weather &&
            form.type == video.type &&
            form.seekTo == video.seekTo &&
            form.verified == video.verified && 
            form.latitude == video.latitude &&
            form.longitude == video.longitude &&
            form.endsat == video.endsat
        ) {
            return setNotify({ open: true, type: 'warning', text: 'No data has been edited, rejecting!' });
        }

        axios.post('/api/admin/videos/edit', {
            id: videoID,
            vid: form.vid,
            country: form.country,
            place: form.place,
            weather: form.weather,
            type: form.type,
            continent: countries.filter((country) => country.long_name.toLowerCase() === form.country?.toLowerCase())[0].continent,
            seekTo: form.seekTo,
            endsat: form.endsat,
            verified: form.verified,
            latitude: form.latitude,
            longitude: form.longitude
        }).then((res) => {
            if (res.data.success) {
                setNotify({ open: true, type: 'success', text: res.data.message });

                // Ignore form type, this is valid because we already doing a check for form fields up
                setVideo((prevData) => ({ ...form as any, id: prevData.id, created_on: prevData.created_on }));

            } else if (res.data.error?.message) {
                setNotify({ open: true, type: 'warning', text: res.data.error.message });
            }
        })
    }

    const updateFormData = ({ name, value }: { name: string, value: string | number }) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    const cloneVideo = () => {
        if (form) {
            router.push({
                pathname: '/admin/dashboard/videos/new',
                query: {
                    'country': form.country,
                    'place': form.place,
                    'weather': form.weather,
                    'type': form.type,
                    'seekTo': form.seekTo,
                    'verified': form.verified
                },
            });
        }
    };

    useEffect(() => {
        setFormData({
            'vid': video.vid,
            'country': video.country,
            'place': video.place,
            'weather': video.weather,
            'type': video.type,
            'seekTo': video.seekTo,
            'verified': video.verified,
            'latitude': video.latitude,
            'longitude': video.longitude,
            'endsat': video.endsat
        });
    }, [])

    return (
        <Layout title={`Video - ${videoID}`}>
            {form && (
                <>
                    <Notification
                        setNotify={setNotify}
                        open={notify.open}
                        type={notify.type}
                        text={notify.text}
                        duration={notify.duration}
                    />
                    <div className={'flex justify-between'}>
                        <button onClick={() => Router.back()} className={'bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] p-3 rounded font-bold'}>
                            Back
                        </button>

                        <button onClick={cloneVideo} className={'bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] p-3 rounded font-bold'}>
                            Clone Video
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
                                                defaultValue={form.place}
                                                className='p-2 rounded bg-[#262626] text-white w-full'
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
                                            type="text"
                                            onChange={(e) => updateFormData({ name: 'latitude', value: e.target.value })}
                                            className='p-2 rounded bg-[#262626] text-white w-full'
                                            defaultValue={form.latitude}
                                            id='latitude'
                                            required
                                        />
                                    </div>                                
                                    <div className='space-y-2 w-full'>
                                        <div>
                                            <label className={'font-semibold'} htmlFor="longitude">Longitude:</label>
                                        </div>
                                        <input
                                            type="text" 
                                            onChange={(e) => updateFormData({ name: 'longitude', value: e.target.value })}
                                            className='p-2 rounded bg-[#262626] text-white w-full'
                                            defaultValue={form.longitude}
                                            id='longitude'
                                            required
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
                </>
            )}
        </Layout>
    )
}

export const getServerSideProps = (async (context) => {
    const { id } = context.query;

    const video = await executeQueryReturnsJSON({
        query: query.getVideoById,
        values: [id],
    }) as IVideosRes[];

    const countries = await executeQueryReturnsJSON({
        query: query.getAllCountries,
        values: [],
    }) as ICountryRes[];

    if (video.length <= 0) {
        return {
            redirect: {
                destination: '/admin/dashboard/videos',
                permanent: false,
            },
        };
    }

    return {
        props: {
            countries: countries || [],
            currentVideo: video[0] || {},
        }
    }
}) satisfies GetServerSideProps<{ currentVideo: IVideosRes, countries: ICountryRes[] }>