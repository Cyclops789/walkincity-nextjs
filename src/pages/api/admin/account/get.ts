import executeQuery from '@/lib/db';
import query from '@/utils/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { IUserWithoutPassword } from '@/components/Layouts/Dashboard';
import { signOut } from 'next-auth/react';

export default async function GET(_req: NextApiRequest, res: NextApiResponse) {
    const token = await getToken({ req: _req });    
    const userToken: { id: number } = token?.user as { id: number };

    const user = await executeQuery({
        query: query.getUserByID,
        values: [userToken?.id]
    }) as IUserWithoutPassword[];

    if(user.length > 0) {
        const userReturns = user[0];

        const role = await executeQuery({
            query: query.getRoleByID,
            values: [userReturns.role]
        }) as {
            id: number,
            name: string,
            permissions: string,
        }[];

        return res.status(200).json({
            id: userReturns.id,
            email: userReturns.email,
            username: userReturns.username,
            role: role[0]
        });

    } else {
        await signOut({ callbackUrl: '/auth/login' });

        return res.status(404).json({
            success: false,
            error: {
                message: "User was not found"
            }
        });
    }
}