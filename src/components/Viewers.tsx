import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { ICountryRes, IVideosRes } from '@/components/SideBar';

function Viewers
(
    { 
        connectors, 
        ended,
        currentVideo,
        currentCountry
    } : { 
        connectors: string, 
        ended: boolean, 
        currentVideo: IVideosRes | undefined,
        currentCountry: ICountryRes | undefined
    }
) {
    const [customText, setCustomText] = useState('');
    const [hideText, setHideText] = useState(false);

    useEffect(() => {
        setCustomText(`${currentVideo?.place}, ${currentCountry?.long_name}`);
        setHideText(false);

        setTimeout(() => {
            setHideText(true)
        }, 5000);
    }, [ended]);

    return (
        <div className={`fixed bottom-4 w-full flex justify-start ml-3 sm:justify-center sm:ml-0 z-[1]`}>
            <div className='flex h-9 rounded-full items-center space-x-2 w-auto text-white border border-white justify-center'>
                <FontAwesomeIcon className='ml-3 w-[20px]' icon={faEye} />
                <div className='text-sm pr-3'>
                    {connectors} <span className={`${hideText && 'hidden'}`}>{customText}</span> 
                </div>
            </div>
        </div>
    )
};

export default Viewers;