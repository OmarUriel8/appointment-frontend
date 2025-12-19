export const revalidate = 604800; //7 dia
import { getAppointmentByClientIdPagination, getUserById } from '@/actions';
import { CardUserInformation } from '@/components';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

interface Props {
	params: Promise<{
		id: string;
	}>;
}

export const metadata: Metadata = {
	title: 'Citas por cliente',
	description: 'Citas por cliente',
};

export default async function AppointmentByClientPage({ params }: Props) {
	const id = (await params).id;

	const [user, appointment1, appointment2] = await Promise.all([
		getUserById(id),
		getAppointmentByClientIdPagination({
			idClient: id,
			page: 1,
			status: 'PENDING',
		}),
		getAppointmentByClientIdPagination({
			idClient: id,
			page: 1,
			status: 'CONFIRMED',
		}),
	]);

	if (!user) {
		redirect('/admin/clients');
	}

	const appointments = [...appointment1.appointments, ...appointment2.appointments];

	return (
		<div className="space-y-6">
			<CardUserInformation user={user} appointments={appointments} />
		</div>
	);
}
