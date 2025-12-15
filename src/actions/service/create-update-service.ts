'use server';
import { auth } from '@/auth';
import { Service } from '@/interfaces';
import { baseUrl } from '../api.config';
import { formatErrorAPI } from '@/utils';
import { revalidatePath } from 'next/cache';

interface CreateUpdateProps {
	serviceLike: Partial<Service & { files: File[] }>;
	slugParam: string;
	imagesRemove: string[];
}
export const createUpdateService = async ({
	serviceLike,
	slugParam,
	imagesRemove = [],
}: CreateUpdateProps) => {
	try {
		const { files = [], images = [], id, duration, isActive, ...rest } = serviceLike;

		const session = await auth();
		let url = `${baseUrl}/service`;
		if (slugParam !== 'new') url += `/${id}`;
		let method = slugParam === 'new' ? 'POST' : 'PATCH';

		let newImagesNames: string[] = [];
		if (files.length > 0) {
			newImagesNames = await uploadFiles(files, session?.accessToken ?? '');
			images.push(...newImagesNames);
		}

		if (imagesRemove.length > 0) {
			await removeImages(imagesRemove, session?.accessToken ?? '');
		}
		let body = {
			...rest,
			images: images,
			durationMinutes: duration,
			isActive: isActive ? true : false,
		};

		const resp = await fetch(url, {
			body: JSON.stringify(body),
			method: method,
			headers: {
				Authorization: `Bearer ${session?.accessToken}`,
				'Content-Type': 'application/json',
			},
		});

		if (!resp.ok) {
			await removeImages(newImagesNames, session?.accessToken ?? '');
			const errorData = await resp.json().catch(() => null);

			formatErrorAPI(errorData);
		}
		const service: Service = await resp.json();

		revalidatePath('admin/services');
		revalidatePath(`admin/services/${service.slug}`);
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

const uploadFiles = async (files: File[], token: string): Promise<string[]> => {
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

const removeImages = async (images: string[], token: string) => {
	try {
		const headers: HeadersInit = {};

		headers.Authorization = `Bearer ${token}`;
		headers['Content-Type'] = 'application/json';

		const deleteImages = images.map((url) => {
			try {
				return fetch(`${baseUrl}/files/service`, {
					method: 'delete',
					headers: headers,
					body: JSON.stringify({ urlImage: url }),
				});
			} catch (error) {
				console.log(error);
			}
		});

		await Promise.all(deleteImages);
	} catch (error) {
		console.log(error);
	}
};
