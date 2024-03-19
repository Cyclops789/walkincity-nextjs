import executeQuery from "@/lib/db";
import query from "@/utils/db";

export async function generateToken({length = 32, videoID} : { length?: number, videoID: number }): Promise<string> {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    
    let token = '';
    
    for (let i = 0; i < length; i++) {
        token += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    await executeQuery({
        query: query.createNewToken,
        values: [token, videoID]
    });

    return token;
}

