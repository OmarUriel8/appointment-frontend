export const revalidate = 0;
import { getAppointmentById, getServicePagination, getUsers } from '@/actions';
import { DashboardTitle } from '@/components';
import { redirect } from 'next/navigation';
import { AdminAppointmentForm } from './ui/AdminAppointmentForm';
import { Metadata } from 'next';

interface Props {
	params: Promise<{ id: string }>;
	searchParams: Promise<{
		idClient: string;
		idService: string;
	}>;
}

export const metadata: Metadata = {
	title: 'Formulario de citas',
	description: 'Formulario de citas',
};

export default async function AppointmentPage({ params, searchParams }: Props) {
	const id = (await params).id;
	const idClient = (await searchParams).idClient ?? undefined;
	const idService = (await searchParams).idService ?? undefined;

	const { appoitment } = await getAppointmentById(id);

	if (!appoitment && id !== 'new') {
		return redirect('/admin/appoitments');
	}
	const { services } = await getServicePagination({
		page: 1,
		limit: 1000,
		isActive: 'true',
	});

	const { users: clients } = await getUsers({
		page: 1,
		limit: 1000,
		role: 'CLIENT',
		isActive: true,
	});

	const title = id === 'new' ? 'Nuevo cita' : 'Editar cita';

	return (
		<div className="space-y-6">
			<DashboardTitle title={title} subtitle="Llene el formulario de cita" />

			<div className="grid grid-cols-1 lg:grid-cols-2">
				<AdminAppointmentForm
					clients={clients ?? []}
					id={id}
					idClientDefault={idClient}
					idServiceDefault={idService}
					services={services}
					appointment={appoitment}
				/>
			</div>
		</div>
	);
}
