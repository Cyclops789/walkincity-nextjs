import executeQuery from '@/lib/db';
import query from '@/utils/db';
import { NextApiRequest, NextApiResponse } from 'next';

interface IEditVideoReq_ {
    id: string | number | undefined;
}

export default async function POST(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id }: IEditVideoReq_ = _req.body
    
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
    
        const video = await executeQuery({
            query: query.getVideoById,
            values: [id],
        }) as any[];

        if(video.length >= 1) {

            if(video[0].hide === 1) {
                return res.status(200).json({ 
                    success: false, 
                    error: { 
                        message: 'Video is already removed.' 
                    }
                });
            }

            const options = [
                {
                    name: 'hide',
                    value: 1
                }
            ];

            try {
                await executeQuery({
                    query: query.updateField('videos', id, options),
                    values: [id],
                }) as any[];

                return res.json({ success: true, message: `Video has been removed successfully!` });

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