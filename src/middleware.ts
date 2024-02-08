//export { default } from "next-auth/middleware"
import { withAuth } from "next-auth/middleware"

export default withAuth({
    pages: {
        signIn: '/auth/login',
    }
})

export const config = {
    matcher: [
        /*
         * Match:
         * - api requests for admin section
         * - admin paths except '/admin/login' | '/admin/register'
         */
        '/api/((?!admin/login|admin/register).*)',
        '/admin/((?!login|register).*)',
    ],
};
