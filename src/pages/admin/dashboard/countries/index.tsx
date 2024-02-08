import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { executeQueryReturnsJSON } from '@/lib/db';
import { GetServerSideProps } from 'next';
import query from '@/utils/db';
import { ICountryRes } from '@/components/SideBar';
import { IVideosRes } from '@/pages/admin/dashboard/videos';
import Image from 'next/image';

const Layout = dynamic(import('@/components/Layouts/Dashboard'));

export default function countries({ countries, videos }: { countries: ICountryRes[], videos: IVideosRes[] }) {

    const [currentPage, setCurrentPage] = useState(1);
    const countriesPerPage = 7;

    const startIndex = (currentPage - 1) * countriesPerPage;
    const endIndex = currentPage * countriesPerPage;
    const currentCountries = countries?.slice(startIndex, endIndex);
    
    return (
        <Layout title={'Countries'}>
            <div className={'flex justify-end'}>
                <Link href={'/admin/dashboard/countries/new'} className={'bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] p-3 rounded font-bold'}>
                    Add new country
                </Link>
            </div>

            <div className="relative overflow-x-auto mt-3 rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead style={{ backgroundColor: 'hsl(0, 0%, 22%)' }} className="text-xs uppercase text-gray-300">
                        <tr className='rounded'>
                            <th scope="col" className="px-6 py-3">
                                Flag
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Long name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Short name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Border color
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Continent
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Videos
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCountries?.map((country) => (
                            <tr key={country.id} className="border-b bg-[#262626] border-[#383838]">
                                <td className="px-6 py-4">
                                    <Image
                                        alt=''
                                        height={1}
                                        width={20}
                                        src={`/flags/${country.short_name.toLowerCase()}.png`}
                                        className='cursor-none rounded-sm'
                                    />
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-300 whitespace-nowrap">
                                    {country.long_name}
                                </th>
                                <td className="px-6 py-4">
                                    {country.short_name}
                                </td>
                                <td className="px-6 py-4">
                                    <div style={{ backgroundColor: country.border_color }} className='w-4 h-4 rounded-sm'></div>
                                </td>
                                <td className="px-6 py-4">
                                    {country.continent}
                                </td>
                                <td className="px-6 py-4">
                                    {videos.filter((video) => video.country.toLowerCase() === country.long_name.toLowerCase()).length}
                                </td>
                                <td className="px-6 py-4">
                                    <Link
                                        className={'bg-[#d50c2d46] text-center items-center justify-center rounded border border-[var(--primary-text-color)] w-full'}
                                        href={`/admin/dashboard/countries/${country.id}`}
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
                {countries.length >= countriesPerPage && (
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
                            disabled={endIndex >= countries.length}
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
    const allCountries = await executeQueryReturnsJSON({
        query: query.getAllCountries,
        values: []
    }) as ICountryRes[];

    const allVideos = await executeQueryReturnsJSON({
        query: query.getAllVideos,
        values: []
    }) as IVideosRes[];

    return {
        props: {
            countries: allCountries || [],
            videos: allVideos || []
        }
    }
}) satisfies GetServerSideProps<{ countries: ICountryRes[], videos: IVideosRes[] }>