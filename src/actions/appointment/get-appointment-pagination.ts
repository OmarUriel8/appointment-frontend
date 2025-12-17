'use server';
import { auth } from '@/auth';
import { baseUrl } from '../api.config';
import { ApiAppointment, AppointmentStatus } from '@/interfaces';
import { formatDate } from '@/utils';

interface AppointmentProps {
	page?: number;
	limit?: number;
	status?: AppointmentStatus;
	date?: Date;
	id?: number | undefined;
}

export const getAppointmentPagination = async ({
	page = 0,
	limit = 12,
	status = undefined,
	date = undefined,
	id = undefined,
}: AppointmentProps): Promise<ApiAppointment> => {
	if (isNaN(Number(page))) page = 1;
	if (page < 1) page = 1;

	if (isNaN(Number(limit))) limit = 12;
	if (limit < 1) limit = 12;

	if (isNaN(Number(id))) id = undefined;
	if (id && id < 1) id = undefined;

	const params = new URLSearchParams();
	params.append('limit', limit.toString());

	if (page > 0) {
		params.append('offset', ((page - 1) * limit).toString());
	}
	if (status) {
		params.append('appointmentStatus', status);
	}
	if (date) {
		params.append('appointmentDate', date.toISOString());
	}

	if (id && id > 0) {
		params.append('appointmentId', id.toString());
	}

	const session = await auth();

	const res = await fetch(`${baseUrl}/appointment?${params.toString()}`, {
		headers: {
			Authorization: `Bearer ${session?.accessToken}`,
		},
	});

	if (!res.ok) {
		return {
			appointments: [],
			pages: 0,
			total: 0,
		};
	}

	const appointments: ApiAppointment = await res.json();

	return appointments;
};
