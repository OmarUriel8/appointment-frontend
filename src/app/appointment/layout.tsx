import { Footer, Navbar } from '@/components';
import { Metadata } from 'next';
import { BackgroundGradient } from '../../components/ui/background/BackgroundGradient';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
	title: 'Citas',
	description: 'Agenda una cita',
};

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
	const session = await auth();

	if (session && session.user.role === 'ADMIN') {
		redirect('/');
	}

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
