import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon, LucideIcon } from 'lucide-react';

interface Props {
	title: string;
	value: string | number;
	description?: string;
	icon: LucideIcon;
	trend?: {
		value: string;
		positive: boolean;
	};
}

export const DashboardCard = ({
	title,
	value,
	description,
	icon: Icon,
	trend,
}: Props) => {
	return (
		<Card className="border-border/40 hover:border-primary/40 transition-colors">
			<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
				<CardTitle className="text-sm font-medium text-muted-foreground">
					{title}
				</CardTitle>
				<Icon className="h-4 w-4 text-primary" />
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold text-foreground">{value}</div>
				{description && (
					<p className="text-xs text-muted-foreground mt-1">{description}</p>
				)}
				{trend && (
					<p
						className={`text-xs mt-1 ${
							trend.positive
								? 'text-green-600 dark:text-green-400'
								: 'text-red-600 dark:text-red-400'
						}`}
					>
						{trend.value}
					</p>
				)}
			</CardContent>
		</Card>
	);
};
