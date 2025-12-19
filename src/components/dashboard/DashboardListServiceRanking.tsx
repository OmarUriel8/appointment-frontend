import { ServiceMostUsed } from '@/interfaces';
import { Medal, Settings } from 'lucide-react';

interface Props {
	services: ServiceMostUsed[];
	title?: string;
}
export const DashboardListServiceRanking = ({
	services,
	title = 'Servicios Populares',
}: Props) => {
	const maxUsage = services.length > 0 ? Math.max(...services.map((s) => s.total)) : 0;
	return (
		<div className="rounded-lg border border-border/40 bg-card p-6">
			<div className="flex items-center gap-2 mb-4">
				<Settings className="h-5 w-5 text-primary" />
				<h3 className="font-semibold text-card-foreground">{title}</h3>
			</div>

			<div className="space-y-3">
				{services.length === 0 ? (
					<p className="text-sm text-muted-foreground text-center py-4">
						No hay datos suficientes este mes.
					</p>
				) : (
					services.slice(0, 5).map((service, index) => {
						const percentage = (service.total / maxUsage) * 100;

						return (
							<div key={service.id} className="space-y-2">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										{/* Badge de posición (Top 1, 2, 3...) */}
										<span
											className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
												index === 0
													? 'bg-yellow-500/20 text-yellow-600'
													: index === 1
													? 'bg-slate-300/30 text-slate-500'
													: index === 2
													? 'bg-orange-400/20 text-orange-600'
													: 'bg-muted text-muted-foreground'
											}`}
										>
											{index === 0 ? <Medal className="h-3 w-3" /> : index + 1}
										</span>
										<span className="text-sm font-medium leading-none">
											{service.name}
										</span>
									</div>
									<span className="text-sm font-bold text-muted-foreground">
										{service.total}{' '}
										<span className="text-[10px] font-normal uppercase">citas</span>
									</span>
								</div>

								{/* Barra de progreso visual */}
								<div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
									<div
										className="h-full bg-primary transition-all duration-500 ease-in-out"
										style={{ width: `${percentage}%` }}
									/>
								</div>
							</div>
						);
					})
				)}
			</div>
		</div>
	);
};
