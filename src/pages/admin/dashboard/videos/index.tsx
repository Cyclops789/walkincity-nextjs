import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { executeQueryReturnsJSON } from '@/lib/db';
import { GetServerSideProps } from 'next';
import query from '@/utils/db';

export interface IVideosRes {
    id: number;
    vid: string;
    continent: string;
    country: string;
    place: string;
    weather: string;
    type: string;
    seekTo: number;
    verified: string | number;
    created_on: string;
}

interface IVideos {
    videos: IVideosRes[]
}

const //DarkMode = dynamic(import('@/components/Dashboard/darkMode')),
    Layout = dynamic(import('@/components/Layouts/Dashboard'));

export default function videos({ videos }: IVideos) {
    const [currentPage, setCurrentPage] = useState(1);
    const videosPerPage = 7;

    const startIndex = (currentPage - 1) * videosPerPage;
    const endIndex = currentPage * videosPerPage;
    const currentVideos = videos?.slice(startIndex, endIndex);

    return (
        <Layout title={'Videos'}>
            <div className={'flex justify-end'}>
                <Link href={'/admin/dashboard/videos/new'} className={'bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] p-3 rounded font-bold'}>
                    Add new video
                </Link>
            </div>

            <div className="relative overflow-x-auto mt-3 rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead style={{ backgroundColor: 'hsl(0, 0%, 22%)'}} className="text-xs uppercase  text-gray-300">
                        <tr className='rounded'>
                            <th scope="col" className="px-6 py-3">
                                Video ID
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
                                Verified
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentVideos?.map((video) => (
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
                                <td className="px-6 py-4">
                                    {video.verified === 1 ? ('Yes') : video.verified === 0 && ('No')}
                                </td>
                                <td className="px-6 py-4">
                                    <Link
                                        className={'bg-[#d50c2d46] text-center items-center justify-center rounded border border-[var(--primary-text-color)] w-full'}
                                        href={`/admin/dashboard/videos/${video.id}`}
                                    >
                                        <span className={'font-bold text-[var(--primary-text-color)] p-2 w-full'}>
                                            Edit
                                        </span>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {videos.length >= videosPerPage && (
                    <div className={'justify-center items-center flex space-x-3 mt-3'}>
                        <button
                            className='p-2 rounded-lg bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] disabled:bg-[#383838]'
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span> Page {currentPage} </span>
                        <button
                            className='p-2 rounded-lg bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] disabled:bg-[#383838]'
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={endIndex >= videos.length}
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



    return {
        props: {
            videos: videos
        }
    }
}) satisfies GetServerSideProps<{ videos: IVideosRes[] }>