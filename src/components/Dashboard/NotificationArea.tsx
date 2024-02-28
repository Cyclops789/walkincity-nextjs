import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faBell } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from "@material-tailwind/react";

export default function NotificationArea(
    { open }:
        { open: boolean }
) {
    const [page, setPage] = useState(0);

    return (
        <div style={{ zIndex: 999 }} className={`${open ? 'fixed' : 'hidden'} right-[55px] top-[55px] w-[400px] h-[500px] rounded overflow-hidden`}>
            <div className='w-full h-full text-white'>
                <div className={'bg-[var(--primary-text-color)] w-full h-[20%] p-3'}>
                    <div className='text-xl font-semibold'>
                        Notifications
                    </div>
                    <div className='flex justify-between items-end pt-7'>
                        <div className='flex justify-center space-x-2'>
                            <div onClick={() => setPage(0)} className={`rounded-t cursor-pointer ${page == 0 && 'border-gray-500 border-b-[3px]'} hover:border-gray-500 hover:border-b-[3px] hover:bg-[var(--primary-text-color-hover)]`}>
                                <div className={'w-[40px] text-center mb-2'}>
                                    All
                                </div>
                            </div>
                            <div onClick={() => setPage(1)} className={`rounded-t cursor-pointer ${page == 1 && 'border-gray-500 border-b-[3px]'} hover:border-gray-500 hover:border-b-[3px] hover:bg-[var(--primary-text-color-hover)]`}>
                                <div className={'w-[80px] text-center mb-2'}>
                                    UnRead
                                </div>
                            </div>
                        </div>

                        <Tooltip className={'z-[9999]'} content="Make all as viewed" placement="top">
                            <div className='pb-[10px] cursor-pointer'>
                                <FontAwesomeIcon icon={faCheck} />
                            </div>
                        </Tooltip>
                    </div>
                </div>
                <div className={'bg-black w-full h-[80%]'}>
                    <div className='h-full overflow-x-auto p-3'>
                        <a href='#' className='flex hover:bg-[#ffffff50] rounded p-3 cursor-pointer'>
                            <div className='text-[50px]'>
                                <FontAwesomeIcon icon={faBell} />
                            </div>
                            <div className='ml-3 mt-4 items-center text-center'>
                                New video request has been added
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}