import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	DashboardTitle,
	Pagination,
	ServiceSearchInput,
} from '@/components';
import { TableService } from './ui/TableService';
import { getServicePagination } from '@/actions';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Metadata } from 'next';

interface Props {
	searchParams: Promise<{
		page: string;
		limit: string;
		quyery: string;
		isActive: string;
	}>;
}

export const metadata: Metadata = {
	title: 'Lista de servicios',
	description: 'Lista de servicios',
};

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
			<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
				<DashboardTitle
					title="Gestión de Servicios"
					subtitle="Administra los servicios disponibles"
				/>

				{/* Search */}
				<ServiceSearchInput />

				<Link href="/admin/services/new">
					<Button className="btn-primary">
						<Plus className="mr-2 h-4 w-4" />
						Agregar Servicio
					</Button>
				</Link>
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
