'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ServiceCarouselProps {
	images: string[];
	name: string;
}

export function ServiceCarousel({ images, name }: ServiceCarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0);

	const goToPrevious = () => {
		setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
	};

	const goToNext = () => {
		setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
	};

	const goToSlide = (index: number) => {
		setCurrentIndex(index);
	};

	if (images.length === 0) return null;

	return (
		<div className="relative w-full">
			<div className="relative h-96 w-full overflow-hidden rounded-lg border border-border">
				<Image
					src={images[currentIndex]}
					alt={`${name} - Imagen ${currentIndex + 1}`}
					fill
					className="object-cover"
					priority={currentIndex === 0}
				/>
				{images.length > 1 && (
					<>
						<Button
							variant="ghost"
							size="icon"
							className="absolute left-2 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
							onClick={goToPrevious}
						>
							<ChevronLeft className="h-5 w-5" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							className="absolute right-2 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
							onClick={goToNext}
						>
							<ChevronRight className="h-5 w-5" />
						</Button>
					</>
				)}
			</div>
			{images.length > 1 && (
				<div className="mt-4 flex justify-center gap-2">
					{images.map((_, index) => (
						<button
							key={index}
							onClick={() => goToSlide(index)}
							className={cn(
								'h-2 rounded-full transition-all',
								index === currentIndex
									? 'w-8 bg-primary'
									: 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
							)}
							aria-label={`Ir a imagen ${index + 1}`}
						/>
					))}
				</div>
			)}
		</div>
	);
}
