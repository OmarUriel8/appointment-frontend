'use server';

import { auth } from '@/auth';
import { baseUrl } from '../api.config';
import { formatDateString, formatErrorAPI, formatTime } from '@/utils';
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

		const { startTime, endTime, date, ...appointment }: Appointment = {
			...rest,
			service: {
				...service,
				duration: service.durationMinutes,
				images: service.images.map((img) => img.url),
			},
		};

		return {
			ok: true,
			appoitment: {
				...appointment,
				startTime: formatTime(startTime),
				endTime: formatTime(endTime),
				date: new Date(`${date}T00:00:00`),
			},
		};
	} catch (error: any) {
		return {
			ok: false,
			message: error.message,
		};
	}
};
