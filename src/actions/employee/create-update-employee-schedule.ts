'use server';
import { auth } from '@/auth';
import { EmployeeSchedule } from '@/interfaces';
import { baseUrl } from '../api.config';
import { formatErrorAPI } from '@/utils';
import { revalidatePath } from 'next/cache';

export const createUpdateEmployeeSchedule = async (
	schedules: EmployeeSchedule[],
	idEmployee: string
) => {
	try {
		const session = await auth();
		const method = schedules[0].id !== '' ? 'PATCH' : 'POST';
		let message = '';
		const headers = {
			Authorization: `Bearer ${session?.accessToken}`,
			'content-type': 'Application/json',
		};

		if (method === 'POST') {
			const url = `${baseUrl}/employee-schedule/${idEmployee}`;

			const res = await fetch(url, {
				method: method,
				body: JSON.stringify(
					schedules.map(({ id, ...rest }) => ({
						...rest,
					}))
				),
				headers: headers,
			});

			if (!res.ok) {
				const error = res.json().catch(() => null);
				formatErrorAPI(error);
			}

			message = 'Horarios creados';
		} else {
			const updatePromise = schedules.map(({ id, ...rest }) => {
				return fetch(`${baseUrl}/employee-schedule/${id}`, {
					body: JSON.stringify(rest),
					headers: headers,
					method: method,
				});
			});

			const updatedPromise = await Promise.all(updatePromise);

			const errors: any[] = [];
			for (const prom of updatedPromise) {
				if (!prom.ok) {
					const err = await prom.json().catch(() => message);
					errors.push(err);
				}
			}

			if (errors.length > 0) {
				return {
					ok: false,
					message: errors.map((e) => e.message).join(', '),
				};
			}
			message = 'Horarios actualizados';
		}

		revalidatePath(`/admin/employees/${idEmployee}`);

		return { ok: true, message: message };
	} catch (error: any) {
		return {
			ok: false,
			message: error.message,
		};
	}
};
