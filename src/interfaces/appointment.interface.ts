import { Service } from './service.interface';
import { User } from './user.interface';

export interface Testimonial {
	id: string;
	comments: string;
	name: string;
	score: number;
}

export type AppointmentStatus =
	| 'PENDING'
	| 'CONFIRMED'
	| 'COMPLETED'
	| 'CANCELLED'
	| 'all';

export interface ApiAppointment {
	total: number;
	pages: number;
	appointments: Appointment[];
}

export interface Appointment {
	id: number;
	date: Date;
	startTime: string;
	endTime: string;
	status: AppointmentStatus;
	notes: string;
	comments: string;
	score: number;
	client: User;
	employee: User;
	service: Service;
}
