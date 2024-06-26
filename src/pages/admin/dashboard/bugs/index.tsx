import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { executeQueryReturnsJSON } from '@/lib/db';
import { GetServerSideProps } from 'next';
import query from '@/utils/db';
import { ICountryRes } from '@/components/SideBar';
import { useRouter } from 'next/router';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend"

export interface IVideosBugs {
    id: number;
    vid?: string;
    reason: string;
    action: string;
}


const Layout = dynamic(import('@/components/Layouts/Dashboard')),
    BugList = dynamic(import('@/components/Dashboard/BugList'));

export default function videos({ bugs }: { bugs: IVideosBugs[] }) {

    return (
        <Layout title={'Videos'}>
            <div className={'bg-[#262626] w-full h-full rounded'}>
                <div className={'pb-1'}></div>
                <DndProvider backend={HTML5Backend}>
                    <div className={'sm:flex w-full sm:space-x-4'}>
                        <BugList bugs={bugs} name={'To Fix'} action='to_fix' />
                        <BugList bugs={bugs} name={'In Progress'} action='in_progress' />
                        <BugList bugs={bugs} name={'Done'} action='done' />
                    </div>
                </DndProvider>
                <div className={'pt-3'}></div>
            </div>
        </Layout>
    )
}

export const getServerSideProps = (async () => {

    const videosBugs = await executeQueryReturnsJSON({
        query: query.getAllVideosBugs,
        values: []
    }) as IVideosBugs[];

    return {
        props: {
            bugs: videosBugs || []
        }
    }
}) satisfies GetServerSideProps<{ bugs: IVideosBugs[] }>