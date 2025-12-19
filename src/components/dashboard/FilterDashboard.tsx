'use client';

import { formatDate, isValidDate } from '@/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { BrushCleaning, ChevronDownIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { es } from 'date-fns/locale';

export const FilterDashboard = () => {
	const defaultEndDate = new Date();
	const defaultStartDate = new Date();
	defaultStartDate.setMonth(defaultStartDate.getMonth() - 1);

	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const queryStartDate = new Date(`${searchParams.get('startDate') ?? ''}T00:00:00`);
	const dateStartParam = isValidDate(queryStartDate) ? queryStartDate : defaultStartDate;

	const queryEndDate = new Date(`${searchParams.get('endDate') ?? ''}T00:00:00`);
	const dateEndParam = isValidDate(queryStartDate) ? queryStartDate : defaultEndDate;

	const [openStartDate, setOpenStartDate] = useState(false);
	const [openEndDate, setOpenEndDate] = useState(false);
	const [startDate, setStartDate] = useState<Date | undefined>(dateStartParam);
	const [endDate, setEndDate] = useState<Date | undefined>(dateEndParam);

	const handleDateStartChange = (date: Date | undefined) => {
		setStartDate(date);
		setOpenStartDate(false);

		const params = new URLSearchParams(searchParams.toString());

		if (date) {
			params.set('startDate', formatDate(date!));
			router.replace(`${pathname}?${params.toString()}`);
		}
	};

	const handleDateEndChange = (date: Date | undefined) => {
		setEndDate(date);
		setOpenEndDate(false);

		const params = new URLSearchParams(searchParams.toString());

		if (date) {
			params.set('endDate', formatDate(date!));
			router.replace(`${pathname}?${params.toString()}`);
		}
	};

	const handleCleanFilters = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('startDate', formatDate(defaultStartDate));
		params.set('endDate', formatDate(defaultEndDate));

		console.log({
			s: formatDate(defaultStartDate),
			e: formatDate(defaultEndDate),
			defaultEndDate,
		});
		router.replace(`${pathname}?${params.toString()}`);
		setStartDate(defaultStartDate);
		setOpenStartDate(false);
		setEndDate(defaultEndDate);
		setOpenEndDate(false);
	};

	return (
		<div className="my-4 flex gap-4">
			{/* startDate  */}
			<Popover open={openStartDate} onOpenChange={setOpenStartDate}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						id="date"
						className="w-48 justify-between font-normal bg-white dark:bg-background"
					>
						{startDate ? startDate.toLocaleDateString() : 'Selecciona una fecha'}
						<ChevronDownIcon />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto overflow-hidden p-0" align="start">
					<Calendar
						mode="single"
						selected={startDate}
						captionLayout="dropdown"
						locale={es}
						onSelect={(date) => {
							handleDateStartChange(date);
						}}
					/>
				</PopoverContent>
			</Popover>

			{/* endDate  */}

			<Popover open={openEndDate} onOpenChange={setOpenEndDate}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						id="date"
						className="w-48 justify-between font-normal bg-white dark:bg-background"
					>
						{endDate ? endDate.toLocaleDateString() : 'Selecciona una fecha'}
						<ChevronDownIcon />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto overflow-hidden p-0" align="start">
					<Calendar
						mode="single"
						selected={endDate}
						captionLayout="dropdown"
						locale={es}
						onSelect={(date) => {
							handleDateEndChange(date);
						}}
					/>
				</PopoverContent>
			</Popover>

			{/* Button clean */}
			<Button className="btn-info" onClick={handleCleanFilters}>
				<BrushCleaning />
				Restablecer filtros
			</Button>
		</div>
	);
};
