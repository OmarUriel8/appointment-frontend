import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	Table,
	Pagination,
} from '@/components';
import { Eye } from 'lucide-react';

// Mock data
const clients = [
	{
		id: '1',
		name: 'Laura Martínez',
		email: 'laura@example.com',
		phone: '+1234567890',
		appointments: 5,
		status: 'Activo',
	},
	{
		id: '2',
		name: 'Roberto Silva',
		email: 'roberto@example.com',
		phone: '+0987654321',
		appointments: 2,
		status: 'Activo',
	},
];

export default function ClientPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold">Gestión de Clientes</h1>
				<p className="text-muted-foreground">Administra los clientes registrados</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Lista de clientes</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Nombre</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>Teléfono</TableHead>
								<TableHead>Citas</TableHead>
								<TableHead>Estado</TableHead>
								<TableHead className="text-right">Acciones</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{clients.length === 0 ? (
								<TableRow>
									<TableCell colSpan={6} className="text-center text-muted-foreground">
										No hay clientes registrados
									</TableCell>
								</TableRow>
							) : (
								clients.map((client) => (
									<TableRow key={client.id}>
										<TableCell className="font-medium">{client.name}</TableCell>
										<TableCell>{client.email}</TableCell>
										<TableCell>{client.phone}</TableCell>
										<TableCell>{client.appointments}</TableCell>
										<TableCell>
											<span className="rounded-full bg-green-500/10 px-2 py-1 text-xs text-green-500">
												{client.status}
											</span>
										</TableCell>
										<TableCell className="text-right">
											<Button variant="ghost" size="icon">
												<Eye className="h-4 w-4" />
											</Button>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
					<Pagination totalPages={20} />
				</CardContent>
			</Card>

			{/* Vista de detalles mock */}
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
			</Card>
		</div>
	);
}
