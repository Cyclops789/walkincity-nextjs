import executeQuery from '@/lib/db';
import query from '@/utils/db';
import { NextApiRequest, NextApiResponse } from 'next';

interface IEditVideoBugReq_ {
    id: string | number | undefined;
    action: string | undefined
}

export default async function POST(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id, action }: IEditVideoBugReq_ = _req.body
    
        if (!id) {
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
    
        const videoBug = await executeQuery({
            query: query.getVideoBugById,
            values: [id],
        }) as any[];

        if(videoBug.length >= 1) {
            const options = [
                {
                    name: 'action',
                    value: action
                }
            ];

            try {
                await executeQuery({
                    query: query.updateField('videos_bugs', id, options),
                    values: [id],
                }) as any[];

                return res.json({ success: true });

            } catch (error) {
                console.error(error);

                return res.status(500).json({ 
                    success: false
                });
            }

        } else {
            return res.json({
                success: false, 
                error: { 
                    message: 'Card Not Found.' 
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