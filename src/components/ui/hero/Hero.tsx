import { titleFont } from '@/config/font';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '../button';
import { Calendar } from 'lucide-react';

export const Hero = () => {
	return (
		<section className="mb-16 rounded-2xl bg-linear-to-br from-primary/80 via-secondary/70 to-primary/60 p-12 text-center text-white shadow-lg">
			<h1
				className={cn(
					'mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl',
					titleFont.className
				)}
			>
				Agenda tu cita fácil y rápido
			</h1>

			<p className="mb-8 text-lg text-white/90 sm:text-xl">
				Elige un servicio y reserva en minutos.
			</p>

			<Link href="/appointment">
				<Button size="lg" className="h-12 px-8 text-lg" variant="secondary">
					<Calendar className="mr-2 h-5 w-5" />
					Reservar ahora
				</Button>
			</Link>
		</section>
	);
};
