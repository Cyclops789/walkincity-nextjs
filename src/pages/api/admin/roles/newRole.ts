import executeQuery from '@/lib/db';
import query from '@/utils/db';
import { NextApiRequest, NextApiResponse } from 'next';

interface IPermissionsReturns {
    id: number;
    name: string;
}

interface IEditRoleReq_ {
    name?: string;
    permissions?: IPermissionsReturns[];
}


export default async function POST(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const { name, permissions }: IEditRoleReq_ = _req.body

        if (!name || !permissions) {
            return res.json({ 
                success: false,
                error: { 
                    message: 'All values are required for this action.' 
                } 
            });
        }

        const getRole = await executeQuery({
            query: query.getRoleByName,
            values: [name],
        }) as any;

        if(!getRole[0]?.name) {
            try {
                let permissionsID = permissions.map((permission) => permission.id);

                const newRole = await executeQuery({
                    query: query.createNewRole,
                    values: [name, JSON.stringify(permissionsID)],
                }) as any;

                console.log(newRole)

                return res.json({
                    success: true,
                    role: newRole.insertId || [],
                    message: 'Role has been created successfully! redirecting in 5s'
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
                    message: 'Role with the same name already exist.'
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