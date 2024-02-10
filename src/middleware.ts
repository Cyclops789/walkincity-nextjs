import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        if(req.url?.endsWith('/admin')) {
            return NextResponse.redirect(new URL('/admin/dashboard', req.url))
        }
    },
    {
        pages: {
            signIn: '/auth/login',
        }
    })

export const config = {
    matcher: [
        /**
         * Match all requests inside:
         * 
         * - /api/admin
         * - /admin
         */
        '/api/admin/:path*',
        '/admin/:path*',
    ],
};
