'use client';

import { updateAppointmentStatus } from '@/actions';
import {
	AppointmentBadgeStatus,
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
import { AppointmentResponse, AppointmentStatus } from '@/interfaces';
import { useAppointmentToCancel } from '@/store';
import { formatDateString, formatTime } from '@/utils';
import { Edit, Eye } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface Props {
	appointment: AppointmentResponse;
}

const statusReadOnly = ['CANCELLED', 'COMPLETED'];

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
			<TableCell>{formatDateString(appointment.date.toString())}</TableCell>
			<TableCell>
				{formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
			</TableCell>
			<TableCell>{appointment.client.name}</TableCell>
			<TableCell>{appointment.employee.name}</TableCell>
			<TableCell>{appointment.employee.name}</TableCell>
			<TableCell>
				<AppointmentBadgeStatus status={appointment.status} />
			</TableCell>
			<TableCell className="text-right">
				<div className="flex justify-end gap-2">
					{!statusReadOnly.includes(appointment.status) && (
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
					<Link href={`/admin/appointments/view/${appointment.id}`}>
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
					{!statusReadOnly.includes(appointment.status) && (
						<Link href={`/admin/appointments/${appointment.id}`}>
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
