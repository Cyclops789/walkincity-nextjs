import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

function Viewers({ connectors } : { connectors: string }) {
    return (
        <div className={`fixed bottom-4 w-full flex justify-start ml-3 sm:justify-center sm:ml-0 z-[1]`}>
            <div className='flex h-9 rounded-full items-center space-x-2 w-[60px] text-white border border-white justify-center'>
                <FontAwesomeIcon className='w-[20px]' icon={faEye} />
                <div className='text-sm'>
                    {connectors}
                </div>
            </div>
        </div>
    )
}

export default Viewers;