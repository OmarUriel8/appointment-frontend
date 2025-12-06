import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components';

export default function NotFound() {
	return (
		<div className="min-h-screen bg-background">
			<Navbar />
			<main className="container mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 text-center">
				<h1 className="text-6xl font-bold">404</h1>
				<h2 className="mt-4 text-2xl font-semibold">Página no encontrada</h2>
				<p className="mt-2 text-muted-foreground">La página que buscas no existe.</p>
				<Link href="/" className="mt-6">
					<Button>Volver al inicio</Button>
				</Link>
			</main>
		</div>
	);
}
