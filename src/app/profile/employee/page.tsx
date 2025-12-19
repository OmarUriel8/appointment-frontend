import { getDashboardEmployee } from '@/actions';
import {
	Button,
	DashboardCard,
	DashboardListServiceRanking,
	FilterDashboard,
	Title,
} from '@/components';
import { formatNumber, isValidDate } from '@/utils';
import { Calendar, CalendarCheck, Mail, Phone, Star, User } from 'lucide-react';
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

	const { ok, data, message, user } = await getDashboardEmployee(startDate, endDate);
	let reviewClient, scoreAverage, serviceMostUsed;

	if (data) {
		reviewClient = data.reviewClient;
		scoreAverage = data.scoreAverage;
		serviceMostUsed = data.serviceMostUsed;
	}

	return (
		<div className="mx-auto space-y-6 ">
			<div className="flex lg:items-center gap-4 flex-col lg:flex-row lg:justify-between">
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
						<div className="rounded-lg border border-border/40 bg-card p-6">
							<h3 className="font-semibold text-card-foreground mb-4">
								Comentarios de los clientes
							</h3>

							{reviewClient!.map((review) => (
								<div key={review.id} className="mb-2">
									<div className="grid grid-cols-8">
										<p className="col-span-1 flex items-center gap-2">
											<Star className="text-yellow-500 fill-yellow-400 h-8 w-8" />
											<span className="font-semibold">{review.score}</span>
										</p>
										<p className="text-sm italic col-span-6">"{review.comments}"</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	);
}
