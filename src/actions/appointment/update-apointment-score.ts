'use server';

import { auth } from '@/auth';
import { baseUrl } from '../api.config';
import { formatErrorAPI } from '@/utils';
import { revalidatePath } from 'next/cache';

interface Props {
	id: number;
	comments: string;
	score: number;
}
export const updateAppointmentScore = async ({ id, comments, score }: Props) => {
	try {
		const session = await auth();

		const body = {
			comments,
			score,
		};

		const headers = {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session?.accessToken}`,
		};

		const res = await fetch(`${baseUrl}/appointment/score/${id}`, {
			body: JSON.stringify(body),
			method: 'PATCH',
			headers,
		});

		if (!res.ok) {
			const error = await res.json().catch(() => null);
			formatErrorAPI(error);
		}

		revalidatePath(`/appointment/view/${id}`);

		return {
			ok: true,
			message: `Gracias por sus comentarios`,
		};
	} catch (error: any) {
		return {
			ok: false,
			message: error.message,
		};
	}
};
