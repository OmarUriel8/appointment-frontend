export const revalidate = 604800; //7 dias
import { getAppointmentById } from '@/actions';
import { auth } from '@/auth';
import {
	AppointmentCard,
	AppointmentScoreDialog,
	AppointmentToCancelDialog,
} from '@/components';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

interface Props {
	params: Promise<{
		id: string;
	}>;
}

export const metadata: Metadata = {
	title: 'Detalle de cita',
	description: 'Detalles de cita',
};

export default async function AppointmentViewPage({ params }: Props) {
	const id = (await params).id;
	const session = await auth();
	const role = session?.user.role;

	const { ok, appoitment } = await getAppointmentById(id);

	if (!ok) {
		redirect('admin/appointments');
	}

	return (
		<div className="space-y-6">
			<AppointmentToCancelDialog />
			<AppointmentScoreDialog />

			<AppointmentCard appointment={appoitment!} role={role!} />
		</div>
	);
}
