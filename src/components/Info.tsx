import React from 'react'
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faBug, faPlus, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import type { SetStateAction } from 'react';

function Info({ actionRef, setActionOpen, vid }: { actionRef: React.LegacyRef<HTMLDivElement> | undefined, setActionOpen: (value: SetStateAction<boolean>) => void, vid?: string }) {
    const router = useRouter();

    return (
        <div>
            <div className={'fixed flex w-screen h-screen justify-center items-center overflow-auto text-white z-[999] bg-black/60'}>
                <div ref={actionRef} style={{ backgroundColor: 'hsl(0, 0%, 32.5%)' }} className={'w-[500px] h-auto rounded z-[9999]'}>
                    <div className={'p-3 text-center'}>
                        <div className={'flex justify-end'}>
                            <div onClick={() => setActionOpen(false)} className={'hover:bg-white/20 rounded cursor-pointer mb-3'}>
                                <FontAwesomeIcon className={'px-2 py-1 mt-1'} icon={faX} />
                            </div>
                        </div>
                        <div className={'flex space-x-2'}>
                            <button onClick={() => router.push({ pathname: '/report', query: { 'type': 'website' } })} className={'hover:shadow-xl font-[500] bg-[var(--primary-text-color)] disabled:bg-slate-700 hover:bg-[var(--primary-text-color-hover)] p-2 rounded text-1xl w-full uppercase'}>
                                <FontAwesomeIcon className={'w-[20px]'} icon={faBug} /> Report a website bug
                            </button>
                            <button onClick={() => router.push({ pathname: '/report', query: { 'type': 'video', 'v': vid || '' } })} className={'hover:shadow-xl font-[500] bg-[var(--primary-text-color)] disabled:bg-slate-700 hover:bg-[var(--primary-text-color-hover)] p-2 rounded text-1xl w-full uppercase'}>
                                <FontAwesomeIcon className={'w-[20px]'} icon={faBug} /> Report a video bug
                            </button>
                        </div>

                        <div className={'mt-3 flex space-x-2'}>
                            <button onClick={() => router.push('/request')} className={'hover:shadow-xl font-[500] bg-[var(--primary-text-color)] disabled:bg-slate-700 hover:bg-[var(--primary-text-color-hover)] p-2 rounded text-1xl w-full uppercase'}>
                                <FontAwesomeIcon className={'w-[20px]'} icon={faPlus} /> Request a video
                            </button>
                            <button onClick={() => router.push('/info')} className={'hover:shadow-xl font-[500] bg-[var(--primary-text-color)] disabled:bg-slate-700 hover:bg-[var(--primary-text-color-hover)] p-2 rounded text-1xl w-full uppercase'}>
                                <FontAwesomeIcon className={'w-[20px]'} icon={faCircleQuestion} /> Info
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Info;