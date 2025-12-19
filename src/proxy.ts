//export const runtime = 'nodejs'; // debe usarse en runtime nodejs para el middleware.
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function proxy(req: Request) {
	const session = await auth();

	// // Ejemplo: bloquear usuarios inactivos
	// if (session?.user && session.user.isActive === false) {
	//   return NextResponse.redirect(new URL("/auth/inactive", req.url));
	// }

	// Proteger rutas privadas
	if (!session && req.url.includes('/admin')) {
		return NextResponse.redirect(new URL(`/auth/login?redirectTo=${req.url}`, req.url));
	}

	if (session?.user.role !== 'ADMIN' && req.url.includes('/admin')) {
		return NextResponse.redirect(new URL(`/auth/login?redirectTo=${req.url}`, req.url));
	}

	if (!session && req.url.includes('/appointments')) {
		return NextResponse.redirect(new URL(`/auth/login?redirectTo=${req.url}`, req.url));
	}

	if (!session && req.url.includes('/appointment')) {
		return NextResponse.redirect(new URL(`/auth/login?redirectTo=${req.url}`, req.url));
	}

	if (!session && req.url.includes('/profile')) {
		return NextResponse.redirect(new URL(`/auth/login?redirectTo=${req.url}`, req.url));
	}

	if (session?.user.role !== 'CLIENT' && req.url.includes('/profile/client')) {
		return NextResponse.redirect(new URL(`/auth/login?redirectTo=${req.url}`, req.url));
	}

	if (session?.user.role !== 'EMPLOYEE' && req.url.includes('/profile/employee')) {
		return NextResponse.redirect(new URL(`/auth/login?redirectTo=${req.url}`, req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		'/profile/:path*',
		'/appointment/:path*',
		'/appointments/:path*',
		'/dashboard/:path*',
		'/admin/:path*',
		'/((?!_next/static|_next/image|favicon.ico).*)', //excluir archivos estáticos
		'/((?!api|_next/static|_next/image|.*\\.png$).*)',
	],
};
