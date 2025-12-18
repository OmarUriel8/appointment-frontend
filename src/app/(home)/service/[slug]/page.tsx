export const revalidate = 604800; // 7 dias
import { getServiceByslugOrId } from '@/actions';
import {
	Badge,
	Button,
	Card,
	CardContent,
	CardHeader,
	ServiceCarousel,
	Title,
} from '@/components';
import { Calendar, Clock, DollarSign } from 'lucide-react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { currencyFormat } from '@/utils';

interface Props {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const slug = (await params).slug;
	const service = await getServiceByslugOrId(slug);
	return {
		title: service?.name ?? 'Servicio no encontrado',
		description: service?.description ?? '',
		openGraph: {
			title: service?.name ?? 'Servicio no encontrado',
			description: service?.description ?? '',
			images: [`${service?.images[0]}`],
		},
	};
}

export default async function ServicePage({ params }: Props) {
	const slug = (await params).slug;

	const service = await getServiceByslugOrId(slug);

	if (!service) {
		notFound();
	}

	return (
		<div className="grid gap-8 lg:grid-cols-2">
			{/* Carrusel de imágenes */}
			<div className="w-full">
				{service.images && service.images.length > 0 ? (
					<ServiceCarousel images={service.images} name={service.name} />
				) : (
					<div className="relative h-96 w-full overflow-hidden rounded-lg border border-border bg-linear-to-br from-primary/20 to-secondary/20">
						<div className="flex h-full items-center justify-center">
							<span className="text-6xl font-bold text-primary/30">
								{service.name.charAt(0)}
							</span>
						</div>
					</div>
				)}
			</div>

			{/* Información del servicio */}
			<div className="space-y-6">
				<div>
					<Title title={service.name} className="my-0" subtitle={service.description} />
				</div>

				<Card>
					<CardHeader>
						<h2 className="text-2xl font-semibold">Detalles del servicio</h2>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center gap-2">
							<DollarSign className="h-5 w-5 text-primary" />
							<span className="text-xl font-semibold">Precio:</span>
							<span className="text-2xl font-bold text-primary">
								{currencyFormat(service.price)}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<Clock className="h-5 w-5 text-primary" />
							<span className="text-xl font-semibold">Duración:</span>
							<span className="text-xl">{service.duration} minutos</span>
						</div>
						{service.tags && service.tags.length > 0 && (
							<div>
								<span className="mb-2 block text-sm font-semibold">Tags:</span>
								<div className="flex flex-wrap gap-2">
									{service.tags.map((tag, index) => (
										<Badge key={index} variant="secondary" className="capitalize">
											{tag}
										</Badge>
									))}
								</div>
							</div>
						)}
					</CardContent>
				</Card>

				<Button size="lg" className="w-full text-lg">
					<Calendar className="mr-2 h-5 w-5" />
					Agendar cita
				</Button>
			</div>
		</div>
	);
}
