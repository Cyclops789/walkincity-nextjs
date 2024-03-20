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
    reason: string | undefined;
    token: string | undefined;
    email: string | undefined;
}

export default async function POST(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const { vid, reason, token, email }: INewVideoRequest_ = _req.body

        if (!token) {
            return res.json({
                success: false,
                error: {
                    message: 'Recaptcha token is required.'
                }
            });
        }

        if (!reason) {
            return res.json({
                success: false,
                error: {
                    message: 'Reason is required for this action.'
                }
            });
        }

        // Verify the recaptcha token
        axios.post('https://www.google.com/recaptcha/api/siteverify', {}, {
            params: {
                secret: process.env.RECAPTCHA_SITE_SECRET || '_invalid_secret',
                response: token
            }
        }).then(async (r) => {
            if (r.data.success) {

                if (vid) {
                    try {
                        const video = await executeQuery({
                            query: query.getVideoByVid,
                            values: [vid],
                        }) as any[];
        
                        if (!video[0]?.vid) {
                            return res.json({
                                success: false,
                                error: {
                                    message: `Video was not found.`
                                }
                            });
                        }
                    } catch (error) { }
                }

                try {
                    await executeQuery({
                        query: query.createNewVideoBug,
                        values: [vid ? vid : null, reason, email ? email : null, 'to_fix'],
                    }) as any[] | any;

                    return res.json({ success: true, message: 'Report has been sent successfully!' });

                } catch (error) {
                    console.error(error);

                    return res.status(500).json({
                        success: false,
                        error: {
                            message: 'Internal server error.'
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

        return res.json({
            success: false,
            error: {
                message: 'Failed to send the request, please try again.'
            }
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
}