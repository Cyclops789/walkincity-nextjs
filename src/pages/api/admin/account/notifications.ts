import executeQuery from '@/lib/db';
import query from '@/utils/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { IUserWithoutPassword } from '@/components/Layouts/Dashboard';

export default async function GET(_req: NextApiRequest, res: NextApiResponse) {
    const token = await getToken({ req: _req });
    
    const userToken: { id: number } = token?.user as { id: number };

    const notifications = await executeQuery({
        query: query.getNotificationsByUserID,
        values: [userToken?.id]
    }) as IUserWithoutPassword[];

    return res.status(200).json({
        success: true,
        notifications: notifications
    });
}