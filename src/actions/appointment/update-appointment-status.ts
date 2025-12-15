'use server';

import { auth } from '@/auth';
import { AppointmentStatus } from '@/interfaces';
import { baseUrl } from '../api.config';
import { formatAppointmentStatus, formatErrorAPI } from '@/utils';
import { revalidatePath } from 'next/cache';

export const updateAppointmentStatus = async (
	id: number,
	status: AppointmentStatus,
	notes?: string
) => {
	try {
		const session = await auth();

		const body: any = {
			status: status,
		};
		if (status === 'CANCELLED') {
			body.notes = notes;
		}

		const headers = {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session?.accessToken}`,
		};

		const res = await fetch(`${baseUrl}/appointment/change-status/${id}`, {
			body: JSON.stringify(body),
			method: 'PATCH',
			headers,
		});

		if (!res.ok) {
			const error = await res.json().catch(() => null);
			formatErrorAPI(error);
		}

		revalidatePath(`/admin/appointments`);
		revalidatePath(`/admin/appointments/view/${id}`);
		revalidatePath(`/admin/appointments/client/${id}`);
		revalidatePath(`/admin/appointments/${id}`);
		return {
			ok: true,
			message: `Estatus actualizado a ${formatAppointmentStatus(status)}`,
		};
	} catch (error: any) {
		return {
			ok: false,
			message: error.message,
		};
	}
};
