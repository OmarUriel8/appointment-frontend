import { auth } from '@/auth';
import { baseUrl } from '../api.config';
import { ApiEmployeeSchedule } from '@/interfaces';
import { formatTime } from '@/utils';

export const getScheduleByEmployeeId = async (idEmployee: string) => {
	const session = await auth();

	const res = await fetch(`${baseUrl}/employee-schedule/${idEmployee}`, {
		headers: {
			Authorization: `Bearer ${session?.accessToken}`,
		},
	});

	if (!res.ok) {
		return null;
	}
	const schedules: ApiEmployeeSchedule[] = await res.json();

	return schedules.map((sch) => ({
		...sch,
		startTime: formatTime(sch.startTime),
		endTime: formatTime(sch.endTime),
	}));
};
