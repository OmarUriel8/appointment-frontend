'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { Logo } from '../logo/Logo';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export function Navbar() {
	const { data: session } = useSession();

	const isAuthenticated = !!session?.user;

	const isAdmin = session?.user.role === 'ADMIN';
	const isClient = session?.user.role === 'CLIENT';
	const isEmployee = session?.user.role === 'EMPLOYEE';

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
					{isClient && (
						<Link href="/appointment">
							<Button variant="link" size="sm">
								Agendar cita
							</Button>
						</Link>
					)}

					{isAdmin && (
						<Link href="/admin/dashboard">
							<Button variant="link" size="sm">
								Dashboard
							</Button>
						</Link>
					)}
					{isEmployee && (
						<Link href="#">
							<Button variant="link" size="sm">
								Ver agenda
							</Button>
						</Link>
					)}

					{isAuthenticated && (
						<Link href="/profile">
							<Button variant="link" size="sm">
								Mi perfil
							</Button>
						</Link>
					)}
				</div>
				<div className="flex items-center gap-4">
					{isAuthenticated ? (
						<Button
							variant="ghost"
							size="sm"
							onClick={() => signOut()}
							className="text-destructive hover:text-destructive hover:bg-destructive/10 bg-transparent mt-2"
						>
							<LogOut className="mr-1 h-4 w-4" />
							Cerrar Sesión
						</Button>
					) : (
						<Link href="/auth/login">
							<Button variant="secondary" size="sm">
								Iniciar Sesión
							</Button>
						</Link>
					)}

					<ThemeToggle />
				</div>
			</div>
		</nav>
	);
}
