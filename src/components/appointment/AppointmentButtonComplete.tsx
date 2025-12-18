'use client';

import { updateAppointmentStatus } from '@/actions';
import { Button } from '@/components';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
	id: number;
}
export const AppointmentButtonComplete = ({ id }: Props) => {
	const [loading, setLoading] = useState(false);

	const handleComplete = async (id: number) => {
		setLoading(true);
		const res = await updateAppointmentStatus(id, 'COMPLETED');

		res.ok ? toast.success(res.message) : toast.error(res.message);
		setLoading(false);
	};
	return (
		<Button
			className="btn-success-ghost"
			onClick={() => handleComplete(id)}
			disabled={loading}
		>
			Completar
		</Button>
	);
};
