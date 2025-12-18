'use client';

import { createUpdateAppointment, getAvaliableHours } from '@/actions';
import {
	Button,
	Calendar,
	Card,
	CardContent,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	Label,
	Textarea,
} from '@/components';
import { Appointment, Service } from '@/interfaces';
import { cn } from '@/lib/utils';
import { currencyFormat } from '@/utils';
import { es } from 'date-fns/locale';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface Props {
	services: Service[];
	idClientDefault: string;
	idServiceDefault: string;
	id: string;
	appointment?: Appointment;
}

interface InputForm {
	date: Date;
	startTime: string;
	notes: string;
	clientId: string;
	serviceId: string;
}

let disabledDay = new Date();
disabledDay.setDate(disabledDay.getDate() - 1);

export const ClientAppointmentForm = ({
	services,
	idClientDefault,
	idServiceDefault,
	id,
	appointment,
}: Props) => {
	const router = useRouter();
	const {
		handleSubmit,
		formState: { errors },
		register,
		control,
		watch,
		setValue,
		getValues,
	} = useForm<InputForm>({
		defaultValues: {
			...appointment,
			serviceId: idServiceDefault ?? appointment?.service.id,
		},
	});

	const date = watch('date');
	const [loadingSubmit, setLoadingSubmit] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [availableHours, setAvailableHours] = useState<string[]>([]);
	const [loadingHours, setLoadingHours] = useState(false);

	useEffect(() => {
		if (!date) {
			setAvailableHours([]);
			setValue('startTime', '');
			return;
		}

		const fetchHours = async () => {
			setLoadingHours(true);
			setValue('startTime', appointment?.startTime ?? '');
			const data = await getAvaliableHours(date);

			setAvailableHours(data);

			setLoadingHours(false);
		};

		fetchHours();
	}, [date, setValue]);

	const onSubmit = async (data: InputForm) => {
		setLoadingSubmit(true);

		const resp = await createUpdateAppointment({
			id: id,
			...data,
			employeeId: '',
			status: 'PENDING',
			clientId: idClientDefault,
		});

		if (!resp.ok) {
			setErrorMessage(resp.message);
			setLoadingSubmit(false);
			return;
		}

		const message = id === 'new' ? 'Cita creada' : 'Cita actualizada';
		toast.success(message);
		setLoadingSubmit(false);
		router.replace(`/appointment/view/${resp.appointment?.id}`);
	};

	return (
		<Card>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					{/* Selección de Servicio con Preview Visual */}
					<div className="space-y-4">
						<Label className="text-lg font-semibold">1. Selecciona un servicio</Label>
						<Controller
							name="serviceId"
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<Command className="rounded-lg border shadow-md">
									<CommandInput placeholder="Buscar servicio (ej: Corte, Barba...)" />
									<CommandEmpty>No se encontró ese servicio.</CommandEmpty>
									<CommandGroup className="max-h-[250px] lg:max-h-[400px] overflow-y-auto p-2">
										<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
											{services.map((service) => (
												<CommandItem
													key={service.id}
													value={service.name} // El buscador filtrará por esto
													onSelect={() => field.onChange(service.id)}
													className={cn(
														'flex flex-col items-start p-4 border rounded-xl cursor-pointer transition-all aria-selected:bg-transparent', // Sobreescribimos el estilo por defecto de CommandItem
														field.value === service.id
															? 'border-primary bg-primary/10 ring-2 ring-primary'
															: 'border-muted bg-card hover:border-primary/50'
													)}
												>
													<div className="flex justify-between w-full mb-1">
														<span className="font-bold text-sm">{service.name}</span>
														<span className="text-primary font-bold text-sm">
															{currencyFormat(service.price)}
														</span>
													</div>
													<p className="text-xs text-muted-foreground line-clamp-2">
														{service.description}
													</p>
													<div className="mt-2 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
														Duración: {service.duration} min
													</div>
												</CommandItem>
											))}
										</div>
									</CommandGroup>
								</Command>
							)}
						/>

						{errors.serviceId && (
							<p className="text-xs text-red-500">Por favor selecciona un servicio</p>
						)}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
						{/* campo: Fecha (date) */}
						<div className="space-y-3">
							<Label className="text-base">2. Selecciona el día</Label>
							<Controller
								name="date"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<div className=" p-2 flex justify-center">
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) => date < disabledDay}
											locale={es}
										/>
									</div>
								)}
							/>
							{errors.date && (
								<p className="text-xs text-red-500 font-medium">Debes elegir una fecha</p>
							)}
						</div>

						{/* campo: hora de inicio (startTime) */}
						<div className="space-y-3">
							<Label className="text-base">3. Horarios disponibles</Label>
							<Controller
								name="startTime"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<div className="grid grid-cols-3 gap-2 h-fit">
										{!date ? (
											<div className="col-span-3 py-10 text-center border-2 border-dashed rounded-lg text-muted-foreground">
												Selecciona una fecha primero
											</div>
										) : loadingHours ? (
											<div className="col-span-3 text-center py-10 italic">
												Buscando espacios...
											</div>
										) : availableHours.length > 0 ? (
											availableHours.map((hour) => (
												<Button
													key={hour}
													type="button"
													variant={field.value === hour ? 'default' : 'outline'}
													onClick={() => field.onChange(hour)}
													className={cn('w-full font-semibold')}
												>
													{hour}
												</Button>
											))
										) : (
											<div className="col-span-3 text-center py-10 text-destructive">
												No hay horarios para este día
											</div>
										)}
									</div>
								)}
							/>
							{errors.startTime && (
								<p className="text-xs text-red-500 font-medium">Debes elegir una hora</p>
							)}
						</div>
					</div>

					{/* Notas adicionales */}
					<div className="space-y-2">
						<Label htmlFor="notes">¿Alguna indicación especial?</Label>
						<Textarea
							id="notes"
							{...register('notes')}
							placeholder="Ej. Alergias, preferencias, etc."
						/>
					</div>

					<div>
						{errorMessage !== '' && (
							<div className="flex gap-2 items-center">
								<span className="text-sm text-red-500">{errorMessage}</span>
							</div>
						)}
					</div>
					<Button
						type="submit"
						className="w-full h-12 text-lg btn-primary"
						disabled={loadingSubmit}
					>
						{loadingSubmit ? (
							<span>
								<LoaderCircle className="animate-spin" />
								Confirmando cita
							</span>
						) : (
							<span>Confirmar mi Cita</span>
						)}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};
