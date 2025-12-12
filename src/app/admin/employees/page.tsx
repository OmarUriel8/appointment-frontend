import { getUsers } from '@/actions';
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
import Link from 'next/link';
import { TableEmployee } from './ui/TableEmployee';

interface Props {
	searchParams: Promise<{
		page: string;
		limit: string;
		quyery: string;
	}>;
}

export default async function EmployeePage({ searchParams }: Props) {
	const page = (await searchParams).page ? parseInt((await searchParams).page) : 1;
	const limit = (await searchParams).limit ? parseInt((await searchParams).limit!) : 0;
	//const query = (await searchParams).quyery ? (await searchParams).quyery! : undefined;

	const {
		ok,
		totalPages,
		users: employees,
		message,
	} = await getUsers({ role: 'EMPLOYEE', page, limit });

	if (!ok) {
		return <p>{message}</p>;
	}

	return (
		<div className="space-y-6">
			<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
				<DashboardTitle
					title="Gestión de Empleados"
					subtitle="Administra los empleados y sus horarios"
				/>

				<Link href="/admin/users/new?role=employee">
					<Button className="btn-primary">
						<Plus className="mr-2 h-4 w-4" />
						Agregar Empleado
					</Button>
				</Link>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Lista de empleados</CardTitle>
				</CardHeader>
				<CardContent>
					<TableEmployee employees={employees!} />
					<Pagination totalPages={totalPages!} />
				</CardContent>
			</Card>
		</div>
	);
}
