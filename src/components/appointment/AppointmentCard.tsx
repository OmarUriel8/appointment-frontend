import { Appointment } from '@/interfaces';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { formatAppointmentStatus, formatDate, formatTime } from '@/utils';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Clock, DollarSign, Star } from 'lucide-react';
import { InfoRow } from './InfoRow';

interface Props {
	appointment: Appointment;
}
export const AppointmentCard = ({ appointment }: Props) => {
	return (
		<Card className="shadow-sm">
			<CardHeader className="border-b">
				<CardTitle className="text-2xl font-semibold flex items-center gap-2">
					Detalles de la cita
					<span className="text-muted-foreground">#{appointment.id}</span>
				</CardTitle>
			</CardHeader>

			<CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
				{/* LEFT COLUMN */}
				<div className="space-y-4 text-sm">
					<InfoRow label="Cliente">{appointment.client.name}</InfoRow>

					{appointment.client.phone && (
						<InfoRow label="Teléfono">{appointment.client.phone}</InfoRow>
					)}

					<InfoRow label="Vendedor">{appointment.employee.name}</InfoRow>

					<InfoRow label="Fecha">{formatDate(new Date(appointment.date))}</InfoRow>

					<InfoRow label="Horario">
						{formatTime(appointment.startTime)} – {formatTime(appointment.endTime)}
					</InfoRow>

					<div className="flex items-center gap-2">
						<span className="text-muted-foreground">Estatus:</span>
						<span
							className={cn('px-3 py-1 rounded-full text-xs font-semibold', {
								'bg-red-100 text-red-700': appointment.status === 'CANCELLED',
								'bg-green-100 text-green-700': appointment.status === 'COMPLETED',
								'bg-yellow-100 text-yellow-700': appointment.status === 'PENDING',
								'bg-blue-100 text-blue-700': appointment.status === 'CONFIRMED',
							})}
						>
							{formatAppointmentStatus(appointment.status)}
						</span>
					</div>

					{appointment.notes && (
						<div className="pt-2">
							<p className="text-muted-foreground text-xs mb-1">Notas</p>
							<p className="text-sm bg-muted p-3 rounded-md">{appointment.notes}</p>
						</div>
					)}

					{/* REVIEW */}
					<div className="pt-4 border-t space-y-2">
						<h3 className="text-lg font-semibold">Reseña del cliente</h3>

						<div className="flex items-center gap-2">
							<Star className="text-yellow-500 h-4 w-4" />
							<span className="font-semibold">{appointment.score}</span>
						</div>

						<p className="text-muted-foreground text-sm">{appointment.comments}</p>
					</div>
				</div>

				{/* RIGHT COLUMN */}
				<div className="space-y-4">
					<div>
						<p className="text-muted-foreground text-sm">Servicio</p>
						<p className="font-semibold">{appointment.service.name}</p>
					</div>

					<p className="text-sm text-muted-foreground line-clamp-3">
						{appointment.service.description}
					</p>

					<div className="relative w-full overflow-hidden rounded-lg border">
						<Image
							src={appointment.service.images[0]}
							width={500}
							height={350}
							alt={appointment.service.name}
							className="object-cover w-full h-[220px]"
						/>
					</div>

					<div className="flex gap-6 pt-2 text-sm">
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
