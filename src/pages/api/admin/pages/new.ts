import executeQuery from '@/lib/db';
import query from '@/utils/db';
import { NextApiRequest, NextApiResponse } from 'next';

interface IPageReq_ {
    name?: string;
    route?: string;
    content?: string;
    enabled?: boolean;
}

export default async function POST(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const { name, content, enabled, route }: IPageReq_ = _req.body

        if (!name || !content || !route || enabled === undefined || enabled === null) {
            return res.json({ 
                success: false,
                error: { 
                    message: 'All values are required for this action.' 
                } 
            });
        }

        const getRole = await executeQuery({
            query: query.getPageByName,
            values: [name],
        }) as any[];

        if(!getRole[0]?.name) {
            try {
                const newPage = await executeQuery({
                    query: query.createNewPage,
                    values: [content, name, enabled, route],
                }) as any;

                return res.json({
                    success: true,
                    page: newPage.insertId || [],
                    message: 'Page has been created successfully! redirecting in 5s'
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
                    message: 'Page with the same name already exist.'
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