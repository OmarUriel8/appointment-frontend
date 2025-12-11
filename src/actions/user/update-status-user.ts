'use server';

import { User, UserRole } from '@/interfaces';
import { baseUrl } from '../api.config';
import { auth } from '@/auth';
import { formatErrorAPI } from '@/utils';
import { revalidatePath } from 'next/cache';

interface CreateUpdateProps {
	isActive: boolean;

	id: string;
}

export const updateStatusUser = async ({ id, isActive }: CreateUpdateProps) => {
	try {
		const session = await auth();
		let url = `${baseUrl}/user`;
		if (id !== 'new') url += `/${id}`;
		let method = id === 'new' ? 'POST' : 'PATCH';

		let body = { isActive };

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

		revalidatePath('admin/dashboard/users');
		revalidatePath(`admin/dashboard/users/${user.id}`);
		revalidatePath(`/`);
		if (user.role === 'CLIENT') {
			revalidatePath('admin/dashboard/clients');
			revalidatePath(`admin/dashboard/clients/${user.id}`);
		}
		if (user.role === 'EMPLOYEE') {
			revalidatePath('admin/dashboard/employees');
			revalidatePath(`admin/dashboard/employees/${user.id}`);
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
