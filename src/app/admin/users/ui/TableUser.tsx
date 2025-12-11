import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components';
import { User } from '@/interfaces';
import { TableRowUser } from './TableRowUser';

interface Props {
	users: User[];
}
export const TableUser = async ({ users }: Props) => {
	return (
		<div className="max-h-[300px] overflow-y-auto">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Nombre</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Rol</TableHead>
						<TableHead>Estado</TableHead>
						<TableHead className="text-right">Acciones</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users!.length === 0 ? (
						<TableRow>
							<TableCell colSpan={5} className="text-center text-muted-foreground">
								No hay usuarios registrados
							</TableCell>
						</TableRow>
					) : (
						users!.map((user) => <TableRowUser key={user.id} user={user} />)
					)}
				</TableBody>
			</Table>
		</div>
	);
};
