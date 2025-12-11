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
import { Eye, Plus } from 'lucide-react';

const employees = [
	{
		id: '1',
		name: 'Ana López',
		email: 'ana@example.com',
		position: 'Estilista',
		schedule: 'Lun-Vie 9:00-18:00',
	},
	{
		id: '2',
		name: 'Carlos Ruiz',
		email: 'carlos@example.com',
		position: 'Masajista',
		schedule: 'Mar-Sáb 10:00-19:00',
	},
];

export default function EmployeePage() {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold">Gestión de Empleados</h1>
					<p className="text-muted-foreground">Administra los empleados y sus horarios</p>
				</div>
				<Button>
					<Plus className="mr-2 h-4 w-4" />
					Agregar empleado
				</Button>
			</div>

			<div>
				<Card>
					<CardHeader>
						<CardTitle>Lista de empleados</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="max-h-[300px] overflow-y-auto">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Nombre</TableHead>
										<TableHead>Email</TableHead>
										<TableHead>Activo</TableHead>
										<TableHead>Horario</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{employees.length === 0 ? (
										<TableRow>
											<TableCell
												colSpan={4}
												className="text-center text-muted-foreground"
											>
												No hay empleados registrados
											</TableCell>
										</TableRow>
									) : (
										employees.map((employee) => (
											<TableRow key={employee.id}>
												<TableCell className="font-medium">{employee.name}</TableCell>
												<TableCell>{employee.email}</TableCell>
												<TableCell>
													<span className="rounded-full bg-green-500/10 px-2 py-1 text-xs text-green-500">
														activo
													</span>
												</TableCell>
												<TableCell>
													<Button variant="ghost" size="icon">
														<Eye className="h-4 w-4" />
													</Button>
												</TableCell>
											</TableRow>
										))
									)}
								</TableBody>
							</Table>
						</div>
						<Pagination totalPages={10} />
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
