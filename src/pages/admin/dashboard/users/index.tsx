import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { executeQueryReturnsJSON } from '@/lib/db';
import { GetServerSideProps } from 'next';
import query from '@/utils/db';

export interface IUserReturns {
    id: number;
    username: string;
    email: string;
    role: string | number;
    roleName?: string;
    created_at: string;
}

export interface IRoleReturns {
    id: number;
    name: string;
}

interface IUsers {
    users: IUserReturns[]
}

const //DarkMode = dynamic(import('@/components/Dashboard/darkMode')),
    Layout = dynamic(import('@/components/Layouts/Dashboard'));

export default function users({ users }: IUsers) {
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 7;

    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = currentPage * usersPerPage;
    const currentUsers = users?.slice(startIndex, endIndex);

    return (
        <Layout title={'Users'}>
            <div className={'flex justify-end'}>
                <Link href={'/admin/dashboard/users/new'} className={'bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] p-3 rounded font-bold'}>
                    Add new user
                </Link>
            </div>

            <div className="relative overflow-x-auto mt-3 rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead style={{ backgroundColor: 'hsl(0, 0%, 22%)'}} className="text-xs uppercase text-gray-300">
                        <tr className='rounded'>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                UserName
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Role
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers?.map((user) => (
                            <tr key={user.id} className="border-b bg-[#262626] border-[#383838]">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-300 whitespace-nowrap">
                                    {user.email}
                                </th>
                                <td className="px-6 py-4">
                                    {user.id}
                                </td>
                                <td className="px-6 py-4">
                                    {user.username}
                                </td>
                                <td className="px-6 py-4">
                                    {user.roleName}
                                </td>
                                <td className="px-6 py-4">
                                <Link
                                        className={'bg-[#d50c2d46] text-center items-center justify-center rounded border border-[var(--primary-text-color)] w-full'}
                                        href={`/admin/dashboard/users/${user.id}`}
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
                {users.length >= usersPerPage && (
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
                            disabled={endIndex >= users.length}
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
    const users = await executeQueryReturnsJSON({
        query: query.getAllUsers,
        values: [],
    }) as IUserReturns[];

    const updateUsersPromises: Promise<IUserReturns>[] = users.map(async (user: IUserReturns) => {
        const role = await executeQueryReturnsJSON({
            query: query.getRoleByID,
            values: [user.role],
        }) as IRoleReturns[];

        if(role[0]?.name) {
            const updatedUser = { ...user, roleName: role[0].name };
            return updatedUser;
        } else {
            const updatedUser = { ...user, roleName: 'Unreceived Role' };
            return updatedUser;
        }
    });

    const updateUsers: IUserReturns[] = await Promise.all(updateUsersPromises);

    return {
        props: {
            users: updateUsers
        }
    }
}) satisfies GetServerSideProps<{ users: IUserReturns[] }>