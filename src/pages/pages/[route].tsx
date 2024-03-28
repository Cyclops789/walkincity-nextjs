import React from 'react'
import { executeQueryReturnsJSON } from '@/lib/db';
import query from '@/utils/db';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

const Layout = dynamic(import("@/components/Layouts/Pages"));

interface IPage {
    id: number;
    content: string;
    name: string;
    enabled: boolean | 1 | 0;
}

export default function Page({ page } : { page: IPage }) {
    return (
        <Layout title={page.name}>
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
        </Layout>
    )
}

export const getServerSideProps = (async (context) => {
    const { route } = context.query;
    const page = await executeQueryReturnsJSON({
        query: query.getPageByRoute,
        values: [(route as string).toLowerCase()]
    }) as IPage[];

    if (page.length <= 0) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    if(page[0].enabled === false || page[0].enabled === 0) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {
            page: page[0]
        }
    }
}) satisfies GetServerSideProps<{ page: IPage }>