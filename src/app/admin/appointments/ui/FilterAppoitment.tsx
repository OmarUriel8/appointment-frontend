'use client';

import {
	Button,
	Calendar,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components';
import { formatDate } from '@/utils';
import { es } from 'date-fns/locale';
import { BrushCleaning, ChevronDownIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export const FilterAppoitment = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const dateParam = searchParams.get('date')
		? new Date(`${searchParams.get('date')!}T00:00:00`)
		: undefined;
	const status = searchParams.get('status') ?? 'all';

	const [open, setOpen] = useState(false);
	const [date, setDate] = useState<Date | undefined>(dateParam);

	const handleStatusChange = (value: string) => {
		const params = new URLSearchParams(searchParams.toString());

		params.set('status', value);

		router.replace(`${pathname}?${params.toString()}`);
	};

	const handleDateChange = (date: Date | undefined) => {
		setDate(date);
		setOpen(false);

		const params = new URLSearchParams(searchParams.toString());

		if (date) {
			params.set('date', formatDate(date!));
			router.replace(`${pathname}?${params.toString()}`);
		}
	};

	const handleCleanFilters = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete('date');
		params.set('status', 'all');

		router.replace(`${pathname}?${params.toString()}`);
		setDate(undefined);
		setOpen(false);
	};

	return (
		<div className="my-4 flex gap-3">
			<p>{}</p>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						id="date"
						className="w-48 justify-between font-normal"
					>
						{date ? date.toLocaleDateString() : 'Select date'}
						<ChevronDownIcon />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto overflow-hidden p-0" align="start">
					<Calendar
						mode="single"
						selected={date}
						captionLayout="dropdown"
						locale={es}
						onSelect={(date) => {
							handleDateChange(date);
						}}
					/>
				</PopoverContent>
			</Popover>

			<Select onValueChange={handleStatusChange} defaultValue={status}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Selecciona un estatus" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Estatus cita</SelectLabel>
						<SelectItem value="all">Todos</SelectItem>
						<SelectItem value="PENDING">Pendiente</SelectItem>
						<SelectItem value="CONFIRMED">Confirmado</SelectItem>
						<SelectItem value="COMPLETED">Completado</SelectItem>
						<SelectItem value="CANCELLED">Cancelado</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>

			<Button className="btn-info" onClick={handleCleanFilters}>
				<BrushCleaning />
				Limpiar filtros
			</Button>
		</div>
	);
};
