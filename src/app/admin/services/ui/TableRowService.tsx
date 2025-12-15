'use client';

import { updateStatusService } from '@/actions';
import { Button, TableCell, TableRow, TooltipButton } from '@/components';
import { Service } from '@/interfaces';
import { Edit, CircleX, CircleCheckBig } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
	service: Service;
}
export const TableRowService = ({ service }: Props) => {
	const [isLoading, setIsLoading] = useState(false);
	const handleChangeStatus = async (id: string, isActive: boolean) => {
		setIsLoading(true);

		const { ok, message, service } = await updateStatusService({
			id,
			isActive: isActive,
		});

		if (ok) {
			toast.success(`Servicio ${isActive ? 'activado' : 'inactivado'}`);
		}
		setIsLoading(false);
	};

	return (
		<TableRow>
			<TableCell className="font-medium">
				<Link href={`/service/${service.slug}`}>
					<Image src={service.images[0]} width={30} height={30} alt={service.name} />
				</Link>
			</TableCell>
			<TableCell className="font-medium">{service.name}</TableCell>
			<TableCell className="max-w-md truncate">{service.description}</TableCell>
			<TableCell>${service.price}</TableCell>
			<TableCell>{service.duration} min</TableCell>
			<TableCell className="text-right">
				<div className="flex justify-end gap-2">
					<Link href={`/admin/services/${service.id}`}>
						<TooltipButton title="Editar servicio">
							<Button
								variant="ghost"
								className="hover:bg-transparent hover:dark:bg-transparent"
								size="icon"
							>
								<Edit className="h-4 w-4 text-cyan-500" />
							</Button>
						</TooltipButton>
					</Link>

					{service.isActive ? (
						<TooltipButton title="Inactivar servicio">
							<Button
								className="hover:bg-transparent hover:dark:bg-transparent"
								variant="ghost"
								size="icon"
								onClick={() => handleChangeStatus(service.id, false)}
								disabled={isLoading}
							>
								<CircleX className="h-4 w-4 text-red-500" />
							</Button>
						</TooltipButton>
					) : (
						<TooltipButton title="Activar servicio">
							<Button
								className="hover:bg-transparent hover:dark:bg-transparent "
								variant="ghost"
								size="icon"
								onClick={() => handleChangeStatus(service.id, true)}
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
