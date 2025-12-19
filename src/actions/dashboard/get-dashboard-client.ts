import { auth } from '@/auth';
import { formatDateUtc, formatErrorAPI } from '@/utils';
import { baseUrl } from '../api.config';
import { DashboardClient } from '@/interfaces';

export const getDashboardClient = async (startDate: Date, endDate: Date) => {
	try {
		const params = new URLSearchParams();
		params.append('startDate', `${formatDateUtc(startDate)}T00:00:01Z`);
		params.append('endDate', `${formatDateUtc(endDate)}T23:59:59Z`);

		const sesion = await auth();

		const res = await fetch(`${baseUrl}/dashboard/client?${params.toString()}`, {
			headers: {
				Authorization: `Bearer ${sesion?.accessToken}`,
			},
		});

		if (!res.ok) {
			const error = await res.json().catch(() => null);
			formatErrorAPI(error);
		}

		const data: DashboardClient = await res.json();

		return {
			ok: true,
			data,
		};
	} catch (error: any) {
		return {
			ok: false,
			message: error.message,
		};
	}
};
