import executeQuery from '@/lib/db';
import query from '@/utils/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

interface IReadNotification {
    id?: string | number;
}

export default async function POST(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id }: IReadNotification = _req.body;

        if (id) {
            const token = await getToken({ req: _req });
            const { id: userID }: { id: number } = token?.user as { id: number };
        
            await executeQuery({
                query: query.updateField('notifications', id, [ { name: 'is_read', value: 1 }], `AND user_id = ${userID}`),
                values: []
            });

            return res.status(200).json({
                success: true,
                message: 'OK'
            });

        } else {
            return res.status(200).json({
                success: true,
                error: {
                    message: 'All fields are required for this action.'
                }
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: true,
            error: {
                message: 'Internal Server Error'
            }
        });
    }
}