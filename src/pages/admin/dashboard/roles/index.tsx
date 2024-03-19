import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { executeQueryReturnsJSON } from '@/lib/db';
import { GetServerSideProps } from 'next';
import permissions from '@/helpers/permissions';
import query from '@/utils/db';

export interface IRoleReturns {
    id: number;
    name: string;
    permissions: string;
}

export interface IPermissionsReturns {
    id: number;
    name: string;
}

const Layout = dynamic(import('@/components/Layouts/Dashboard'));

export default function roles({ roles }: { roles: IRoleReturns[], permissions: IPermissionsReturns[] }) {
    const [currentPage, setCurrentPage] = useState(1);
    const rolesPerPage = 7;

    const startIndex = (currentPage - 1) * rolesPerPage;
    const endIndex = currentPage * rolesPerPage;
    const currentRoles = roles?.slice(startIndex, endIndex);

    return (
        <Layout title={'Roles'}>
            <div className={'flex justify-end'}>
                <Link href={'/admin/dashboard/roles/new'} className={'bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] p-3 rounded font-bold'}>
                    Add new role
                </Link>
            </div>

            <div className="relative overflow-x-auto mt-3 rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead style={{ backgroundColor: 'hsl(0, 0%, 22%)'}} className="text-xs uppercase text-gray-300">
                        <tr className='rounded'>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Permissions
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRoles?.map((role) => (
                            <tr key={role.id} className="border-b bg-[#262626] border-[#383838]">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-300 whitespace-nowrap">
                                    {role.id}
                                </th>
                                <td className="px-6 py-4">
                                    {role.name}
                                </td>
                                <td className="px-6 py-4 text-[#d50c2dcb] font-bold">
                                    {JSON.parse(role.permissions).length}
                                </td>
                                <td className="px-6 py-4">
                                <Link
                                        className={'bg-[#d50c2d46] text-center items-center justify-center rounded border border-[var(--primary-text-color)] w-full'}
                                        href={`/admin/dashboard/roles/${role.id}`}
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
                {roles.length >= rolesPerPage && (
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
                            disabled={endIndex >= roles.length}
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
    const roles = await executeQueryReturnsJSON({
        query: query.getAllRoles,
        values: [],
    }) as IRoleReturns[];

    return {
        props: {
            roles: roles || [],
            permissions: permissions || []
        }
    }
}) satisfies GetServerSideProps<{ roles: IRoleReturns[], permissions: IPermissionsReturns[] }>