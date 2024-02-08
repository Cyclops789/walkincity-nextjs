import { NextApiRequest, NextApiResponse } from 'next';
import { cookie } from '@/lib/cookies';

export default async function POST(_req: NextApiRequest, res: NextApiResponse) {
    try {
        cookie(res,
            [
                {
                    name: 'auth_session',
                    value: '',
                    options: { SameSite: 'Lax', path: '/', httpOnly: true, maxAge: 0 }
                },
                {
                    name: 'current_user',
                    value: '{}',
                    options: { SameSite: 'Lax', path: '/', httpOnly: true, maxAge: 0 }
                }
            ]
        );

        return res.json({
            success: true,
            error: {
                message: 'User logged out.'
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: {
                message: 'Internal server error.'
            }
        });
    }
}