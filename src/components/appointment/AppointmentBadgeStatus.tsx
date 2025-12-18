import { AppointmentStatus } from '@/interfaces';
import { cn } from '@/lib/utils';
import { formatAppointmentStatus } from '@/utils';

interface Props {
	status: AppointmentStatus;
}
export const AppointmentBadgeStatus = ({ status }: Props) => {
	return (
		<span
			className={cn('rounded-full px-2 py-1 text-xs capitalize', {
				'bg-red-100 text-red-700': status === 'CANCELLED',
				'bg-green-100 text-green-700': status === 'COMPLETED',
				'bg-yellow-100 text-yellow-700': status === 'PENDING',
				'bg-blue-100 text-blue-700': status === 'CONFIRMED',
			})}
		>
			{formatAppointmentStatus(status)}
		</span>
	);
};
