'use server';
import { User } from '@/interfaces';
import { formatErrorAPI } from '@/utils';
import { signIn } from '@/auth';
import { baseUrl } from '../api.config';

export const login = async (email: string, password: string): Promise<User> => {
	const dataString = JSON.stringify({ email, password });
	const resp = await fetch(`${baseUrl}/auth/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: dataString,
	});

	if (!resp.ok) {
		const errorData = await resp.json().catch(() => null);

		formatErrorAPI(errorData);
	}

	const user: User = await resp.json();

	return user;
};

export const loginApp = async (email: string, password: string) => {
	try {
		await signIn('credentials', {
			email,
			password,
		});

		return { ok: true };
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: 'No se pudo iniciar sesión',
		};
	}
};
