export const revalidate = 604800; //7 dias

import { getUserById } from '@/actions';
import { Title } from '@/components';
import { redirect } from 'next/navigation';
import { ClientForm } from './ui/ClientForm';

export const metadata = {
	title: 'Editar Perfil',
	description: 'Editar Perfil Cliente',
};
interface Props {
	params: Promise<{ term: string }>;
}

export default async function ClientPage({ params }: Props) {
	const term = (await params).term;

	const user = await getUserById(term);

	if (!user) {
		return redirect('/profile/client');
	}

	const title = 'Editar datos personales';
	return (
		<div>
			<Title title={title} subtitle="Llene el formulario" />

			<div className="grid grid-cols-1 lg:grid-cols-2">
				<ClientForm user={user ? user : undefined} id={user.id} />
			</div>
		</div>
	);
}
