import React, { useState } from 'react'
import { useDrag } from 'react-dnd';

interface IVideosBug {
    id: number;
    vid?: string;
    reason: string;
    action: string;
}

function BugCard({ bug, action }: { bug: IVideosBug, action: string }) {
    const [{isDragging}, drag] = useDrag(() => ({
        type: "card",
        item: {
            id: bug.id,
            action: bug.action
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }));

    return (
        <div 
            key={bug.id}
            draggable={true}
            style={{ backgroundColor: 'rgb(56, 56, 56)' }} className={` border-l-[5px] ${action == '' ? 'border-yellow-600' : action == 'in_progress' ? 'border-orange-600' : action == 'done' ? 'border-green-600' : 'border-white' } border-yellow-50 rounded w-full h-[150px] m-2 ${isDragging ? 'cursor-move' : 'cursor-pointer'}`}
            ref={drag}
        >
            <div className={'p-3 text-xl font-semibold'}>
                {bug.reason}
            </div>
        </div>
    )
}

export default BugCard;