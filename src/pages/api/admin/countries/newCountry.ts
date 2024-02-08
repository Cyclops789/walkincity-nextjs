import executeQuery from '@/lib/db';
import query from '@/utils/db';
import { NextApiRequest, NextApiResponse } from 'next';

interface ICountry {
    id: number;
    short_name: string;
    long_name: string;
    border_color: string;
    continent: string;
}

export default async function POST(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const { short_name, long_name, border_color, continent }: ICountry = _req.body

        if (!short_name || !long_name || !border_color || !continent) {
            return res.json({ 
                success: false,
                error: { 
                    message: 'All values are required for this action.' 
                } 
            });
        }

        const country = await executeQuery({
            query: query.getCountryByShortName,
            values: [short_name],
        }) as any;

        if(!country[0]?.short_name) {
            try {
                const newCountry = await executeQuery({
                    query: query.createNewCountry,
                    values: [short_name, long_name, border_color, continent],
                }) as any;

                return res.json({
                    success: true,
                    role: newCountry.insertId || [],
                    message: 'Country has been created successfully! redirecting in 5s'
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
                    message: 'Country with the same name already exist.'
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