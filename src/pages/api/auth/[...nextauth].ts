import NextAuth from "next-auth";
import { executeQueryReturnsJSON } from "@/lib/db";
import query from '@/utils/db';
import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiRequest, NextApiResponse } from "next";
import type { NextAuthOptions } from 'next-auth';
import { verifyHash } from "@/lib/password";
import axios from "axios";

interface IUserReturns {
    id: number;
    username: string;
    email: string;
    password: string;
    role: number;
    created_at: string;
}

interface IUserWithoutPassword {
    id: number;
    username: string;
    email: string;
    role: number;
    created_at: string;
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            id: 'credentials',
            // @ts-ignore
            async authorize(credentials, req) {
                // here you write logic that takes the credentials and
                // submit to backend server and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                try {
                    // Verify the credentials
                    if (!credentials?.email || !credentials?.password || !credentials?.token) {
                        return null;
                    }
                
                    // Verify the recaptcha token
                    const response = await axios.post(
                        'https://www.google.com/recaptcha/api/siteverify',
                        {},
                        {
                            params: {
                                secret: process.env.RECAPTCHA_SITE_SECRET || '_invalid_secret',
                                response: credentials?.token
                            }
                        }
                    );
                
                    if (response.data.success) {
                        const user = await executeQueryReturnsJSON({
                            query: query.getUserByEmail,
                            values: [credentials?.email],
                        }) as IUserReturns[];
                
                        if (user.length >= 1) {
                            const verify = verifyHash(credentials?.password as string, user[0].password);
                
                            if (verify) {
                                const role = await executeQueryReturnsJSON({
                                    query: query.getRoleByID,
                                    values: [user[0].role],
                                }) as any[];
                
                                const userReturns: IUserWithoutPassword = {
                                    id: user[0].id,
                                    username: user[0].username,
                                    email: user[0].email,
                                    role: role[0],
                                    created_at: user[0].created_at
                                };
                
                                return userReturns;
                            } else {
                                return null;
                            }
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error("Error:", error);
                    return null;
                }                
            }
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.user = user;
            }
            return token;
        },
        session: async ({ session, token }: { session: any, token: any }) => {
            session.user = token.user;

            return session;
        },
    },
    debug: true,
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/login'
    }
}

const Auth = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, authOptions);

export default Auth;