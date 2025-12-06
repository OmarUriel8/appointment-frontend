import { getServicePagination } from '@/actions';
import { Pagination, ServiceGrid, ServiceSearchInput, Title } from '@/components';

interface Props {
	searchParams: Promise<{
		page: string;
		limit: string;
		query: string;
	}>;
}
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
	});

	return (
		<>
			<Title title="Servicios" subtitle="Todos los servicios" className="mb-2" />
			{/* Search */}
			<ServiceSearchInput />

			<ServiceGrid services={services} />

			<Pagination totalPages={totalPages} />
		</>
	);
}
