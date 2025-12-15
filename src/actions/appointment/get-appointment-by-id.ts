'use server';

import { auth } from '@/auth';
import { baseUrl } from '../api.config';
import { formatErrorAPI } from '@/utils';
import { Appointment, AppointmentResponse } from '@/interfaces';

export const getAppointmentById = async (id: string) => {
	try {
		const session = await auth();
		const res = await fetch(`${baseUrl}/appointment/${id}`, {
			headers: {
				Authorization: `Bearer ${session?.accessToken}`,
			},
		});

		if (!res.ok) {
			const error = await res.json().catch(() => null);
			formatErrorAPI(error);
		}

		const { service, ...rest }: AppointmentResponse = await res.json();

		const appointment: Appointment = {
			...rest,
			service: {
				...service,
				duration: service.durationMinutes,
				images: service.images.map((img) => img.url),
			},
		};

		return {
			ok: true,
			appoitment: { ...appointment },
		};
	} catch (error: any) {
		return {
			ok: false,
			message: error.message,
		};
	}
};
