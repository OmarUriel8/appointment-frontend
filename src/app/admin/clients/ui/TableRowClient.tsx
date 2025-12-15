'use client';

import { Button, TableCell, TableRow, TooltipButton } from '@/components';
import { useUserStatusChange } from '@/hooks';
import { User } from '@/interfaces';
import { cn } from '@/lib/utils';
import { CircleCheckBig, CircleX, ClockPlus, Edit, Eye } from 'lucide-react';
import Link from 'next/link';

interface Props {
	client: User;
}
export const TableRowClient = ({ client }: Props) => {
	const { handleChangeStatus, isLoading } = useUserStatusChange('Cliente');

	return (
		<TableRow>
			<TableCell className="font-medium">{client.name}</TableCell>
			<TableCell>{client.email}</TableCell>
			<TableCell>{client.phone}</TableCell>
			<TableCell>
				<span
					className={cn('rounded-full px-2 py-1 text-xs', {
						'bg-green-500/10 text-green-500': client.isActive,
						'bg-red-500/10 text-red-500': !client.isActive,
					})}
				>
					{client.isActive ? 'Activo' : 'Inactivo'}
				</span>
			</TableCell>
			<TableCell className="text-right">
				<div className="flex justify-end gap-2">
					<Link href={`/admin/appointments/client/${client.id}`}>
						<TooltipButton title="Ver detalles">
							<Button
								variant="ghost"
								className="hover:bg-transparent hover:dark:bg-transparent"
								size="icon"
							>
								<Eye className="h-4 w-4 text-blue-500" />
							</Button>
						</TooltipButton>
					</Link>
					<Link href={`/admin/users/${client.id}`}>
						<TooltipButton title="Editar usuario">
							<Button
								variant="ghost"
								className="hover:bg-transparent hover:dark:bg-transparent"
								size="icon"
							>
								<Edit className="h-4 w-4 text-cyan-500" />
							</Button>
						</TooltipButton>
					</Link>
					<Link href={`/admin/appointments/new/?idClient=${client.id}`}>
						<TooltipButton title="Agregar nueva cita">
							<Button
								variant="ghost"
								className="hover:bg-transparent hover:dark:bg-transparent"
								size="icon"
							>
								<ClockPlus className="h-4 w-4 text-orange-500" />
							</Button>
						</TooltipButton>
					</Link>

					{client.isActive ? (
						<TooltipButton title="Inactivar cliente">
							<Button
								className="hover:bg-transparent hover:dark:bg-transparent"
								variant="ghost"
								size="icon"
								onClick={() => handleChangeStatus(client.id, false)}
								disabled={isLoading}
							>
								<CircleX className="h-4 w-4 text-red-500" />
							</Button>
						</TooltipButton>
					) : (
						<TooltipButton title="Activar cliente">
							<Button
								className="hover:bg-transparent hover:dark:bg-transparent"
								variant="ghost"
								size="icon"
								onClick={() => handleChangeStatus(client.id, true)}
								disabled={isLoading}
							>
								<CircleCheckBig className="h-4 w-4 text-green-500" />
							</Button>
						</TooltipButton>
					)}
				</div>
			</TableCell>
		</TableRow>
	);
};
