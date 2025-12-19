'use client';

import { useState } from 'react';
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { daysOfWeekMap, EmployeeSchedule } from '@/interfaces';
import { Checkbox } from '../ui/checkbox';
import { createUpdateEmployeeSchedule } from '@/actions';
import { toast } from 'sonner';
import { createHours } from '@/utils';

const hours = createHours();

interface Props {
	initialSchedules: EmployeeSchedule[];
	idEmployee: string;
	//onChange?: (value: EmployeeSchedule[]) => void;
}
export const WeeklySchedule = ({ initialSchedules, idEmployee }: Props) => {
	const [schedule, setSchedule] = useState<EmployeeSchedule[]>(initialSchedules);
	const [loading, setLoading] = useState(false);
	const [messageError, setMessageError] = useState('');

	const updateDay = (
		dayKey: number,
		field: keyof EmployeeSchedule,
		newValue: string | boolean
	) => {
		setSchedule((prev) => {
			// Si por alguna razón prev está vacío, lo devolvemos igual
			if (!prev || prev.length === 0) return prev;

			const updated = prev.map((item) =>
				item.dayOfWeek === dayKey ? { ...item, [field]: newValue } : item
			);

			return updated;
		});
	};

	const onSaveSchedule = async () => {
		setLoading(true);
		setMessageError('');
		//validar horarios
		const scheduleError = schedule.filter(
			(sch) => sch.endTime === '' || sch.startTime === ''
		);
		if (scheduleError.length > 0) {
			setMessageError(`Falta llenar el horario de ${schedule.length} dias`);
			setLoading(false);
			return;
		}
		//llamar accion
		const res = await createUpdateEmployeeSchedule(schedule, idEmployee);

		if (!res.ok) {
			setMessageError(res.message);
			setLoading(false);

			return;
		}

		toast.success(res.message);
		setLoading(false);
		//redirect(`/admin/employees/${idEmployee}`);
	};
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Horario Semanal</CardTitle>
			</CardHeader>

			<CardContent className="space-y-4">
				{schedule.map((day) => {
					const info = daysOfWeekMap.find((d) => d.index === day.dayOfWeek)!;

					return (
						<div
							key={day.dayOfWeek}
							className="grid grid-cols-3 gap-4 items-center border-b pb-2"
						>
							{/* isActive checkbox */}
							<div className="flex items-start flex-col gap-2">
								{/* Nombre del día */}
								<Label className="font-semibold">{info.label}</Label>
								<Label className="text-sm ">
									<Checkbox
										checked={day.isActive}
										onCheckedChange={(v) =>
											updateDay(day.dayOfWeek, 'isActive', Boolean(v))
										}
									/>
									Activo
								</Label>
							</div>

							{/* Hora inicio */}
							<div>
								<Label className="text-sm">Inicio</Label>
								<Select
									value={day.startTime}
									onValueChange={(v) => updateDay(day.dayOfWeek, 'startTime', v)}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="--" />
									</SelectTrigger>
									<SelectContent>
										{hours.map((hour) => (
											<SelectItem key={hour} value={hour}>
												{hour}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							{/* Hora fin */}
							<div>
								<Label className="text-sm">Fin</Label>
								<Select
									value={day.endTime}
									onValueChange={(v) => updateDay(day.dayOfWeek, 'endTime', v)}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="--" />
									</SelectTrigger>
									<SelectContent>
										{hours.map((hour) => (
											<SelectItem key={hour} value={hour}>
												{hour}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>
					);
				})}
			</CardContent>
			<CardFooter className="flex-col items-start gap-2">
				<div className="text-red-500">{messageError}</div>
				<Button
					className="btn-primary"
					onClick={() => onSaveSchedule()}
					disabled={loading}
				>
					<Plus className="mr-2 h-4 w-4" />
					Guardar horarios
				</Button>
			</CardFooter>
		</Card>
	);
};
