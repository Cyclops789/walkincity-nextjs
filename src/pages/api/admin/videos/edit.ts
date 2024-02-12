import executeQuery from '@/lib/db';
import query from '@/utils/db';
import { NextApiRequest, NextApiResponse } from 'next';


interface IEditVideoReq_ {
    id: string | number | undefined;
    vid: string | undefined;
    country: string | undefined;
    place: string | undefined;
    weather: string | undefined;
    type: string | undefined;
    continent: string | undefined;
    seekTo: string | number | undefined;
    verified: string | number | undefined;
}


export default async function POST(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id, vid, country, place, weather, type, continent, seekTo, verified }: IEditVideoReq_ = _req.body
    
        if (!id || !vid || !country || !place || !weather || !type || !continent || !seekTo || verified === undefined || verified === '') {
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

        if(type != 'walk') {
            return res.json({ 
                success: false,
                error: { 
                    message: 'Type can only be walk at this time.' 
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
                    name: 'vid',
                    value: vid
                },
                {
                    name: 'country',
                    value: country
                },
                {
                    name: 'place',
                    value: place
                },
                {
                    name: 'weather',
                    value: weather
                },
                {
                    name: 'type',
                    value: type
                },
                {
                    name: 'continent',
                    value: continent
                },
                {
                    name: 'seekTo',
                    value: seekTo
                },
                {
                    name: 'verified',
                    value: verified
                }
            ];

            try {
                await executeQuery({
                    query: query.updateField('videos', id, options),
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