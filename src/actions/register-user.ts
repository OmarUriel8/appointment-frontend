'use server';
import { User, UserRole } from '@/interfaces';
import { formatErrorAPI } from '@/utils';
import { baseUrl } from './api.config';

interface RegisterUserProps {
	name: string;
	email: string;
	password: string;
}
export const registerUser = async ({ name, email, password }: RegisterUserProps) => {
	try {
		const res = await fetch(`${baseUrl}/auth/register`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		});

		if (!res.ok) {
			const errorData = await res.json().catch(() => null);

			formatErrorAPI(errorData);
		}

		const user: User = await res.json();
		return { ok: true, user: user };
	} catch (error: any) {
		console.log(error);
		return {
			ok: false,
			message: error.message,
		};
	}
};
