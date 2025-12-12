import { Appointment, User } from '@/interfaces';
import { Card, CardContent, CardHeader, CardTitle } from '../card';
import { CardAppointment } from './CardAppointment';

interface Props {
	user: User;
	appointments: Appointment[];
}
export const CardUserInformation = ({ user, appointments }: Props) => {
	const role = user.role === 'CLIENT' ? 'Cliente' : 'Empleado';

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-2xl">Detalles del {role}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<div>
						<h3 className="font-semibold mb-2">Información personal</h3>
						<div className="space-y-2 text-sm">
							<p>
								<span className="text-muted-foreground">Nombre:</span> {user.name}
							</p>
							<p>
								<span className="text-muted-foreground">Email:</span> {user.email}
							</p>
							{user.phone && (
								<p>
									<span className="text-muted-foreground">Teléfono:</span> {user.phone}
								</p>
							)}
						</div>
					</div>
					{/* <div>
						<h3 className="font-semibold mb-2">Historial de citas</h3>
						<p className="text-sm text-muted-foreground">No hay citas registradas</p>
					</div> */}
					{user.role === 'CLIENT' ? (
						<section>
							<h1 className="text-2xl font-bold mb-3">Citas por realizar</h1>

							{appointments.length === 0 ? (
								<p>No hay citas por realizar</p>
							) : (
								<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
									{appointments.map((apointment) => (
										<CardAppointment
											key={apointment.id}
											apointment={apointment}
											role={user.role}
										/>
									))}
								</div>
							)}
						</section>
					) : (
						<section>
							<h1 className="text-2xl font-bold mb-3">Citas por realizar</h1>
							{appointments.length === 0 ? (
								<p>No hay citas por realizar</p>
							) : (
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
									{appointments.map((apointment) => (
										<CardAppointment
											key={apointment.id}
											apointment={apointment}
											role={user.role}
										/>
									))}
								</div>
							)}
						</section>
					)}
				</div>
			</CardContent>
		</Card>
	);
};
