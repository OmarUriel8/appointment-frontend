import { Appointment } from '@/interfaces';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { formatAppointmentStatus, formatDate, formatTime } from '@/utils';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Clock, DollarSign, Star } from 'lucide-react';
import { ServiceCard } from '../service/ServiceCard';

interface Props {
	appointment: Appointment;
}
export const AppointmentCard = ({ appointment }: Props) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-2xl">Detalles cita #{appointment.id}</CardTitle>
			</CardHeader>
			<CardContent className="grid grid-cols-1 lg:grid-cols-2">
				<div>
					<p>
						<span className="text-muted-foreground">Nombre cliente: </span>
						{appointment.client.name}
					</p>
					{appointment.client.phone && (
						<p>
							<span className="text-muted-foreground">Telefono cliente: </span>
							{appointment.client.phone}
						</p>
					)}
					<p>
						<span className="text-muted-foreground">Nombre venderor: </span>
						{appointment.employee.name}
					</p>
					<p>
						<span className="text-muted-foreground">Fecha: </span>
						{formatDate(new Date(appointment.date))}
					</p>

					<p>
						<span className="text-muted-foreground">Horario: </span>
						{formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
					</p>
					<p>
						<span className="text-muted-foreground">Estatus: </span>
						<span
							className={cn('font-semibold', {
								'text-red-700': appointment.status === 'CANCELLED',
								'text-green-700': appointment.status === 'COMPLETED',
								'text-yellow-700': appointment.status === 'PENDING',
								'text-blue-700': appointment.status === 'CONFIRMED',
							})}
						>
							{formatAppointmentStatus(appointment.status)}
						</span>
					</p>

					{appointment.notes && (
						<p>
							<span className="text-muted-foreground">Notas: </span>
							{appointment.notes}
						</p>
					)}

					<h3 className="text-2xl mt-2">Reseña del cliente</h3>
					<p>
						<span className="text-muted-foreground">Calificación: </span>
						<span className="flex gap-2">
							<Star className="text-yellow-500" width={20} />
							{appointment.score}
						</span>
					</p>
					<p>
						<span className="text-muted-foreground">Comentarios: </span>
						{appointment.comments}
					</p>
				</div>

				<div>
					<p className="mb-2">
						<span className="text-muted-foreground">Servicio: </span>
						{appointment.service.name}
					</p>
					<p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
						{appointment.service.description}
					</p>

					<Image
						src={appointment.service.images[0]}
						width={400}
						height={500}
						alt={appointment.service.name}
					/>

					<div className="flex items-center gap-4 text-sm">
						<div className="flex items-center gap-1">
							<DollarSign className="h-4 w-4 text-primary" />
							<span className="font-semibold">${appointment.service.price}</span>
						</div>
						<div className="flex items-center gap-1">
							<Clock className="h-4 w-4 text-primary" />
							<span>{appointment.service.duration} min</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
