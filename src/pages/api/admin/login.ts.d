import executeQuery from '@/lib/db';
import query from '@/utils/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { verifyHash } from '@/lib/password';
import { sign } from '@/lib/jwt';
import { cookie } from '@/lib/cookies';
import secrets from '@/utils/secrets';

interface ILoginReq {
    email: string | undefined;
    password: string | undefined;
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
        const { email, password }: ILoginReq = _req.body

        if (!email || !password) {
            return res.json({
                success: false,
                error: {
                    message: 'Email and password are required.'
                }
            });
        }

        const user = await executeQuery({
            query: query.getUserByEmail,
            values: [email],
        }) as IUserReturns[];

        if (user.length >= 1) {
            if (password && email) {
                const verify = verifyHash(password, user[0].password);

                if (verify) {
                    const token = await sign({ id: user[0].id, email: user[0].email, username: user[0].username });
                    
                    cookie(res, 
                        [
                            {
                                name: 'auth_session', 
                                value: token, 
                                options: { SameSite: 'Lax', path: '/', httpOnly: true, maxAge: secrets.JWT_MAX_AGE }
                            },
                            {
                                name: 'current_user', 
                                value: { username: user[0].username, email: user[0].email, id: user[0].id }, 
                                options: { SameSite: 'Lax', path: '/', httpOnly: true, maxAge: secrets.JWT_MAX_AGE }
                            }
                        ]
                    );

                    return res.json({ success: true });
                } else {
                    return res.json({
                        success: false,
                        error: {
                            message: 'Invalid credentials.'
                        }
                    });
                }
            } else {
                return res.json({
                    success: false,
                    error: {
                        message: 'Invalid email or password.'
                    }
                });
            }
        } else {
            return res.json({
                success: false,
                error: {
                    message: 'User Not Found.'
                }
            });
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