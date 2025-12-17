'use server';
import { auth } from '@/auth';
import { Appointment, AppointmentStatus } from '@/interfaces';
import { baseUrl } from '../api.config';
import { formatErrorAPI } from '@/utils';
import { revalidatePath } from 'next/cache';

interface CreateUpdateProps {
	clientId: string;
	serviceId: string;
	employeeId: string;
	notes: string;
	date: Date;
	startTime: string;
	status: AppointmentStatus;
	id: string;
}
export const createUpdateAppointment = async (createUpdateProps: CreateUpdateProps) => {
	try {
		const {
			id,
			employeeId,
			clientId,
			serviceId,
			notes,
			date,
			startTime,
			status,
			...rest
		} = createUpdateProps;

		const sesion = await auth();
		const url = id === 'new' ? `${baseUrl}/appointment` : `${baseUrl}/appointment/${id}`;

		const body: any = { clientId, serviceId, notes, date, startTime, status };
		if (employeeId !== '') {
			body.employeeId = employeeId;
		}

		const method = id === 'new' ? 'POST' : 'PATCH';

		const res = await fetch(url, {
			body: JSON.stringify(body),
			method: method,
			headers: {
				Authorization: `Bearer ${sesion?.accessToken}`,
				'Content-Type': 'application/json',
			},
		});

		if (!res.ok) {
			const error = await res.json().catch(() => null);
			formatErrorAPI(error);
		}

		const appointment: Appointment = await res.json();

		revalidatePath(`/admin/appointments`);
		revalidatePath(`/admin/appointments/view/${id}`);
		revalidatePath(`/admin/appointments/client/${id}`);
		revalidatePath(`/admin/appointments/${id}`);

		return {
			ok: true,
			appointment,
		};
	} catch (error: any) {
		return {
			ok: false,
			message: error.message,
		};
	}
};
