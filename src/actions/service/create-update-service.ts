'use server';
import { auth } from '@/auth';
import { Service } from '@/interfaces';
import { baseUrl } from '../api.config';
import { formatErrorAPI } from '@/utils';
import { revalidatePath } from 'next/cache';

interface CreateUpdateProps {
	serviceLike: Partial<Service & { files: File[] }>;
}
export const createUpdateService = async ({ serviceLike }: CreateUpdateProps) => {
	try {
		const { files = [], images = [], id, ...rest } = serviceLike;

		const session = await auth();
		let url = `${baseUrl}/service`;
		if (id !== 'new') url += `/${id}`;
		let method = id === 'new' ? 'POST' : 'PATCH';

		if (files.length > 0) {
			const newImagesNames = await uploadFiles(files);
			images.push(...newImagesNames);
		}

		let body = { ...rest, images: images };

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
		const service: Service = await resp.json();

		revalidatePath('admin/dashboard/services');
		revalidatePath(`admin/dashboard/services/${service.id}`);
		revalidatePath(`services`);
		revalidatePath(`service/${service.slug}`);
		revalidatePath(`/`);
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

const uploadFiles = async (files: File[], token: string = ''): Promise<string[]> => {
	const formData = new FormData();
	files.forEach((file) => {
		formData.append('files', file);
	});

	const headers: HeadersInit = {};
	if (token !== '') {
		headers.Authorization = `Bearer ${token}`;
	}

	const resp = await fetch(`${baseUrl}/files/service`, {
		method: 'POST',
		body: formData,
		headers,
	});

	if (!resp.ok) return [];

	const images: string[] = await resp.json();
	return images;
};
