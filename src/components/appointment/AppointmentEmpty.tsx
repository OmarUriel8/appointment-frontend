import { CalendarX2, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { UserRole } from '@/interfaces';
import { Button } from '../ui/button';

interface Props {
	title?: string;
	description?: string;
	actionLabel?: string;
	role: UserRole;
}

export const AppointmentEmpty = ({
	title = 'No tienes citas agendadas',
	description = 'Parece que aún no has reservado ningún servicio. ¡Anímate a estrenar tu nueva imagen hoy mismo!',
	actionLabel = 'Agendar mi primera cita',
	role,
}: Props) => {
	return (
		<Card className="flex flex-col items-center justify-center p-12 border-dashed bg-muted">
			<div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-6">
				<CalendarX2 className="h-10 w-10 text-primary" strokeWidth={1.5} />
			</div>

			<div className="text-center max-w-sm space-y-2 mb-8">
				<h3 className="text-xl font-semibold tracking-tight">{title}</h3>
				<p className="text-sm text-muted-foreground italic">{description}</p>
			</div>

			{role === 'CLIENT' && (
				<Link href={'/appointment/new'} className="gap-2">
					<Button className="btn-primary">
						<Plus className="h-5 w-5" />
						{actionLabel}
					</Button>
				</Link>
			)}
		</Card>
	);
};
