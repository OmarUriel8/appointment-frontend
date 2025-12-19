'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import { LogOut, Menu, X } from 'lucide-react'; // Importamos Menu
import { Logo } from '../logo/Logo';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components';
import { NavLinks } from './NavLinks';

export function Navbar() {
	const { data: session } = useSession();
	const isAuthenticated = !!session?.user;

	const isAdmin = session?.user.role === 'ADMIN';
	const isClient = session?.user.role === 'CLIENT';
	const isEmployee = session?.user.role === 'EMPLOYEE';

	return (
		<nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="flex h-16 items-center justify-between px-4">
				<div className="flex items-center gap-2">
					{/* Menu Móvil (Visible solo en sm/md) */}
					<div className="lg:hidden">
						<Sheet>
							<SheetTrigger asChild>
								<Button variant="ghost" size="icon">
									<Menu className="h-5 w-5" />
								</Button>
							</SheetTrigger>
							<SheetContent side="left" className="w-[250px] sm:w-[300px]">
								<SheetHeader>
									<SheetTitle className="text-left flex flex-col gap-2">Menú</SheetTitle>
								</SheetHeader>

								<div className="flex flex-col gap-2">
									<NavLinks
										className="flex flex-col space-y-2"
										isAdmin={isAdmin}
										isAuthenticated={isAuthenticated}
										isClient={isClient}
										isEmployee={isEmployee}
									/>
								</div>
							</SheetContent>
						</Sheet>
					</div>

					<Logo href="/" />
				</div>

				{/* Desktop Links (Oculto en móviles, visible en lg) */}
				<div className="hidden lg:flex items-center gap-4">
					<NavLinks
						className="flex items-center gap-4"
						isAdmin={isAdmin}
						isAuthenticated={isAuthenticated}
						isClient={isClient}
						isEmployee={isEmployee}
					/>
				</div>

				{/* Auth y Theme */}
				<div className="flex items-center gap-2">
					{isAuthenticated ? (
						<Button
							size="sm"
							onClick={() => signOut()}
							className="text-destructive hover:text-destructive hover:bg-destructive/10 bg-transparent"
						>
							<LogOut className="mr-1 h-4 w-4" />
							<span className="hidden sm:inline">Cerrar Sesión</span>
						</Button>
					) : (
						<Link href="/auth/login">
							<Button variant="secondary" size="sm">
								<LogOut className="mr-1 h-4 w-4" />
								<span className="hidden sm:inline">Iniciar Sesión</span>
							</Button>
						</Link>
					)}

					<ThemeToggle />
				</div>
			</div>
		</nav>
	);
}
