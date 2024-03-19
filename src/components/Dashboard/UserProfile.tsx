import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faChartLine, faUser } from '@fortawesome/free-solid-svg-icons';
import { IUserWithoutPassword } from '../Layouts/Dashboard';
import { signOut } from 'next-auth/react';
import { useUserStore } from '@/store/userStore';
import Link from 'next/link';

function UserProfile({ open, user }: { open: boolean, user: IUserWithoutPassword }) {
    const [show, setShow] = useState(false);
    const { removeUser } = useUserStore();

    useEffect(() => {
        if (open) {
            setShow(true);
        } else if (!open) {
            setShow(false);
        }
    }, [open])

    return (
        <div
            style={{ zIndex: 999 }}
            className={`${!show ? 'hidden' : 'absolute'} right-2 top-[55px] text-white h-auto w-[200px] bg-[#626060] rounded overflow-hidden`}
        >
            <div className='p-1 space-y-1 text-sm'>
            <div className='rounded cursor-pointer hover:bg-[#858484]'>
                    <Link href={'/admin/dashboard'}>
                        <div className={'p-2'}>
                            <FontAwesomeIcon icon={faChartLine} /> Dashboard
                        </div>
                    </Link>
                </div>
                <div className='rounded cursor-pointer hover:bg-[#858484]'>
                    <Link href={'/admin/dashboard/account'}>
                        <div className={'p-2'}>
                            <FontAwesomeIcon icon={faUser} /> Account
                        </div>
                    </Link>
                </div>
                <hr className={'border-black'} />
                <div onClick={() => {removeUser(); signOut({ callbackUrl: '/auth/login' })}} className='p-2 rounded cursor-pointer hover:bg-[#858484]'>
                    <FontAwesomeIcon icon={faSignOut} /> Sign Out
                </div>
            </div>
        </div>
    )
}

export default UserProfile;