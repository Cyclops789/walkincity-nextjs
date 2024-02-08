import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

export interface INotificationType {
    setNotify?: Dispatch<SetStateAction<INotificationType>>;
    open: boolean;
    type: 'warning' | 'success' | 'info' | string;
    text: string;
    duration?: number;
}

function Notification({ open, type, text, duration, setNotify }: INotificationType) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if(open && setNotify) {
            setShow(true);
            setNotify({ open, type, text });
            setTimeout(() => {
                setShow(false);
                setNotify({ open: false, type, text });
            }, duration || 5000);
        }
    }, [open])

    return (
        <div 
            style={{
                transition: 'all 0.4s ease',
                transform: show ? 'translate(0, 500px)' : 'translate(100%, 500px)',
            }} 
            className={`${!show ? 'right-0' : 'right-[10px]'} rounded-md fixed bg-[#383838] flex border-l-4 ${type === 'warning' ? 'border-orange-500' : type === 'success' ? 'border-green-500' : type === 'info' ? 'border-blue-500' : type} text-gray-200`}
        >
            <div className={`mt-1.5 ml-2 ${type === 'warning' ? 'text-orange-500' : type === 'success' ? 'text-green-500' : type === 'info' ? 'text-blue-500' : type}`}>
                {type === 'warning' ? (
                    <FontAwesomeIcon icon={faCircleXmark} />
                ) : type ===  'success' ? (
                    <FontAwesomeIcon icon={faCircleCheck} />
                ) : type === 'info' ? (
                    <FontAwesomeIcon icon={faCircleInfo} />
                ) : (
                    <FontAwesomeIcon icon={faCircleInfo} />
                )}
            </div>
            <div className="p-2 text-center">
                {text}
            </div>
        </div>
    )
}

export default Notification