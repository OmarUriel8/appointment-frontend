import { AppointmentStatus } from '@/interfaces';

export const formatAppointmentStatus = (status: AppointmentStatus) => {
	let nameStatus = '';
	switch (status) {
		case 'CANCELLED':
			nameStatus = 'Cancelada';
			break;
		case 'COMPLETED':
			nameStatus = 'Completada';
			break;
		case 'PENDING':
			nameStatus = 'Pendiente';
			break;
		case 'CONFIRMED':
			nameStatus = 'Confirmada';
			break;
		default:
			nameStatus = 'Pendiente';
			break;
	}

	return nameStatus;
};
