export interface User {
	id: string;
	name: string;
	email: string;
	phone: string;
	role: UserRole;
	isActive: boolean;
	token: string;
}

export type UserRole = 'ADMIN' | 'EMPLOYEE' | 'CLIENT';
