import { titleFont } from '@/config/font';
import { Calendar, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface Props {
	href?: string;
}
export const Logo = ({ href = '/' }: Props) => {
	return (
		<Link href={href} className="flex items-center gap-2 font-semibold">
			<Sparkles className="h-5 w-5 text-primary" />
			<p>
				<span className={titleFont.className}>Aura</span>
				<span className="text-primary">Studio</span>
			</p>
		</Link>
	);
};
