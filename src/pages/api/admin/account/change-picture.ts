import executeQuery from '@/lib/db';
import query from '@/utils/db';
import { v4 as uuidv4 } from "uuid";
import { writeFile } from 'fs/promises'
import { IncomingForm } from 'formidable';
import { getToken } from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const token = await getToken({ req });
        const { id: userID }: { id: number } = token?.user as { id: number };

        const data = await req.json();
        const file: File | null = data.get('file') as unknown as File;

        if (!file) {
            console.log('There is no file')
            return res.json({ success: false });
        };
        console.log('There is a file, ', file.name)
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const getFileName = (file: string): string => { return uuidv4() + "-" + new Date().getTime() + "." + file.substring( file.lastIndexOf(".") + 1, file.length ) };
        const filename = getFileName(file.name);
        console.log(filename);
        const path = `/public/storage/uploads/profiles/${filename}`;
        
        await writeFile(path, buffer);

        await executeQuery({
            query: query.updateField('users', userID, [ { name: 'image', value: filename }]),
            values: []
        });
        return res.json({ success: true });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: true,
            error: {
                message: 'Internal Server Error'
            }
        });
    }
};

export const config = {
    api: {
        bodyParser: false,
    },
};