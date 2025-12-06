import { Footer, Navbar } from '@/components';
import { Metadata } from 'next';
import { BackgroundGradient } from '../../components/ui/background/BackgroundGradient';

export const metadata: Metadata = {
	title: 'Prueba',
	description: 'Servicios disponibles',
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative min-h-screen overflow-hidden bg-background">
			<BackgroundGradient />
			<Navbar />
			<main className="relative container mx-auto px-4 py-8 mb-40">{children}</main>

			<Footer />
		</div>
	);
}
