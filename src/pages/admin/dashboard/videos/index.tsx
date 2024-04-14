import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { executeQueryReturnsJSON } from '@/lib/db';
import { GetServerSideProps } from 'next';
import query from '@/utils/db';
import { ICountryRes } from '@/components/SideBar';
import { http as axios } from '@/helpers/http';
import { useRouter } from 'next/router';
import { refreshRouteSilenced } from '@/helpers/routes';

export interface IVideosRes {
    id: number;
    vid: string;
    continent: string;
    country: string;
    place: string;
    weather: string;
    type: string;
    seekTo: number;
    endsat: number;
    latitude: number;
    longitude: number;
    verified: string | number;
    created_on: string;
}

const Layout = dynamic(import('@/components/Layouts/Dashboard')),
    ConfirmationModal = dynamic(import('@/components/Dashboard/ConfirmationModal'));

export default function videos({ videos, countries }: { videos: IVideosRes[], countries: ICountryRes[] }) {
    const router = useRouter()
    const [modal, setModalData] = useState<any>();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [filteredVideos, setFilteredVideos] = useState<IVideosRes[]>([]);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredVideos.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        if (selectedCountry) {
            const filteredData = videos.filter(
                (video) => video.country.toLowerCase() === selectedCountry.toLowerCase()
            );
            setFilteredVideos(filteredData);
            setCurrentPage(1);
        } else {
            setFilteredVideos(videos);
        }
    }, [videos, selectedCountry]);


    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(event.target.value || null);
    };

    const verifyVideo = (id: number, verified: string | number) => {
        setModalData({
            open: true,
            text: `Are you sure you want to ${(verified === 1 || verified === "1") ? "unverify" : (verified === 0 || verified === "0") && "verify"} this video?`,
            type: 'create',
            button: {
                accept: 'Yes, Im sure',
                decline: 'No, cancel'
            },
            onAccept: () => {
                axios.post('/api/admin/videos/verify', {
                    id: id,
                    verify: (verified === 1 || verified === "1") ? 0 : (verified === 0 || verified === "0") && 1
                }).then((res) => {
                    setModalData((prevData: any) => ({ ...prevData, open: false }));
                    refreshRouteSilenced(router);
                });
            },
            onDecline: () => {
                setModalData((prevData: any) => ({ ...prevData, open: false }));
            }
        });
    };

    const deleteVideo = (id: number) => {
        setModalData({
            open: true,
            text: `Are you sure you want to delete this video?`,
            type: 'create',
            button: {
                accept: 'Yes, Im sure',
                decline: 'No, cancel'
            },
            onAccept: () => {
                axios.post('/api/admin/videos/delete', {
                    id: id,
                }).then((res) => {
                    setModalData((prevData: any) => ({ ...prevData, open: false }));
                    refreshRouteSilenced(router)
                });
            },
            onDecline: () => {
                setModalData((prevData: any) => ({ ...prevData, open: false }));
            }
        });
    }
    
    return (
        <Layout title={'Videos'}>
            <ConfirmationModal
                setModalData={setModalData}
                modal={modal}
            />

            <div className={'flex justify-end'}>
                <Link href={'/admin/dashboard/videos/new'} className={'bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] p-3 rounded font-bold'}>
                    Add new video
                </Link> 
            </div>

            <div className="relative overflow-x-auto mt-3 rounded-lg">
                <div className="border-b bg-[#262626] border-[#383838] text-xs uppercase  text-gray-300">
                    <div className='flex justify-between p-3 space-x-2'>
                        <div className='flex justify-start'>
                            <select
                                className='p-2 text-base rounded-lg w-auto bg-[#383838] border border-[#212121]'
                                value={selectedCountry || ''}
                                onChange={handleCountryChange}
                            >
                                <option value={''}>
                                    All countries
                                </option>

                                {countries?.map((country) => (
                                    <option value={country.long_name}>
                                        {country.long_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <select
                            className='p-2 text-base rounded-lg w-auto bg-[#383838] border border-[#212121]'
                            onChange={handleItemsPerPageChange}
                            value={itemsPerPage}
                        >
                            <option value={10}>
                                10
                            </option>
                            <option value={20}>
                                20
                            </option>
                            <option value={30}>
                                30
                            </option>
                            <option value={40}>
                                40
                            </option>
                            <option value={50}>
                                50
                            </option>
                        </select>
                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500">
                    <thead style={{ backgroundColor: 'hsl(0, 0%, 22%)' }} className="text-xs uppercase  text-gray-300">
                        <tr className='rounded'>
                            <th scope="col" className="px-6 py-3">
                                Video
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Continent
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Country
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Place
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Location
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems?.map((video) => (
                            <tr key={video.vid} className="border-b bg-[#262626] border-[#383838]">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-300 whitespace-nowrap">
                                    <a
                                        className='text-red-500 hover:underline'
                                        href={`https://www.youtube.com/watch?v=${video.vid}`}
                                        target='_blank'
                                    >{video.vid}</a>
                                </th>
                                <td className="px-6 py-4">
                                    {video.continent}
                                </td>
                                <td className="px-6 py-4">
                                    {video.country}
                                </td>
                                <td className="px-6 py-4">
                                    {video.place}
                                </td>
                                <td className={`px-6 py-4 ${(video.latitude && video.longitude) ? 'text-green-600' : 'text-red-600'}`}>
                                    {(video.latitude && video.longitude) ? 'Set' : 'Not set'}
                                </td>
                                <td className="px-6 py-4 space-x-2">
                                    <Link
                                        className={'bg-[#d50c2d46] text-center items-center justify-center rounded border border-[var(--primary-text-color)] w-full'}
                                        href={`/admin/dashboard/videos/${video.id}`}
                                    >
                                        <span className={'font-bold text-[var(--primary-text-color)] p-2 w-full'}>
                                            EDIT
                                        </span>
                                    </Link>

                                    <span draggable onClick={(e) => { e.preventDefault(); verifyVideo(video.id, video.verified) }} className={`${video.verified ? 'bg-[#d5450c60] border-[#d5450c]' : 'bg-[#23d50c46] border-[#23d50c]'} text-center items-center justify-center rounded border  w-full cursor-pointer`}>
                                        <span className={`font-bold ${video.verified ? 'text-[#d5450c] ' : 'text-[#23d50c]'}  p-2 w-full`}>
                                            {video.verified ? 'UNVERIFY' : 'VERIFY'}
                                        </span>
                                    </span>

                                    <span draggable onClick={(e) => { e.preventDefault(); deleteVideo(video.id) }} className={`bg-[#d50c0c60] border-[#d50c0c] text-center items-center justify-center rounded border  w-full cursor-pointer`}>
                                        <span className={`font-bold text-[#d50c0c]  p-2 w-full`}>
                                            DELETE
                                        </span>
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredVideos.length >= itemsPerPage && (
                    <div className={'justify-center items-center flex space-x-3 mt-3'}>
                        <button
                            className='p-2 rounded-lg bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] disabled:bg-[#383838]'
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span> Page {currentPage} </span>
                        <button
                            className='p-2 rounded-lg bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] disabled:bg-[#383838]'
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={indexOfLastItem >= filteredVideos.length}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
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