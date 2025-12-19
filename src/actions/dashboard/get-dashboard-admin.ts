import { auth } from '@/auth';
import { formatDateUtc, formatErrorAPI } from '@/utils';
import { baseUrl } from '../api.config';
import { DashboardAdmin } from '@/interfaces';

export const getDashboardAdmin = async (startDate: Date, endDate: Date) => {
	try {
		const params = new URLSearchParams();
		params.append('startDate', `${formatDateUtc(startDate)}T00:00:01Z`);
		params.append('endDate', `${formatDateUtc(endDate)}T23:59:59Z`);

		const sesion = await auth();

		const res = await fetch(`${baseUrl}/dashboard/admin?${params.toString()}`, {
			headers: {
				Authorization: `Bearer ${sesion?.accessToken}`,
			},
		});

		if (!res.ok) {
			const error = await res.json().catch(() => null);
			formatErrorAPI(error);
		}

		const data: DashboardAdmin = await res.json();

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
