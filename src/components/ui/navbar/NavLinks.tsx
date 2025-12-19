import Link from 'next/link';
import { Button } from '../button';

interface Props {
	isClient: boolean;
	isEmployee: boolean;
	isAdmin: boolean;
	isAuthenticated: boolean;
	className?: string;
}
export const NavLinks = ({
	isClient,
	isEmployee,
	isAdmin,
	isAuthenticated,
	className = '',
}: Props) => (
	<div className={className}>
		<Link href="/services">
			<Button variant="link" size="sm" className="justify-start">
				Todos los Servicios
			</Button>
		</Link>

		{isClient && (
			<>
				<Link href="/appointments">
					<Button variant="link" size="sm" className="justify-start">
						Ver citas
					</Button>
				</Link>
				<Link href="/appointment/new">
					<Button variant="link" size="sm" className="justify-start">
						Agendar cita
					</Button>
				</Link>
			</>
		)}

		{isEmployee && (
			<Link href="/appointments">
				<Button variant="link" size="sm" className="justify-start">
					Ver agenda
				</Button>
			</Link>
		)}

		{isAdmin && (
			<Link href="/admin/dashboard">
				<Button variant="link" size="sm" className="justify-start">
					Dashboard
				</Button>
			</Link>
		)}

		{isAuthenticated && isClient && (
			<Link href="/profile/client">
				<Button variant="link" size="sm" className="justify-start">
					Mi perfil
				</Button>
			</Link>
		)}

		{isAuthenticated && isEmployee && (
			<Link href="/profile/employee">
				<Button variant="link" size="sm" className="justify-start">
					Mi perfil
				</Button>
			</Link>
		)}
	</div>
);
