import { DashboardCard } from '@/components';
import { Users, Briefcase, UserCircle, Settings } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'Dashboard del sitio',
};

export default function DashboardPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold">Dashboard</h1>
				<p className="text-muted-foreground">Bienvenido al panel de administración</p>
			</div>

			{/* Stats Grid */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<DashboardCard
					title="Total Usuarios"
					value="2,345"
					description="Usuarios registrados"
					icon={UserCircle}
					//trend={{ value: '+12.5% desde el mes pasado', positive: true }}
				/>
				<DashboardCard
					title="Clientes Activos"
					value="1,234"
					description="Clientes en sistema"
					icon={Users}
					//trend={{ value: '+8.2% desde el mes pasado', positive: true }}
				/>
				<DashboardCard
					title="Empleados"
					value="89"
					description="Personal activo"
					icon={Briefcase}
					//trend={{ value: '+3 nuevos este mes', positive: true }}
				/>
				<DashboardCard
					title="Servicios"
					value="24"
					description="Servicios disponibles"
					icon={Settings}
					//trend={{ value: 'Sin cambios', positive: true }}
				/>
			</div>

			{/* Recent Activity Section */}
			<div className="grid gap-4 md:grid-cols-2">
				{/* Usuarios Section */}
				<div className="rounded-lg border border-border/40 bg-card p-6">
					<div className="flex items-center gap-2 mb-4">
						<UserCircle className="h-5 w-5 text-primary" />
						<h3 className="font-semibold text-card-foreground">Usuarios Recientes</h3>
					</div>
					<div className="space-y-3">
						{[
							{ name: 'María García', email: 'maria@example.com', time: 'Hace 2 horas' },
							{ name: 'Juan Pérez', email: 'juan@example.com', time: 'Hace 5 horas' },
							{ name: 'Ana López', email: 'ana@example.com', time: 'Hace 1 día' },
						].map((user, i) => (
							<div key={i} className="flex items-center justify-between py-2">
								<div>
									<p className="text-sm font-medium text-card-foreground">{user.name}</p>
									<p className="text-xs text-muted-foreground">{user.email}</p>
								</div>
								<span className="text-xs text-muted-foreground">{user.time}</span>
							</div>
						))}
					</div>
				</div>

				{/* Servicios Section */}
				<div className="rounded-lg border border-border/40 bg-card p-6">
					<div className="flex items-center gap-2 mb-4">
						<Settings className="h-5 w-5 text-primary" />
						<h3 className="font-semibold text-card-foreground">Servicios Populares</h3>
					</div>
					<div className="space-y-3">
						{[
							{ name: 'Consultoría', usage: '89%', users: 156 },
							{ name: 'Desarrollo', usage: '76%', users: 132 },
							{ name: 'Soporte Técnico', usage: '65%', users: 98 },
						].map((service, i) => (
							<div key={i} className="space-y-2 py-2">
								<div className="flex items-center justify-between">
									<p className="text-sm font-medium text-card-foreground">
										{service.name}
									</p>
									<span className="text-xs text-muted-foreground">
										{service.users} usuarios
									</span>
								</div>
								<div className="w-full bg-muted rounded-full h-2">
									<div
										className="bg-primary h-2 rounded-full transition-all"
										style={{ width: service.usage }}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
