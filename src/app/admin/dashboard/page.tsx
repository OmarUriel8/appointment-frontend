export const revalidate = 0;
import { getDashboardAdmin } from '@/actions';
import {
	DashboardCard,
	DashboardListClientRanking,
	DashboardListServiceRanking,
	DashboardTitle,
	FilterDashboard,
} from '@/components';
import { currencyFormat, formatNumber, isValidDate } from '@/utils';
import { BanknoteArrowUp, CalendarCheck, Star, DollarSign } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'Dashboard del sitio',
};

interface Props {
	searchParams: Promise<{
		startDate: string;
		endDate: string;
	}>;
}

export default async function DashboardPage({ searchParams }: Props) {
	const queryStartDate = new Date((await searchParams).startDate);
	const queryEndDate = new Date((await searchParams).endDate);
	const defaultEndDate = new Date();
	const defaultStartDate = new Date();
	defaultStartDate.setMonth(defaultStartDate.getMonth() - 1);

	const startDate = isValidDate(queryStartDate)
		? new Date(queryStartDate.toISOString())
		: new Date(defaultStartDate.toISOString());
	const endDate = isValidDate(queryEndDate)
		? new Date(queryEndDate.toISOString())
		: new Date(defaultEndDate.toISOString());

	const { ok, data, message } = await getDashboardAdmin(startDate, endDate);

	if (!ok) {
		<div className="space-y-6">
			<DashboardTitle
				title="Dashboard"
				subtitle="Bienvenido al panel de administración"
			/>
			<p>
				Ocurrio un error al consultar los datos. Favor de contactar a un administrador
			</p>
		</div>;
	}
	const { clientMostVisited, serviceMostUsed, appointmentCompleted } = data!;

	return (
		<div className="space-y-6">
			<DashboardTitle
				title="Dashboard"
				subtitle="Bienvenido al panel de administración"
			/>

			{/* Filter */}
			<FilterDashboard />

			{/* Stats Grid */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<DashboardCard
					title="Ganancias"
					value={currencyFormat(appointmentCompleted.total)}
					description="Ganancias de citas completadas"
					icon={BanknoteArrowUp}
				/>
				<DashboardCard
					title="Total citas"
					value={formatNumber(appointmentCompleted.count)}
					description="Citas completadas"
					icon={CalendarCheck}
				/>
				<DashboardCard
					title="Puntuación clientes"
					value={formatNumber(appointmentCompleted.averageScore)}
					description="Puntiuaciún promedio de reseñas de clientes"
					icon={Star}
				/>
				<DashboardCard
					title="Precio por cita"
					value={currencyFormat(appointmentCompleted.average)}
					description="Precio promedio por cita"
					icon={DollarSign}
				/>
			</div>

			{/* Recent Activity Section */}
			<div className="grid gap-4 md:grid-cols-2">
				{/* Usuarios Section */}
				<DashboardListClientRanking clients={clientMostVisited} />

				{/* Servicios Section */}
				<DashboardListServiceRanking services={serviceMostUsed} />
			</div>
		</div>
	);
}
