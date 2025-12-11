'use client';

import { Button, TableCell, TableRow, TooltipButton } from '@/components';
import { useUserStatusChange } from '@/hooks';
import { User } from '@/interfaces';
import { cn } from '@/lib/utils';
import { CalendarClock, CircleCheckBig, CircleX, Edit } from 'lucide-react';
import Link from 'next/link';

interface Props {
	employee: User;
}
export const TableRowEmployee = ({ employee }: Props) => {
	const { handleChangeStatus, isLoading } = useUserStatusChange('Empleado');

	return (
		<TableRow key={employee.id}>
			<TableCell className="font-medium">{employee.name}</TableCell>
			<TableCell>{employee.email}</TableCell>
			<TableCell>
				<span
					className={cn('rounded-full px-2 py-1 text-xs', {
						'bg-green-500/10 text-green-500': employee.isActive,
						'bg-red-500/10 text-red-500': !employee.isActive,
					})}
				>
					{employee.isActive ? 'Activo' : 'Inactivo'}
				</span>
			</TableCell>
			<TableCell className="text-right">
				<div className="flex justify-end gap-2">
					<Link href={`/admin/dashboard/users/${employee.id}`}>
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
					<Link href={`/admin/dashboard/employees/${employee.id}`}>
						<TooltipButton title="Editar horario">
							<Button
								variant="ghost"
								className="hover:bg-transparent hover:dark:bg-transparent"
								size="icon"
							>
								<CalendarClock className="h-4 w-4 text-orange-500" />
							</Button>
						</TooltipButton>
					</Link>

					{employee.isActive ? (
						<TooltipButton title="Inactivar empleado">
							<Button
								className="hover:bg-transparent hover:dark:bg-transparent"
								variant="ghost"
								size="icon"
								onClick={() => handleChangeStatus(employee.id, false)}
								disabled={isLoading}
							>
								<CircleX className="h-4 w-4 text-red-500" />
							</Button>
						</TooltipButton>
					) : (
						<TooltipButton title="Activar empleado">
							<Button
								className="hover:bg-transparent hover:dark:bg-transparent"
								variant="ghost"
								size="icon"
								onClick={() => handleChangeStatus(employee.id, true)}
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
