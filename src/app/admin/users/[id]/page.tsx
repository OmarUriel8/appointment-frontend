export const revalidate = 604800; // 7 dias

import { getUserById } from '@/actions';
import { DashboardTitle } from '@/components';
import { redirect } from 'next/navigation';
import { UserForm } from './ui/UserForm';
import { Metadata } from 'next';

interface Props {
	params: Promise<{
		id: string;
	}>;
	searchParams: Promise<{
		role: string;
	}>;
}
export const metadata: Metadata = {
	title: 'Usuario',
	description: 'Usuario',
};

export default async function UserPage({ params, searchParams }: Props) {
	const id = (await params).id;

	const role = ((await searchParams).role ?? '').toUpperCase();
	const user = await getUserById(id);

	if (!user && id !== 'new') {
		return redirect('/admin/users');
	}

	const title = id === 'new' ? 'Nuevo usuario' : 'Editar usuario';

	return (
		<div className="space-y-6">
			<DashboardTitle title={title} subtitle="Llene el formulario de usuario" />

			<div className="grid grid-cols-1 lg:grid-cols-2">
				<UserForm user={user ? user : undefined} id={id} role={role} />
			</div>
		</div>
	);
}
