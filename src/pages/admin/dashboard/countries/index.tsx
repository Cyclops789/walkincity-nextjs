import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { executeQueryReturnsJSON } from '@/lib/db';
import { GetServerSideProps } from 'next';
import query from '@/utils/db';
import { ICountryRes } from '@/components/SideBar';
import { IVideosRes } from '@/pages/admin/dashboard/videos';
import Image from 'next/image';
import { IContinentsRes } from './new';

const Layout = dynamic(import('@/components/Layouts/Dashboard'));

export default function countries({ countries, videos, continents }: { countries: ICountryRes[], videos: IVideosRes[], continents: IContinentsRes[] }) {

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectedContinent, setSelectedContinent] = useState<string | null>(null);
    const [filteredCountries, setFilteredCountries] = useState<ICountryRes[]>([]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCountries.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        if (selectedContinent) {
            const filteredData = countries.filter(
                (video) => video.continent.toLowerCase() === selectedContinent.toLowerCase()
            );
            setFilteredCountries(filteredData);
            setCurrentPage(1);
        } else {
            setFilteredCountries(countries);
        }
    }, [videos, selectedContinent]);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const handleCountinentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedContinent(event.target.value || null);
    };
    
    return (
        <Layout title={'Countries'}>
            <div className={'flex justify-end'}>
                <Link href={'/admin/dashboard/countries/new'} className={'bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] p-3 rounded font-bold'}>
                    Add new country
                </Link>
            </div>

            <div className="relative overflow-x-auto mt-3 rounded-lg">
            <div className="border-b bg-[#262626] border-[#383838] text-xs uppercase  text-gray-300">
                    <div className='flex justify-between p-3 space-x-2'>
                        <div className='flex justify-start'>
                            <select
                                className='p-2 text-base rounded-lg w-auto bg-[#383838] border border-[#212121]'
                                value={selectedContinent || ''}
                                onChange={handleCountinentChange}
                            >
                                <option value={''}>
                                    All continents
                                </option>

                                {continents?.map((continent) => (
                                    <option value={continent.continent_name}>
                                        {continent.continent_name}
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
                        {currentItems?.map((country) => (
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
                {filteredCountries.length >= itemsPerPage && (
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
                            disabled={indexOfLastItem >= filteredCountries.length}
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
    const countries = await executeQueryReturnsJSON({
        query: query.getAllCountries,
        values: []
    }) as ICountryRes[];

    const videos = await executeQueryReturnsJSON({
        query: query.getAllVideos,
        values: []
    }) as IVideosRes[];

    const continents = await executeQueryReturnsJSON({
        query: query.getAllContinents,
        values: []
    }) as IContinentsRes[];

    return {
        props: {
            countries: countries || [],
            videos: videos || [],
            continents: continents || []
        }
    }
}) satisfies GetServerSideProps<{ countries: ICountryRes[], videos: IVideosRes[], continents: IContinentsRes[] }>