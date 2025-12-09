'use client';

import { cn } from '@/lib/utils';
import { generatePaginationNumber } from '@/utils';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { redirect, usePathname, useSearchParams } from 'next/navigation';

interface Props {
	totalPages: number;
}
export const Pagination = ({ totalPages }: Props) => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const pageString = searchParams.get('page') ?? '1';

	let currentPage = isNaN(+pageString) ? 1 : +pageString;

	if (currentPage < 1 || isNaN(+pageString)) {
		redirect(pathname);
	}

	const allPages = generatePaginationNumber(currentPage, totalPages);

	const createPageUrl = (pageNumber: number | string) => {
		const params = new URLSearchParams(searchParams);

		if (pageNumber === '...') {
			return `${pathname}?${params.toString()}`;
		}

		if (Number(pageNumber) <= 0) {
			return `${pathname}`;
		}

		if (Number(pageNumber) > totalPages) {
			return `${pathname}?${params.toString()}`;
		}

		params.set('page', pageNumber.toString());
		return `${pathname}?${params.toString()}`;
	};

	return (
		<div className="flex justify-center text-center mt-10 mb-32">
			<nav aria-label="Page navigation example">
				<ul className="flex list-style-none">
					<li className="page-item">
						{/* disabled */}
						<Link
							className={cn(
								'page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none  transition-all duration-300 focus:shadow-none',
								currentPage === 1
									? 'text-gray-500 cursor-not-allowed'
									: 'text-gray-800 dark:text-gray-200 hover:bg-gray-200 hover:text-gray-800 hover:dark:bg-primary/70 hover:dark:text-gray-800'
							)}
							href={createPageUrl(currentPage - 1)}
						>
							<ChevronLeft size={25} />
						</Link>
					</li>

					{allPages.map((page, index) => (
						<li className="page-item" key={index}>
							<Link
								className={clsx(
									'page-link relative block py-1.5 px-3 rounded border-0 outline-none transition-all duration-300   focus:shadow-none',
									{
										'bg-primary text-white hover:bg-primary/70': page === currentPage,
										' bg-transparent text-gray-800 dark:text-gray-200 hover:bg-gray-200 hover:dark:bg-primary/70 hover:text-gray-800 hover:dark:text-gray-800':
											page !== currentPage,
									}
								)}
								href={createPageUrl(page)}
							>
								{page}
							</Link>
						</li>
					))}
					<li className="page-item">
						<Link
							className={cn(
								'page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none  transition-all duration-300 focus:shadow-none',
								currentPage === totalPages
									? 'text-gray-500  cursor-not-allowed'
									: 'text-gray-800 dark:text-gray-200 hover:bg-gray-200 hover:text-gray-800 hover:dark:bg-primary/70 hover:dark:text-gray-800'
							)}
							href={createPageUrl(currentPage + 1)}
						>
							<ChevronRight size={25} />
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};
