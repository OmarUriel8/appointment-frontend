import { Service } from '@/interfaces';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import Image from 'next/image';
import { Calendar, Clock, DollarSign, MoreHorizontal } from 'lucide-react';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { Button } from '../ui/button';
import { currencyFormat } from '@/utils';

interface Props {
	service: Service;
}

export const ServiceCard = ({ service }: Props) => {
	const imageUrl = service.images?.[0];
	const slug = service.slug || service.id;
	return (
		<Card className="group overflow-hidden transition-all hover:shadow-lg shadow border-0 pt-0">
			<div className="relative h-48 w-full overflow-hidden bg-linear-to-br from-primary/20 to-secondary/20">
				{imageUrl ? (
					<Link href={`/service/${slug}`} className="w-full">
						<Image
							src={imageUrl}
							alt={service.name}
							fill
							className="object-cover transition-transform duration-300 group-hover:scale-110"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
					</Link>
				) : (
					<div className="flex h-full items-center justify-center">
						<Link href={`/service/${slug}`} className="w-full">
							<span className="text-4xl font-bold text-primary/30">
								{service.name.charAt(0)}
							</span>
						</Link>
					</div>
				)}
			</div>
			<CardHeader>
				<Link href={`/service/${slug}`} className="w-full">
					<h3 className="text-xl font-semibold hover:underline hover:text-primary">
						{service.name}
					</h3>
				</Link>
			</CardHeader>
			<CardContent>
				<p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
					{service.description}
				</p>
				<div className="flex items-center gap-4 text-sm">
					<div className="flex items-center gap-1">
						<DollarSign className="h-4 w-4 text-primary" />
						<span className="font-semibold">{currencyFormat(service.price)}</span>
					</div>
					<div className="flex items-center gap-1">
						<Clock className="h-4 w-4 text-primary" />
						<span>{service.duration} min</span>
					</div>
				</div>
				{service.tags && service.tags.length > 0 && (
					<div className="mt-4 flex flex-wrap gap-2">
						{/* Mostrar los primeros dos tags */}
						{service.tags.slice(0, 3).map((tag, index) => (
							<Badge key={index} variant="secondary">
								{tag}
							</Badge>
						))}

						{/* Mostrar el icono de tres puntos si hay más de 2 tags */}
						{service.tags.length > 3 && (
							<Badge variant="secondary" className="px-2">
								<MoreHorizontal className="h-4 w-4" />
							</Badge>
						)}
					</div>
				)}
			</CardContent>
			<CardFooter>
				<Link href={`/appointment/new?idService=${service.id}`} className="w-full">
					<Button className="w-full">
						<Calendar className="mr-2 h-5 w-5" />
						Agendar cita
					</Button>
				</Link>
			</CardFooter>
		</Card>
	);
};
