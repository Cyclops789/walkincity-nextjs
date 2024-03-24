import { bugFixed } from '@/helpers/mail';
import executeQuery from '@/lib/db';
import { sendMailAsAdmin } from '@/lib/mail';
import query from '@/utils/db';
import secrets from '@/utils/secrets';
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
            query: query.getVideoBugByIdWithEmail,
            values: [id],
        }) as any[];

        if(videoBug.length >= 1) {

            const options = [
                {
                    name: 'action',
                    value: action
                },
                {
                    name: 'hide',
                    value: (action == 'resolved' || action == 'not_resolved' || action == 'delete') ? 1 : 0
                }
            ];

            try {                
                await executeQuery({
                    query: query.updateField('videos_bugs', id, options),
                    values: [id],
                }) as any[];

                if(videoBug[0].by_email && action == 'resolved') {
                    await sendMailAsAdmin({
                        subject: "Bug #"+videoBug[0].id+" has been fixed.",
                        to: videoBug[0].by_email,
                        template: bugFixed(
                            videoBug[0].id,
                            videoBug[0].reason,
                            secrets.APP_URL as string
                        ),
                    });
                }

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