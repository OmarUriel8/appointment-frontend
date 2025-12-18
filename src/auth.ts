import NextAuth, { CredentialsSignin } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { login } from './actions';

class InvalidLoginError extends CredentialsSignin {
	code = '';
	constructor(code: string) {
		super();
		this.code = code;
	}
}
const EXPIRES = 1 * 60 * 60;
export const { auth, handlers, signIn, signOut } = NextAuth({
	// debug: true,
	session: {
		strategy: 'jwt', // Obligatorio para controlar expiración
		maxAge: EXPIRES,
	},
	jwt: {
		maxAge: EXPIRES,
	},
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
					console.log({ err });
					throw new InvalidLoginError(err.message);
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
				token.expires = Date.now() + EXPIRES * 1000;
			}

			const expires: number = Number(token.expires);

			// Si el token ya expiró → sesión fuera
			if (Date.now() > expires) {
				return null;
			}
			return token;
		},
		session({ session, token, user }) {
			if (!token?.accessToken) {
				return null as any;
			}

			session.accessToken = token.accessToken as string;
			session.user = token.data as any;
			return session;
		},
	},
});
