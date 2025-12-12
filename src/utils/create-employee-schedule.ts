import { daysOfWeekMap, EmployeeSchedule } from '@/interfaces';

export const createEmployeeSchedules = (schedules: EmployeeSchedule[]) => {
	// Inicializar valores

	const startTime = process.env.START_TIME ?? '';
	const endTime = process.env.END_TIME ?? '';

	if (schedules && schedules.length > 0) {
		// Ordenamos por dayOfWeek
		const filled = daysOfWeekMap.map((d) => {
			const found = schedules.find((s) => s.dayOfWeek === d.index);
			return (
				found ?? {
					id: '',
					dayOfWeek: d.index,
					startTime: startTime,
					endTime: endTime,
					isActive: false,
				}
			);
		});
		return filled;
	}
	// Si NO viene initialSchedules → generar vacío
	const empty = daysOfWeekMap.map((d) => ({
		id: '',
		dayOfWeek: d.index,
		startTime: startTime,
		endTime: endTime,
		isActive: false,
	}));
	return empty;
};
