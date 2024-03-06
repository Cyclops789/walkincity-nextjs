import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import permissions from "./helpers/permissions";
import { getSession } from "next-auth/react";

export default withAuth(
    async function middleware(req) {
        const { pathname }: { pathname: string } = req.nextUrl;
        
        if (req.url.endsWith('/admin')) {
            return NextResponse.redirect(new URL('/admin/dashboard', req.url))
        };

        if(pathname !== '/admin/dashboard') {
            const token = await getToken({ req: req });
            const user: {
                id: number,
                username: string,
                email: string,
                role: {
                    id: number,
                    name: string,
                    permissions: string,
                }
            } = token?.user as {
                id: number,
                username: string,
                email: string,
                role: {
                    id: number,
                    name: string,
                    permissions: string,
                }
            };
    
            const rolePermissions: number[] = JSON.parse(user.role.permissions);
            const userPermissions = permissions.filter((permission) => rolePermissions.includes(permission.id));
            const id = pathname.split('/')
            const extractedID = Number(id[id.length - 1]) || null;
    
            const hasAnyPerm = userPermissions.some((permission) => {
                // Account APIs / Pages doesnt need a permission
                if (pathname.startsWith('/api/admin/account') || pathname.startsWith('/admin/account')) {
                    return true;
                };

                if (pathname.startsWith('/api/admin')) {
                    if (permission?.apiPath && pathname.includes(permission.apiPath)) {
                        return true;
                    }
                } else if (pathname.startsWith('/admin/dashboard')) {
                    if (permission?.dashboardPath && pathname.includes(permission.dashboardPath.replace('{id}', `${(extractedID ? extractedID : '')}`))) {
                        return true;
                    }
                }
                return false;
            });
        
            if (!hasAnyPerm) {
                if(pathname.startsWith('/api/admin')) {
                    return NextResponse.json({
                        success: false,
                        error: {
                            message: 'You dont have permission for this action.'
                        }
                    })
                } else {
                    const dashboardURL = new URL('/admin/dashboard', req.url);
                    dashboardURL.searchParams.append('error', 'permission');
                    
                    return NextResponse.redirect(dashboardURL);
                }
            }
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
