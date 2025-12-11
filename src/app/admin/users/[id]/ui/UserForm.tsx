'use client';

import { createUpdateUser } from '@/actions/user/create-update-user';
import {
	Button,
	Card,
	CardContent,
	Checkbox,
	Input,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components';
import { ArrayUserRole, User, UserRole } from '@/interfaces';
import { Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface Props {
	user?: User;
	id: string;
}

interface InputForm {
	name: string;
	email: string;
	phone?: string;
	role: UserRole;
	isActive: boolean;
	password: string;
}

export const UserForm = ({ user, id }: Props) => {
	const router = useRouter();

	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const {
		handleSubmit,
		formState: { errors },
		register,
		control,
	} = useForm<InputForm>({
		defaultValues: { ...user },
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

		let messageSuccess = id === 'new' ? `Usuario creado` : 'Usuario actualizado';
		toast.success(messageSuccess);
		setLoading(false);
		router.replace(`/admin/users/${resp.user?.id}`);
	};

	return (
		<Card>
			{/* <CardHeader>
				<CardTitle>Card Title</CardTitle>
				<CardDescription>Card Description</CardDescription>
			</CardHeader> */}

			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)}>
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
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							type="email"
							id="email"
							placeholder="correo@example.com"
							{...register('email', { required: true })}
						/>
						<div className="h-5">
							{errors.email && (
								<p className="text-sm font-medium text-red-500">El email es requerido</p>
							)}
						</div>
					</div>
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
					<div className="space-y-2">
						<Label htmlFor="role">Rol</Label>
						<Controller
							name="role"
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<Select
									onValueChange={field.onChange}
									value={field.value}
									defaultValue={field.value}
								>
									<SelectTrigger className="w-full" id="role">
										<SelectValue placeholder="Seleccione un rol" />
									</SelectTrigger>

									<SelectContent>
										{ArrayUserRole.map((role) => (
											<SelectItem value={role.value} key={role.value}>
												{role.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)}
						/>
						<div className="h-5">
							{errors.role && (
								<p className="text-sm font-medium text-red-500">El role es requerido</p>
							)}
						</div>
					</div>
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
					<div className="space-y-2 mt-5">
						<Controller
							name="isActive"
							control={control}
							render={({ field }) => (
								<Label className="cursor-pointer">
									<Checkbox
										checked={field.value}
										onCheckedChange={(value) => field.onChange(value)}
									/>{' '}
									Activo
								</Label>
							)}
						/>

						<div className="h-5"></div>
					</div>

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
			{/* <CardFooter>
				
			</CardFooter> */}
		</Card>
	);
};
