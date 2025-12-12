import {
	getAppointmentByEmployeeIdPagination,
	getScheduleByEmployeeId,
	getUserById,
} from '@/actions';
import { CardUserInformation } from '@/components';
import { WeeklySchedule } from '@/components/employee/WeeklyChedule';
import { daysOfWeekMap, EmployeeSchedule } from '@/interfaces';
import { createEmployeeSchedules } from '@/utils';
import { redirect } from 'next/navigation';

interface Props {
	params: Promise<{
		id: string;
	}>;
}

export default async function EmployeePage({ params }: Props) {
	const id = (await params).id;

	const [user, schedulesApi, appointment1, appointment2] = await Promise.all([
		getUserById(id),
		getScheduleByEmployeeId(id),
		getAppointmentByEmployeeIdPagination({
			idEmployee: id,
			page: 1,
			status: 'PENDING',
		}),
		getAppointmentByEmployeeIdPagination({
			idEmployee: id,
			page: 1,
			status: 'CONFIRMED',
		}),
	]);

	if (!user) {
		redirect('/admin/employees');
	}

	const appointments = [...appointment1.appointments, ...appointment2.appointments];

	let schedule = createEmployeeSchedules(schedulesApi ?? []);
	return (
		<div className="space-y-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
			<CardUserInformation user={user} appointments={appointments} />

			<WeeklySchedule initialSchedules={schedule} idEmployee={user.id} />
		</div>
	);
}
