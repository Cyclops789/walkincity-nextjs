import { serialize } from 'cookie';
import { NextApiResponse } from 'next';

/**
 * This sets `cookie` on `res` object
 */
export const cookie = (
    res: NextApiResponse,
    cookies: { name: string; value: string | object; options: { [key: string]: any } }[],
): void => {
    let cookiesSet: string[] = [];

    cookies.forEach((cookie) => {
        const stringValue =
            typeof cookie.value === 'object' ? JSON.stringify(cookie.value) : String(cookie.value);

        if ('maxAge' in cookie.options) {
            cookie.options.expires = new Date(Date.now() + cookie.options.maxAge);
            cookie.options.maxAge /= 1000;
        }

        cookiesSet.push(serialize(cookie.name, String(stringValue), cookie.options));
    });

    res.setHeader('Set-Cookie', cookiesSet);
};
