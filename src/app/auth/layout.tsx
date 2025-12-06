import { BackgroundGradient, Footer, Navbar } from '@/components';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative min-h-screen overflow-hidden bg-background">
			<BackgroundGradient />
			<Navbar />
			<main className="relative container mx-auto flex min-h-[calc(100vh-9rem)] items-center justify-center px-4 py-12">
				<div className="w-full max-w-md">{children}</div>
			</main>

			<Footer />
		</div>
	);
}
