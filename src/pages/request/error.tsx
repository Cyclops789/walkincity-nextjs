import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Layout = dynamic(import('@/components/Layouts/Main'));

interface IRequestQueries {
    r?: string;
}

export default function error() {
    const router = useRouter();
    const { r }: IRequestQueries = router.query;
    const [error, setErrorMessage] = useState('Error')

    useEffect(() => {
        if (r == 'token') {
            setErrorMessage('Invalid token, please try to send an other request.')
        }
    }, [r])

    return (
        <Layout title={'Request a new walk'}>
            <div style={{ backgroundColor: 'hsl(0, 0%, 8%)' }} className='flex w-screen h-screen justify-center items-center'>
                <div className='flex p-4 text-white justify-center items-center'>
                    <div style={{ backgroundColor: 'hsl(0, 0%, 32.5%)' }} className='p-5 h-[382px] space-y-2 max-w-[500px] rounded-s'>
                        <div className='text-2xl uppercase text-center font-semibold'>
                            ERROR!
                        </div>
                        <div className="text-center">
                            <FontAwesomeIcon className='h-[170px] w-[170px] text-red-600' icon={faX} />
                        </div>
                        <div className='flex text-center text-xl justify-center items-center'>
                            <div>{error}</div>
                        </div>
                        <div className='flex justify-center pt-1 text-center'>
                            <Link href="/request" className='bg-[var(--primary-text-color)] hover:bg-[var(--primary-text-color-hover)] p-2 rounded text-1xl w-full uppercase'>Go back</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
};