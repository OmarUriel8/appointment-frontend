'use server';

import { auth } from '@/auth';
import { baseUrl } from '../api.config';
import { formatErrorAPI } from '@/utils';
import { Service } from '@/interfaces';
import { revalidatePath } from 'next/cache';

interface Props {
	isActive: boolean;
	id: string;
}
export const updateStatusService = async ({ isActive, id }: Props) => {
	try {
		const session = await auth();
		let url = `${baseUrl}/service/${id}`;

		let body = { isActive };

		const resp = await fetch(url, {
			body: JSON.stringify(body),
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${session?.accessToken}`,
				'Content-Type': 'application/json',
			},
		});

		if (!resp.ok) {
			const errorData = await resp.json().catch(() => null);

			formatErrorAPI(errorData);
		}
		const service: Service = await resp.json();

		revalidatePath('admin/services');
		revalidatePath(`admin/services/${service.id}`);
		revalidatePath(`services`);
		revalidatePath(`service/${service.slug}`);
		return {
			ok: true,
			service: service,
		};
	} catch (error: any) {
		return {
			ok: false,
			message: error.message,
		};
	}
};
