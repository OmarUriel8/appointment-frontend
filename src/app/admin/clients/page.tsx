import { getUsers } from '@/actions';
import { Metadata } from 'next';
import Link from 'next/link';
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Pagination,
	DashboardTitle,
} from '@/components';
import { Plus } from 'lucide-react';

import { TableClient } from './ui/TableClient';

interface Props {
	searchParams: Promise<{
		page: string;
		limit: string;
		quyery: string;
	}>;
}

export const metadata: Metadata = {
	title: 'Lista de clientes',
	description: 'Lista de clientes',
};

export default async function ClientPage({ searchParams }: Props) {
	const page = (await searchParams).page ? parseInt((await searchParams).page) : 1;
	const limit = (await searchParams).limit ? parseInt((await searchParams).limit!) : 0;
	//const query = (await searchParams).quyery ? (await searchParams).quyery! : undefined;

	const {
		ok,
		totalPages,
		users: clients,
		message,
	} = await getUsers({ role: 'CLIENT', page, limit });

	if (!ok) {
		return <p>{message}</p>;
	}
	return (
		<div className="space-y-6">
			<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
				<DashboardTitle
					title="Gestión de Clientes"
					subtitle="Administra los clientes registrados"
				/>

				<Link href="/admin/users/new?role=client">
					<Button className="btn-primary">
						<Plus className="mr-2 h-4 w-4" />
						Agregar Cliente
					</Button>
				</Link>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Lista de clientes</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="max-h-[300px] overflow-y-auto">
						<TableClient clients={clients!} />
					</div>
					<Pagination totalPages={totalPages!} />
				</CardContent>
			</Card>

			{/* 
			// Vista de detalles mock
			<Card>
				<CardHeader>
					<CardTitle>Detalles del cliente</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div>
							<h3 className="font-semibold mb-2">Información personal</h3>
							<div className="space-y-2 text-sm">
								<p>
									<span className="text-muted-foreground">Nombre:</span> Laura Martínez
								</p>
								<p>
									<span className="text-muted-foreground">Email:</span> laura@example.com
								</p>
								<p>
									<span className="text-muted-foreground">Teléfono:</span> +1234567890
								</p>
							</div>
						</div>
						<div>
							<h3 className="font-semibold mb-2">Historial de citas</h3>
							<p className="text-sm text-muted-foreground">No hay citas registradas</p>
						</div>
					</div>
				</CardContent>
			</Card> */}
		</div>
	);
}
