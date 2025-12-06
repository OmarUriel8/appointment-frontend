import NextAuth, { CredentialsSignin } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { login } from './actions';

export const { auth, handlers, signIn, signOut } = NextAuth({
	// debug: true,
	providers: [
		Credentials({
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const parseCredentials = z
					.object({
						email: z.email(),
						password: z.string().min(6),
					})
					.safeParse(credentials);

				if (!parseCredentials.success) throw new Error(parseCredentials.error.message);

				const { email, password } = parseCredentials.data;

				try {
					const user = await login(email, password);

					return user;
				} catch (err: any) {
					throw new Error(err.message);
				}
			},
		}),
	],
	pages: {
		signIn: '/auth/login',
		newUser: '/auth/new-acount',
	},
	callbacks: {
		jwt({ token, user }) {
			if (user) {
				token.data = user;
				token.accessToken = user.token;
			}
			return token;
		},
		session({ session, token, user }) {
			session.accessToken = token.accessToken as string;
			session.user = token.data as any;
			return session;
		},
	},
});
