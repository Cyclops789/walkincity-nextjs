import React from 'react'
import Link from 'next/link'

function GlobeController({ zoomModel } : { zoomModel: (zoomType: "zoomIn" | "zoomOut") => void }) {
    return (
        <>
            <div className={'fixed h-full w-[45px] right-0 flex flex-col justify-center space-y-2 z-[99999]'}>
                <button
                    onClick={() => zoomModel("zoomIn")}
                    className={'text-white bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] rounded w-[40px]'}
                >
                    +
                </button>
                <button
                    onClick={() => zoomModel("zoomOut")}
                    className={'text-white bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] rounded w-[40px]'}
                >
                    -
                </button>
            </div>
            <div className={`fixed bottom-1 left-1 w-[250px] h-[65px] sm:w-[300px] sm:h-[65px] border-4 border-[var(--primary-text-color)] z-[99999] rounded bg-black text-white flex justify-between`}>
                <div className={'p-3 mt-1'}>
                    <div>
                        <span className='font-semibold'>Walkin<strong className='text-[var(--primary-text-color)]'>.</strong>City</span>
                    </div>
                </div>

                <div className={'mt-3 mr-3'}>
                    <Link href={'/'}>
                        <div className={'text-center bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] w-[100px] rounded'}>
                            <div className={'p-1'}>
                                Go Back
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default GlobeController