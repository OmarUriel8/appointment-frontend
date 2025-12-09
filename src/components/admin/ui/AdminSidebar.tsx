'use client';

import { cn } from '@/lib/utils';
import {
	Briefcase,
	Calendar,
	LayoutDashboard,
	LogOut,
	Settings,
	UserCheck,
	Users,
	X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '../../ui/logo/Logo';
import { useUIStorte } from '@/store';
import { Button } from '../../ui/button';
import { signOut } from 'next-auth/react';

const menuItems = [
	{
		title: 'Dashboard',
		href: '/admin/dashboard',
		icon: LayoutDashboard,
	},
	{
		title: 'Usuarios',
		href: '/admin/dashboard/users',
		icon: Users,
	},
	{
		title: 'Servicios',
		href: '/admin/dashboard/services',
		icon: Briefcase,
	},
	{
		title: 'Empleados',
		href: '/admin/dashboard/employees',
		icon: UserCheck,
	},
	{
		title: 'Clientes',
		href: '/admin/dashboard/clients',
		icon: Calendar,
	},
	// {
	// 	title: 'Configuración',
	// 	href: '/admin/dashboard/settings',
	// 	icon: Settings,
	// },
];

export const AdminSidebar = () => {
	const isSideMenuOpen = useUIStorte((store) => store.isSideMenuOpen);
	const closeSideMenu = useUIStorte((store) => store.closeSideMenu);

	const pathname = usePathname();

	return (
		<>
			{/* background black */}
			{isSideMenuOpen && (
				<div className="fixed top-0 left-0 w-screen h-screen z-40 bg-black opacity-30"></div>
			)}

			{/* blur*/}
			{isSideMenuOpen && (
				<div
					className="fade-in fixed top-0 left-0 w-screen h-screen z-40 backdrop-filter backdrop-blur-sm"
					onClick={() => closeSideMenu()}
				></div>
			)}
			<aside
				className={cn(
					'fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card transition-transform duration-300 ease-in-out ',
					isSideMenuOpen ? 'translate-x-0' : '-translate-x-full',
					'lg:translate-x-0'
				)}
			>
				<div className="flex h-full flex-col">
					<div className="flex h-16 items-center border-b border-border px-6">
						<h2 className="text-lg font-semibold flex gap-2 pr-1">
							<span>Panel</span>
							<Logo href="/admin/dashboard" />
						</h2>
						<Button
							size="icon"
							className="lg:hidden hover:bg-primary/80 hover:text-accent-foreground bg-transparent text-black dark:text-white"
							onClick={() => closeSideMenu()}
						>
							<X className="h-5 w-5" />
						</Button>
					</div>
					<nav className="flex-1 space-y-1 p-4">
						{menuItems.map((item) => {
							const Icon = item.icon;
							const isActive = pathname === item.href;
							return (
								<Link
									key={item.href}
									href={item.href}
									className={cn(
										'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
										isActive
											? 'bg-primary text-primary-foreground'
											: 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
									)}
								>
									<Icon className="h-5 w-5" />
									{item.title}
								</Link>
							);
						})}
					</nav>

					{/* Footer Actions */}
					<div className="border-t border-sidebar-border p-4 space-y-2">
						<Link href="/">
							<Button
								variant="outline"
								className="w-full justify-start bg-transparent"
								size="sm"
							>
								<Settings className="mr-2 h-4 w-4" />
								Ver sitio público
							</Button>
						</Link>
						<Button
							className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 bg-transparent mt-2"
							size="sm"
							onClick={() => signOut()}
						>
							<LogOut className="mr-2 h-4 w-4" />
							Cerrar sesión
						</Button>
					</div>
				</div>
			</aside>
		</>
	);
};
