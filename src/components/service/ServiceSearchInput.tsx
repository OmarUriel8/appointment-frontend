'use client';

import { Search } from 'lucide-react';
import { useRef } from 'react';
import { Input } from '../ui/input';
import { useRouter, useSearchParams } from 'next/navigation';

export const ServiceSearchInput = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const inputRef = useRef<HTMLInputElement>(null);
	const name = searchParams.get('query') ?? '';

	const handelKeyDown = (even: React.KeyboardEvent<HTMLInputElement>) => {
		if (even.key === 'Enter') {
			const value = inputRef.current?.value ?? '';
			const params = new URLSearchParams(searchParams.toString());

			params.set('query', value);

			router.push(`?${params.toString()}`);
		}
	};

	return (
		<div className="relative flex-1">
			<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
			<Input
				ref={inputRef}
				placeholder="Busca por el nombre de algún servicio..."
				className="pl-12 h-12 text-lg bg-white"
				onKeyDown={handelKeyDown}
				defaultValue={name}
			/>
		</div>
	);
};
