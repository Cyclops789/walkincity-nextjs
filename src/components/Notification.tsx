import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'

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
            onClick={() => setShow(false)}
            style={{
                transition: 'all 0.4s ease',
                transform: show ? 'translate(0, 247px)' : 'translate(100%, 247px)',
                zIndex: 5
            }} 
            className={`${!show ? 'right-0' : 'right-[60px]'} rounded-md absolute text-black ${type === 'warning' ? 'bg-orange-500' : type === 'success' ? 'bg-green-500' : type === 'info' ? 'bg-blue-500' : type}`}
        >
            <div className="p-2 text-center">
                {text}
            </div>
        </div>
    )
}

export default Notification