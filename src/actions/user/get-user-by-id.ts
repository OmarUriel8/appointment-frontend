import { auth } from '@/auth';
import { User } from '@/interfaces';
import { baseUrl } from '../api.config';

export const getUserById = async (id: string) => {
	try {
		const session = await auth();
		const resp = await fetch(`${baseUrl}/user/${id}`, {
			headers: {
				Authorization: `Bearer ${session?.accessToken}`,
			},
		});

		if (!resp.ok) return null;

		const user: User = await resp.json();

		return user;
	} catch (error) {
		return null;
	}
};
