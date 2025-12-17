'use server';
import { auth } from '@/auth';
import { baseUrl } from '../api.config';

export const getAvaliableHours = async (date: Date) => {
	const session = await auth();
	const newDate =
		typeof date === 'string'
			? new Date(`${date}T00:00:00`).toISOString()
			: date.toISOString();

	console.log({ newDate });
	const res = await fetch(`${baseUrl}/appointment/available-hours?date=${newDate}`, {
		headers: {
			Authorization: `Bearer ${session?.accessToken}`,
		},
	});

	if (!res.ok) {
		const error = await res.json().catch(() => null);
		console.log(error);
		return [];
	}

	const hours = await res.json();

	return hours;
};
