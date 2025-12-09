export interface User {
	id: string;
	name: string;
	email: string;
	phone?: string;
	role: UserRole;
	isActive: boolean;
	token?: string;
}

export type UserRole = 'ADMIN' | 'EMPLOYEE' | 'CLIENT';

export interface ApiUser {
	total: number;
	pages: number;
	users: User[];
}

export const ArrayUserRole = [
	{
		name: 'Administrador',
		value: 'ADMIN',
	},
	{ name: 'Empleado', value: 'EMPLOYEE' },
	{
		name: 'Cliente',
		value: 'CLIENT',
	},
];
