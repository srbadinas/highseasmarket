import { signJwtAccessToken } from '@lib/jwt';
import { query } from '@utils/db';
import bcrypt from 'bcryptjs/dist/bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                try {

                    // api/login
                    const [user] = await query(`SELECT * FROM users WHERE email=?`, [credentials.email]);

                    let isPasswordValid = await bcrypt.compareSync(credentials.password, user.password_hash);

                    if (!user || !isPasswordValid) {
                        throw new Error('Invalid email or password.');
                    }

                    // end of api/login

                    const {password_hash, ...loggedInUser} = user;

                    const accessToken = signJwtAccessToken(loggedInUser);
                    const result = {
                        ...loggedInUser,
                        access_token: accessToken
                    };

                    return Promise.resolve(result);

                } catch (error) {
                    throw new Error(error.message);
                }
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = token;
            return session;
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }