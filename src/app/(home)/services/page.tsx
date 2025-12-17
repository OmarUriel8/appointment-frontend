import { getServicePagination } from '@/actions';
import { Pagination, ServiceGrid, ServiceSearchInput, Title } from '@/components';
import { Metadata } from 'next';

interface Props {
	searchParams: Promise<{
		page: string;
		limit: string;
		query: string;
	}>;
}

export const metadata: Metadata = {
	title: 'Lista de servicios',
	description: 'Lsita de servicios disponibles',
	openGraph: {
		title: 'Lista de servicios',
		description: 'Lista de servicios disponibles',
		images: ['/logo.jpg'],
	},
};

export default async function ServicePage({ searchParams }: Props) {
	const page = (await searchParams).page ? parseInt((await searchParams).page) : 1;
	const limit = (await searchParams).limit
		? parseInt((await searchParams).limit)
		: undefined;
	const query = (await searchParams).query ?? undefined;

	const { totalPages, services } = await getServicePagination({
		page: page,
		limit: limit,
		query: query,
		isActive: 'true',
	});

	return (
		<>
			<Title title="Servicios" subtitle="Todos los servicios" className="mb-2" />
			{/* Search */}
			<div className="mb-6">
				<ServiceSearchInput />
			</div>

			<ServiceGrid services={services} />

			<Pagination totalPages={totalPages} />
		</>
	);
}
