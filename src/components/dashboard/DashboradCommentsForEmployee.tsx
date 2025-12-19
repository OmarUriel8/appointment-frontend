import { ReviewClient } from '@/interfaces';
import { MessageCircleMore, Star } from 'lucide-react';

interface Props {
	reviewClient: ReviewClient[];
	title: string;
}
export const DashboradCommentsForEmployee = ({ title, reviewClient }: Props) => {
	return (
		<div className="rounded-lg border border-border/40 bg-card p-6">
			<div className="flex items-center gap-2 mb-4">
				<MessageCircleMore className="h-5 w-5 text-primary" />
				<h3 className="font-semibold text-card-foreground">{title}</h3>
			</div>
			<div className="space-y-4">
				{reviewClient.length === 0 ? (
					<div className="p-10">
						<p className="text-sm text-muted-foreground text-center py-4">
							No hay datos suficientes este mes.
						</p>
					</div>
				) : (
					reviewClient.map((review) => (
						<div key={review.id}>
							<div className="grid grid-cols-8">
								<p className="col-span-1 flex items-center gap-2">
									<Star className="text-yellow-500 fill-yellow-400 h-8 w-8" />
									<span className="font-semibold">{review.score}</span>
								</p>
								<p className="text-sm italic col-span-6">"{review.comments}"</p>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};
