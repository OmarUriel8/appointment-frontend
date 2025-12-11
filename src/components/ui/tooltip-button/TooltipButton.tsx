import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip';

interface Props {
	title: string;
	children: React.ReactNode;
}
export const TooltipButton = ({ title, children }: Props) => {
	return (
		<Tooltip>
			<TooltipTrigger>{children}</TooltipTrigger>
			<TooltipContent>{title}</TooltipContent>
		</Tooltip>
	);
};
