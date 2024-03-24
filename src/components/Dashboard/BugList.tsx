import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import { useDrop } from 'react-dnd';
import axios from 'axios';
import { refreshRouteSilenced } from '@/helpers/routes';
import { useRouter } from 'next/router';

interface IVideosBug {
    id: number;
    vid?: string;
    reason: string;
    action: string | null;
}

const BugCard = dynamic(import('@/components/Dashboard/BugCard')),
    ConfirmationModal = dynamic(import('@/components/Dashboard/ConfirmationModal'));

function BugList({ bugs, name, action }: { bugs: IVideosBug[], name: string, action: string | null }) {
    const router = useRouter();
    const [modal, setModalData] = useState<any>();

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: "card",
        drop: (item: any) => {
            if (item.action !== action) {
                axios.post('/api/admin/bugs/action', {
                    id: item.id,
                    action: action || null
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
        <>
            {action == 'done' && (
                <ConfirmationModal
                    setModalData={setModalData}
                    modal={modal}
                />
            )}

            <div
                ref={drop}
                //style={{ width: 'calc((100% / 3) - 17px)' }}
                className={`space-y-4 w-[calc(100%-17px)] sm:w-[calc((100%/3)-17px)]`}
            >
                <div className={`ml-2 text-2xl font-semibold uppercase ${(canDrop && isOver) && 'text-[var(--primary-text-color)]'}`}>{name}</div>

                {bugs.map((bug) => (
                    (bug.action == action) && <BugCard key={bug.id} bug={bug} action={action} />
                ))}
            </div>
        </>
    )
}

export default BugList;