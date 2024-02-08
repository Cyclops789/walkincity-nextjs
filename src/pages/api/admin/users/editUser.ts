import executeQuery from '@/lib/db';
import query from '@/utils/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { createHash } from '@/lib/password';

interface IEditVideoReq_ {
    id: string | number | undefined;
    username: string | undefined;
    email: string | undefined;
    role: string | number | undefined;
    password: string | undefined;
}


export default async function POST(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id, username, email, role, password }: IEditVideoReq_ = _req.body
    
        if (!id || !username || !email || !role) {
            return res.json({ 
                success: false,
                error: { 
                    message: 'All values except password are required for this action.' 
                } 
            });
        }

        if(Number.isNaN(id) && Number.isNaN(parseInt(`${id}`))) {
            return res.json({ 
                success: false,
                error: { 
                    message: 'Invalid ID.' 
                } 
            });
        }
    
        const user = await executeQuery({
            query: query.getUserByID,
            values: [id],
        }) as any[];

        if(user.length >= 1) {

            const options = [
                {
                    name: 'username',
                    value: username
                },
                {
                    name: 'email',
                    value: email
                },
                {
                    name: 'role',
                    value: role
                }
            ];

            if(password) {
                const hashedPassword = createHash(password)
                options.push({ name: 'password', value: hashedPassword })
            }

            try {
                await executeQuery({
                    query: query.updateField('users', id, options),
                    values: [id],
                }) as any[];

                return res.json({ success: true, message: 'Modifications has been saved successfully!' });

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
                    message: 'Video Not Found.' 
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