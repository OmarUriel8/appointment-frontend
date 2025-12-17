'use client';

import {
	Button,
	Calendar,
	Input,
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
import { BrushCleaning, ChevronDownIcon, Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';

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

	const inputRef = useRef<HTMLInputElement>(null);
	const id = searchParams.get('id') ?? '';

	const handelKeyDown = (even: React.KeyboardEvent<HTMLInputElement>) => {
		if (even.key === 'Enter') {
			const value = inputRef.current?.value ?? '';
			const params = new URLSearchParams(searchParams.toString());

			params.set('id', value);

			//router.push(`?${params.toString()}`);
			router.replace(`${pathname}?${params.toString()}`);
		}
	};

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
		params.delete('id');

		router.replace(`${pathname}?${params.toString()}`);
		setDate(undefined);
		setOpen(false);
		if (inputRef.current) {
			inputRef.current.value = '';
		}
	};

	return (
		<div className="my-4 flex gap-3">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						id="date"
						className="w-48 justify-between font-normal"
					>
						{date ? date.toLocaleDateString() : 'Selecciona una fecha'}
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

			<div className="relative">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
				<Input
					ref={inputRef}
					placeholder="Busca por el id de cita..."
					className="pl-12 text-lg bg-white"
					onKeyDown={handelKeyDown}
					defaultValue={id}
				/>
			</div>
			<Button className="btn-info" onClick={handleCleanFilters}>
				<BrushCleaning />
				Limpiar filtros
			</Button>
		</div>
	);
};
