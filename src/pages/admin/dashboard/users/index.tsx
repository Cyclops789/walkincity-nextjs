import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { executeQueryReturnsJSON } from '@/lib/db';
import { GetServerSideProps } from 'next';
import query from '@/utils/db';
import { useEffect } from 'react';
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

const Layout = dynamic(import('@/components/Layouts/Dashboard'));

export default function users({ users, roles }: { users: IUserReturns[], roles: IRoleReturns[] }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectedRole, setSelectedRole] = useState<number | null>(null);
    const [filteredUsers, setFilteredUsers] = useState<IUserReturns[]>([]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        if (selectedRole) {
            const filteredData = users.filter(
                (user) => user.role === selectedRole
            );
            setFilteredUsers(filteredData);
            setCurrentPage(1);
        } else {
            setFilteredUsers(users);
        }
    }, [users, selectedRole]);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRole(Number(event.target.value) || null);
    };

    return (
        <Layout title={'Users'}>
            <div className={'flex justify-end'}>
                <Link href={'/admin/dashboard/users/new'} className={'bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] p-3 rounded font-bold'}>
                    Add new user
                </Link>
            </div>

            <div className="relative overflow-x-auto mt-3 rounded-lg">
                <div className="border-b bg-[#262626] border-[#383838] text-xs uppercase  text-gray-300">
                    <div className='flex justify-between p-3 space-x-2'>
                        <div className='flex justify-start'>
                            <select
                                className='p-2 text-base rounded-lg w-auto bg-[#383838] border border-[#212121]'
                                value={selectedRole || 0}
                                onChange={handleRoleChange}
                            >
                                <option value={0}>
                                    All roles
                                </option>

                                {roles?.map((role) => (
                                    <option value={role.id}>
                                        {role.name}
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
                        {currentItems?.map((user) => (
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
                {filteredUsers.length >= itemsPerPage && (
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
                            disabled={indexOfLastItem >= filteredUsers.length}
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

    
    const roles = await executeQueryReturnsJSON({
        query: query.getAllRoles,
        values: [],
    }) as IRoleReturns[];

    const updateUsersPromises: Promise<IUserReturns>[] = users.map(async (user: IUserReturns) => {
        const role = await executeQueryReturnsJSON({
            query: query.getRoleByID,
            values: [user.role],
        }) as IRoleReturns[];

        if (role[0]?.name) {
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
            users: updateUsers,
            roles: roles
        }
    }
}) satisfies GetServerSideProps<{ users: IUserReturns[], roles: IRoleReturns[] }>