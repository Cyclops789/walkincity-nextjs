import React from 'react'
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const Layout = dynamic(import('@/components/Layouts/Main'));

export default function success() {
    const router = useRouter();


    return (
        <Layout title={'Request a new walk'}>
            <div style={{ backgroundColor: 'hsl(0, 0%, 8%)' }} className='flex w-screen h-screen justify-center items-center'>
                <div className='flex p-4 text-white justify-center items-center'>
                    <div style={{ backgroundColor: 'hsl(0, 0%, 32.5%)' }} className='p-5 h-[382px] space-y-2 max-w-[500px] rounded-s'>
                        <div className='text-2xl uppercase text-center font-semibold'>
                            Thank you!
                        </div>
                        <div className="text-center">
                            <FontAwesomeIcon className='h-[170px] w-[170px] text-green-600' icon={faCircleCheck} />
                        </div>
                        <div className='flex text-center text-xl justify-center items-center'>
                            <div>You will be notified once the video is verified by one of our team.</div>
                        </div>
                    </div>
                </div>
            </div>


        </Layout>
    )
}