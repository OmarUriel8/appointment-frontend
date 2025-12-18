import { auth } from '@/auth';
import { AppointmentGrid } from './ui/AppointmentGrid';
import {
	getAppointmentByClientIdPagination,
	getAppointmentByEmployeeIdPagination,
} from '@/actions';
import {
	AppointmentEmpty,
	AppointmentScoreDialog,
	AppointmentToCancelDialog,
	FilterAppoitment,
	Pagination,
	Title,
} from '@/components';
import { AppointmentResponse, AppointmentStatus } from '@/interfaces';

interface Props {
	searchParams: Promise<{
		page: string;
		limit: string;
		date: string;
		status: string;
	}>;
}

export default async function AppointmentPage({ searchParams }: Props) {
	const session = await auth();
	const page = (await searchParams).page ? parseInt((await searchParams).page) : 1;
	const limit = (await searchParams).limit ? parseInt((await searchParams).limit) : 12;
	const date = (await searchParams).date
		? new Date((await searchParams).date)
		: undefined;
	const status = (await searchParams).status
		? ((await searchParams).status as AppointmentStatus)
		: undefined;

	const role = session?.user.role;
	let listAppointments: AppointmentResponse[] = [];
	let totalPages: number = 0;

	if (role === 'CLIENT') {
		const { appointments, pages } = await getAppointmentByClientIdPagination({
			page,
			limit,
			status,
			date,
			idClient: session?.user.id!,
		});
		listAppointments = appointments;
		totalPages = pages;
	} else if (role === 'EMPLOYEE') {
		const { appointments, pages } = await getAppointmentByEmployeeIdPagination({
			page,
			limit,
			status,
			date,
			idEmployee: session?.user.id!,
		});
		listAppointments = appointments;
		totalPages = pages;
	}

	return (
		<div>
			<AppointmentToCancelDialog />
			<AppointmentScoreDialog />

			<Title title="Lista de citas" />

			<FilterAppoitment />

			{listAppointments.length === 0 ? (
				role === 'CLIENT' ? (
					<AppointmentEmpty role={role!} />
				) : (
					<AppointmentEmpty
						role={role!}
						description="Parece que aún no has reservado ningún servicio."
					/>
				)
			) : (
				<AppointmentGrid appointments={listAppointments} role={role!} />
			)}

			<Pagination totalPages={totalPages} />
		</div>
	);
}
