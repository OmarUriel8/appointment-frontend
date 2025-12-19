import { TrophyIcon, UserCircle } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { ClientMostVisited } from '@/interfaces';

interface Props {
	clients: ClientMostVisited[];
}
export const DashboardListClientRanking = ({ clients }: Props) => {
	return (
		<>
			<div className="rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden">
				{/* Header con estilo más limpio */}
				<div className="flex items-center justify-between border-b border-border/40 p-5 bg-muted/5">
					<div className="flex items-center gap-2">
						<div className="p-2 bg-primary/10 rounded-lg">
							<UserCircle className="h-5 w-5 text-primary" />
						</div>
						<h3 className="font-semibold text-card-foreground">
							Clientes con más citas completadas
						</h3>
					</div>
					<TrophyIcon className="h-4 w-4 text-yellow-500" />
				</div>

				<div className="p-5">
					<div className="space-y-1">
						{clients.length === 0 ? (
							<div className="flex flex-col items-center justify-center py-8">
								<p className="text-sm text-muted-foreground">
									No hay datos suficientes este mes.
								</p>
							</div>
						) : (
							clients.map((user, i) => (
								<div
									key={i}
									className="group flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-muted/40"
								>
									<div className="flex items-center gap-4">
										{/* Avatar con iniciales */}
										<Avatar className="h-10 w-10 border">
											<AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">
												{user.name
													.split(' ')
													.map((n) => n[0])
													.join('')
													.substring(0, 2)
													.toUpperCase()}
											</AvatarFallback>
										</Avatar>

										<div className="flex flex-col">
											<p className="text-sm font-semibold leading-none group-hover:text-primary transition-colors">
												{user.name}
											</p>
											<p className="text-xs text-muted-foreground mt-1">{user.email}</p>
										</div>
									</div>

									<div className="text-right">
										<Badge variant="secondary" className="font-bold">
											{user.total} citas
										</Badge>
										{/* Indicador visual de ranking para los 3 primeros */}
										{i < 5 && (
											<p className="text-[10px] text-muted-foreground mt-1 uppercase font-medium">
												#{i + 1} Ranking
											</p>
										)}
									</div>
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</>
	);
};
