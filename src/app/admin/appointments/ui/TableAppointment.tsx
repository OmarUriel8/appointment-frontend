import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components';
import { AppointmentResponse } from '@/interfaces';
import { TableRowAppoinment } from './TableRowAppoinment';

interface Props {
	appointments: AppointmentResponse[];
}

export const TableAppointment = ({ appointments }: Props) => {
	return (
		<div className="max-h-[300px] overflow-y-auto">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Id</TableHead>
						<TableHead>Fecha</TableHead>
						<TableHead>Horario</TableHead>
						<TableHead>Cliente</TableHead>
						<TableHead>Empleado</TableHead>
						<TableHead>Servicio</TableHead>
						<TableHead>Estatus</TableHead>
						<TableHead className="text-right">Acciones</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{appointments.length === 0 ? (
						<TableRow>
							<TableCell colSpan={4} className="text-center text-muted-foreground">
								No hay citas registradas
							</TableCell>
						</TableRow>
					) : (
						appointments.map((appointment) => (
							<TableRowAppoinment appointment={appointment} key={appointment.id} />
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
};
