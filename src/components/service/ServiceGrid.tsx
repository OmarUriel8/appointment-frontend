import { Service } from '@/interfaces';
import { ServiceCard } from './ServiceCard';

interface Props {
	services: Service[];
}

export const ServiceGrid = ({ services }: Props) => {
	if (services.length === 0) {
		return (
			<div className="rounded-lg border border-border bg-card p-12 text-center">
				<p className="text-muted-foreground">
					No hay servicios disponibles en este momento.
				</p>
			</div>
		);
	}
	return (
		<div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
			{services.map((service) => (
				<ServiceCard key={service.id} service={service} />
			))}
		</div>
	);
};
