import { getAppointmentById, getServicePagination } from '@/actions';
import { auth } from '@/auth';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { ClientAppointmentForm } from './ui/ClientAppointmentForm';
import { Title } from '@/components';

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
	const session = await auth();
	const idService = (await searchParams).idService ?? undefined;
	const id = (await params).id;

	const { appoitment } = await getAppointmentById(id);

	if (!appoitment && id !== 'new') {
		return redirect('/appoitments');
	}

	if (appoitment && appoitment?.status !== 'PENDING') {
		return redirect(`/appointment/view/${id}`);
	}

	const { services } = await getServicePagination({
		page: 1,
		limit: 1000,
		isActive: 'true',
	});

	return (
		<div>
			<Title title="Agendar cita" subtitle="LLena el formulario" />
			<ClientAppointmentForm
				id={id}
				appointment={appoitment}
				idClientDefault={session?.user.id!}
				idServiceDefault={idService}
				services={services}
			/>
		</div>
	);
}
