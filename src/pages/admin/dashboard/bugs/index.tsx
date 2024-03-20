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
            <DndProvider backend={HTML5Backend}>
                <div className={'flex w-full space-x-4'}>
                    <BugList bugs={bugs} name={'To Fix'} action='to_fix' />
                    <BugList bugs={bugs} name={'In Progress'} action='in_progress' />
                    <BugList bugs={bugs} name={'Done'} action='done' />
                </div>
            </DndProvider>
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