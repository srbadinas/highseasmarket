import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
export default withAuth(
    function middleware(req) {
        if (
            req.nextUrl.pathname.includes("/dashboard/users") &&
            req.nextauth.token?.user_role_id != 1
        ) {
            return new NextResponse("You are not authorized to access this module!");
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
        '/api/dashboard/:path*',
        '/listings/:slug/productrequest/:path*',
    ]
}

// export function middleware(req) {
//     if (req.nextUrl.pathname.startsWith('/dashboard')) {
//         console.log('pathnam: ', req.nextUrl.pathname);
//     }
// }

