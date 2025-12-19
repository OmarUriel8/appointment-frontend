'use client';
import { createUpdateUser } from '@/actions';
import { Button, Card, CardContent, Input, Label } from '@/components';
import { User } from '@/interfaces';
import { Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface Props {
	user?: User;
	id: string;
}

interface InputForm {
	name: string;
	email: string;
	phone?: string;
	password: string;
}

export const EmployeeForm = ({ user, id }: Props) => {
	const router = useRouter();

	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const {
		handleSubmit,
		formState: { errors },
		register,
	} = useForm<InputForm>({
		defaultValues: {
			name: user?.name,
			email: user?.email,
			phone: user?.phone,
			password: '',
		},
	});

	let configPassword = !user ? { required: true } : {};

	const onSubmit = async (data: InputForm) => {
		setLoading(true);

		const resp = await createUpdateUser({ id, ...data });

		if (!resp.ok) {
			setErrorMessage(resp.message);
			setLoading(false);
			return;
		}

		let messageSuccess = 'Datos actualizados';
		toast.success(messageSuccess);
		setLoading(false);
		router.replace(`/profile/employee`);
	};

	return (
		<Card>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					{/* Name */}
					<div className="space-y-2">
						<Label htmlFor="name">Nombre completo</Label>
						<Input
							type="text"
							id="name"
							placeholder="Jhon Due"
							{...register('name', { required: true })}
						/>
						<div className="h-5">
							{errors.name && (
								<p className="text-sm font-medium text-red-500">El nombre es requerido</p>
							)}
						</div>
					</div>

					{/* Email */}
					<div className="space-y-2">
						<Label htmlFor="email">
							Email{' '}
							<span className="text-blue-800 dark:text-blue-400">
								(Solo el administrador puedo modificar el email)
							</span>
						</Label>
						<Input
							type="email"
							id="email"
							placeholder="correo@example.com"
							disabled
							{...register('email', { required: true })}
						/>
						<div className="h-5">
							{errors.email && (
								<p className="text-sm font-medium text-red-500">El email es requerido</p>
							)}
						</div>
					</div>

					{/* Phone */}
					<div className="space-y-2">
						<Label htmlFor="phone">Telefono</Label>
						<Input
							type="text"
							id="phone"
							placeholder="5512345678"
							{...register('phone')}
						/>
						<div className="h-5">
							{errors.phone && (
								<p className="text-sm font-medium text-red-500">
									El telefono no es valido
								</p>
							)}
						</div>
					</div>

					{/* Password */}
					<div className="space-y-2">
						<Label htmlFor="password">Contraseña</Label>
						<Input
							id="password"
							type="password"
							placeholder=""
							{...register('password', configPassword)}
						/>
						<div className="h-6">
							{user && (
								<span>Si no requiere actualizar la contraseña no llene el campo</span>
							)}

							{errors.password && (
								<p className="text-sm font-medium text-red-500">
									La contraseña es requerida
								</p>
							)}
						</div>
					</div>

					{/* Button save */}
					<div className="flex justify-end">
						<Button className="btn-primary mt-7">
							{loading ? (
								'Guardando...'
							) : (
								<>
									<Save className="mr-1 h-4 w-4" />
									Guardar
								</>
							)}
						</Button>
					</div>

					{errorMessage !== '' && (
						<div className="flex gap-2 items-center">
							<span className="text-sm text-red-500">{errorMessage}</span>
						</div>
					)}
				</form>
			</CardContent>
		</Card>
	);
};
