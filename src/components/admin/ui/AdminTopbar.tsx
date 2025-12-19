'use client';
import { LogOut, Menu } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useUIStorte } from '@/store';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { cn } from '@/lib/utils';
import { titleFont } from '@/config/font';

export const AdminTopbar = () => {
	const openSideMenu = useUIStorte((store) => store.openSideMenu);
	const { data: session } = useSession();
	return (
		<header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-6">
			<Button
				size="icon"
				className="lg:hidden hover:bg-primary/80 hover:text-accent-foreground bg-transparent text-black dark:text-white"
				onClick={() => openSideMenu()}
			>
				<Menu className="h-5 w-5" />
			</Button>

			<div className="flex justify-between flex-1 items-center">
				<div className={cn(`lg:ml-64 font-semibold ${titleFont.className}`)}>
					Bienvenido {session?.user.name}
				</div>
				<div className="flex flex-1 items-center justify-end gap-4">
					<Button
						variant="secondary"
						size="sm"
						onClick={() => signOut()}
						className="text-destructive hover:text-destructive hover:bg-destructive/10 bg-transparent mt-2"
					>
						<LogOut className="mr-1 h-4 w-4" />
						Cerrar sesión
					</Button>
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
};
