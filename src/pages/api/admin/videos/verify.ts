import executeQuery from '@/lib/db';
import query from '@/utils/db';
import { NextApiRequest, NextApiResponse } from 'next';

interface IEditVideoReq_ {
    id: string | number | undefined;
    verify: string | number | undefined;
}


export default async function POST(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id, verify }: IEditVideoReq_ = _req.body
    
        if (!id || verify === undefined || verify === '') {
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

            const options = [
                {
                    name: 'verified',
                    value: verify
                }
            ];

            try {
                await executeQuery({
                    query: query.updateField('videos', id, options),
                    values: [id],
                }) as any[];

                return res.json({ success: true, message: `Video has been ${(verify === "0" || verify === 0) ? "unverified" : (verify === "1" || verify === 1 ) && "verified"} successfully!` });

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