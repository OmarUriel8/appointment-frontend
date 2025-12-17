'use client';

import { getAvaliableEmployees, getAvaliableHours } from '@/actions';
import { createUpdateAppointment } from '@/actions';
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
	Popover,
	PopoverContent,
	PopoverTrigger,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Textarea,
} from '@/components';
import { Appointment, AppointmentStatus, Service, User } from '@/interfaces';
import { cn } from '@/lib/utils';
import { Check, ChevronDownIcon, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface Props {
	appointment?: Appointment;
	id: string;
	services: Service[];
	clients: User[];
	idClientDefault: string;
	idServiceDefault: string;
}

interface InputForm {
	date: Date;
	startTime: string;
	status: AppointmentStatus;
	notes: string;
	clientId: string;
	employeeId: string;
	serviceId: string;
}

export const AdminAppointmentForm = ({
	appointment,
	id,
	clients,

	idClientDefault,
	idServiceDefault,
	services,
}: Props) => {
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [availableHours, setAvailableHours] = useState<string[]>([]);
	const [loadingHours, setLoadingHours] = useState(false);
	const [avaliableEmployee, setAvaliableEmployee] = useState<User[]>([]);
	const [loadingEmployee, setLoadingEmployee] = useState(false);

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
			clientId: idClientDefault ?? appointment?.client.id,
			serviceId: idServiceDefault ?? appointment?.service.id,
			employeeId: appointment?.employee.id,
		},
	});

	const date = watch('date');
	const service = watch('serviceId');
	const startTime = watch('startTime');

	useEffect(() => {
		if (!service || !date || !startTime) {
			setAvaliableEmployee([]);
			setValue('employeeId', '');
			return;
		}

		const fetchEmployee = async () => {
			setLoadingEmployee(true);

			const data = await getAvaliableEmployees({
				date: date,
				idService: service,
				time: startTime,
			});

			setAvaliableEmployee(data);

			setLoadingEmployee(false);
		};

		fetchEmployee();
	}, [service, date, startTime, setValue]);

	useEffect(() => {
		if (!date) {
			setAvailableHours([]);
			setValue('startTime', '');
			return;
		}

		const fetchHours = async () => {
			setLoadingHours(true);
			setValue('startTime', '');
			const data = await getAvaliableHours(date);

			setAvailableHours(data);

			setLoadingHours(false);
		};

		fetchHours();
	}, [date, setValue]);

	const onSubmit = async (data: InputForm) => {
		setLoading(true);

		const resp = await createUpdateAppointment({ id, ...data });

		if (!resp.ok) {
			setErrorMessage(resp.message);
			setLoading(false);
			return;
		}

		let messageSuccess = id === 'new' ? `Cita creada` : 'Cita actualizada';
		toast.success(messageSuccess);
		setLoading(false);
		router.replace(`/admin/appointments/view/${resp.appointment?.id}`);
	};

	return (
		<Card>
			{/* <CardHeader>
				<CardTitle>Card Title</CardTitle>
				<CardDescription>Card Description</CardDescription>
			</CardHeader> */}

			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="space-y-2">
						<Label htmlFor="clientId">Cliente</Label>
						<Controller
							name="clientId"
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											role="combobox"
											className="w-full justify-between"
										>
											{clients.find((c) => c.id === field.value)?.name ??
												'Seleccione un cliente'}
											<ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
										</Button>
									</PopoverTrigger>

									<PopoverContent className="w-full p-0">
										<Command>
											<CommandInput placeholder="Buscar cliente..." />
											<CommandEmpty>No se encontraron clientes</CommandEmpty>

											<CommandGroup className="max-h-60 overflow-y-auto">
												{clients.map((client) => (
													<CommandItem
														key={client.id}
														value={client.name}
														onSelect={() => field.onChange(client.id)}
													>
														{client.name}
														<Check
															className={cn(
																'ml-auto h-4 w-4',
																field.value === client.id ? 'opacity-100' : 'opacity-0'
															)}
														/>
													</CommandItem>
												))}
											</CommandGroup>
										</Command>
									</PopoverContent>
								</Popover>
							)}
						/>

						<div className="h-5">
							{errors.clientId && (
								<p className="text-sm font-medium text-red-500">
									El cliente es requerido
								</p>
							)}
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="serviceId">Servicio</Label>

						<Controller
							name="serviceId"
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											role="combobox"
											className="w-full justify-between"
										>
											{services.find((s) => s.id === field.value)?.name ??
												'Seleccione un servicio'}
											<ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
										</Button>
									</PopoverTrigger>

									<PopoverContent className="lg:min-w-[400px] p-0">
										<Command>
											<CommandInput placeholder="Buscar servicio..." />
											<CommandEmpty>No se encontraron servicios</CommandEmpty>

											<CommandGroup className="max-h-60 overflow-y-auto">
												{services.map((service) => (
													<CommandItem
														key={service.id}
														value={service.name}
														onSelect={() => field.onChange(service.id)}
													>
														{service.name}
														<Check
															className={cn(
																'ml-auto h-4 w-4',
																field.value === service.id ? 'opacity-100' : 'opacity-0'
															)}
														/>
													</CommandItem>
												))}
											</CommandGroup>
										</Command>
									</PopoverContent>
								</Popover>
							)}
						/>

						<div className="h-5">
							{errors.serviceId && (
								<p className="text-sm font-medium text-red-500">
									El servicio es requerido
								</p>
							)}
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="date">Dia para la cita</Label>
						<Controller
							name="date"
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<Popover open={open} onOpenChange={setOpen}>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											id="date"
											className="w-full justify-between font-normal"
										>
											{field.value
												? typeof field.value === 'string'
													? new Date(`${field.value}T00:00:00`).toLocaleDateString(
															'es-MX'
													  )
													: field.value.toLocaleDateString('es-MX')
												: 'Selecciona fecha'}
											<ChevronDownIcon />
										</Button>
									</PopoverTrigger>

									<PopoverContent className="w-auto overflow-hidden p-0" align="start">
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={(date) => {
												field.onChange(date);
												setOpen(false);
											}}
											captionLayout="dropdown"
										/>
									</PopoverContent>
								</Popover>
							)}
						/>
						<div className="h-5">
							{errors.date && (
								<p className="text-sm font-medium text-red-500">La fecha es requerida</p>
							)}
						</div>
					</div>
					<div className="space-y-2">
						<Label htmlFor="startTime">Hora de inicio</Label>
						<Controller
							name="startTime"
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant="outline"
											role="combobox"
											className="w-full justify-between"
											disabled={!date || loadingHours}
										>
											{loadingHours
												? 'Cargando horarios...'
												: field.value || field.value !== ''
												? field.value
												: 'Hora de inicio'}
											<ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
										</Button>
									</PopoverTrigger>

									<PopoverContent
										// align="start"
										// className="p-0"
										// style={{ width: 'var(--radix-popover-trigger-width)' }}
										className="lg:min-w-[400px] p-0"
									>
										<Command>
											<CommandInput placeholder="Buscar horario..." />
											<CommandEmpty>
												{loadingHours ? 'Cargando...' : 'No hay horarios disponibles'}
											</CommandEmpty>

											<CommandGroup className="max-h-60 overflow-y-auto">
												{availableHours.map((hour) => (
													<CommandItem
														key={hour}
														value={hour}
														onSelect={() => field.onChange(hour)}
													>
														{hour}
													</CommandItem>
												))}
											</CommandGroup>
										</Command>
									</PopoverContent>
								</Popover>
							)}
						/>

						<div className="h-5">
							{errors.startTime && (
								<p className="text-sm font-medium text-red-500">
									La hora de inicio es requerida
								</p>
							)}
						</div>
					</div>
					<div className="space-y-2">
						<Label htmlFor="status">Estatus</Label>
						<Controller
							name="status"
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<Select
									onValueChange={field.onChange}
									value={field.value}
									defaultValue={field.value}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Seleccione un status" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="PENDING">Pendiente</SelectItem>
										<SelectItem value="CONFIRMED">Confirmado</SelectItem>
										<SelectItem value="COMPLETED">Completado</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>

						<div className="h-5">
							{errors.status && (
								<p className="text-sm font-medium text-red-500">
									El estatus es requerido
								</p>
							)}
						</div>
					</div>
					<div className="space-y-2">
						<Label htmlFor="notes">Notas</Label>
						<Textarea
							id="notes"
							placeholder="Notas sobre la cita"
							{...register('notes')}
						/>
						<div className="h-5">
							{errors.notes && (
								<p className="text-sm font-medium text-red-500">
									Las notas no son validas
								</p>
							)}
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="employeeId">Empleado</Label>

						<div className="h-6">
							<Controller
								name="employeeId"
								control={control}
								render={({ field }) => (
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant="outline"
												role="combobox"
												className="w-full justify-between"
												disabled={loadingEmployee}
											>
												{loadingEmployee
													? 'Cargando horarios...'
													: avaliableEmployee.find((e) => e.id === field.value)?.name ??
													  'Seleccione un empleado'}

												<ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</PopoverTrigger>

										<PopoverContent className="lg:min-w-[400px] p-0">
											<Command>
												<CommandInput placeholder="Buscar empleado..." />
												<CommandEmpty>
													{loadingHours ? 'Cargando...' : 'No se encontraron empleados'}
												</CommandEmpty>

												<CommandGroup className="max-h-60 overflow-y-auto">
													{avaliableEmployee.map((employee) => (
														<CommandItem
															key={employee.id}
															value={employee.name}
															onSelect={() => field.onChange(employee.id)}
														>
															{employee.name}
															<Check
																className={cn(
																	'ml-auto h-4 w-4',
																	field.value === employee.id
																		? 'opacity-100'
																		: 'opacity-0'
																)}
															/>
														</CommandItem>
													))}
												</CommandGroup>
											</Command>
										</PopoverContent>
									</Popover>
								)}
							/>

							{errors.employeeId && (
								<p className="text-sm font-medium text-red-500">
									El empleado es requerido
								</p>
							)}
						</div>
					</div>

					<div className="flex justify-end">
						<Button className="btn-primary mt-7">
							{loading ? (
								'Guardando...'
							) : (
								<>
									<Save className="mr-1 h-4 w-4" />
									Guardar
								</>
							)}
						</Button>
					</div>

					{errorMessage !== '' && (
						<div className="flex gap-2 items-center">
							<span className="text-sm text-red-500">{errorMessage}</span>
						</div>
					)}
				</form>
			</CardContent>
			{/* <CardFooter>
				
			</CardFooter> */}
		</Card>
	);
};
