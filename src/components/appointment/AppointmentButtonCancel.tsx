'use client';

import { Button } from '@/components';
import { useAppointmentToCancel } from '@/store';

interface Props {
	id: number;
}
export const AppointmentButtonCancel = ({ id }: Props) => {
	const setOpenCloseDialog = useAppointmentToCancel((store) => store.setOpenCloseDialog);
	const setAppointmentToCancel = useAppointmentToCancel(
		(store) => store.setAppointmentToCancel
	);

	const handleCancel = () => {
		setOpenCloseDialog(true);
		setAppointmentToCancel(id);
	};
	return (
		<Button className="btn-danger-ghost" onClick={handleCancel}>
			Cancelar
		</Button>
	);
};
