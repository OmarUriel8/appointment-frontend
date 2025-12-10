import { UserRole } from '@/interfaces';
import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
	interface User extends DefaultUser {
		id: string;
		name: string;
		email: string;
		phone?: string;
		role: UserRole;
		isActive: boolean;
		token?: string;
	}

	interface Session {
		accessToken?: string;
		user: User & DefaultSession['user'];
	}

	interface JWT {
		accessToken?: string;
		user?: User;
		data?: any;
		expires?: number;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		data?: any;
		accessToken?: string;
		expires?: number; // 👈 añadimos esto
	}
}
