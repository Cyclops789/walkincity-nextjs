import React, { useEffect, useRef, useState } from 'react'
import { useDrag } from 'react-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { http as axios } from '@/helpers/http';
import { useRouter } from 'next/router';
import { refreshRouteSilenced } from '@/helpers/routes';

interface IVideosBug {
    id: number;
    vid?: string;
    reason: string;
    action: string | null;
}

function BugCard({ bug, action }: { bug: IVideosBug, action: string | null }) {
    const router = useRouter();
    const [dropDown, setDropDown] = useState({ id: bug.id, state: false});
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "card",
        item: {
            id: bug.id,
            action: bug.action
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }));

    const markAsNotResolved = () => {
        axios.post('/api/admin/bugs/action', {
            id: bug.id,
            action: 'not_resolved'
        }).finally(() => {
            refreshRouteSilenced(router);
        })
    }

    const markAsResolved = () => {
        axios.post('/api/admin/bugs/action', {
            id: bug.id,
            action: 'resolved'
        }).finally(() => {
            refreshRouteSilenced(router);
        })
    }

    return (
        <div
            key={bug.id}
            style={{ backgroundColor: 'rgb(56, 56, 56)' }} className={`border-l-[5px] ${action == 'to_fix' ? 'border-yellow-600' : action == 'in_progress' ? 'border-orange-600' : action == 'done' ? 'border-green-600' : 'border-white'} rounded w-full h-[150px] m-2 cursor-move`}
            ref={drag}
        >
            <div className={'flex justify-between p-3'}>
                <div className={'w-full text-xl font-semibold'}>
                    {bug.reason}
                </div>
                {action == 'done' && (
                    <div onClick={() => setDropDown({ id: bug.id, state: !dropDown.state })} className={'w-[25px] h-[25px] cursor-pointer flex justify-center items-center hover:bg-black/10 rounded'}>
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </div>
                )}
                {(dropDown.id == bug.id && dropDown.state) && (
                    <div  className={'relative cursor-default'}>
                        <div  className={'absolute right-7 top-2 bg-[#626060] rounded text-sm overflow-hidden w-[150px]'}>
                            <div className='p-2 cursor-pointer hover:bg-[#858484]'>
                                <div onClick={markAsResolved}>
                                    Mark as resolved
                                </div>
                            </div>

                            <div className='p-2 cursor-pointer hover:bg-[#858484]'>
                                <div onClick={markAsNotResolved}>
                                    Mark as not resolved
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BugCard;