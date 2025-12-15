'use client';

import { updateAppointmentStatus } from '@/actions';
import {
	Button,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
	TableCell,
	TableRow,
	TooltipButton,
} from '@/components';
import { Appointment, AppointmentStatus } from '@/interfaces';
import { cn } from '@/lib/utils';
import { useAppointmentToCancel } from '@/store';
import { formatAppointmentStatus, formatDate, formatTime } from '@/utils';
import { Edit, Eye } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface Props {
	appointment: Appointment;
}

export const TableRowAppoinment = ({ appointment }: Props) => {
	const setOpenCloseDialog = useAppointmentToCancel((store) => store.setOpenCloseDialog);
	const setAppointmentToCancel = useAppointmentToCancel(
		(store) => store.setAppointmentToCancel
	);

	const handleStatusChange = async (value: string) => {
		// llamar api
		const status = value as AppointmentStatus;
		if (status === 'CANCELLED') {
			setAppointmentToCancel(appointment.id);
			setOpenCloseDialog(true);
		} else {
			const { ok, message } = await updateAppointmentStatus(appointment.id, status, '');

			ok ? toast.success(message) : toast.error(message);
		}
	};
	return (
		<TableRow>
			<TableCell className="font-medium">{appointment.id}</TableCell>
			<TableCell>{formatDate(new Date(appointment.date))}</TableCell>
			<TableCell>
				{formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
			</TableCell>
			<TableCell>{appointment.client.name}</TableCell>
			<TableCell>{appointment.employee.name}</TableCell>
			<TableCell>{appointment.employee.name}</TableCell>
			<TableCell>
				<span
					className={cn('rounded-full px-2 py-1 text-xs', {
						'bg-red-100 text-red-700': appointment.status === 'CANCELLED',
						'bg-green-100 text-green-700': appointment.status === 'COMPLETED',
						'bg-yellow-100 text-yellow-700': appointment.status === 'PENDING',
						'bg-blue-100 text-blue-700': appointment.status === 'CONFIRMED',
					})}
				>
					{formatAppointmentStatus(appointment.status)}
				</span>
			</TableCell>
			<TableCell className="text-right">
				<div className="flex justify-end gap-2">
					{!['CANCELLED', 'COMPLETED'].includes(appointment.status) && (
						<Select onValueChange={handleStatusChange} defaultValue={appointment.status}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Selecciona un estatus" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Estatus cita</SelectLabel>
									<SelectItem value="PENDING">Pendiente</SelectItem>
									<SelectItem value="CONFIRMED">Confirmado</SelectItem>
									<SelectItem value="COMPLETED">Completado</SelectItem>
									<SelectItem value="CANCELLED">Cancelado</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					)}
					<Link href={`/admin/appointment/view/${appointment.id}`}>
						<TooltipButton title="Ver cita">
							<Button
								variant="ghost"
								className="hover:bg-transparent hover:dark:bg-transparent"
								size="icon"
							>
								<Eye className="h-4 w-4 text-blue-500" />
							</Button>
						</TooltipButton>
					</Link>
					{!['CANCELLED', 'COMPLETED'].includes(appointment.status) && (
						<Link href={`/admin/appointment/${appointment.id}`}>
							<TooltipButton title="Editar cita">
								<Button
									variant="ghost"
									className="hover:bg-transparent hover:dark:bg-transparent"
									size="icon"
								>
									<Edit className="h-4 w-4 text-cyan-500" />
								</Button>
							</TooltipButton>
						</Link>
					)}

					<Button className="hidden" onClick={() => null}></Button>
				</div>
			</TableCell>
		</TableRow>
	);
};
