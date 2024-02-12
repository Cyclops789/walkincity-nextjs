import executeQuery from '@/lib/db';
import query from '@/utils/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { createHash } from '@/lib/password';

interface IEditVideoReq_ {
    username: string | undefined;
    email: string | undefined;
    role: string | number | undefined;
    password: string | undefined;
}

export default async function POST(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const { username, email, role, password }: IEditVideoReq_ = _req.body

        if (!username || !email || !role || !password) {
            return res.json({
                success: false,
                error: {
                    message: 'All values are required for this action.'
                }
            });
        }

        const getUser = await executeQuery({
            query: query.getUserByEmail,
            values: [email],
        }) as any;

        if(!getUser[0]?.email) {
            try {
                const hashedPassword = createHash(password);

                const newUser = await executeQuery({
                    query: query.createNewUser,
                    values: [username, email, hashedPassword, role],
                }) as any;

                console.log(newUser);

                return res.json({
                    success: true,
                    user: newUser.insertId || [],
                    message: 'User has been created successfully! redirecting in 5s'
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
        } else {
            return res.json({
                success: false,
                error: {
                    message: 'User with the same email already exist.'
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