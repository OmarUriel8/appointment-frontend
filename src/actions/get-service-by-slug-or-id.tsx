import { ApiService, Service } from '@/interfaces';
import { baseUrl } from './api.config';

export const getServiceByslugOrId = async (term: string): Promise<Service | null> => {
	const resp = await fetch(`${baseUrl}/service/${term}`);

	if (!resp.ok) return null;

	const { images, durationMinutes, ...service }: ApiService = await resp.json();

	return {
		...service,
		images: images.map((img) => img.url),
		duration: durationMinutes,
	};
};
