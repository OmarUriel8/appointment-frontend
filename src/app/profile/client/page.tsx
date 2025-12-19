export const revalidate = 0;

import { getDashboardClient, getUserById } from '@/actions';
import {
	Button,
	DashboardCard,
	DashboardListServiceRanking,
	FilterDashboard,
	Title,
} from '@/components';
import { formatNumber, isValidDate } from '@/utils';
import { Calendar, CalendarCheck, Mail, Phone } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Mi perfil',
	description: 'Perfil de usuario',
};

interface Props {
	searchParams: Promise<{
		startDate: string;
		endDate: string;
	}>;
}

export default async function ProfileClientPage({ searchParams }: Props) {
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

	const {
		ok,
		data,
		message,
		user: userSession,
	} = await getDashboardClient(startDate, endDate);
	let appointmentCompleted, appointmentPending, serviceMostUsed, user;

	if (data) {
		appointmentCompleted = data.appointmentCompleted;
		appointmentPending = data.appointmentPending;
		serviceMostUsed = data.serviceMostUsed;
		user = await getUserById(userSession?.id ?? '');
	}

	return (
		<div className="mx-auto space-y-6 ">
			<div className="flex lg:items-center gap-4 flex-col lg:flex-row lg:justify-between">
				<Title title={`Bienvenido ${user?.name}`} subtitle="Informacion personal" />
				<Link href={`/profile/client/${user?.email}`}>
					<Button className="btn-primary">Editar datos personales</Button>
				</Link>
			</div>

			<div className="flex gap-4">
				<Mail className="text-primary" /> {user?.email}
			</div>
			{user?.phone && (
				<div className="flex gap-4">
					<Phone className="text-primary" /> {user?.phone}
				</div>
			)}

			<FilterDashboard />

			{!ok ? (
				<p>No hay información que mostrar</p>
			) : (
				<>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						<DashboardCard
							title="Citas pendientes"
							value={formatNumber(appointmentPending!.count)}
							description="Citas pendientes por asistir"
							icon={Calendar}
						/>
						<DashboardCard
							title="Citas completadas"
							value={formatNumber(appointmentCompleted!.count)}
							description="Citas completadas anteriormente"
							icon={CalendarCheck}
						/>
					</div>

					<div className="grid gap-4 md:grid-cols-2">
						<DashboardListServiceRanking
							services={serviceMostUsed ?? []}
							title="Servicos mas usados"
						/>
					</div>
				</>
			)}
		</div>
	);
}
