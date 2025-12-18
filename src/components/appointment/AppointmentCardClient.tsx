import { Appointment, UserRole } from '@/interfaces';
import { Card, CardContent } from '../ui/card';
import { currencyFormat, formatDate, formatTime } from '@/utils';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Calendar, CalendarSync, Clock, ClockIcon, Phone, Star } from 'lucide-react';
import { AppointmentBadgeStatus } from './AppointmentBadgeStatus';
import { Button } from '../ui/button';
import { Separator } from '@radix-ui/react-select';
import { Avatar, AvatarFallback } from '../ui/avatar';
import Link from 'next/link';
import { AppointmentButtonCancel } from './AppointmentButtonCancel';
import { AppointmentButtonScore } from './AppointmentButtonScore';

interface Props {
	appointment: Appointment;
	role: UserRole;
}
export const AppointmentCardClient = ({ appointment }: Props) => {
	return (
		<Card className="max-w-4xl mx-auto overflow-hidden border-none shadow-lg">
			{/* Banner de Estatus dinámico según el estado de la cita */}
			<div className={cn('py-2 px-4 text-center text-sm font-medium')}>
				<span>Tu cita está </span>

				<AppointmentBadgeStatus status={appointment.status} />
			</div>

			<CardContent className="grid grid-cols-1 md:grid-cols-5">
				{/* Detalle del Servicio  */}
				<div className="md:col-span-2 relative h-64 md:h-auto">
					<Image
						src={appointment.service.images[0]}
						alt={appointment.service.name}
						fill
						className="object-cover"
					/>
					<div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white">
						<h2 className="text-2xl font-bold">{appointment.service.name}</h2>
						<div className="flex gap-4 mt-2 text-sm opacity-90">
							<span className="flex items-center gap-1">
								<Clock className="h-4 w-4" /> {appointment.service.duration} min
							</span>
							<span className="flex items-center gap-1">
								{currencyFormat(appointment.service.price)}
							</span>
						</div>
					</div>
				</div>

				{/* Datos de la Cita */}
				<div className="md:col-span-3 p-6 lg:p-8 space-y-6">
					<div className="flex justify-between items-start">
						<div>
							<p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
								Detalles
							</p>
							<h3 className="text-lg font-semibold">#{appointment.id}</h3>
						</div>
						{/* <Button variant="outline" size="icon" className="rounded-full">
							<Share2Icon className="h-4 w-4" /> 
						</Button> */}
					</div>

					<Separator />

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						{/* Fecha y Hora */}
						<div className="space-y-3">
							<div className="flex items-center gap-3">
								<div className="p-2 bg-primary/10 rounded-lg text-primary">
									<Calendar className="h-5 w-5" />
								</div>
								<div>
									<p className="text-xs text-muted-foreground">Fecha</p>
									<p className="font-medium">{formatDate(appointment.date)}</p>
								</div>
							</div>

							<div className="flex items-center gap-3">
								<div className="p-2 bg-primary/10 rounded-lg text-primary">
									<ClockIcon className="h-5 w-5" />
								</div>
								<div>
									<p className="text-xs text-muted-foreground">Horario</p>
									<p className="font-medium">
										{formatTime(appointment.startTime)}
										{' - '}
										{formatTime(appointment.endTime)}
									</p>
								</div>
							</div>
						</div>

						{/* Empleado */}
						<div className="space-y-3">
							<div className="flex items-center gap-3">
								<Avatar className="h-10 w-10 border">
									{/* Aquí podrías poner la foto del empleado si la tienes */}
									<AvatarFallback>
										{appointment.employee.name.substring(0, 2).toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<div>
									<p className="text-xs text-muted-foreground">Especialista</p>
									<p className="font-medium">{appointment.employee.name}</p>
								</div>
							</div>

							{appointment.client.phone && (
								<div className="flex items-center gap-3">
									<div className="p-2 bg-muted rounded-lg">
										<Phone className="h-5 w-5" />
									</div>
									<div>
										<p className="text-xs text-muted-foreground">Contacto</p>
										<p className="font-medium text-sm text-primary underline">
											Llamar local
										</p>
									</div>
								</div>
							)}
						</div>
					</div>

					{appointment.notes && (
						<div className="bg-muted/50 p-4 rounded-xl border border-dashed border-muted-foreground/20">
							<p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">
								Tus Notas para la cita
							</p>
							<p className="text-sm">{appointment.notes}</p>
						</div>
					)}

					{appointment.status === 'CANCELLED' && appointment.comments.length > 0 && (
						<div className="p-4">
							<p className="text-[10px] uppercase font-bold mb-1 text-red-400">
								Motivo de cancelación
							</p>
							<p className="text-sm italic">{appointment.comments}</p>
						</div>
					)}

					{appointment.score > 0 && (
						<>
							<div className="bg-muted/50 p-4 rounded-xl border border-muted-foreground/20">
								<p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">
									Tus comentarios
								</p>
								<p className="flex items-center gap-2">
									<Star className="text-yellow-500 fill-yellow-400 h-4 w-4" />
									<span className="font-semibold">{appointment.score}</span>
								</p>

								<p className="text-sm italic">"{appointment.comments}"</p>
							</div>
						</>
					)}

					{/* FOOTER: Acciones de Cliente */}
					<div className="pt-4 flex flex-col sm:flex-row gap-3">
						{appointment.status === 'PENDING' ? (
							<>
								<Link href={`/appointment/${appointment.id}`}>
									<Button className="flex-1 gap-2 btn-info">
										<CalendarSync className="h-4 w-4" /> Reagendar
									</Button>
								</Link>
								<AppointmentButtonCancel id={appointment.id} />
							</>
						) : appointment.status === 'COMPLETED' && appointment.score === 0 ? (
							<AppointmentButtonScore id={appointment.id} />
						) : null}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
