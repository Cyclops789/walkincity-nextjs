import executeQuery from '@/lib/db';
import query from '@/utils/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { createHash } from '@/lib/password';

interface IUpdatePasswordRequest {
    password?: string;
    confirmationPassword?: string;
}

export default async function POST(_req: NextApiRequest, res: NextApiResponse) {
    const token = await getToken({ req: _req });    
    const userToken: { id: number } = token?.user as { id: number };
    const { password, confirmationPassword }: IUpdatePasswordRequest = _req.body

    if(!password || !confirmationPassword) {
        return res.json({ 
            success: false,
            error: { 
                message: 'All values except password are required for this action.' 
            } 
        });
    }

    if(password !== confirmationPassword) {
        return res.json({ 
            success: false,
            error: { 
                message: 'Password doesn\'t match the confirmation password.' 
            } 
        });
    }

    const hashedPassword = createHash(password);

    await executeQuery({
        query: query.updateField('users', userToken.id, [ { name: 'password', value: hashedPassword }]),
        values: []
    });

    return res.status(200).json({
        success: true,
        message: 'Profile has been updated successfully.'
    });
}