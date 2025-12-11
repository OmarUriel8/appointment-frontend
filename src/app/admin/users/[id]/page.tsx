import { getUserById } from '@/actions';
import { DashboardTitle } from '@/components';
import { redirect } from 'next/navigation';
import { UserForm } from './ui/UserForm';

interface Props {
	params: Promise<{ id: string }>;
}

export default async function UserPage({ params }: Props) {
	const id = (await params).id;

	const user = await getUserById(id);

	if (!user && id !== 'new') {
		return redirect('/admin/users');
	}

	const title = id === 'new' ? 'Nuevo usuario' : 'Editar usuario';

	return (
		<div className="space-y-6">
			<DashboardTitle title={title} subtitle="Llene el formulario de usuario" />

			<div className="grid grid-cols-1 lg:grid-cols-2">
				<UserForm user={user ? user : undefined} id={id} />
			</div>
		</div>
	);
}
