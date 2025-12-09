'use server';

import { Service, ServicesPagination, ServicesResponse } from '@/interfaces';
import { baseUrl } from '../api.config';

interface PaginationOptions {
	page?: number;
	limit?: number;
	query?: string;
}

export const getServicePagination = async ({
	page = 0,
	limit = 12,
	query,
}: PaginationOptions): Promise<ServicesPagination> => {
	if (isNaN(Number(page))) page = 1;
	if (page < 1) page = 1;

	if (isNaN(Number(limit))) limit = 12;
	if (limit < 1) limit = 12;

	const params = new URLSearchParams();
	params.append('limit', limit.toString());
	params.append('isActive', 'true');
	if (page > 0) {
		params.append('offset', ((page - 1) * limit).toString());
	}
	if (query) {
		params.append('serviceName', query);
	}

	const response = await fetch(`${baseUrl}/service?${params.toString()}`);

	if (!response.ok) {
		return {
			totalPages: 0,
			total: 0,
			services: [],
		};
	}

	const { services, ...rest }: ServicesResponse = await response.json();

	const arraySerice: Service[] = services.map(
		({ images, durationMinutes, ...service }) => ({
			...service,
			images: images.map((img) => img.url),
			duration: durationMinutes,
		})
	);

	return {
		totalPages: rest.page,
		total: rest.total,
		services: arraySerice,
	};
};
