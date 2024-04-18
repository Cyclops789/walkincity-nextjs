import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Script from 'next/script'

export interface IUserWithoutPassword {
    id: number;
    username: string;
    email: string;
    image: string;
    created_at: string;
    role: {
        id: number;
        name: string;
        permissions: string;
    };
}

type LayoutProps = {
    children: React.ReactNode;
    title?: string;
    className?: string;
}

const ParentComponent = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={'p-3 h-auto'}>
            {children}
        </div>
    )
}

export default function Layout({
    children,
    title,
    className = ''
}: LayoutProps) {

    const [pageTitle, setPageTitle] = useState('Page');

    useEffect(() => {
        if(title && title !== '') {
            setPageTitle(`Page | ${title}`)
        }
    }, [])

    return (
        <div>
            <Head>
                <title>{pageTitle}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <Script
                    defer 
                    data-domain={"walkin.city"}
                    data-api={`https://${process.env.NEXT_PUBLIC_CF_WORKER_HOSTNAME}/getvideos/videos`}
                    src={`https://${process.env.NEXT_PUBLIC_CF_WORKER_HOSTNAME}/getvideos/script.js`} 
                />
            </Head>
            <div className={`h-screen w-screen ${className}`}>
                <div>
                    <Link href={'/'} className={'text-white w-full h-[50px] text-center text-2xl items-center flex justify-center bg-[#262626] hover:bg-[#1d1d1d]'}>
                        <Image
                            src={'/favicon.ico'}
                            width={35}
                            height={35}
                            alt='Logo'
                            className='mr-2'
                        />
                        <span className='font-semibold'>
                            Walkin<strong className='text-[var(--primary-text-color)]'>.</strong>City
                        </span>
                    </Link>
                </div>

                <div className={'px-5 md:px-[500px]'}>
                    <ParentComponent children={children} />
                </div>
            </div>
        </div>
    )
}

