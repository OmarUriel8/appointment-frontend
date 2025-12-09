import { auth } from '@/auth';
import { BackgroundGradient, Footer, Navbar } from '@/components';
import { redirect } from 'next/navigation';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
	const session = await auth();
	if (session?.user) {
		redirect('/');
	}
	return (
		<div className="relative min-h-screen bg-background">
			<BackgroundGradient />
			<Navbar />
			<main className="relative container mx-auto flex min-h-[calc(100vh-9rem)] items-center justify-center px-4 py-12">
				<div className="w-full max-w-md">{children}</div>
			</main>

			<Footer />
		</div>
	);
}
