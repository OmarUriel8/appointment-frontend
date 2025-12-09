import { getUsers } from '@/actions';
import {
	Button,
	Pagination,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components';
import { cn } from '@/lib/utils';
import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

export const TableUsers = async () => {
	const { ok, message, totalPages, users } = await getUsers({ page: 0 });

	if (!ok) {
		return <p>{message}</p>;
	}

	return (
		<>
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
						users!.map((user) => (
							<TableRow key={user.id}>
								<TableCell className="font-medium">{user.name}</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>{user.role}</TableCell>
								<TableCell>
									<span
										className={cn('rounded-full px-2 py-1 text-xs', {
											'bg-green-500/10 text-green-500': user.isActive,
											'bg-red-500/10 text-red-500': !user.isActive,
										})}
									>
										{user.isActive ? 'Activo' : 'Inactivo'}
									</span>
								</TableCell>
								<TableCell className="text-right">
									<div className="flex justify-end gap-2">
										<Link href={`/admin/dashboard/users/${user.id}`}>
											<Button
												variant="ghost"
												className="hover:bg-transparent hover:dark:bg-transparent"
												size="icon"
											>
												<Edit className="h-4 w-4 text-cyan-500" />
											</Button>
										</Link>

										{user.isActive ? (
											<Button
												className="hover:bg-transparent hover:dark:bg-transparent"
												variant="ghost"
												size="icon"
											>
												<Trash2 className="h-4 w-4 text-red-500" />
											</Button>
										) : (
											<Button
												className="hover:bg-transparent hover:dark:bg-transparent"
												variant="ghost"
												size="icon"
											>
												<Trash2 className="h-4 w-4 text-green-500" />
											</Button>
										)}
									</div>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>

			<Pagination totalPages={totalPages!} />
		</>
	);
};
