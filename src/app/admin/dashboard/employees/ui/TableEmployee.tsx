import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components';
import { User } from '@/interfaces';
import { TableRowEmployee } from './TableRowEmployee';
interface Props {
	employees: User[];
}

export const TableEmployee = ({ employees }: Props) => {
	return (
		<div className="max-h-[300px] overflow-y-auto">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Nombre</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Activo</TableHead>
						<TableHead className="text-right">Acciones</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{employees.length === 0 ? (
						<TableRow>
							<TableCell colSpan={4} className="text-center text-muted-foreground">
								No hay empleados registrados
							</TableCell>
						</TableRow>
					) : (
						employees.map((employee) => (
							<TableRowEmployee employee={employee} key={employee.id} />
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
};
