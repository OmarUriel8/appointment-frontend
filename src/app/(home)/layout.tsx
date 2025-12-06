import { Footer, Navbar } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Prueba',
	description: 'Servicios disponibles',
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen bg-background w-full">
			<Navbar />
			<main className="container mx-auto px-4 py-8 mb-40">{children}</main>

			<Footer />
		</div>
	);
}
