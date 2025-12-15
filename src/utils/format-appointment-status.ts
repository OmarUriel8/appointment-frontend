import { AppointmentStatus } from '@/interfaces';

export const formatAppointmentStatus = (status: AppointmentStatus) => {
	let nameStatus = '';
	switch (status) {
		case 'CANCELLED':
			nameStatus = 'Cancelado';
			break;
		case 'COMPLETED':
			nameStatus = 'Completado';
			break;
		case 'PENDING':
			nameStatus = 'Pendiente';
			break;
		case 'CONFIRMED':
			nameStatus = 'Confirmado';
			break;
		default:
			nameStatus = 'Pendiente';
			break;
	}

	return nameStatus;
};
