'use server';

import { User, UserRole } from '@/interfaces';
import { baseUrl } from '../api.config';
import { auth } from '@/auth';
import { formatErrorAPI } from '@/utils';
import { revalidatePath } from 'next/cache';

interface CreateUpdateProps {
	name?: string;
	email?: string;
	phone?: string;
	role?: UserRole;
	isActive?: boolean;
	password?: string;
	id: string;
}

export const createUpdateUser = async ({
	id,
	password,
	...userObject
}: CreateUpdateProps) => {
	try {
		const session = await auth();
		let url = `${baseUrl}/user`;
		if (id !== 'new') url += `/${id}`;
		let method = id === 'new' ? 'POST' : 'PATCH';

		let body = { ...userObject } as any;
		if (password !== '') {
			body.password = password;
		}

		const resp = await fetch(url, {
			body: JSON.stringify(body),
			method: method,
			headers: {
				Authorization: `Bearer ${session?.accessToken}`,
				'Content-Type': 'application/json',
			},
		});

		if (!resp.ok) {
			const errorData = await resp.json().catch(() => null);

			formatErrorAPI(errorData);
		}

		const user: User = await resp.json();

		revalidatePath('admin/users');
		revalidatePath(`admin/users/${user.id}`);

		if (user.role === 'CLIENT') {
			revalidatePath(`profile/client/${user.email}`);
		}

		if (user.role === 'EMPLOYEE') {
			revalidatePath(`profile/employee/${user.email}`);
		}

		return {
			ok: true,
			user,
		};
	} catch (error: any) {
		return {
			ok: false,
			message: error.message,
		};
	}
};
