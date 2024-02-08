import executeQuery from '@/lib/db';
import query from '@/utils/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { createHash } from '@/lib/password';


interface ILoginReq {
    email: string | undefined;
    password: string | undefined;
    username: string | undefined;
}

interface IUserReturns {
    id: number;
    username: string;
    email: string;
    password: string;
    created_at: string;
}

export default async function POST(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const { email, password, username }: ILoginReq = _req.body
    
        if (!email || !password || !username) {
            return res.json({ 
                success: false,
                error: { 
                    message: 'Email, username and password are required.' 
                } 
            });
        }
    
        const user = await executeQuery({
            query: query.getUser,
            values: [email],
        }) as IUserReturns[];

        if(user.length >= 1) {
            return res.json({ 
                success: false, 
                error: { 
                    message: 'The user already exist.' 
                } 
            });
        } else {
            const hashedPassword = createHash(password);

            try {
                await executeQuery({
                    query: query.createNewUser,
                    values: [username, email, hashedPassword],
                }) as IUserReturns[];

                return res.json({ success: true });
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