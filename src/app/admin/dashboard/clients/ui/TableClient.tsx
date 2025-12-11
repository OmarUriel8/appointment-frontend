import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components';
import { User } from '@/interfaces';
import { TableRowClient } from './TableRowClient';
interface Props {
	clients: User[];
}

export const TableClient = ({ clients }: Props) => {
	return (
		<div className="max-h-[300px] overflow-y-auto">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Nombre</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Teléfono</TableHead>
						<TableHead>Estado</TableHead>
						<TableHead className="text-right">Acciones</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{clients.length === 0 ? (
						<TableRow>
							<TableCell colSpan={6} className="text-center text-muted-foreground">
								No hay clientes registrados
							</TableCell>
						</TableRow>
					) : (
						clients.map((client) => <TableRowClient client={client} key={client.id} />)
					)}
				</TableBody>
			</Table>
		</div>
	);
};
