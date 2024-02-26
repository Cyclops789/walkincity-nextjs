import executeQuery from '@/lib/db';
import query from '@/utils/db';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import YouTubeVideoId from '@/helpers/youtube';
import { generateToken } from '@/lib/token';
import { sendMailAsVerfiy } from '@/lib/mail';
import { verifyRequest } from '@/helpers/mail';
import secrets from '@/utils/secrets';

interface INewVideoRequest_ {
    vid: string | undefined;
    country: string | undefined;
    place: string | undefined;
    token: string | undefined;
    type: string | undefined;
    weather: string | undefined;
    continent: string | undefined;
    seekTo: string | undefined;
    by_email: string | undefined;
}

export default async function POST(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const { vid, country, place, token, type, weather, continent, seekTo, by_email }: INewVideoRequest_ = _req.body

        if (!token) {
            return res.json({
                success: false,
                error: {
                    message: 'Recaptcha token is required.'
                }
            });
        }

        if (!vid || !country || !place || !type || !weather || !continent || !seekTo || !by_email) {
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
                const targetedCountry = await executeQuery({
                    query: query.getCountryByLongName,
                    values: [country],
                }) as any[];
    
                if(targetedCountry.length <= 0) {
                    return res.json({
                        success: false,
                        error: {
                            message: 'Targeted country was not found.'
                        }
                    });
                }

                const video = await executeQuery({
                    query: query.getVideoByVid,
                    values: [youtube_id],
                }) as any[];

                const videoRequest = await executeQuery({
                    query: query.getVideoRequestByVid,
                    values: [youtube_id],
                }) as any[];

                if (!video[0]?.vid && !videoRequest[0]?.vid) {
                    try {
                        const newRequestVideo = await executeQuery({
                            query: query.createNewVideosRequests,
                            values: [youtube_id, country, place, weather, type, seekTo, continent, by_email],
                        }) as any[] | any;

                        console.log(newRequestVideo)

                        const token = await generateToken({ videoID: newRequestVideo.insertId });

                        await sendMailAsVerfiy({
                            to: by_email,
                            template: verifyRequest(country, place, vid, secrets.APP_URL as string, token)
                        })

                        return res.json({ success: true, message: 'A verification email has been sent, please check your inbox!' });

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
                            message: `Video${video[0]?.vid ? " " : videoRequest[0]?.vid && " request " }already exist.`
                        }
                    });
                }

            } else if (!r.data.success) {
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