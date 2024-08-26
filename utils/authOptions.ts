import { LoggedInUserDto } from "@/types/objects/UserDto";
import { UserTypes } from "@/types/UserTypes";
import { NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const { email, password } = credentials!;
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/auth/login`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    }),
                });

                if (!res.ok) return null;

                const data: LoggedInUserDto = await res.json();

                const user = {
                    id: data.id,
                    token: data.token,
                    name: data.firstname + ' ' + data.lastname,
                    phone: '',
                    role: UserTypes[data.user_type_id],
                    picture: '',
                };

                return Promise.resolve(user);
            },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }: { token: JWT, user: User }) {
            if (user) {
                token.user = user;
            };

            return token;
        },
        async session({ session, token }: { session: Session, token: JWT }) {
            session.user = token.user;
            return session;
        },
    },
}