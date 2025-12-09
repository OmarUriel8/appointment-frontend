import { Card, CardContent, CardHeader, CardTitle, Pagination } from '@/components';
import { TableService } from './ui/TableService';
import { getServicePagination } from '@/actions';

interface Props {
	searchParams: Promise<{
		page: string;
		limit: string;
		quyery: string;
		isActive: string;
	}>;
}

export default async function ServicePage({ searchParams }: Props) {
	const page = (await searchParams).page ? parseInt((await searchParams).page!) : 1;
	const limit = (await searchParams).limit ? parseInt((await searchParams).limit!) : 0;
	const query = (await searchParams).quyery ? (await searchParams).quyery! : undefined;
	const isActive = (await searchParams).isActive
		? (await searchParams).isActive.toLowerCase()
		: 'all';

	const { services, total, totalPages } = await getServicePagination({
		page,
		limit,
		query,
		isActive: isActive,
	});

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold">Gestión de Servicios</h1>
					<p className="text-muted-foreground">Administra los servicios disponibles</p>
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Lista de servicios</CardTitle>
				</CardHeader>
				<CardContent>
					{/* <div className="text-center py-8 text-muted-foreground">
						 	Cargando servicios...
						 </div> */}
					<TableService services={services} />

					<Pagination totalPages={totalPages} />
				</CardContent>
			</Card>
		</div>
	);
}
