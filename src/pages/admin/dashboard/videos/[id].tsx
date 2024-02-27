import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import dynamic from 'next/dynamic';
import query from '@/utils/db';
import { executeQueryReturnsJSON } from '@/lib/db';
import { IVideosRes } from '@/pages/admin/dashboard/videos';
import { ICountryRes } from '@/components/SideBar';
import { GetServerSideProps } from 'next';
import { INotificationType } from '@/components/Dashboard/Notification';
import axios from 'axios';

const Layout = dynamic(import('@/components/Layouts/Dashboard')),
    Notification = dynamic(import('@/components/Dashboard/Notification'));

interface IVideo {
    currentVideo: IVideosRes;
    countries: ICountryRes[];
}

interface IContinentsRes {
    id: number;
    continent_color: string;
    continent_icon: string;
    continent_name: string;
}

interface IFormData {
    vid?: string;
    country?: string;
    place?: string;
    weather?: string;
    type?: string;
    seekTo?: string | number;
    verified?: string | number;
}

export default function editVideo({ currentVideo, countries }: IVideo) {
    const router = useRouter();
    const videoID = router.query.id;

    const [video, setVideo] = useState<IVideosRes>(currentVideo);
    const [form, setFormData] = useState<IFormData>();
    const [notify, setNotify] = useState<INotificationType>({
        open: false,
        type: 'info',
        text: 'Simple'
    });

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
            form.verified === ''
        ) return setNotify({ open: true, type: 'warning', text: 'All fields are required, rejecting!' });;

        // Check if the user did actually changed something in the data
        if (form.vid == video.vid &&
            form.country == video.country &&
            form.place == video.place &&
            form.weather == video.weather &&
            form.type == video.type &&
            form.seekTo == video.seekTo &&
            form.verified == video.verified
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
            verified: form.verified,
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
            'verified': video.verified
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
                                <div className='space-y-2'>
                                    <div>
                                        <label className={'font-semibold'} htmlFor="seekto">Seek the video to:</label>
                                    </div>
                                    <input
                                        type="number"
                                        onChange={(e) => updateFormData({ name: 'seekTo', value: e.target.valueAsNumber })}
                                        defaultValue={form.seekTo}
                                        className='p-2 rounded bg-[#262626] text-white w-full'
                                        id='seekto'
                                        min={1}
                                        required
                                    />
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