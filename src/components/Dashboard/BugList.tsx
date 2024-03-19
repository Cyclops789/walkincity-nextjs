import React from 'react'
import dynamic from 'next/dynamic';
import { useDrop } from 'react-dnd';
import axios from 'axios';
import { refreshRouteSilenced } from '@/helpers/routes';
import { useRouter } from 'next/router';

interface IVideosBug {
    id: number;
    vid?: string;
    reason: string;
    action: string;
}

const BugCard = dynamic(import('./BugCard'));

function BugList({ bugs, name, action } : { bugs: IVideosBug[], name: string, action: string }) {
    const router = useRouter()
    const [{canDrop, isOver}, drop] = useDrop(() => ({
        accept: "card",
        drop: (item: any) => {
            if(item.action !== action) {
                axios.post('/api/admin/bugs/action', {
                    id: item.id,
                    action: action
                }).finally(() => {
                    refreshRouteSilenced(router);
                })
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        })
    }));

    return (
        <div 
            ref={drop}
            style={{ width: 'calc((100% / 3) - 17px)' }} 
            className={`space-y-4`}
        >
            <div className={`ml-2 text-2xl font-semibold uppercase ${(canDrop && isOver) && 'text-[var(--primary-text-color)]'}`}>{name}</div>

            {bugs.map((bug) => (
                (bug.action == action) && <BugCard bug={bug} action={action} />
            ))}
        </div>
    )
}

export default BugList;