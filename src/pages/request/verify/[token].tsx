import React from 'react'
import executeQuery, { executeQueryReturnsJSON } from '@/lib/db';
import query from '@/utils/db';
import { GetServerSideProps } from 'next';
import { newVideoRequest } from '@/helpers/notifications';

export default function token() {
    return (
        <div>
            Redirecting...
        </div>
    )
};

export const getServerSideProps = (async (context) => {
    const { token } = context.query;

    const receivedToken = await executeQueryReturnsJSON({
        query: query.getTokenByToken,
        values: [token],
    }) as any[];

    if (receivedToken.length <= 0) {
        return {
            redirect: {
                destination: '/request/error?r=token',
                permanent: false,
            },
        };
    } else {
        await executeQuery({
            query: query.updateField('videos_requests', receivedToken[0].videoId, [ { name: 'verified', value: 1 } ]),
            values: []
        });

        const usersWithPermissions = await executeQueryReturnsJSON({
            query: query.getAllUsers,
            values: []
        });

        for (const user of usersWithPermissions) {
            await executeQuery({
                query: query.createNewNotification,
                values: [user.id, newVideoRequest, `requests?id=${receivedToken[0].videoId}`]
            });
        }

        return {
            redirect: {
                destination: '/request/success',
                permanent: false,
            },
        };
    }
}) satisfies GetServerSideProps<{  }>