import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	DashboardTitle,
	Pagination,
} from '@/components';
import { TableUser } from './ui/TableUser';
import { Plus } from 'lucide-react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getUsers } from '@/actions';
import { Metadata } from 'next';

interface Props {
	searchParams: Promise<{
		page: string;
		limit: string;
		quyery: string;
	}>;
}

export const metadata: Metadata = {
	title: 'Lista de usuarios',
	description: 'Lista de usuarios',
};

export default async function UserPage({ searchParams }: Props) {
	const page = (await searchParams).page ? parseInt((await searchParams).page!) : 1;
	const limit = (await searchParams).limit ? parseInt((await searchParams).limit!) : 0;
	//const query = (await searchParams).quyery ? (await searchParams).quyery! : undefined;

	const { ok, message, totalPages, users } = await getUsers({ page, limit });

	if (!ok) {
		return <p>{message}</p>;
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<DashboardTitle
					title="Gestión de Usuarios"
					subtitle="Administra los usuarios del sistema"
				/>

				<Link href="/admin/users/new">
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
					<TableUser users={users!} />
					<Pagination totalPages={totalPages!} />
				</CardContent>
			</Card>
		</div>
	);
}
