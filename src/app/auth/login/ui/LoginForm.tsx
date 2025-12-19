'use client';

import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Input,
	Label,
} from '@/components';
import { titleFont } from '@/config/font';
import { LogIn, MessageSquareWarning } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface InputForm {
	email: string;
	password: string;
}

export const LoginForm = () => {
	const searchParams = useSearchParams();
	const redirectTo = searchParams.get('redirectTo') || '/';

	const {
		handleSubmit,
		formState: { errors },
		reset,
		register,
	} = useForm<InputForm>();

	const [errorMessage, setErrorMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const onSubmit = async (data: InputForm) => {
		setLoading(true);
		const { email, password } = data;

		const res = await signIn('credentials', {
			email,
			password,
			redirect: false,
		});

		if (res.error) {
			setErrorMessage(res.code!);

			setLoading(false);
			return;
		}

		// hacer registro y luego el login
		window.location.replace(redirectTo || '/');
	};

	return (
		<Card className="relative border-border/50 bg-card/80 backdrop-blur-md shadow-2xl">
			<CardHeader className="space-y-1">
				<CardTitle className={`text-2xl font-bold text-center ${titleFont.className}`}>
					Iniciar sesión
				</CardTitle>
				{/* <CardDescription>
					Ingresa tus credenciales para acceder al panel de administración
				</CardDescription> */}
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					{/* email */}
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="correo@example.com"
							{...register('email', { required: true })}
						/>
						<div className="h-3">
							{errors.email && (
								<p className="text-sm font-medium text-red-500">El email es requerido</p>
							)}
						</div>
					</div>

					{/* Password */}
					<div className="space-y-2">
						<Label htmlFor="password">Contraseña</Label>
						<Input
							id="password"
							type="password"
							placeholder="••••••••"
							{...register('password', { required: true, minLength: 6 })}
						/>
						<div className="h-3">
							{errors.password && (
								<p className="text-sm font-medium text-red-500">
									La contraseña es requerida y debe ser de minimo 6 caracteres
								</p>
							)}
						</div>
					</div>

					{/* Button */}
					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? (
							'Iniciando sesión...'
						) : (
							<>
								<LogIn className="mr-2 h-4 w-4" />
								Iniciar sesión
							</>
						)}
					</Button>

					{errorMessage !== '' && (
						<div className="flex gap-2 items-center">
							<MessageSquareWarning className="h-3 w-5 text-red-500" />
							<span className="text-sm text-red-500">{errorMessage}</span>
						</div>
					)}

					{/* New acount */}
					<div className="flex items-center my-5">
						<div className="flex-1 border-t border-gray-500"></div>
						<div className="px-2">O</div>
						<div className="flex-1 border-t border-gray-500"></div>
					</div>

					<Link href="/auth/new-account" className="text-center">
						<Button type="button" className="w-full" variant="link">
							Crear una nueva cuenta
						</Button>
					</Link>
				</form>
			</CardContent>
		</Card>
	);
};
