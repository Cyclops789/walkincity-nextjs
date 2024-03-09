import { NextApiHandler, NextApiRequest } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";
import executeQuery from '@/lib/db';
import query from '@/utils/db';
import { getToken } from 'next-auth/jwt';

export const config = {
    api: {
        bodyParser: false,
    },
};

const fileExists = async (filePath: string) => {
    try {
        await fs.access(filePath, fs.constants.F_OK);
        return true;
    } catch (err) {
        return false;
    }
}

const readFile = (
    req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    const options: formidable.Options = {};

    options.uploadDir = path.join(process.cwd(), "/public/storage/uploads/profiles");
    options.keepExtensions = true;
    options.allowEmptyFiles = false;
    options.multiples = false;

    options.filter = ({ name, originalFilename, mimetype }) => {
        if (!(originalFilename && name)) return false;
        
        return (mimetype && mimetype.includes("image") ? true : false);
    };


    options.maxFileSize = 4000 * 1024 * 1024;
    const form = formidable(options);

    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });
};

const handler: NextApiHandler = async (req, res) => {
    try {
        await fs.readdir(path.join(process.cwd() + "/public", "/storage", "/uploads", "/profiles"))
    } catch (error) {
        await fs.mkdir(path.join(process.cwd() + "/public", "/storage", "/uploads", "/profiles"));
    }

    const token = await getToken({ req });
    const { id: userID }: { id: number } = token?.user as { id: number };
    const { files } = await readFile(req);

    const user = await executeQuery({
        query: query.getUserByID,
        values: [userID]
    }) as any[];

    if(user[0].image !== "placeholder.png") {
        try {
            const filePath = path.join(process.cwd() + "/public", "/storage", "/uploads", "/profiles", `/${user[0].image}`);
            const fileExist = await fileExists(filePath);
            
            if(fileExist) {
                await fs.unlink(filePath);
            }
        } catch (error) {
            console.log(error)   
        }
    }

    await executeQuery({
        query: query.updateField('users', userID, [ { name: 'image', value: path.basename((files.image as any)?.path) }]),
        values: []
    });

    res.json({ 
        success: true,
        message: 'Profile has been updated successfully.'
    });
};

export default handler;
