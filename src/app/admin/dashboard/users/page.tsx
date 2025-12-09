import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	DashboardTitle,
} from '@/components';
import { TableUsers } from './ui/TableUsers';
import { Plus } from 'lucide-react';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function UserPage() {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<DashboardTitle
					title="Gestión de Usuarios"
					subtitle="Administra los usuarios del sistema"
				/>

				<Link href="/admin/dashboard/users/new">
					<Button className="btn-primary">
						<Plus className="mr-2 h-4 w-4" />
						Agregar Usuario
					</Button>
				</Link>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Lista de usuarios</CardTitle>
				</CardHeader>
				<CardContent>
					<TableUsers />
				</CardContent>
			</Card>
		</div>
	);
}
