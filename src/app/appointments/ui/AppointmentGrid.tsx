import { AppointmentResponse, UserRole } from '@/interfaces';
import { AppointmentCard } from './AppointmentCard';

interface Props {
	appointments: AppointmentResponse[];
	role: UserRole;
}
export const AppointmentGrid = ({ appointments, role }: Props) => {
	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{appointments.map((appointment) => (
				<AppointmentCard key={appointment.id} appointment={appointment} role={role} />
			))}
		</div>
	);
};
