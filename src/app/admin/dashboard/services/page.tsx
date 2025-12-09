import { getServicePagination } from '@/actions';
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Input,
	Label,
	Pagination,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
	searchParams: Promise<{
		page: string;
		limit: string;
		quyery: string;
	}>;
}
export default async function ServicePage({ searchParams }: Props) {
	const page = (await searchParams).page ? parseInt((await searchParams).page!) : 1;
	const limit = (await searchParams).limit ? parseInt((await searchParams).limit!) : 0;
	const query = (await searchParams).quyery ? (await searchParams).quyery! : undefined;

	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const { services, total, totalPages } = await getServicePagination({
		page,
		limit,
		query,
	});

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold">Gestión de Servicios</h1>
					<p className="text-muted-foreground">Administra los servicios disponibles</p>
				</div>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button>
							<Plus className="mr-2 h-4 w-4" />
							Crear servicio
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-2xl">
						<DialogHeader>
							<DialogTitle>Crear nuevo servicio</DialogTitle>
							<DialogDescription>
								Completa el formulario para crear un nuevo servicio
							</DialogDescription>
						</DialogHeader>
						<form className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="service-name">Nombre</Label>
								<Input id="service-name" placeholder="Nombre del servicio" />
							</div>
							<div className="space-y-2">
								<Label htmlFor="service-description">Descripción</Label>
								<Input id="service-description" placeholder="Descripción del servicio" />
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="service-price">Precio</Label>
									<Input
										id="service-price"
										type="number"
										placeholder="0.00"
										step="0.01"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="service-duration">Duración (minutos)</Label>
									<Input id="service-duration" type="number" placeholder="60" />
								</div>
							</div>
							<div className="flex justify-end gap-2">
								<Button
									type="button"
									variant="outline"
									onClick={() => setIsDialogOpen(false)}
								>
									Cancelar
								</Button>
								<Button type="submit">Crear servicio</Button>
							</div>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Lista de servicios</CardTitle>
				</CardHeader>
				<CardContent>
					{/* <div className="text-center py-8 text-muted-foreground">
						 	Cargando servicios...
						 </div> */}

					<Table>
						<TableHeader>
							<TableRow>
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
									<TableRow key={service.id}>
										<TableCell className="font-medium">{service.name}</TableCell>
										<TableCell className="max-w-md truncate">
											{service.description}
										</TableCell>
										<TableCell>${service.price}</TableCell>
										<TableCell>{service.duration} min</TableCell>
										<TableCell className="text-right">
											<div className="flex justify-end gap-2">
												<Button variant="ghost" size="icon">
													<Edit className="h-4 w-4" />
												</Button>
												<Button variant="ghost" size="icon">
													<Trash2 className="h-4 w-4 text-red-500" />
												</Button>
											</div>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>

					<Pagination totalPages={totalPages} />
				</CardContent>
			</Card>
		</div>
	);
}
