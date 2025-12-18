'use client';

import { Button } from '@/components';
import { useAppointmentScore } from '@/store';

interface Props {
	id: number;
	title?: string;
}

export const AppointmentButtonScore = ({ id, title = 'Dejar una reseña' }: Props) => {
	const setOpenCloseDialog = useAppointmentScore((store) => store.setOpenCloseDialog);
	const setAppointmentScore = useAppointmentScore((store) => store.setAppointmentScore);

	const handleCancel = () => {
		setOpenCloseDialog(true);
		setAppointmentScore(id);
	};
	return (
		<Button className="btn-info" onClick={handleCancel}>
			{title}
		</Button>
	);
};
