import { requestAccepted, requestDeclined } from '@/helpers/mail';
import executeQuery from '@/lib/db';
import { sendMailAsVerfiy } from '@/lib/mail';
import query from '@/utils/db';
import secrets from '@/utils/secrets';
import { NextApiRequest, NextApiResponse } from 'next';

interface IRequestVideo {
    id?: string | number;
    action?: string;

    country?: string;
    place?: string;
    weather?: string;
    seekTo?: string | number;

    reason?: string;
}


export default async function POST(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id, action, country, place, weather, seekTo, reason }: IRequestVideo = _req.body

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

        if(action === 'reject' && (reason === '' || reason === undefined)) {
            return res.json({ 
                success: false, 
                error: {
                    message: 'You must specify an action with rejection!'
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
                    await sendMailAsVerfiy({
                        subject: "Your request has been declined.",
                        to: requestedVideo[0].by_email,
                        template: requestDeclined(secrets.APP_URL as string, reason as string)
                    });

                    return res.json({ success: true, message: 'Request has been rejected successfully!' });
                }

                const forwadedVideo = await executeQuery({
                    query: query.createNewVideo,
                    values: [
                        requestedVideo[0].vid,
                        country ? country : requestedVideo[0].country,
                        place ? place : requestedVideo[0].place,
                        weather ? weather : requestedVideo[0].weather,
                        requestedVideo[0].type,
                        requestedVideo[0].continent,
                        seekTo ? seekTo : requestedVideo[0].seekTo,
                        1
                    ],
                }) as any[] | any;

                const targetedCountry = await executeQuery({
                    query: query.getCountryByLongName,
                    values: [requestedVideo[0].country],
                }) as any[];

                if(targetedCountry.length <= 0) {
                    return res.json({
                        success: false,
                        error: {
                            message: 'Targeted country was not found.'
                        }
                    });
                }

                await sendMailAsVerfiy({
                    subject: "Your request has been accepted!",
                    to: requestedVideo[0].by_email,
                    template: requestAccepted(secrets.APP_URL as string, targetedCountry[0].id, forwadedVideo.insertId)
                });

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