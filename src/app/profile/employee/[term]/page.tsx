export const revalidate = 604800; //7 dias

import { getUserById } from '@/actions';
import { Title } from '@/components';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { EmployeeForm } from './ui/EmployeeForm';

export const metadata: Metadata = {
	title: 'Editar Perfil',
	description: 'Editar Perfil Empleado',
};
interface Props {
	params: Promise<{ term: string }>;
}

export default async function EmployeePage({ params }: Props) {
	const term = (await params).term;

	const user = await getUserById(term);

	if (!user) {
		return redirect('/profile/employee');
	}

	const title = 'Editar datos personales';

	return (
		<div className="space-y-6">
			<Title title={title} subtitle="Llene el formulario" />

			<div className="grid grid-cols-1 lg:grid-cols-2">
				<EmployeeForm user={user ? user : undefined} id={user.id} />
			</div>
		</div>
	);
}
