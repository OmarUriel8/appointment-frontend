import { Footer, Navbar } from '@/components';
import { Metadata } from 'next';
import { BackgroundGradient } from '../../components/ui/background/BackgroundGradient';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
	title: 'Home',
	description: 'Servicios disponibles',
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative min-h-screen bg-background">
			<Toaster position="top-right" richColors closeButton />
			<Navbar />
			<BackgroundGradient />
			<main className="relative container mx-auto px-4 py-8 mb-40">{children}</main>

			<Footer />
		</div>
	);
}
