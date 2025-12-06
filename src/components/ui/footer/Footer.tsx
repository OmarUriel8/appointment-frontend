import { titleFont } from '@/config/font';
import { Logo } from '../logo/Logo';
import Link from 'next/link';

export const Footer = () => {
	return (
		<div className="relative flex w-full justify-center text-xs mb-10">
			<Link href="/">
				<span className={titleFont.className}>Aura</span>
				<span className="text-primary">Studio</span>
				<span>© {new Date().getFullYear()}</span>
			</Link>

			<Link href="/" className="mx-3">
				Privacidad & Legal
			</Link>

			<Link href="/" className="mx-3">
				Ubicaciones
			</Link>
		</div>
	);
};
