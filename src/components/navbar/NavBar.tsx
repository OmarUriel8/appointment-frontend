import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '../theme/ThemeToggle';
import { Logo } from '../ui/logo/Logo';

export function Navbar() {
	return (
		<nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="flex h-16 items-center justify-between px-4">
				<Logo href="/" />

				<div className="flex items-center gap-4">
					<Link href="/services">
						<Button variant="link" size="sm">
							Todos los Servicios
						</Button>
					</Link>
					<Link href="/appointment">
						<Button variant="link" size="sm">
							Agendar cita
						</Button>
					</Link>
				</div>
				<div className="flex items-center gap-4">
					<Link href="/auth/login">
						<Button variant="secondary" size="sm">
							Iniciar Sesión
						</Button>
					</Link>
					<ThemeToggle />
				</div>
			</div>
		</nav>
	);
}
