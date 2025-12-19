import {
	Badge,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Checkbox,
	Label,
} from '@/components';
import { daysOfWeekMap, EmployeeSchedule } from '@/interfaces';
import { cn } from '@/lib/utils';
import { CalendarCog, Clock } from 'lucide-react';

interface Props {
	schedules: EmployeeSchedule[];
	title: string;
	//onChange?: (value: EmployeeSchedule[]) => void;
}

export const WeekleySchedule = ({ schedules, title }: Props) => {
	return (
		<div className="rounded-lg border border-border/40 bg-card p-6">
			<div className="flex items-center gap-2 mb-4">
				<CalendarCog className="h-5 w-5 text-primary" />
				<h3 className="font-semibold text-card-foreground">{title}</h3>
			</div>

			<div className="p-0">
				{/* Eliminamos padding lateral para que las filas lleguen al borde si quieres, o p-5 */}
				{schedules.length === 0 ? (
					<div className="p-10">
						<p className="text-sm text-muted-foreground text-center py-4">
							No hay horarios disponibles. Por favor, contacte a un administrador.
						</p>
					</div>
				) : (
					schedules.map((day) => {
						const info = daysOfWeekMap.find((d) => d.index === day.dayOfWeek)!;

						return (
							<div
								key={day.dayOfWeek}
								className={cn(
									'flex items-center justify-between p-4 transition-colors',
									day.isActive ? 'bg-transparent' : 'bg-muted/30 opacity-60'
								)}
							>
								{/* Información del Día */}
								<div className="flex items-center gap-4 w-1/3">
									<div
										className={cn(
											'flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold border',
											day.isActive
												? 'bg-primary/10 border-primary/20 text-primary'
												: 'bg-muted border-muted-foreground/20 text-muted-foreground'
										)}
									>
										{info.label.substring(0, 2)}
									</div>
									<div>
										<p className="text-sm font-bold leading-none">{info.label}</p>
										<p className="text-[11px] uppercase tracking-wider mt-1 font-medium">
											{day.isActive ? (
												<span className="text-teal-600">Disponible</span>
											) : (
												<span className="text-destructive">Cerrado</span>
											)}
										</p>
									</div>
								</div>

								{/* Rango de Horas */}
								<div className="flex items-center gap-8 w-2/3 justify-end">
									{day.isActive ? (
										<div className="flex items-center gap-3 bg-muted/50 px-4 py-2 rounded-lg border border-border/60">
											<div className="text-right">
												<p className="text-[10px] text-muted-foreground leading-none">
													INICIO
												</p>
												<p className="text-sm font-mono font-bold text-foreground">
													{day.startTime}
												</p>
											</div>
											<div className="h-4 w-px bg-border mx-1" />
											<div>
												<p className="text-[10px] text-muted-foreground leading-none">
													FIN
												</p>
												<p className="text-sm font-mono font-bold text-foreground">
													{day.endTime}
												</p>
											</div>
										</div>
									) : (
										<div className="flex items-center gap-2 text-muted-foreground italic text-sm pr-4">
											<Clock className="h-4 w-4 opacity-50" />
											Día Libre
										</div>
									)}
								</div>
							</div>
						);
					})
				)}
			</div>
		</div>
	);
};
