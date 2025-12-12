import { AdminSidebar, AdminTopbar } from '@/components';
import { Metadata } from 'next';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
	title: 'Admin',
	description: 'Panel administrativo',
};
export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-screen overflow-hidden">
			<Toaster position="top-right" richColors closeButton />
			<AdminSidebar />
			<div className="flex flex-1 flex-col overflow-hidden">
				<AdminTopbar />
				<main className="flex-1 overflow-y-auto bg-background p-4 md:p-6">
					<div className="ml-0  lg:ml-64 p-4">{children}</div>
				</main>
			</div>
		</div>
	);
}
