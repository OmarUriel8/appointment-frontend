import { Metadata } from 'next';
import { getServiceByslugOrId } from '@/actions';
import { DashboardTitle } from '@/components';
import { redirect } from 'next/navigation';
import { ServiceForm } from './ui/ServiceForm';

interface Props {
	params: Promise<{ slug: string }>;
}

export const metadata: Metadata = {
	title: 'Servicio',
	description: 'Servicio',
};

export default async function AdminServicesPage({ params }: Props) {
	const slug = (await params).slug;

	const service = await getServiceByslugOrId(slug);

	const title = slug === 'new' ? 'Nuevo servicio' : 'Editar servicio';

	if (!service && slug !== 'new') {
		return redirect('/admin/services');
	}

	return (
		<div className="space-y-6">
			<DashboardTitle title={title} subtitle="Llene el formulario de usuario" />

			<div className="">
				<ServiceForm service={service ? service : undefined} slug={slug} />
			</div>
		</div>
	);
}
