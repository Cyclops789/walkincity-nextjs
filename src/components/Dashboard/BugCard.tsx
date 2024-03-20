import React, { useState } from 'react'
import { useDrag } from 'react-dnd';

interface IVideosBug {
    id: number;
    vid?: string;
    reason: string;
    action: string | null;
}

function BugCard({ bug, action }: { bug: IVideosBug, action: string | null }) {
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
            style={{ backgroundColor: 'rgb(56, 56, 56)' }} className={`border-l-[5px] ${action == 'to_fix'  ? 'border-yellow-600' : action == 'in_progress' ? 'border-orange-600' : action == 'done' ? 'border-green-600' : 'border-white' } rounded w-full h-[150px] m-2 cursor-move`}
            ref={drag}
        >
            <div className={'p-3 text-xl font-semibold'}>
                {bug.reason}
            </div>
        </div>
    )
}

export default BugCard;