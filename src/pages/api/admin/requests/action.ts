import executeQuery from '@/lib/db';
import query from '@/utils/db';
import { NextApiRequest, NextApiResponse } from 'next';

interface IRequestVideo {
    id: string | number | undefined;
    action: string | undefined;

    country: string | undefined;
    place: string | undefined;
    weather: string | undefined;
    seekTo: string | number;
}


export default async function POST(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id, action, country, place, weather, seekTo }: IRequestVideo = _req.body

        if (!id || !action) {
            return res.json({
                success: false,
                error: {
                    message: 'All values are required for this action.'
                }
            });
        }

        if (Number.isNaN(id) && Number.isNaN(parseInt(`${id}`))) {
            return res.json({
                success: false,
                error: {
                    message: 'Invalid ID.'
                }
            });
        }

        const requestedVideo = await executeQuery({
            query: query.getVideoRequestByID,
            values: [id],
        }) as any[];

        if (requestedVideo.length >= 1) {
            try {
                if(requestedVideo[0].action === 'reject' || requestedVideo[0].action === 'accept') {
                    return res.json({
                        success: false,
                        error: {
                            message: 'An action has been already given for this request.'
                        }
                    });
                }

                const options = [ { name: 'action', value: action } ];

                await executeQuery({
                    query: query.updateField('videos_requests', id, options),
                    values: [],
                }) as any[];

                if(action === 'reject') {
                    return res.json({ success: true, message: 'Request has been rejected successfully!' });
                }

                await executeQuery({
                    query: query.createNewVideo,
                    values: [
                        requestedVideo[0].vid,
                        country ? country : requestedVideo[0].country,
                        place ? place : requestedVideo[0].place,
                        weather ? weather : requestedVideo[0].weather,
                        requestedVideo[0].type,
                        requestedVideo[0].continent,
                        seekTo ? seekTo : requestedVideo[0].seekTo,
                        0
                    ],
                }) as any[];

                return res.json({ success: true, message: 'Request has been accepted successfully!' });

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
                    message: 'Video request not found.'
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