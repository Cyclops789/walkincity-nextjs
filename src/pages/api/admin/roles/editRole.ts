import executeQuery from '@/lib/db';
import query from '@/utils/db';
import { NextApiRequest, NextApiResponse } from 'next';

interface IPermissionsReturns {
    id: number;
    name: string;
}

interface IEditRoleReq_ {
    id: string | number | undefined;
    name?: string;
    permissions?: IPermissionsReturns[];
}


export default async function POST(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id, name, permissions }: IEditRoleReq_ = _req.body
    
        if (!id || !name || !permissions) {
            return res.json({ 
                success: false,
                error: { 
                    message: 'All values are required for this action.' 
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
    
        const video = await executeQuery({
            query: query.getVideoById,
            values: [id],
        }) as any[];

        if(video.length >= 1) {
            let permissionsID = permissions.map((permission) => permission.id);

            const options = [
                {
                    name: 'name',
                    value: name
                },
                {
                    name: 'permissions',
                    value: JSON.stringify(permissionsID)
                }
            ];

            try {
                await executeQuery({
                    query: query.updateField('roles', id, options),
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
                    message: 'Role Not Found.' 
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