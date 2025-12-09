'use client';

import { loginApp, registerUser } from '@/actions';
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Input,
	Label,
} from '@/components';
import { titleFont } from '@/config/font';
import { LogIn, MessageSquareWarning } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface InputForm {
	email: string;
	password: string;
	name: string;
}

export const RegisterForm = () => {
	const {
		handleSubmit,
		formState: { errors },
		register,
	} = useForm<InputForm>();

	const [errorMessage, setErrorMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const onSubmit = async (data: InputForm) => {
		setLoading(true);

		// hacer registro y luego el login
		const res = await registerUser({
			...data,
		});

		if (!res.ok) {
			setErrorMessage(res.message!);
			setLoading(false);
			return;
		}

		setErrorMessage('');
		await loginApp(data.email, data.password);
		window.location.replace('/');
	};

	return (
		<Card className="relative border-border/50 bg-card/80 backdrop-blur-md shadow-2xl">
			<CardHeader className="space-y-1">
				<CardTitle className={`text-2xl font-bold text-center ${titleFont.className}`}>
					Nueva cuenta
				</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name">Nombre completo</Label>
						<Input
							type="text"
							id="name"
							placeholder="Jhon Due"
							{...register('name', { required: true })}
						/>
						<div className="h-3">
							{errors.name && (
								<p className="text-sm font-medium text-red-500">El nombre es requerido</p>
							)}
						</div>
					</div>
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							type="email"
							id="email"
							placeholder="correo@example.com"
							{...register('email', { required: true })}
						/>
						<div className="h-3">
							{errors.email && (
								<p className="text-sm font-medium text-red-500">El email es requerido</p>
							)}
						</div>
					</div>
					<div className="space-y-2">
						<Label htmlFor="password">Contraseña</Label>
						<Input
							id="password"
							type="password"
							placeholder="••••••••"
							{...register('password', { required: true })}
						/>
						<div className="h-3">
							{errors.password && (
								<p className="text-sm font-medium text-red-500">
									La contraseña es requerida
								</p>
							)}
						</div>
					</div>

					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? (
							'Registrando...'
						) : (
							<>
								<LogIn className="mr-2 h-4 w-4" />
								Registrate
							</>
						)}
					</Button>

					{errorMessage !== '' && (
						<div className="flex gap-2 items-center">
							<MessageSquareWarning className="h-5 w-5 text-red-500" />
							<span className="text-sm text-red-500">{errorMessage}</span>
						</div>
					)}

					{/* divisor l ine */}
					<div className="flex items-center my-5">
						<div className="flex-1 border-t border-gray-500"></div>
						<div className="px-2">O</div>
						<div className="flex-1 border-t border-gray-500"></div>
					</div>

					<Link href="/auth/login" className="text-center">
						<Button type="button" className="w-full" variant="link">
							Inicia sesión
						</Button>
					</Link>
				</form>
			</CardContent>
		</Card>
	);
};
