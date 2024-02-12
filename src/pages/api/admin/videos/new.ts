import executeQuery from '@/lib/db';
import query from '@/utils/db';
import { NextApiRequest, NextApiResponse } from 'next';

interface IEditVideoReq_ {
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
        const { vid, country, place, weather, type, continent, seekTo, verified }: IEditVideoReq_ = _req.body

        if (!vid || !country || !place || !weather || !type || !continent || !seekTo || verified === undefined || verified === '') {
            return res.json({
                success: false,
                error: {
                    message: 'All values are required for this action.'
                }
            });
        }

        if (type != 'walk') {
            return res.json({
                success: false,
                error: {
                    message: 'Type can only be walk at this time.'
                }
            });
        }

        const video = await executeQuery({
            query: query.getVideoByVid,
            values: [vid],
        }) as any[];

        if (!video[0]?.vid) {
            try {
                const newVideo = await executeQuery({
                    query: query.createNewVideo,
                    values: [vid, country, place, weather, type, continent, seekTo, verified],
                }) as any;

                const getVideo = await executeQuery({
                    query: query.getVideoById,
                    values: [newVideo.insertId],
                }) as any[];

                return res.json({
                    success: true,
                    video: getVideo[0] || [],
                    message: 'Video has been created successfully! redirecting in 5s'
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
                    message: 'Video with the same vID already exist.'
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