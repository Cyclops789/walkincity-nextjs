import executeQuery from '@/lib/db';
import query from '@/utils/db';
import { NextApiRequest, NextApiResponse } from 'next';

interface IEditPageReq_ {
    id?: number;
    name?: string;
    route?: string;
    content?: string;
    enabled?: boolean;
}


export default async function POST(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id, name, route, content, enabled }: IEditPageReq_ = _req.body
    
        if (id === null || id === undefined || !name || !route || !content || enabled === undefined || enabled === null) {
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
    
        const role = await executeQuery({
            query: query.getRoleByID,
            values: [id],
        }) as any[];

        if(role.length >= 1) {
            const options = [
                {
                    name: 'name',
                    value: name
                },
                {
                    name: 'route',
                    value: route.toLowerCase()
                },
                {
                    name: 'content',
                    value: content
                },
                {
                    name: 'enabled',
                    value: enabled
                }
            ];

            try {
                const editPages = await executeQuery({
                    query: query.updateField('pages', id, options),
                    values: [id],
                }) as any;

                console.log(query.updateField('pages', id, options))

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
                    message: 'Page Not Found.' 
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