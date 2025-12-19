export const revalidate = 0;

import { Metadata } from 'next';
import {
	AppointmentScoreDialog,
	AppointmentToCancelDialog,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	DashboardTitle,
	FilterAppoitment,
	Pagination,
} from '@/components';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { TableAppointment } from './ui/TableAppointment';
import { getAppointmentPagination } from '@/actions';
import { AppointmentStatus } from '@/interfaces';
import { isValidDate } from '@/utils';

interface Props {
	searchParams: Promise<{
		page: string;
		limit: string;
		date: string;
		status: string;
		id: string;
	}>;
}

export const metadata: Metadata = {
	title: 'Lista de citas',
	description: 'Lista de citas',
};

export default async function AppointmentPage({ searchParams }: Props) {
	const page = (await searchParams).page ? parseInt((await searchParams).page) : 1;
	const limit = (await searchParams).limit ? parseInt((await searchParams).limit) : 12;

	const queryDate = new Date((await searchParams).date);
	const date = isValidDate(queryDate) ? queryDate : undefined;

	const status = (await searchParams).status
		? ((await searchParams).status as AppointmentStatus)
		: undefined;

	const id = (await searchParams).id ? (await searchParams).id : undefined;

	const { appointments, pages, total } = await getAppointmentPagination({
		page,
		limit,
		status,
		date,
		id: id ? +id : undefined,
	});

	return (
		<div className="space-y-6">
			<AppointmentToCancelDialog />
			<AppointmentScoreDialog />

			<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
				<DashboardTitle title="Gestión de Citas" subtitle="Administra las citas" />

				<Link href="/admin/appointments/new">
					<Button className="btn-primary">
						<Plus className="mr-2 h-4 w-4" />
						Agregar Cita
					</Button>
				</Link>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Lista de citas</CardTitle>
				</CardHeader>
				<CardContent>
					<FilterAppoitment />

					<TableAppointment appointments={appointments} />

					<Pagination totalPages={pages!} />
				</CardContent>
			</Card>
		</div>
	);
}
