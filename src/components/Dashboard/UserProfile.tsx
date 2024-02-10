import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { IUserWithoutPassword } from '../Layouts/Dashboard';
import { signOut } from 'next-auth/react';

function UserProfile({ open, user } : { open: boolean, user: IUserWithoutPassword }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if(open) {
            setShow(true);
        } else if (!open) {
            setShow(false);
        }
    }, [open])

    return (
        <div
            style={{
                transition: 'all 0.4s ease',
                transform: show ? 'translate(0, 0)' : 'translate(100%, 0)',
            }} 
            className={`${!show ? 'right-0' : 'right-[55px]'} fixed top-6 z-20 text-white h-auto w-[250px] bg-[#626060] rounded-lg border-2 border-[var(--primary-text-color)]`}
        >
            <div className='p-3 flex space-x-1'>
                <Image
                  className={'rounded border border-slate-900'}
                  height={40}
                  width={50}
                  alt={'User picture'}
                  src={user.image}
                />
                <div className=''>
                    <div className='capitalize text-blue-400'>@{user.username}</div>
                    <div className=''>{user.email}</div>
                </div>
            </div>
            <hr className='border-[var(--primary-text-color)]' />
            <div onClick={() => signOut({ callbackUrl: '/auth/login' })} className='cursor-pointer'>
                <div className='p-3 w-auto'>
                    <FontAwesomeIcon className='mr-3' icon={faSignOut} /> Sign out
                </div>
            </div>
        </div>
    )
}

export default UserProfile;