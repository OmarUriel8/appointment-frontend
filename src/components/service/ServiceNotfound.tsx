import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, ArrowLeft, Home } from 'lucide-react';

interface ServiceNotFoundProps {
	slug?: string;
}

export function ServiceNotFound({ slug }: ServiceNotFoundProps) {
	return (
		<Card className="w-full md:w-[60%] md:mx-auto">
			<CardContent className="p-12 text-center">
				<div className="mb-6 flex justify-center">
					<div className="rounded-full bg-primary/10 p-6">
						<Search className="h-16 w-16 text-primary" />
					</div>
				</div>
				<h1 className="mb-4 text-4xl font-bold">Servicio no encontrado</h1>
				<p className="mb-2 text-lg text-muted-foreground">
					Lo sentimos, no pudimos encontrar el servicio que estás buscando.
				</p>
				{slug && (
					<p className="mb-6 text-sm text-muted-foreground">
						<span className="font-medium">Buscaste:</span> {slug}
					</p>
				)}
				<div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
					<Link href="/">
						<Button size="lg" className="w-full sm:w-auto">
							<Home className="mr-2 h-4 w-4" />
							Volver al inicio
						</Button>
					</Link>
					<Link href="/services">
						<Button variant="outline" size="lg" className="w-full sm:w-auto">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Ver todos los servicios
						</Button>
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
