import executeQuery from '@/lib/db';
import query from '@/utils/db';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import YouTubeVideoId from '@/helpers/youtube';

interface INewVideoRequest_ {
    vid: string | undefined;
    country: string | undefined;
    place: string | undefined;
    token: string | undefined;
    type: string | undefined;
    weather: string | undefined;
    continent: string | undefined;
    seekTo: string | undefined;
}

export default async function POST(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const { vid, country, place, token, type, weather, continent, seekTo }: INewVideoRequest_ = _req.body

        if (!token) {
            return res.json({
                success: false,
                error: {
                    message: 'Recaptcha token is required.'
                }
            });
        }

        if (!vid || !country || !place || !type || !weather || !continent || !seekTo) {
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
        const youtube_id = YouTubeVideoId(vid);

        if(youtube_id === 'invalid_url') {
            return res.json({
                success: false,
                error: {
                    message: 'Invalid youtube ID or URL.'
                }
            });
        };

        // Verify the recaptcha token
        axios.post('https://www.google.com/recaptcha/api/siteverify', {}, {
            params: {
                secret: process.env.RECAPTCHA_SITE_SECRET || '_invalid_secret',
                response: token
            }
        }).then(async (r) => {
            if (r.data.success) {
                console.log("Token valid")
                const video = await executeQuery({
                    query: query.getVideoByVid,
                    values: [youtube_id],
                }) as any[];

                if (video.length <= 1) {
                    try {
                        await executeQuery({
                            query: query.createNewVideo,
                            values: [youtube_id, country, place, weather, type, continent, seekTo, 0],
                        }) as any[];

                        return res.json({ success: true, message: 'Request has been sent successfully! redirecting in 5s' });

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
                            message: 'Video already exist.'
                        }
                    });
                }

            } else if (!r.data.success) {
                console.log("Token is not valid")
                return res.json({
                    success: false,
                    error: {
                        message: 'Token is not valid.'
                    }
                });
            }
        }).catch((err) => {
            console.log(err);

            return res.json({
                success: false,
                error: {
                    message: 'Could not verify the token.'
                }
            });
        })

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