import { Appointment, UserRole } from '@/interfaces';
import { Card, CardContent } from '../card';
import Link from 'next/link';
import { formatAppointmentStatus, formatTime } from '@/utils';
import { cn } from '@/lib/utils';

interface Props {
	apointment: Appointment;
	role: UserRole;
}
export const CardAppointment = ({ apointment: appointment, role }: Props) => {
	return (
		<Card className="w-full shadow-sm hover:shadow-md transition">
			<CardContent className="p-4 space-y-4 text-sm">
				{/* ID */}
				<div className="flex justify-between items-center">
					<span className="text-muted-foreground">ID:</span>
					<Link
						href={`/admin/appointments/view/${appointment.id}`}
						className="font-medium hover:underline hover:text-blue-500"
					>
						{appointment.id}
					</Link>
				</div>

				{/* Fecha */}
				<div className="flex justify-between">
					<span className="text-muted-foreground">Fecha:</span>
					<span className="font-medium">{appointment.date.toString()}</span>
				</div>

				{/* Horario */}
				<div className="flex justify-between">
					<span className="text-muted-foreground">Horario:</span>
					<span className="font-medium">
						{formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
					</span>
				</div>

				{/* Servicio */}
				<div className="flex justify-between">
					<span className="text-muted-foreground">Servicio:</span>
					<span className="font-medium">{appointment.service.name}</span>
				</div>

				{role === 'EMPLOYEE' ? (
					<>
						{/* Cliente */}
						<div className="flex justify-between">
							<span className="text-muted-foreground">Cliente:</span>
							<span className="font-medium">{appointment.client.name}</span>
						</div>

						{/* Teléfono */}
						{appointment.client.phone && (
							<div className="flex justify-between">
								<span className="text-muted-foreground">Teléfono:</span>
								<span className="font-medium">{appointment.client.phone}</span>
							</div>
						)}
					</>
				) : (
					<div className="flex justify-between">
						<span className="text-muted-foreground">Vendedor:</span>
						<span className="font-medium">{appointment.employee.name}</span>
					</div>
				)}

				{/* Estatus */}
				<div className="flex justify-between">
					<span className="text-muted-foreground">Estatus:</span>
					<span
						className={cn('font-semibold px-2 py-0.5 rounded-md', {
							'bg-red-100 text-red-700': appointment.status === 'CANCELLED',
							'bg-green-100 text-green-700': appointment.status === 'COMPLETED',
							'bg-yellow-100 text-yellow-700': appointment.status === 'PENDING',
							'bg-blue-100 text-blue-700': appointment.status === 'CONFIRMED',
						})}
					>
						{formatAppointmentStatus(appointment.status)}
					</span>
				</div>
			</CardContent>
		</Card>
	);
};
