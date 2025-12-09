import { titleFont } from '@/config/font';

interface Props {
	title: string;
	subtitle?: string;
	className?: string;
}
export const DashboardTitle = ({ title, subtitle, className }: Props) => {
	return (
		<div className={`mt-3 ${className}`}>
			<h1 className={`${titleFont.className} text-3xl font-bold`}>{title}</h1>

			{subtitle && <h3 className="text-muted-foreground">{subtitle}</h3>}
		</div>
	);
};
