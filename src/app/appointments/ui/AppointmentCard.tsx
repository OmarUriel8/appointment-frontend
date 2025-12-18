import {
	AppointmentBadgeStatus,
	AppointmentButtonCancel,
	AppointmentButtonComplete,
	Button,
} from '@/components';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppointmentResponse, UserRole } from '@/interfaces';
import { currencyFormat, formatDateLong } from '@/utils';
import { CalendarIcon, ClockIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';

interface Props {
	appointment: AppointmentResponse;
	role: UserRole;
}
export const AppointmentCard = ({ appointment, role }: Props) => {
	return (
		<Card className="overflow-hidden py-0">
			<div className="h-32 bg-muted relative">
				{appointment.service.images?.[0] ? (
					<img
						src={appointment.service.images[0].url}
						alt={appointment.service.name}
						className="object-cover w-full h-full"
					/>
				) : (
					<div className="flex items-center justify-center h-full text-muted-foreground text-xs">
						Sin imagen
					</div>
				)}
				<div className="absolute top-2 right-2">
					<AppointmentBadgeStatus status={appointment.status} />
				</div>
			</div>

			<CardHeader className="p-4 pb-2">
				<CardTitle className="text-lg flex justify-between">
					<span>{appointment.service.name}</span>
					<Link href={`appointment/view/${appointment.id}`} className="hover:underline">
						<span># {appointment.id}</span>
					</Link>
				</CardTitle>
				<p className="text-sm text-muted-foreground line-clamp-1">
					{appointment.service.description}
				</p>
			</CardHeader>

			<CardContent className="p-4 pt-0 space-y-3">
				<div className="flex flex-col gap-2 text-sm">
					<div className="flex items-center gap-2">
						<CalendarIcon className="w-4 h-4 text-primary" />
						<span>{formatDateLong(appointment.date as unknown as string)}</span>
					</div>
					<div className="flex items-center gap-2">
						<ClockIcon className="w-4 h-4 text-primary" />
						<span>
							{appointment.startTime} - {appointment.endTime}
						</span>
					</div>
					{role === 'CLIENT' ? (
						<div className="flex items-center gap-2">
							<UserIcon className="w-4 h-4 text-primary" />
							<span>Atendido por: {appointment.employee.name}</span>
						</div>
					) : (
						<div className="flex items-center gap-2">
							<UserIcon className="w-4 h-4 text-primary" />
							<span>Cliente: {appointment.client.name}</span>
						</div>
					)}
				</div>

				<div className="pt-2 border-t flex justify-between items-center">
					<span className="font-bold text-lg">
						{currencyFormat(appointment.service.price)}
					</span>
					{appointment.status === 'PENDING' && (
						<AppointmentButtonCancel id={appointment.id} />
					)}
					{role === 'EMPLOYEE' &&
						(appointment.status === 'PENDING' || appointment.status === 'CONFIRMED') && (
							<AppointmentButtonComplete id={appointment.id} />
						)}
				</div>
			</CardContent>
		</Card>
	);
};
