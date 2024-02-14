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
        const { id, short_name, long_name, border_color, continent }: ICountry = _req.body

        if (!id || !short_name || !long_name || !border_color || !continent) {
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
    
        const country = await executeQuery({
            query: query.getCountryByID,
            values: [id],
        }) as any[];

        if(country.length >= 1) {
            const options = [
                {
                    name: 'short_name',
                    value: short_name
                },
                {
                    name: 'long_name',
                    value: long_name
                },
                {
                    name: 'border_color',
                    value: border_color
                },
                {
                    name: 'continent',
                    value: continent
                },
            ];

            try {
                
                await executeQuery({
                    query: query.updateField('countries', id, options),
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
                    message: 'Country Not Found.' 
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