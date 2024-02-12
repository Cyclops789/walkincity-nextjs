import NextAuth from "next-auth";
import { executeQueryReturnsJSON } from "@/lib/db";
import query from '@/utils/db';
import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiRequest, NextApiResponse } from "next";
import type { NextAuthOptions } from 'next-auth';
import { verifyHash } from "@/lib/password";

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
                    const user = await executeQueryReturnsJSON({
                        query: query.getUserByEmail,
                        values: [credentials?.email],
                    }) as IUserReturns[]; 

                    if (user.length >= 1) {
                        const verify = verifyHash(credentials?.password as string, user[0].password);

                        if(verify) {
                            const role = await executeQueryReturnsJSON({
                                query: query.getRoleByID,
                                values: [user[0].role],
                            }) as any[];         

                            return { 
                                id: user[0].id,
                                username: user[0].username,
                                email: user[0].email,
                                role: role[0],
                                created_at: user[0].created_at
                            } as IUserWithoutPassword;
                        } else {
                            return null;
                        }

                    } else {
                        return null;
                    }
                } catch (error) {
                    throw new Error(error as any)
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
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/login'
    }
}

const Auth = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, authOptions);

export default Auth;