import { Appointment, UserRole } from '@/interfaces';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { formatDate, formatTime } from '@/utils';
import Image from 'next/image';
import { Clock, DollarSign, Star } from 'lucide-react';
import { InfoRow } from './InfoRow';
import { AppointmentBadgeStatus } from './AppointmentBadgeStatus';
import { AppointmentButtonCancel } from './AppointmentButtonCancel';
import { AppointmentButtonComplete } from './AppointmentButtonComplete';
import { AppointmentButtonScore } from './AppointmentButtonScore';

interface Props {
	appointment: Appointment;
	role: UserRole;
}
export const AppointmentCard = ({ appointment, role }: Props) => {
	return (
		<Card className="max-w-4xl mx-auto overflow-hidden border-none shadow-lg">
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

					<InfoRow label="Fecha">{formatDate(appointment.date)}</InfoRow>

					<InfoRow label="Horario">
						{formatTime(appointment.startTime)} – {formatTime(appointment.endTime)}
					</InfoRow>

					<InfoRow label="Estatus">
						<AppointmentBadgeStatus status={appointment.status} />
					</InfoRow>

					{appointment.notes && (
						<div className="pt-2">
							<p className="text-muted-foreground text-xs mb-1">Notas</p>
							<p className="text-sm bg-muted p-3 rounded-md">{appointment.notes}</p>
						</div>
					)}

					{appointment.status === 'CANCELLED' && appointment.comments.length > 0 && (
						<div className="pt-2">
							<p className="uppercase font-bold text-xs mb-1 text-red-400">
								Motivo de cancelación
							</p>
							<p>{appointment.comments}</p>
						</div>
					)}

					{appointment.score > 0 && (
						<>
							<hr />
							<h3 className="text-lg font-semibold">Reseña del cliente</h3>
							<div className="bg-muted/50 p-4 rounded-xl border border-muted-foreground/20">
								<p className="flex items-center gap-2">
									<Star className="text-yellow-500 h-4 w-4 fill-yellow-400" />
									<span className="font-semibold">{appointment.score}</span>
								</p>

								<p className="text-sm italic">"{appointment.comments}"</p>
							</div>
						</>
					)}

					{/* Botones */}
					<div className="border-t w-[50%] flex justify-between">
						{role === 'ADMIN' ? (
							<>
								{(appointment.status === 'PENDING' ||
									appointment.status === 'CONFIRMED') && (
									<>
										<AppointmentButtonComplete id={appointment.id} />
										<AppointmentButtonCancel id={appointment.id} />
									</>
								)}
								{appointment.status === 'COMPLETED' && (
									<AppointmentButtonScore
										id={appointment.id}
										title="Dejar una reseña o modificar"
									/>
								)}
							</>
						) : (
							<>
								{(appointment.status === 'PENDING' ||
									appointment.status === 'CONFIRMED') && (
									<AppointmentButtonComplete id={appointment.id} />
								)}
								{appointment.status === 'PENDING' && (
									<AppointmentButtonCancel id={appointment.id} />
								)}
							</>
						)}
					</div>
				</div>

				{/* RIGHT COLUMN */}
				<div className="space-y-4">
					<div>
						<p className="text-muted-foreground text-sm">Servicio</p>
						<p className="font-semibold">{appointment.nameService}</p>
					</div>

					<p className="text-sm text-muted-foreground line-clamp-3">
						{appointment.service.description}
					</p>

					<div className="relative w-full lg:w-[50%] overflow-hidden rounded-lg border">
						<Image
							src={appointment.service.images[0]}
							width={500}
							height={350}
							alt={appointment.nameService}
							className="object-cover w-full h-[220px]"
						/>
					</div>

					<div className="flex gap-6 pt-2 text-sm">
						<div className="flex items-center gap-1">
							<DollarSign className="h-4 w-4 text-primary" />
							<span className="font-semibold">${appointment.price}</span>
						</div>

						<div className="flex items-center gap-1">
							<Clock className="h-4 w-4 text-primary" />
							<span>{appointment.durationMinutes} min</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
