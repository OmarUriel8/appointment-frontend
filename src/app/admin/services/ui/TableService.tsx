import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components';
import { Service } from '@/interfaces';
import { TableRowService } from './TableRowService';

interface Props {
	services: Service[];
}

export const TableService = async ({ services }: Props) => {
	return (
		<div className="max-h-[300px] overflow-y-auto">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Imagen</TableHead>
						<TableHead>Nombre</TableHead>
						<TableHead>Descripción</TableHead>
						<TableHead>Precio</TableHead>
						<TableHead>Duración</TableHead>
						<TableHead className="text-right">Acciones</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{services.length === 0 ? (
						<TableRow>
							<TableCell colSpan={5} className="text-center text-muted-foreground">
								No hay servicios registrados
							</TableCell>
						</TableRow>
					) : (
						services.map((service) => (
							<TableRowService key={service.id} service={service} />
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
};
