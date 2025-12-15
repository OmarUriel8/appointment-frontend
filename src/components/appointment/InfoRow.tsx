interface Props {
	label: string;
	children: React.ReactNode;
}
export const InfoRow = ({ label, children }: Props) => (
	<p className="flex gap-2">
		<span className="text-muted-foreground min-w-[90px]">{label}:</span>
		<span className="font-medium">{children}</span>
	</p>
);
