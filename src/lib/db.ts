import mysql from 'serverless-mysql';
import secrets from "../utils/secrets";

const db = mysql({
    config: {
        host: secrets.MYSQL_HOST,
        port: secrets.MYSQL_PORT,
        database: secrets.MYSQL_DATABASE,
        user: secrets.MYSQL_USER,
        password: secrets.MYSQL_PASSWORD
    }
});

interface IQuery {
    query: string;
    values: any;
}

export default async function executeQuery({ query, values }: IQuery) {
    try {
        const results = await db.query(query, values);
        await db.end();
        return results as any;
    } catch (error) {
        return { error };
    }
}

export async function executeQueryReturnsJSON({ query, values }: IQuery) {
    try {
        const rows: any[] = await db.query(query, values);
        const jsonData = JSON.parse(JSON.stringify(rows));
        
        await db.end();
        return jsonData;
    } catch (error) {
        return { error };
    }
}