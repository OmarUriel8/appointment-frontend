'use server';

import { auth } from '@/auth';
import { formatErrorAPI } from '@/utils';
import { ApiUser, UserRole } from '@/interfaces';
import { baseUrl } from '../api.config';

interface PaginationOptions {
	page?: number;
	limit?: number;
	role?: UserRole | 'all';
	isActive?: boolean;
}

export const getUsers = async ({
	page = 0,
	limit = 10,
	role = 'all',
	isActive = undefined,
}: PaginationOptions) => {
	try {
		const session = await auth();
		if (isNaN(Number(page))) page = 1;
		if (page < 1) page = 1;

		if (isNaN(Number(limit))) limit = 12;
		if (limit < 1) limit = 12;

		const params = new URLSearchParams();
		params.append('limit', limit.toString());
		if (page > 0) {
			params.append('offset', ((page - 1) * limit).toString());
		}
		if (isActive !== undefined) {
			params.append('isActive', isActive ? 'true' : 'false');
		}

		if (role != 'all') {
			params.append('role', role);
		}
		const response = await fetch(`${baseUrl}/user?${params.toString()}`, {
			headers: {
				Authorization: `Bearer ${session?.accessToken}`,
			},
		});

		if (!response.ok) {
			const erroData = await response.json().catch(() => null);
			formatErrorAPI(erroData);
		}

		const { pages, users }: ApiUser = await response.json();
		return {
			ok: true,
			totalPages: pages,
			users: users,
		};
	} catch (error: any) {
		console.log(error);
		return {
			ok: false,
			message: error.message,
		};
	}
};
