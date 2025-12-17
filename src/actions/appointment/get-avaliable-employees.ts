'use server';
import { auth } from '@/auth';
import { baseUrl } from '../api.config';

interface Props {
	date: Date;
	time: string;
	idService: string;
}

export const getAvaliableEmployees = async ({ date, time, idService }: Props) => {
	const session = await auth();
	const newDate =
		typeof date === 'string'
			? new Date(`${date}T00:00:00`).toISOString()
			: date.toISOString();

	const params = new URLSearchParams();
	params.append('date', newDate);
	params.append('startTime', time);
	params.append('idService', idService);

	const res = await fetch(
		`${baseUrl}/appointment/available-employee?${params.toString()}`,
		{
			headers: {
				Authorization: `Bearer ${session?.accessToken}`,
			},
		}
	);

	if (!res.ok) {
		const error = await res.json().catch(() => null);
		console.log(error);
		return [];
	}

	const employees = await res.json();

	return employees;
};
