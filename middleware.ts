import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from './lib/jwt';

export default withAuth(
    async function middleware(req) {
        const token = await getToken({ req, secret: process.env.SECRET_KEY, raw: true });
        if (!token) return NextResponse.redirect(new URL('/login', req.url));

        if (
            req.nextUrl.pathname.includes("/dashboard/users") &&
            req.nextauth.token?.user_role_id != 1
        ) {
            return NextResponse.json(
                { error: "You are not authorized to access this module!" },
                { status: 401 }
            );
        }
    }, {
    callbacks: {
        authorized: ({ token }) => !!token
    },
    pages: {
        signIn: '/login',
        signOut: '/login',
    }
}
)

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/listings/:slug/productrequest/:path*'
    ],
}