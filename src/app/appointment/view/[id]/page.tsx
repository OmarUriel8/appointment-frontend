export const revalidate = 86400; // 1 dia

import { getAppointmentById } from '@/actions';
import { auth } from '@/auth';
import {
	AppointmentCard,
	AppointmentCardClient,
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
		redirect('/appointments');
	}

	return (
		<div className="space-y-6">
			<AppointmentToCancelDialog />
			<AppointmentScoreDialog />

			{role === 'EMPLOYEE' ? (
				<AppointmentCard appointment={appoitment!} role={role!} />
			) : (
				<AppointmentCardClient role={role!} appointment={appoitment!} />
			)}
		</div>
	);
}
