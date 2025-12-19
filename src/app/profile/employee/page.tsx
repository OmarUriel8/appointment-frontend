export const revalidate = 0;

import { getDashboardEmployee, getScheduleByEmployeeId, getUserById } from '@/actions';
import {
	Button,
	DashboardCard,
	DashboardListServiceRanking,
	DashboradCommentsForEmployee,
	FilterDashboard,
	Title,
} from '@/components';
import { formatNumber, isValidDate } from '@/utils';
import { Calendar, Mail, MessageCircleMore, Phone, Star } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { WeekleySchedule } from './[term]/ui/WeekleySchedule';
import { EmployeeSchedule } from '../../../interfaces/employee-schedule';

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

export default async function ProfileEmployeePage({ searchParams }: Props) {
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
	} = await getDashboardEmployee(startDate, endDate);
	let reviewClient, scoreAverage, serviceMostUsed, user;

	if (data) {
		reviewClient = data.reviewClient;
		scoreAverage = data.scoreAverage;
		serviceMostUsed = data.serviceMostUsed;
		user = await getUserById(userSession?.id ?? '');
	}

	let schedules: EmployeeSchedule[] = [];
	if (user) {
		schedules = (await getScheduleByEmployeeId(user.id)) ?? [];
	}
	return (
		<div className="space-y-6 ">
			<div className="flex lg:items-center flex-col lg:flex-row lg:justify-between">
				<Title title={`Bienvenido ${user?.name}`} subtitle="Informacion personal" />
				<Link href={`/profile/employee/${user?.id}`}>
					<Button className="btn-primary">Editar datos personales</Button>
				</Link>
			</div>

			<div className="flex gap-4">
				<Mail className="text-primary" /> {user?.email}
			</div>
			{(user?.phone || user?.phone !== '') ?? (
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
							value={formatNumber(scoreAverage!.average)}
							description="Citas pendientes por asistir"
							icon={Calendar}
						/>
					</div>

					<div className="grid gap-4 md:grid-cols-2">
						<DashboardListServiceRanking
							services={serviceMostUsed ?? []}
							title="Servicos mas realizados"
						/>

						<DashboradCommentsForEmployee
							reviewClient={reviewClient ?? []}
							title="Comentarios de los clientes"
						/>
					</div>
				</>
			)}

			<div className="grid grid-cols-1 lg:grid-cols-2">
				<WeekleySchedule schedules={schedules ?? []} title="Horario Semanal" />
			</div>
		</div>
	);
}
